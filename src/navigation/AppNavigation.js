import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/AppHeaderIcon"

import { Platform, Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { Ionicons } from "@expo/vector-icons"
import { DevScreen } from "../screens/DevScreen"
import YearScreen from "../screens/YearScreen"
import MonthScreen from "../screens/MonthScreen"

import { useTheme } from "@react-navigation/native"
import THEME from "../theme"

const Stack = createStackNavigator()
const PlannerStack = createStackNavigator()

const burgerButton = (navigation) => (
  <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item
      title="Toggle Drawer"
      iconName="ios-menu"
      onPress={() => navigation.toggleDrawer()}
    />
  </HeaderButtons>
)

const StackNavigator = ({ children, navigation, initialRouteName }) => {
  const { colors } = useTheme()
  return (
    <Stack.Navigator
      headerMode="none"
      // headerShown={false}
      initialRouteName="Main"
      screenOptions={{
        headerTintColor: THEME.lightPinkTheme.headerFont,
        // Platform.OS === "android"
        //   ? THEME.lightPinkTheme.headerFont
        //   : colors.background,
        headerStyle: {
          backgroundColor: THEME.lightPinkTheme.headerBackground,
          // Platform.OS === "android"
          //   ? THEME.lightPinkTheme.headerBackground
          //   : "white",
        },
      }}
    >
      {children}
    </Stack.Navigator>
  )
}

const PlanerStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation} initialRouteName="Year">
    <PlannerStack.Screen
      name="Year"
      component={YearScreen}
      initialParams={{ year: 2020 }}
      options={{
        headerLeft: () => burgerButton(navigation),
      }}
    />
    <PlannerStack.Screen name="Month" component={MonthScreen} />
    {/* <EventsStack.Screen name="Event" component={EventScreen} />
    <EventsStack.Screen name="CreateEvent" component={CreateEventScreen} /> */}
  </StackNavigator>
)

const DevStackScreen = ({ navigation }) => (
  <StackNavigator navigation={navigation} initialRouteName="Main">
    <DevStack.Screen
      name="DevDB"
      component={DevScreen}
      options={{
        headerLeft: () => burgerButton(navigation),
      }}
    />
    <DevStack.Screen name="DevTable" component={DevTableScreen} />
    {/* <DevStack.Screen
      name="DevColumn"
      component={DevColumnScreen}
    /> */}
  </StackNavigator>
)

// const Tabs = createMaterialBottomTabNavigator()

// const EventsTabsScreen = () => {
//   const { colors } = useTheme()
//   return (
//     <Tabs.Navigator
//       // activeColor={"#fff"}
//       // barStyle={{ backgroundColor: THEME.MAIN_COLOR }}
//       // tabBarOptions={{
//       //   activeTintColor: "#fff",
//       // }}
//       barStyle={{ backgroundColor: colors.background }}
//     >
//       <Tabs.Screen
//         name="Events"
//         component={EventsScreen}
//         options={{
//           tabBarLabel: "Все",
//           tabBarIcon: (info) => (
//             <Ionicons name="ios-albums" size={25} color={info.color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="Actual"
//         component={ActualStackScreen}
//         options={{
//           tabBarLabel: "Актуальные",
//           tabBarIcon: (info) => (
//             <Ionicons name="ios-albums" size={25} color={info.color} />
//           ),
//         }}
//       />
//     </Tabs.Navigator>
//   )
// }

const Drawer = createDrawerNavigator()

const DrawerScreen = () => {
  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerContentOptions={
        {
          // activeTintColor: "#fff",
          // labelStyle: {
          //   fontFamily: "open-bold",
          // },
        }
      }
    >
      <Drawer.Screen
        name="Planer"
        component={PlanerStackScreen}
        options={{
          drawerLabel: "2020 год",
          drawerIcon: () => (
            <Ionicons name="ios-albums" size={24} color={THEME.text} />
          ),
        }}
      />
      <Drawer.Screen
        name="Dev"
        component={DevStackScreen}
        options={{
          drawerLabel: "Панель разработчика",
          drawerIcon: () => (
            <Ionicons name="md-bug" size={24} color={THEME.text} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Test"
        component={Test}
        options={{
          drawerLabel: "Test",
          drawerIcon: () => (
            <Ionicons name="md-bug" size={24} color={colors.text} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  )
}

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <DrawerScreen />
    </NavigationContainer>
  )
}
