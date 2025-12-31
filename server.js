import express from 'express';
import webpush from 'web-push';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// VAPID Keys (Generated dynamically)
const publicVapidKey = 'BIUrM4ZOLaH53-6tyHX3B4JNgprFbuSoGXq50Q1okIj-DgoNro2mBJTwNhd_khGS5oyuvEtHnLh5D1DWLv8XSmM';
const privateVapidKey = '9f5lxiLWohNeYWX9axRkd-qhZ_vUMDgrdkQxCIvgMZI';

webpush.setVapidDetails(
    'mailto:test@test.com',
    publicVapidKey,
    privateVapidKey
);

import fs from 'fs';

// Local "Database" File
const DB_FILE = path.join(__dirname, 'subscriptions.db.json');

// Helper component to read database
const readDb = () => {
    try {
        if (!fs.existsSync(DB_FILE)) {
            return [];
        }
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Database read error:", error);
        return [];
    }
};

// Helper component to write database
const writeDb = (data) => {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Database write error:", error);
    }
};

// Subscribe Route
app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    const subscriptions = readDb();

    // Check if valid subscription object
    if (!subscription || !subscription.endpoint) {
        return res.status(400).json({ error: 'Invalid subscription' });
    }

    // Prevent duplicates
    if (!subscriptions.some(s => s.endpoint === subscription.endpoint)) {
        subscriptions.push(subscription);
        writeDb(subscriptions);
        console.log('New subscription saved to local DB. Total:', subscriptions.length);
    } else {
        console.log('Subscription already exists.');
    }

    res.status(201).json({});
});

// Load subscriptions for usage in trigger route
const getSubscriptions = () => readDb();

// Trigger Notification Route (Call this when Countdown ends in real world)
// For now, we can also trigger it manually or via a cron job
app.post('/trigger-notification', (req, res) => {
    const payload = JSON.stringify({
        title: 'Happy New Year 2026! 🎆',
        body: 'The wait is over! Join the celebration.',
        icon: '/ogimage.gif'
    });

    Promise.all(getSubscriptions().map(sub => webpush.sendNotification(sub, payload)))
        .then(() => res.status(200).json({ message: 'Notifications sent' }))
        .catch(err => {
            console.error('Error sending notification', err);
            // Even if some fail (e.g. expired subscriptions), we return success for the batch
            res.status(200).json({ message: 'Process completed', error: err.message });
        });
});

// Serve Static Files (Vite Build)
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback for SPA
// Fallback for SPA (disabled for now to fix regex issue)
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
