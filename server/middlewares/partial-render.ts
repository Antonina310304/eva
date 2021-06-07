import { render } from '../helpers';

export default (req, res) => {
  const { page, body } = req.body;

  const resources = render({ page, body });

  res.json(resources);
};
