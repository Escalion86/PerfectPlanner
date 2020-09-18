import React from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { months } from "../const"

const MonthTabs = ({ navigation, year, activeMonth = null, style = {} }) => {
  const MonthTab = ({ monthNum, active = false }) => (
    <TouchableOpacity
      style={{ ...styles.monthtab, ...(active ? { ...styles.activetab } : {}) }}
      onPress={() =>
        navigation.navigate("Month", { year: year, month: monthNum })
      }
    >
      <Text style={styles.monthtext}>
        {months.ru.short[monthNum].toUpperCase()}
      </Text>
    </TouchableOpacity>
  )

  let TabList = months.ru.short.map((month, index) => (
    <MonthTab key={index} monthNum={index} active={index === activeMonth} />
  ))

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.monthtablist}
      >
        {TabList}
      </ScrollView>
    </View>
  )
}
export default MonthTabs

const styles = StyleSheet.create({
  monthtablist: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 50,
  },
  monthtab: {
    borderColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginLeft: 6,
    backgroundColor: "pink",
  },
  monthtext: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  activetab: {
    backgroundColor: "red",
  },
})
