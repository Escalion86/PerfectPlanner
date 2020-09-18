import React from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import THEME from "../theme"
import { weeks, months } from "../const"
import { CheckBox } from "react-native-elements"
import MonthTabs from "../components/MonthTabs"
import BurgerButton from "../components/BurgerButton"

function UpperCaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const { colors } = THEME.lightPinkTheme

const MonthScreen = ({ navigation, route }) => {
  const { year, month } = route.params
  const title = UpperCaseFirst(months.ru.full[month]) + " " + year

  navigation.setOptions({
    title: 2020,
    // headerStyle: {
    //   backgroundColor: THEME.lightPinkTheme.headerBackground,
    // },
    // headerTintColor: "#fff",
    // headerTitleStyle: {
    //   fontWeight: "bold",
    //   color: THEME.lightPinkTheme.headerFont,
    // },
    // headerRight: () => (
    //   <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    //     <Item
    //       title="Edit Event"
    //       iconName="md-create"
    //       onPress={() => {
    //         console.log(event)
    //         alert(`Событие ${event.auditory}, ${event.event}`)
    //       }}
    //       // onPress={() => navigation.navigate("Create")}
    //     />
    //   </HeaderButtons>
    // ),
  })

  const WeekButton = ({ weekNum }) => (
    <TouchableOpacity style={styles.weekbutton}>
      <Text style={styles.weekbuttontext}>{weekNum}</Text>
    </TouchableOpacity>
  )

  // const TabList = weeks.ru.short.map((week, index) => (
  //   <WeeksTab key={index} week={week.toUpperCase()} />
  // ))

  const WeekList = [1, 2, 3, 4, 5].map((weekNum, index) => (
    <WeekButton key={index} weekNum={weekNum} />
  ))

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <BurgerButton navigation={navigation} />
        <MonthTabs
          navigation={navigation}
          year={year}
          style={{ maxWidth: 500 }}
          activeMonth={month}
        />
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.tasks}>
            <Text style={styles.title}>Задачи на {title}</Text>
            <ScrollView>
              <CheckBox
                title="Задача 1"
                checked={false}
                textStyle={{ fontSize: 20 }}
              />
              <CheckBox
                title="Задача 2"
                checked={false}
                textStyle={{ fontSize: 20 }}
              />
              <CheckBox
                title="Задача 3"
                checked={false}
                textStyle={{ fontSize: 20 }}
              />
              <CheckBox
                title="Задача 4"
                checked={false}
                textStyle={{ fontSize: 20 }}
              />
              <CheckBox
                title="Задача 5"
                checked={false}
                textStyle={{ fontSize: 20 }}
              />
              <CheckBox
                title="Задача 6"
                checked={false}
                textStyle={{ fontSize: 20 }}
              />
              <CheckBox
                title="Задача 7"
                checked={false}
                textStyle={{ fontSize: 20 }}
              />
              <CheckBox
                title="Задача 8"
                checked={false}
                textStyle={{ fontSize: 20 }}
              />
              <CheckBox
                title="Задача 9"
                checked={false}
                textStyle={{ fontSize: 20 }}
              />
              <CheckBox
                title="Задача 10"
                checked={false}
                textStyle={{ fontSize: 20 }}
              />
              <CheckBox
                title="Задача 11"
                checked={false}
                textStyle={{ fontSize: 20 }}
              />
              <CheckBox
                title="Задача 12"
                checked={false}
                textStyle={{ fontSize: 20 }}
              />
              <CheckBox
                title="Задача 13"
                checked={false}
                textStyle={{ fontSize: 20 }}
              />
              <CheckBox
                title="Задача 14"
                checked={false}
                textStyle={{ fontSize: 20 }}
              />
              <CheckBox
                title="Задача 15"
                checked={false}
                textStyle={{ fontSize: 20 }}
              />
            </ScrollView>
          </View>
          <View style={{ flex: 1, marginLeft: 20 }}>
            <View style={styles.panel}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.weekslist}>
                  <Text style={styles.title}>
                    {UpperCaseFirst(weeks.ru.name.many)}
                  </Text>
                  {WeekList}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default MonthScreen

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    marginTop: 30,
  },
  container: {
    padding: 5,
    flex: 1,
  },
  content: {
    flexDirection: "row",
    flex: 1,
    // borderColor: "red",
    // borderWidth: 2,
  },
  weekslist: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 50,
    alignItems: "center",
  },
  tasks: {
    flex: 1,
  },
  panel: {
    maxHeight: 50,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  weekbutton: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: 6,
    backgroundColor: colors.button,
  },
  weekbuttontext: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  weektext: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "bold",
  },

  monthtablist: {
    // flex: 1,
    flexDirection: "row",
    maxHeight: 50,
  },
  monthtab: {
    borderColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 28,
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
})
