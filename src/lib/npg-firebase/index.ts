import admin from 'firebase-admin';

const serviceAccount = require('../../../key/firebase-admin.cred.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();

export { auth };
