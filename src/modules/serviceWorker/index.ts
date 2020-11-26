export const register = (): void => {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in window.navigator) {
    window.addEventListener('load', () => {
      window.navigator.serviceWorker.register('/service-worker.js').catch((error) => {
        // eslint-disable-next-line no-console
        console.log('SW registration failed: ', error);
      });
    });
  }
};
