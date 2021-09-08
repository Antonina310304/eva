export default (bankCardParams: any): void => {
  const form = document.createElement('form');

  form.setAttribute('action', bankCardParams.url);
  form.setAttribute('method', bankCardParams.form_method || 'POST');

  if (bankCardParams.params) {
    Object.entries(bankCardParams.params).forEach(([key, val]) => {
      const input = document.createElement('input');

      input.setAttribute('type', 'hidden');
      input.setAttribute('name', key);
      input.setAttribute('value', val as string);

      form.appendChild(input);
    });
  }

  document.body.appendChild(form);

  form.submit();
};
