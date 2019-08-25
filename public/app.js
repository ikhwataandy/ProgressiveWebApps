var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dydPEyXJoe4:APA91bFhfAI45hHZPzmTGka4tyczO6Of_1eIoYzlwvX1U99tSFGikSlAKz_oIZsyc0-LyWrba1miUTqGX38Reb78Af1Hw3mN2agxNZ3UbA5ItPKm6f22VvKUayoF9s4UXYVdf4nsKHPW",
    "keys": {
        "p256dh": "BOZtP+Kq3zSfk5EdXNIDJwHJWE+Tz4ksLKwkHPCMtgucS/LIF3DaVWvLjI65IZ9xk8fDFz/O0MUmkdFIchUUpGw=",
        "auth": "rWRzRb6OZdpV9L1U0aB57Q=="
    }
};
var payload = 'Here is a payload!';
var options = {
    gcmAPIKey: 'AIzaSyBrs0PiYAVHEIgzXVgoesn2jQ5N0rhyaF4',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);