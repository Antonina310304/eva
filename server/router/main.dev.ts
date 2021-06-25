import express from 'express';

import { render } from '../middlewares';

const router = express.Router();

// Monitoring availability
router.get('/health', (_req, res) => {
  res.header('Content-type', 'text/plain; charset=utf-8').send('Eva is running');
});

// Render all pages
router.get('*', render);

export default router;
