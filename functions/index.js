const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.welcomeEmail = functions.firestore
// eslint-disable-next-line indent
  .document("alphaUsers/{email}")
// eslint-disable-next-line indent
  .onCreate((snap, context) => {
      const email = context.params.email;
      functions.logger.info(email);
      db
          .collection("mail")
          .add({
            to: email,
            message: {
              subject: "Hello from Firebase!",
              text: "This is the plaintext section of the email body.",
              html: "This is the <code>HTML</code> section of the email body.",
            },
          })
          .then(() => functions.logger.info("Queued email for delivery!"));
    });
