/* eslint-disable no-console */
import express from 'express';
import fetch from 'cross-fetch';
import dotenv from 'dotenv';

import render from '../helpers/render';
import renderPage from '../helpers/renderPage';

dotenv.config();

const backend = process.env.BACKEND_ORIGIN;
const router = express.Router();

// Monitoring availability
router.get('/health', (_req, res) => {
  res.header('Content-type', 'text/plain; charset=utf-8').send('React render is running');
});

// Render all pages
router.get('*', async (req, res) => {
  const { originalUrl } = req;
  const url = `${backend}${originalUrl}`;
  const headers = {
    Development: 'yes',
  };

  try {
    const response = await (await fetch(url, { headers })).json();

    const resources = render({ ...response });
    const html = renderPage({ resources, body: response.body });

    res.send(html);
  } catch (err) {
    console.log(`Error on rendering URL ${originalUrl}`);
    console.log(err);

    res.status(502).send();
  }
});

export default router;
