import admin from "../config/firebaseAdmin/firebaseAdmin";

export const sendNotification = async (
  target: string, // FCM token or topic
  title: string,
  body: string,
  data?: { [key: string]: string } // Optional custom data
): Promise<void> => {
  const message: admin.messaging.Message = {
    notification: {
      title,
      body,
    },
    ...(target.includes(":")
      ? { token: target } // Send to specific device
      : { topic: target }), // Send to topic
    data, // Custom data (optional)
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Notification sent successfully:", response);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
