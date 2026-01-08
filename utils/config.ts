export const config = {
  baseURL: process.env.BASE_URL || 'https://www.douglas.de',
  locale: process.env.LOCALE || 'de',
  timeout: {
    default: parseInt(process.env.DEFAULT_TIMEOUT || '30000'),
    navigation: 60000,
    element: parseInt(process.env.ELEMENT_TIMEOUT || '5000')
  },
  retries: {
    flaky: parseInt(process.env.RETRIES || '1')
  },
  screenshots: {
    onFailure: true
  },
  headless: process.env.HEADLESS !== 'false',
  workers: parseInt(process.env.WORKERS || '3')
};

export const getFullURL = () => {
  return `${config.baseURL}/${config.locale}`;
};