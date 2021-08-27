import React, {
  useCallback,
  useRef,
  useState,
  memo,
  cloneElement,
  useEffect,
  FC,
  InputHTMLAttributes,
  ReactElement,
} from 'react';
import cn from 'classnames';

import Icon12CloseBold from '@divanru/icons/dist/12/close_bold';

import declOfNum from '@Utils/declOfNum';
import styles from './Upload.module.css';

export interface EpicUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  icon?: ReactElement;
  title: string;
  description: string;
  maxCount?: number;
  view?: 'vertical';
  maxSizePerFile?: number;
  error?: string;
  onChangeError: (e: null, errorText: string) => void;
}

export type ExtendedFile = File & {
  media: string;
  src: string | ArrayBuffer;
};

function getTypeMedia(mediaType: string) {
  return mediaType.split('/')[0];
}

const EpicUpload: FC<EpicUploadProps> = (props) => {
  const {
    className,
    icon = <div className={styles.iconCamera} />,
    title,
    description,
    maxCount = 10,
    view,
    maxSizePerFile,
    error,
    insideUploadedElements,
    onChangeError,
    ...restProps
  } = props;

  const fileInput = useRef<HTMLInputElement>();
  const fileInput2 = useRef<HTMLInputElement>();
  const [files, setFiles] = useState([]);
  const [warning, setWarning] = useState<string>();
  const hasError = Boolean(error || warning);
  const declTextes = ['файл', 'файла', 'файлов'];

  const handleChange = useCallback(() => {
    const tasks = [];

    for (let index = 0; index < fileInput.current.files.length; index += 1) {
      const file = fileInput.current.files[index] as ExtendedFile;

      file.media = getTypeMedia(file.type);

      switch (file.media) {
        case 'image': {
          tasks.push(() => {
            return new Promise((resolve) => {
              const reader = new FileReader();

              reader.onload = (e) => {
                file.src = e.target.result;
                resolve(file);
              };

              reader.readAsDataURL(file);
            });
          });
          break;
        }

        case 'video': {
          file.src = URL.createObjectURL(file);

          tasks.push(() => Promise.resolve(file));
          break;
        }

        default:
      }
    }

    Promise.all(tasks.map((task) => task())).then((_files) => {
      setFiles(_files);
    });
  }, []);

  const handleAddFiles = useCallback(() => {
    const tasks = [];

    for (let index = 0; index < fileInput2.current.files.length; index += 1) {
      const file = fileInput2.current.files[index] as ExtendedFile;

      file.media = getTypeMedia(file.type);

      switch (file.media) {
        case 'image': {
          tasks.push(() => {
            return new Promise((resolve) => {
              const reader = new FileReader();

              reader.onload = (e) => {
                file.src = e.target.result;
                resolve(file);
              };

              reader.readAsDataURL(file);
            });
          });
          break;
        }

        case 'video': {
          file.src = URL.createObjectURL(file);

          tasks.push(() => Promise.resolve(file));
          break;
        }

        default:
      }
    }

    Promise.all(tasks.map((task) => task())).then((_files) => {
      setFiles((prev) => {
        const newFiles = [];
        _files.forEach((file) => {
          const finder = prev.findIndex((item) => item.name === file.name);

          if (finder < 0) {
            newFiles.push(file);
          }
        });

        return [...prev, ...newFiles];
      });
    });
  }, []);

  const handleCustomReset = useCallback(() => {
    setFiles([]);
  }, []);

  const handleRemove = useCallback((index: number) => {
    setFiles((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  }, []);

  useEffect(() => {
    setWarning(() => {
      let newError = '';

      // Проверка количества файлов
      if (files.length > maxCount) {
        const declText = declOfNum(files.length, declTextes);

        newError = `Можно загрузить не более ${maxCount} ${declText}`;
      }

      // Проверка размера файлов
      if (maxSizePerFile) {
        files.forEach((file) => {
          if (file.size > maxSizePerFile) {
            const formatedSize = (maxSizePerFile / 1024 / 1024).toFixed();
            newError = `Нельзя загружать файлы с размером более ${formatedSize}МВ`;
          }
        });
      }

      if (onChangeError) {
        onChangeError(null, newError);
      }

      return newError;
    });
  }, [declTextes, files, maxCount, maxSizePerFile, onChangeError]);

  // Подписываемся на кастомное событие очистки файлов
  useEffect(() => {
    function cleanup() {
      return fileInput.current.removeEventListener('onCustomReset', handleCustomReset);
    }

    if (fileInput.current) {
      fileInput.current.addEventListener('onCustomReset', handleCustomReset);
    }

    return cleanup;
  }, [handleCustomReset]);

  return (
    <div className={cn(styles.upload, { [styles.viewVertical]: view === 'vertical' }, [className])}>
      <div className={styles.wrapperControl}>
        {!insideUploadedElements && (
          <>
            <input
              {...restProps}
              className={styles.control}
              type='file'
              ref={fileInput}
              onChange={handleChange}
            />
            <div className={styles.button}>
              {cloneElement(icon, { className: cn(icon.props.className, styles.icon) })}
              <div className={styles.textes}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>{description}</div>
              </div>
            </div>
          </>
        )}

        {insideUploadedElements && (
          <>
            {!files.length && (
              <input
                {...restProps}
                className={styles.control}
                type='file'
                ref={fileInput}
                onChange={handleChange}
              />
            )}

            <div className={styles.button}>
              {files.length > 0 ? (
                <div className={cn(styles.list, styles.wideList, { [styles.hasError]: hasError })}>
                  {files.map((file, index) => {
                    return (
                      <div
                        className={cn(styles.listItem, styles.closingItem)}
                        key={index}
                        onClick={() => handleRemove(index)}
                      >
                        {file.media === 'image' && (
                          <img className={styles.listPreview} src={file.src} />
                        )}
                        {file.media === 'video' && (
                          <video className={styles.listPreview} src={file.src} />
                        )}
                        <div className={styles.remove} />
                        <div className={styles.blackFon} />
                        <div className={styles.fileName}>{file.name}</div>
                      </div>
                    );
                  })}

                  <div className={cn(styles.listItem, styles.closingItem)}>
                    <div className={styles.addMore}>
                      <div className={styles.iconPlus} />
                      <input
                        className={styles.addFiles}
                        type='file'
                        ref={fileInput2}
                        onChange={handleAddFiles}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                cloneElement(icon, { className: cn(icon.props.className, styles.icon) })
              )}
              <div className={styles.textes}>
                {!files.length && <div className={styles.title}>{title}</div>}
                <div className={styles.description}>{description}</div>
              </div>
            </div>
          </>
        )}
      </div>

      {!insideUploadedElements && files.length > 0 && (
        <div className={cn(styles.list, { [styles.hasError]: hasError })}>
          {files.map((file, index) => {
            return (
              <div className={styles.listItem} key={index} onClick={() => handleRemove(index)}>
                {file.media === 'image' && <img className={styles.listPreview} src={file.src} />}
                {file.media === 'video' && <video className={styles.listPreview} src={file.src} />}
                <div className={styles.die}>
                  <Icon12CloseBold className={styles.iconFileRemove} width={17} height={17} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default memo(EpicUpload);
