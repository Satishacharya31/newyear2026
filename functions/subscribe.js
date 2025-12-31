
import webpush from 'web-push';

export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const subscription = await request.json();

        if (!subscription || !subscription.endpoint) {
            return new Response(JSON.stringify({ error: 'Invalid subscription' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Prepare VAPID details (best practice: use env vars)
        // Fallback to hardcoded for immediate ease if env vars missing (NOT RECOMMENDED for production security, but keeps it working like server.js)
        const publicVapidKey = env.PUBLIC_VAPID_KEY || 'BIUrM4ZOLaH53-6tyHX3B4JNgprFbuSoGXq50Q1okIj-DgoNro2mBJTwNhd_khGS5oyuvEtHnLh5D1DWLv8XSmM';
        const privateVapidKey = env.PRIVATE_VAPID_KEY || '9f5lxiLWohNeYWX9axRkd-qhZ_vUMDgrdkQxCIvgMZI';
        const mailto = env.MAILTO || 'mailto:test@test.com';

        webpush.setVapidDetails(mailto, publicVapidKey, privateVapidKey);

        // Save to KV
        // Using endpoint as key to ensure uniqueness
        // We assume a KV namespace bound as 'SUBSCRIPTIONS'
        if (env.SUBSCRIPTIONS) {
            await env.SUBSCRIPTIONS.put(subscription.endpoint, JSON.stringify(subscription));
            return new Response(JSON.stringify({ message: 'Subscribed successfully' }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            // Fallback or Error if KV not configured
            console.error("KV 'SUBSCRIPTIONS' not configured");
            return new Response(JSON.stringify({ error: 'Server misconfigured (KV missing)' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
