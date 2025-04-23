const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = {admin, db};
// The above code initializes a Firebase Admin SDK instance using a service account key.
// It exports the initialized admin instance and Firestore database instance for use in other parts of the application.
// The service account key should be kept secure and not exposed in public repositories.   