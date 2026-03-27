if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {

      // When a new Service Worker is waiting, activate it immediately
      registration.addEventListener('updatefound', () => {
        var newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New version available — tell it to take over right away
            newWorker.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      });

    });

    // When the new SW takes control, reload the page to load fresh files
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  });
} else {
  console.log('Service workers are not supported.');
}
