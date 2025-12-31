
import webpush from 'web-push';

export async function onRequestPost(context) {
    try {
        const { request, env } = context;

        // Optional: Add some auth check here so not anyone can trigger it
        // const url = new URL(request.url);
        // if (url.searchParams.get('secret') !== env.TRIGGER_SECRET) { ... }

        const publicVapidKey = env.PUBLIC_VAPID_KEY || 'BIUrM4ZOLaH53-6tyHX3B4JNgprFbuSoGXq50Q1okIj-DgoNro2mBJTwNhd_khGS5oyuvEtHnLh5D1DWLv8XSmM';
        const privateVapidKey = env.PRIVATE_VAPID_KEY || '9f5lxiLWohNeYWX9axRkd-qhZ_vUMDgrdkQxCIvgMZI';
        const mailto = env.MAILTO || 'mailto:test@test.com';

        webpush.setVapidDetails(mailto, publicVapidKey, privateVapidKey);

        const payload = JSON.stringify({
            title: 'Happy New Year 2026! 🎆',
            body: 'The wait is over! Join the celebration.',
            icon: '/ogimage.gif'
        });

        if (!env.SUBSCRIPTIONS) {
            return new Response(JSON.stringify({ error: 'KV not configured' }), { status: 500 });
        }

        // List all keys from KV
        // Note: list() returns a paginated list. If > 1000 keys, loop is needed.
        // For now, implementing simple list.
        const list = await env.SUBSCRIPTIONS.list();
        const keys = list.keys;

        const results = await Promise.all(keys.map(async (key) => {
            try {
                const subData = await env.SUBSCRIPTIONS.get(key.name);
                if (!subData) return { status: 'skipped', endpoint: key.name };

                const subscription = JSON.parse(subData);
                await webpush.sendNotification(subscription, payload);
                return { status: 'sent', endpoint: subscription.endpoint };
            } catch (error) {
                console.error('Error sending to', key.name, error);
                if (error.statusCode === 410 || error.statusCode === 404) {
                    // Subscription expired/gone, remove from KV
                    await env.SUBSCRIPTIONS.delete(key.name);
                    return { status: 'deleted', endpoint: key.name };
                }
                return { status: 'failed', error: error.message };
            }
        }));

        return new Response(JSON.stringify({ message: 'Process completed', results }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
