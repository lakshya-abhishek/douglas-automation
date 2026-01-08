export const config = {
  baseURL: process.env.BASE_URL || 'https://www.douglas.de',
  locale: process.env.LOCALE || 'de',
  timeout: {
    default: 30000,
    navigation: 60000,
    element: 5000
  },
  retries: {
    flaky: 2
  },
  screenshots: {
    onFailure: true
  }
};

export const getFullURL = () => {
  return `${config.baseURL}/${config.locale}`;
};