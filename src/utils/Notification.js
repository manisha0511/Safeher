export const requestNotificationPermission =
  async () => {

    if (!("Notification" in window)) {

      alert(
        "Browser does not support notifications"
      );

      return;
    }

    const permission =
      await Notification.requestPermission();

    if (permission === "granted") {

      console.log(
        "Notification Permission Granted"
      );

    }
  };

export const showNotification = (
  title,
  body
) => {

  if (
    Notification.permission === "granted"
  ) {

    new Notification(title, {
      body: body,
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
    });

  }

};