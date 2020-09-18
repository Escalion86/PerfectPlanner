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
import MonthTabs from "../components/MonthTabs"
import BurgerButton from "../components/BurgerButton"

const YearScreen = ({ navigation, route }) => {
  const { year } = route.params
  navigation.setOptions({
    title: year,
    headerStyle: {
      backgroundColor: THEME.lightPinkTheme.headerBackground,
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      color: THEME.lightPinkTheme.headerFont,
    },
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

  return (
    <View style={styles.header}>
      <BurgerButton navigation={navigation} />
      <MonthTabs
        navigation={navigation}
        year={year}
        style={{ maxWidth: 500 }}
      />
    </View>
  )
}

export default YearScreen

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    marginTop: 30,
  },
})
