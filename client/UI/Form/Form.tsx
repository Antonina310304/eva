import React, {
  cloneElement,
  Children,
  memo,
  useCallback,
  useState,
  useEffect,
  FormEvent,
  ReactChild,
  useRef,
  FC,
} from 'react';
import { Ajv } from 'ajv';

import isFile from '@Utils/isFile';

export type CallbackData = unknown;

export interface ServerErrorsOpts {
  name: string;
  message: string;
}

export interface FormProps {
  method?: 'POST' | 'GET';
  action: string;
  className?: string;
  children: ReactChild | ReactChild[];
  validationSchemaUrl?: string;
  disabled?: boolean;
  triggerChangeKey?: unknown;
  serverErrors?: ServerErrorsOpts[];
  transformDataBeforeSubmit?: (data: any) => void;
  onBeforeSubmit?: (e: FormEvent, data: CallbackData) => void;
  onSubmit?: (e: FormEvent, data: CallbackData) => void;
  onChange?: (e: FormEvent, data: CallbackData) => void;
  onResponse?: (e: FormEvent, data: CallbackData) => void;
  onError?: (e: FormEvent, data: CallbackData) => void;
  onReset?: (e: FormEvent) => void;
}

const Form: FC<FormProps> = (props) => {
  const {
    method = 'POST',
    action,
    className,
    children,
    validationSchemaUrl,
    disabled,
    triggerChangeKey,
    serverErrors = [],
    transformDataBeforeSubmit,
    onBeforeSubmit,
    onSubmit,
    onChange,
    onResponse,
    onError,
    onReset,
    ...restProps
  } = props;
  const ref = useRef<HTMLFormElement>();
  const [ajv, setAjv] = useState<Ajv>();
  const [schema, setSchema] = useState<any>();
  const [errors, setErrors] = useState<any[]>([]);

  const fields: any = {};
  let countShowedErrors = 0;

  const getMetaData = useCallback(() => {
    const metas = document.head.getElementsByTagName('meta');
    const result: any = {};

    for (let i = 0; i < metas.length; i += 1) {
      const meta = metas[i];
      const name = meta.getAttribute('name');
      const content = meta.getAttribute('content');

      result[name] = content;
    }

    return result;
  }, []);

  const getFormValues = useCallback(
    (target: HTMLFormElement) => {
      let body = new FormData(target);
      let data: any = {};

      // Собираем данные в объект
      body.forEach((value, key) => {
        if (isFile(value)) {
          if (!data[key]) {
            data[key] = [];
          }

          data[key].push(value);
        } else {
          data[key] = String(value).trim();
        }
      });

      // Трансформируем данные перед отправкой
      if (transformDataBeforeSubmit) {
        data = transformDataBeforeSubmit(data);

        body = new FormData();

        Object.entries(data).forEach(([key, values]) => {
          if (Array.isArray(values)) {
            values.map((value) => body.append(key, value));
          } else {
            body.append(key, values as any);
          }
        });
      }

      return { body, data };
    },
    [transformDataBeforeSubmit],
  );

  const handleChange = useCallback(
    (e?: FormEvent) => {
      const { data } = getFormValues(ref.current);

      if (onChange) {
        onChange(e, data);
      }
    },
    [getFormValues, onChange, ref],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (disabled) {
        return;
      }

      const { body, data } = getFormValues(e.target);

      // Валидируем
      if (schema && ajv) {
        const isValid = ajv.validate(schema, data);
        setErrors(() => {
          return (ajv.errors || []).map((ajvError) => {
            const isDot = ajvError.dataPath.charAt(0) === '.';
            const name = isDot ? ajvError.dataPath.slice(1) : ajvError.dataPath.slice(2, -2);
            const property = schema.properties[name];
            const messages = property ? property.messages || {} : {};
            const message = messages[ajvError.keyword];

            return {
              name,
              message,
              hidden: false,
            };
          });
        });

        if (!isValid) {
          console.log('Form validation errors', ajv.errors);
          return;
        }
      }

      const canSubmit = onBeforeSubmit ? onBeforeSubmit(e, data) : true;
      if (!canSubmit) return;
      if (onSubmit) {
        onSubmit(e, data);
      }

      const meta = getMetaData();
      const csrf = meta['csrf-token'];
      const headers: any = {
        credentials: 'include',
        'x-requested-with': 'XMLHttpRequest',
      };

      // Добавляем csrf-токен
      if (csrf) {
        body.append('_csrf', csrf);
        headers['x-csrf-token'] = csrf;
      }

      try {
        const opts: RequestInit = {
          method,
          headers,
          body,
        };
        const response = await (await fetch(action, opts)).json();

        if (onResponse) {
          onResponse(response, data);
        }
      } catch (err) {
        console.error(err);

        if (onError) {
          onError(err, data);
        }
      }
    },
    [
      action,
      ajv,
      disabled,
      getFormValues,
      getMetaData,
      method,
      onBeforeSubmit,
      onError,
      onResponse,
      onSubmit,
      schema,
    ],
  );

  const handleClickControl = useCallback((_e, { name }) => {
    setErrors((prevErrors) => {
      return prevErrors.map((error) => ({
        ...error,
        hidden: error.hidden ? error.hidden : error.name === name,
      }));
    });
  }, []);

  const reset = useCallback((htmlElement) => {
    for (let i = 0; i < htmlElement.children.length; i += 1) {
      const child = htmlElement.children[i];
      const isInputFile = child.tagName === 'INPUT' && child.getAttribute('type') === 'file';

      if (isInputFile) {
        child.dispatchEvent(new CustomEvent('onCustomReset'));
      }

      reset(child);
    }
  }, []);

  const handleReset = useCallback(
    (e) => {
      ref.current.reset();
      reset(ref.current);

      if (onReset) {
        onReset(e);
      }
    },
    [onReset, ref, reset],
  );

  // Рекурсивно находим все поля формы и ошибки к ним
  const findFields = useCallback(
    (_children) => {
      Children.forEach(_children, (_child) => {
        if (!_child || !_child.props) {
          return null;
        }

        const { name } = _child.props;
        if (name) {
          const error = errors.find((e) => e.name === name);

          if (error) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            countShowedErrors += 1;
          }

          fields[name] = cloneElement(_child, {
            ..._child.props,
            error: countShowedErrors < 2 && error && !error.hidden ? error.message : null,
            onClick: (e: MouseEvent) => handleClickControl(e, { name }),
          });
        }

        if (_child.props.children) {
          return findFields(_child.props.children);
        }

        return null;
      });
    },
    [fields],
  );
  findFields(children);

  const renderChild: any = useCallback(
    (_child: any) => {
      if (!_child || !_child.props) {
        return _child;
      }

      if (_child.props.name) {
        return fields[_child.props.name];
      }

      if (_child.props.children) {
        return cloneElement(
          _child,
          _child.props,
          Children.map(_child.props.children, (_c) => renderChild(_c)),
        );
      }

      return _child;
    },
    [fields],
  );

  // Загружаем библиотеку для проверки схемы валидации
  useEffect(() => {
    async function loadAjv() {
      const AjvLib = (await import('ajv')).default;

      setAjv(new AjvLib({ allErrors: true }));
    }

    loadAjv();
  }, []);

  // Загружаем схему валидации с сервера
  useEffect(() => {
    if (!validationSchemaUrl) {
      return;
    }

    fetch(validationSchemaUrl)
      .then((res) => res.json())
      .then((jsonSchema) => setSchema(jsonSchema));
  }, [validationSchemaUrl]);

  // TODO: стоит пересмотреть подход к работе с элементами формами и либо иметь весь стейт формы, либо делать с помощью нативных элементов
  // Принудительно тригерим событие об изменении формы
  useEffect(() => {
    if (!triggerChangeKey) return;

    handleChange();
  }, [handleChange, triggerChangeKey]);

  // Обновляем внутрений массив ошибок при изменении серверных ошибок
  useEffect(() => {
    if (!serverErrors.length) return;

    setErrors((prevErrors) => {
      const clientErrors = prevErrors.filter((error) => !error.isServer);
      const newErrors = [...clientErrors];

      (serverErrors || []).forEach((serverError) => {
        newErrors.push({
          isServer: true,
          hidden: false,
          ...serverError,
        });
      });

      return newErrors;
    });
  }, [serverErrors]);

  return (
    <form
      {...restProps}
      ref={ref}
      method={method}
      action={action}
      onSubmit={handleSubmit}
      onReset={handleReset}
      onChange={handleChange}
    >
      {Children.map(children, (child) => renderChild(child))}
    </form>
  );
};

export default memo(Form);
