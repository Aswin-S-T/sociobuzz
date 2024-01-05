const admin = require("firebase-admin");
const serviceAccount = require("../config/firebase/serviceAccountKey.json");
const nodemailer = require("nodemailer");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const deviceToken =
  "cVepfFTX-AmYGtLn22ydrS:APA91bEgGmBzrDQSGke05fgPj1ji7ScyI0yI1JUIfPG_u5futRIq6T_qrdosyYcQriTVYmUgtSvJCCKVK4syGByRjfB_LSnDajie3wJ16HvEGU2Z8831CwwlQUBR1W4xUyI0y0IklInD";

module.exports = {
  sendNotification: (title, body, token = deviceToken) => {
    return new Promise(async (resolve, reject) => {
      const message = {
        notification: {
          title,
          body,
        },
        token,
      };

      admin
        .messaging()
        .send(message)
        .then(() => {
          console.log("Notification sent successfully");
          let response = {
            status: 200,
            message: message.notification,
          };
          resolve(response);
        })
        .catch((error) => {
          console.error("Error sending notification:", error);
          resolve("error");
        });
    });
  },
};

module.exports = {
  sendEmailNotification: (to, subject, message) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ROOT_EMAIL,
        pass: process.env.ROOT_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.ROOT_EMAIL,
      to,
      subject,
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  },
};
