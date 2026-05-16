import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import bizSdk from 'facebook-nodejs-business-sdk';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
const PIXEL_ID = process.env.FB_PIXEL_ID;

const api = bizSdk.FacebookAdsApi.init(ACCESS_TOKEN || '');
const Content = bizSdk.Content;
const CustomEvent = bizSdk.CustomEvent;
const DeliveryCategory = bizSdk.DeliveryCategory;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Facebook Conversions API
  app.post('/api/fb-track', (req, res) => {
    const { eventName, eventSourceUrl, userData, customData } = req.body;

    if (!ACCESS_TOKEN || !PIXEL_ID) {
      console.warn('Facebook CAPI: Missing Access Token or Pixel ID. Skipping event.');
      return res.status(200).json({ status: 'skipped', reason: 'missing_config' });
    }

    try {
      const currentTimestamp = Math.floor(new Date().getTime() / 1000);

      const user = new UserData()
        .setEmail(userData?.email)
        .setClientIpAddress(req.ip)
        .setClientUserAgent(req.headers['user-agent']);

      const serverEvent = new ServerEvent()
        .setEventName(eventName)
        .setEventTime(currentTimestamp)
        .setUserData(user)
        .setEventSourceUrl(eventSourceUrl)
        .setActionSource('website');

      if (customData) {
        serverEvent.setCustomData(customData);
      }

      const eventsData = [serverEvent];
      const eventRequest = new EventRequest(ACCESS_TOKEN, PIXEL_ID)
        .setEvents(eventsData);

      eventRequest.execute().then(
        response => {
          console.log('Facebook CAPI Success:', response);
          res.json({ status: 'success', response });
        },
        err => {
          console.error('Facebook CAPI Error:', err);
          res.status(500).json({ status: 'error', error: err });
        }
      );
    } catch (error) {
      console.error('Facebook CAPI Setup Error:', error);
      res.status(500).json({ status: 'error', error: String(error) });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
