const serviceWorker = navigator.serviceWorker
if (serviceWorker) {
  serviceWorker.register('subServiceWorker.js')
               .then((registration) => {
                 // 登记成功
                 console.log('ServiceWorker登记成功，范围为', registration.scope);
               })
               .catch((err) => {
                 // 登记失败
                 console.log('ServiceWorker登记失败：', err);
               });
}