
import 'dotenv/config';

import { createHotUpdater } from '@hot-updater/server';
import { drizzleAdapter } from '@hot-updater/server/adapters/drizzle';
import { apiKeys, insights } from '@hot-updater/server/plugins';

import { db } from './drizzle';
import { localStorage } from './localStorage';

export const hotUpdater = createHotUpdater({
  database: drizzleAdapter({
    db,
    provider: 'postgresql',
  }),

  storage: localStorage(),

  plugins: [
    insights(),
    apiKeys(),
  ],
});
