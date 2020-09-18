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
import RoundButton from "../components/RoundButton"
import moment from "moment"
// import "moment/locale/ru"
// moment.lang("en", { week: { dow: 6, doy: 4 } })
moment.updateLocale("en", {
  week: {
    dow: 1, // Monday is the first day of the week.
  },
})

// moment.updateLocale("ru", {
//   week: {
//     dow: 1, // First day of week is Monday
//     doy: 4, // First week of year must contain 4 January (7 + 1 - 4)
//   },
// })
moment.locale("en")
// moment.locale("ru")

function UpperCaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const { colors } = THEME.lightPinkTheme

const MonthScreen = ({ navigation, route }) => {
  const { year, month } = route.params
  const daysInMonth = moment().year(year).month(month).daysInMonth()
  const firstWeekOfMonth = moment().set({ year, month, date: 1 }).week()
  let lastWeekOfMonth = moment().set({ year, month, date: daysInMonth }).week()
  const firstDayOfWeekInMonth = moment().set({ year, month, date: 1 }).weekday()
  let lastDayOfWeekInMonth = moment()
    .set({ year, month, date: daysInMonth })
    .weekday()
  if (lastWeekOfMonth == 1) {
    lastWeekOfMonth =
      firstWeekOfMonth +
      Math.ceil((firstDayOfWeekInMonth + daysInMonth) / 7) -
      1
  }
  let weeksInMonth = Math.ceil(daysInMonth / 7)

  console.log("Дней в месяце", daysInMonth)
  console.log(
    "Первый день месяца",
    weeks.ru.full[moment().set({ year, month, date: 1 }).weekday()]
  )
  console.log("Первая неделя месяца", firstWeekOfMonth)
  console.log("Последняя неделя месяца", lastWeekOfMonth)
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

  // const TabList = weeks.ru.short.map((week, index) => (
  //   <WeeksTab key={index} week={week.toUpperCase()} />
  // ))
  let WeekList = []
  let gradientPoint = 0
  let inverse = false
  for (let i = firstWeekOfMonth; i <= lastWeekOfMonth; i++) {
    if (i == firstWeekOfMonth) {
      console.log("firstDayOfWeekInMonth", firstDayOfWeekInMonth)
      gradientPoint = firstDayOfWeekInMonth / 7
      inverse = false
    } else if (i == lastWeekOfMonth) {
      console.log("lastDayOfWeekInMonth", lastDayOfWeekInMonth)
      gradientPoint = (lastDayOfWeekInMonth + 1) / 7
      inverse = true
    } else {
      gradientPoint = 0
      inverse = false
    }
    WeekList.push(
      <RoundButton
        key={i}
        title={i}
        gradientPoint={gradientPoint}
        inverse={inverse}
      />
    )
  }
  // const WeekList = [1, 2, 3, 4, 5].map((weekNum, index) => (
  //   <RoundButton key={index} title={weekNum} />
  // ))
  let DaysList = []
  for (let i = 1; i <= daysInMonth; i++) {
    DaysList.push(<RoundButton key={i} title={i} />)
  }

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
            <Text style={styles.title}>
              {UpperCaseFirst(weeks.ru.name.many)}
            </Text>
            <View style={styles.weekslist}>{WeekList}</View>
            <Text style={styles.title}>Дни</Text>
            <View style={styles.dayslist}>{DaysList}</View>
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
  dayslist: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 50,
    alignItems: "center",
    flexWrap: "wrap",
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
