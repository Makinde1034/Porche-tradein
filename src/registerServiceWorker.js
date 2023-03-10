function invokeServiceWorkerUpdateFlow(registration) {
  const notification = confirm(
    'New version of the app is available. Refresh now?'
  );
  if (notification) {
    if (registration.waiting) {
      // let waiting Service Worker know it should became active
      registration.waiting.postMessage('SKIP_WAITING');
    }
  }
}

export function registerServiceWorker() {
  const swPath = `${location.origin}/service-worker.js`;
  navigator.serviceWorker
    .register(swPath)
    .then((registration) => {
      console.info('ServiceWorker registered!');

      // ensure the case when the updatefound event was missed is also handled
      // by re-invoking the prompt when there's a waiting Service Worker
      if (registration.waiting) {
        invokeServiceWorkerUpdateFlow(registration);
      }

      registration.addEventListener('updatefound', () => {
        if (registration.installing) {
          // wait until the new Service worker is actually installed (ready to take over)
          registration.installing.addEventListener('statechange', () => {
            if (registration.waiting) {
              // if there's an existing controller (previous Service Worker), show the prompt
              if (navigator.serviceWorker.controller) {
                invokeServiceWorkerUpdateFlow(registration);
              } else {
                // otherwise it's the first install, nothing to do
                console.log('Service Worker initialized for the first time');
              }
            }
          });
        }
      });

      let refreshing = false;

      // detect controller change and refresh the page
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          window.location.reload();
          refreshing = true;
        }
      });
    })
    .catch((registrationError) => {
      console.log('SW registration failed: ', registrationError);
    });
}

export function unregisterServiceWorker() {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration
        ?.unregister()
        .then(() => {
          return self?.clients?.matchAll();
        })
        .then((clients) => {
          clients?.forEach((client) => {
            if (client.url && 'navigate' in client) {
              client.navigate(client.url);
            }
          });
        });
    }
  });
}

export default { registerServiceWorker, unregisterServiceWorker };
