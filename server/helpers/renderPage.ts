export default ({ resources, body }): string => {
  const title = body?.data?.title || '';

  return `
    <!doctype html>
    <html lang="ru">
      <head>
        ${title && `<title>${title}</title>`}
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
        ${resources.linkTags}
        ${resources.styleTags}
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="/react/static/favicon.ico" type="image/x-icon">
      </head>

      <body>
        ${resources.html}
        ${resources.scriptTags}
      </body>
    </html>
  `;
};
