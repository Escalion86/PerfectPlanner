import Constants from "expo-constants"
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"
import React, { useState, useEffect, useRef } from "react"
import { Text, View, Button, Platform } from "react-native"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export default function Notification() {
  const [expoPushToken, setExpoPushToken] = useState("")
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification)
      }
    )

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response)
      }
    )

    return () => {
      Notifications.removeNotificationSubscription(notificationListener)
      Notifications.removeNotificationSubscription(responseListener)
    }
  }, [])

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text>
          Title: {notification && notification.request.content.title}{" "}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await sendPushNotification()
        }}
      />
    </View>
  )
}

async function sendPushNotification(expoPushToken) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Заголовок 📬",
      subtitle: "Подзаголовок",
      body: "Тело сообщения",
      data: { data: "Данные" },

      // Fields corresponding to NotificationContent

      // badge?: number,
      // sound: boolean | string;
      // Android-specific fields
      // See https://developer.android.com/reference/android/app/Notification.html#fields
      // for more information on specific fields.
      // vibrate?: boolean | number[];
      // priority?: AndroidNotificationPriority;
      // Format: '#AARRGGBB', '#RRGGBB' or one of the named colors,
      // see https://developer.android.com/reference/kotlin/android/graphics/Color?hl=en
      color: "#AA00AA",
      // If set to false, the notification will not be automatically dismissed when clicked.
      // The setting used when the value is not provided or is invalid is true (the notification
      // will be dismissed automatically). Corresponds directly to Android's `setAutoCancel`
      // behavior. In Firebase terms this property of a notification is called `sticky`.
      // See:
      // - https://developer.android.com/reference/android/app/Notification.Builder#setAutoCancel(boolean),
      // - https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages#AndroidNotification.FIELDS.sticky
      // autoDismiss?: boolean;
      // iOS-specific fields
      // See https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent?language=objc
      // for more information on specific fields.
      // launchImageName?: string;
      // attachments: {
      //   url: string,
      //   identifier: string,

      //   typeHint: string,
      //   hideThumbnail: boolean,
      //   thumbnailClipArea: { x: number; y: number; width: number; height: number },
      //   thumbnailTime: number,
      //   },
    },
    trigger: null,
  })
}

async function registerForPushNotificationsAsync() {
  let token
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    )
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!")
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
  } else {
    alert("Must use physical device for Push Notifications")
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      // name: string | null;
      // importance: AndroidImportance;
      // // Optional attributes
      // bypassDnd?: boolean;
      // description?: string | null;
      // groupId?: string | null;
      // lightColor?: string;
      // lockscreenVisibility?: AndroidNotificationVisibility;
      // showBadge?: boolean;
      // sound?: string | null;
      // audioAttributes?: Partial<AudioAttributes>;
      // vibrationPattern?: number[] | null;
      // enableLights?: boolean;
      // enableVibrate?: boolean;
    })
  }

  return token
}
