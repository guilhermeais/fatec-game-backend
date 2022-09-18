import firebase from 'firebase/compat/app'

import 'firebase/compat/database'

import { env } from '../../main/config/env';

const firebaseConfig = {
  apiKey: env.firebaseApiKey,
  authDomain: env.firebaseAuthDomain,
  databaseURL: env.firebaseDatabaseURL,
  projectId: env.firebaseProjectId,
  storageBucket: env.firebaseStorageBucket,
  messagingSenderId: env.firebaseMessagingSenderId,
  appId: env.firebaseAppId,
}

firebase.initializeApp(firebaseConfig)
const database = firebase.database()

export { database, firebase }
