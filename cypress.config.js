import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.API_BASE_URL = process.env.VITE_API_BASE_URL;
      return config;
    },
  },
});
