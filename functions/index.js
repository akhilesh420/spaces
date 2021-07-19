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
      const name = snap.data().name;
      if (!name) return functions.logger.info("Name doesn't exists.");

      db
          .collection("mail")
          .add({
            to: email,
            message: {
              subject: "Hey, "+ name +", thank you for signing up!",
              text: "Hey " + name +`,

              It's Ishaan. I just wanted to say thank you for signing up for early access to Postpress. It means the world to us.

              While we wait for the alpha of Postpress to be released, please follow us on our Instagram. We post profiles of artists who’ve affiliated with us and write pieces on their art. We aim to showcase their work and promote it through paid advertisement campaigns.

              We would love to affiliate with you too, if you’re interested, you can reply to this email and we can take it from there.

              Best Wishes,
              Ishaan Kapoor
              Postpress | Co-Founder`,
              html: `<code><p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;">
              <span style="background-color: transparent; font-family: Arial; font-size: 10pt; white-space: pre-wrap; color: rgb(0, 0, 0); caret-color: rgb(0, 0, 0);">Hey ` + name +`,</span></p>
            <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;">
              <span id="docs-internal-guid-3ed903b0-7fff-c86f-2d51-662589f296ed" style="caret-color: rgb(0, 0, 0); color: rgb(0, 0, 0); text-size-adjust: auto;">&nbsp;</span></p>
            <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;">
              <span id="docs-internal-guid-3ed903b0-7fff-c86f-2d51-662589f296ed" style="caret-color: rgb(0, 0, 0); color: rgb(0, 0, 0); text-size-adjust: auto;"><span style="font-size: 10pt; font-family: Arial; background-color: transparent; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;">It&#39;s Ishaan. I just wanted to say thank you for signing up for early access to Postpress. It means the world to us.&nbsp;</span></span></p>
            <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;">
              <span id="docs-internal-guid-3ed903b0-7fff-c86f-2d51-662589f296ed" style="caret-color: rgb(0, 0, 0); color: rgb(0, 0, 0); text-size-adjust: auto;">&nbsp;</span></p>
            <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;">
              <span id="docs-internal-guid-3ed903b0-7fff-c86f-2d51-662589f296ed" style="caret-color: rgb(0, 0, 0); color: rgb(0, 0, 0); text-size-adjust: auto;"><span style="font-size: 10pt; font-family: Arial; background-color: transparent; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;">While we wait for the alpha of Postpress to be released, please follow us on our <a href="https://www.instagram.com/postpress.io/">Instagram.</a> We post profiles of artists who&rsquo;ve affiliated with us and write pieces on their art. We aim to showcase their work and promote it through paid advertisement campaigns.&nbsp;</span></span></p>
            <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;">
              <span id="docs-internal-guid-3ed903b0-7fff-c86f-2d51-662589f296ed" style="caret-color: rgb(0, 0, 0); color: rgb(0, 0, 0); text-size-adjust: auto;">&nbsp;</span></p>
            <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;">
              <span id="docs-internal-guid-3ed903b0-7fff-c86f-2d51-662589f296ed" style="caret-color: rgb(0, 0, 0); color: rgb(0, 0, 0); text-size-adjust: auto;"><span style="font-size: 10pt; font-family: Arial; background-color: transparent; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;">We would love to affiliate with you too, if you&rsquo;re interested, you can reply to this email and we can take it from there.</span></span></p>
            <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;">
              <span id="docs-internal-guid-3ed903b0-7fff-c86f-2d51-662589f296ed" style="caret-color: rgb(0, 0, 0); color: rgb(0, 0, 0); text-size-adjust: auto;">&nbsp;</span></p>
            <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;">
              <span id="docs-internal-guid-3ed903b0-7fff-c86f-2d51-662589f296ed" style="caret-color: rgb(0, 0, 0); color: rgb(0, 0, 0); text-size-adjust: auto;"><span style="font-size: 10pt; font-family: Arial; background-color: transparent; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;">Best Wishes,</span></span></p>
            <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;">
              <span id="docs-internal-guid-3ed903b0-7fff-c86f-2d51-662589f296ed" style="caret-color: rgb(0, 0, 0); color: rgb(0, 0, 0); text-size-adjust: auto;"><span style="font-size: 10pt; font-family: Arial; background-color: transparent; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;">Ishaan Kapoor</span></span></p>
            <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;">
              <span id="docs-internal-guid-3ed903b0-7fff-c86f-2d51-662589f296ed" style="caret-color: rgb(0, 0, 0); color: rgb(0, 0, 0); text-size-adjust: auto;"><span style="font-size: 10pt; font-family: Arial; background-color: transparent; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;">Postpress | Co-Founder&nbsp;</span></span></p>
            <div>
              &nbsp;</div></code>`,
            },
          })
          .then(() => functions.logger.info("Queued email for delivery!"));
    });
