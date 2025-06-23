// frontend/app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'Sidekick',
    slug: 'sidekick',
    version: '1.0.0',
    extra: {
      API_URL: process.env.API_URL,
    },
  },
};
