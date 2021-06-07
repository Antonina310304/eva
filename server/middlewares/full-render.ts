import { render, renderPage } from '../helpers';

export default (req, res) => {
  const { page, body } = req.body;

  const resources = render({ page, body });
  const html = renderPage({ resources, body });

  res.send(html);
};
