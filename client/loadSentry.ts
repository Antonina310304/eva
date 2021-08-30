export default async (config: Window['__CONFIG__']): Promise<void> => {
  try {
    const Sentry = await import('@sentry/browser');

    Sentry.init(config.sentry);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error when load Sentry SDK', err);
  }
};
