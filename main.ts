import express from "express";
const app = express();
import webPush from "web-push";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
//   console.log(
//     "You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY " +
//       "environment variables. You can use the following ones:"
//   );
//   console.log(webPush.generateVAPIDKeys());
//   return;
// }

webPush.setVapidDetails(
  "mailto:julienvaillantei.tech",
  process.env.VAPID_PUBLIC_KEY ?? "",
  process.env.VAPID_PRIVATE_KEY ?? ""
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());

const subscriptions = [] as PushSubscription[];

app.get("/vapidPublicKey", function (_req, res) {
  res.send(process.env.VAPID_PUBLIC_KEY);
});

app.post("/subscribe", (req, res) => {
  const subscription = req.body;

  subscriptions.push(subscription);

  console.log(subscription);

  // Sauvegardez `subscription` dans votre base de données pour un usage ultérieur

  res.status(201).json({ message: "Abonnement reçu avec succès." });
});

app.get("/push", async (req, res) => {
  const notificationPayload = JSON.stringify({
    title: "Notification de Test",
    body: "Ceci est un test de notification!",
  });

  const promises = subscriptions.map((subscription) => {
    return (
      webPush
        //@ts-ignore
        .sendNotification(subscription, notificationPayload)
        .catch((error: Error) => {
          console.error("Erreur d'envoi de notification:", error);
          // Vous pouvez gérer l'abonnement en fonction de l'erreur
        })
    );
  });

  Promise.all(promises)
    .then(() => res.status(200).json({ success: true }))
    .catch(() =>
      res.status(500).json({ error: "Erreur d'envoi de notifications" })
    );
});

app.listen(3001, () => {
  console.log("listen on port 3001");
});
