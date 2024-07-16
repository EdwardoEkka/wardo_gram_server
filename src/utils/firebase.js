const admin = require('firebase-admin');

const firebaseConfig=JSON.parse(process.env.FIREBASE_JSON_CRED);

let app;
if (!admin.apps.length) {
  app = admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    storageBucket: 'wardobook.appspot.com',
  });
} else {
  app = admin.app();
}

const bucket = admin.storage().bucket();

module.exports = { admin, bucket };
