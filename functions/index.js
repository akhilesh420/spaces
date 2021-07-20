/* eslint-disable max-len */
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
      const firstName = snap.data().firstName;
      if (!firstName) return functions.logger.info("Name doesn't exists.");

      db
          .collection("mail")
          .add({
            to: email,
            template: {
              name: "welcome",
              data: {
                firstName: firstName,
              },
            },
          })
          .then(() => functions.logger.info("Queued email for delivery!"));
    });
