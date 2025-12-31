console.log('Service Worker Loaded...');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push Received...');
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon // e.g. /ogimage.gif
    });
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});
