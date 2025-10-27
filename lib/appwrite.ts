import { Client, Account, Databases, Storage, Functions } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

export { client };

// Database and collection IDs
export const DATABASE_ID = 'codai-main';
export const COLLECTIONS = {
  USERS: 'users',
  DOWNLOADS: 'downloads',
  ANALYTICS: 'analytics',
  FEEDBACK: 'feedback',
} as const;