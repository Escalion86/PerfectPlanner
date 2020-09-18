import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import THEME from "../theme"
const { colors } = THEME.lightPinkTheme
import { LinearGradient } from "expo-linear-gradient"

const RoundButton = ({ title, onPress, gradientPoint = 0, inverse = true }) => {
  let firstColor = colors.button,
    secondColor = colors.button
  if (gradientPoint) {
    inverse ? (secondColor = colors.disabled) : (firstColor = colors.disabled)
  }

  return (
    // <TouchableOpacity style={styles.button} onPress={onPress}>
    <LinearGradient
      colors={[firstColor, secondColor]}
      start={{ x: gradientPoint, y: 0.1 }}
      end={{ x: gradientPoint + 0.01, y: 0.1 }}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttontext}>{title}</Text>
    </LinearGradient>
    // </TouchableOpacity>
  )
}

export default RoundButton

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: 6,
    // backgroundColor: colors.button,
  },
  buttontext: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
})
