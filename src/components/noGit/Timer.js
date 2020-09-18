import React from "react"
import { StyleSheet, Text, View, Button, Platform } from "react-native"
import { Notifications } from "expo"
import * as Permissions from "expo-permissions"

export default class Timer extends React.Component {
  doNotification() {
    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("chat-messages", {
        name: "Messages",
        priority: "max",
        sound: true,
        vibrate: [0, 250, 500, 250],
      })
      Notifications.presentLocalNotificationAsync({
        title: "New Message",
        body: "Message!!!!",
        android: {
          priority: "max",
          vibrate: [0, 250, 250, 250],
          color: "#AA00AA",
          channelId: "chat-messages",
        },
      })
    }
  }

  askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    )
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }
    if (finalStatus !== "granted") {
      return false
    }
    return true
  }

  sendNotificationImmediately = async () => {
    let notificationId = await Notifications.presentLocalNotificationAsync({
      title: "test",
      body: "test", // (string) — body text of the notification.
      ios: {
        // (optional) (object) — notification configuration specific to iOS.
        sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
      },
      // (optional) (object) — notification configuration specific to Android.
      android: {
        sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
        //icon (optional) (string) — URL of icon to display in notification drawer.
        icon: "./assets/ic_stat_ac_unit.png",
        //color (optional) (string) — color of the notification icon in notification drawer.
        color: "#AA00AA",
        priority: "max", // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
        sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
        vibrate: true, // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
        // link (optional) (string) — external link to open when notification is selected.
      },
    })
    console.log(notificationId) // can be saved in AsyncStorage or send to server
  }

  scheduleNotification = async () => {
    let notificationId = Notifications.scheduleLocalNotificationAsync(
      {
        title: "I'm Scheduled",
        body: "Wow, I can show up even when app is closed",
        android: {
          sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
          //icon (optional) (string) — URL of icon to display in notification drawer.
          icon: "./assets/ic_stat_ac_unit.png",
          //color (optional) (string) — color of the notification icon in notification drawer.
          color: "#AA00AA",
          priority: "high", // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
          sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
          vibrate: true, // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
          // link (optional) (string) — external link to open when notification is selected.
        },
      },
      {
        // repeat: "minute",
        time: new Date().getTime() + 6000,
      }
    )
    console.log(notificationId)
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Please accept Notifications Permissions"
          onPress={() => this.askPermissions()}
        />
        <Button
          title="Send Notification immediately"
          onPress={() => this.sendNotificationImmediately()}
        />
        <Button
          title="Dismiss All Notifications"
          onPress={() => Notifications.dismissAllNotificationsAsync()}
        />
        <Button
          title={"Schedule Notification"}
          onPress={() => this.scheduleNotification()}
        />
        <Button
          title="Cancel Scheduled Notifications"
          onPress={() => Notifications.cancelAllScheduledNotificationsAsync()}
        />
        <Button
          title={"Do Notification"}
          onPress={() => this.doNotification()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
