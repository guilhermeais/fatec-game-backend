import firebase from 'firebase/compat/app'

import 'firebase/compat/database'
import firebaseTestHelpers from '../../../tests/helpers/firebase-test-helpers'

import { env } from '../../main/config/env'

const firebaseConfig = {
  apiKey: env.firebaseApiKey,
  authDomain: env.firebaseAuthDomain,
  databaseURL: env.firebaseDatabaseURL,
  projectId: env.firebaseProjectId,
  storageBucket: env.firebaseStorageBucket,
  messagingSenderId: env.firebaseMessagingSenderId,
  appId: env.firebaseAppId,
}
let database = null
if (process.env.NODE_ENV === 'testing') {
  firebaseTestHelpers.connect().then(data => {
    database = data.authenticatedContext('testing_user').database()
  })
} else {
  firebase.initializeApp(firebaseConfig)
  database = firebase.database()
}

export { database, firebase }
