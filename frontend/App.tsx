import type React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import type { RootStackParamList } from "./src/types/navigation"

// Import screens
import HomeScreen from "./src/screens/HomeScreen"
import VitaminScanScreen from "./src/screens/VitaminScanScreen"
import VitaminListScreen from "./src/screens/VitaminListScreen"
// Note: You would need to create these additional screens following the same pattern
// import VitaminInfoScreen from './src/screens/VitaminInfoScreen';
// import DrugCategoriesScreen from './src/screens/DrugCategoriesScreen';
// import DrugSearchScreen from './src/screens/DrugSearchScreen';
// import DrugInfoScreen from './src/screens/DrugInfoScreen';
// import RecommendationsScreen from './src/screens/RecommendationsScreen';

const Stack = createStackNavigator<RootStackParamList>()

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              }
            },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="VitaminScan" component={VitaminScanScreen} />
          <Stack.Screen name="VitaminList" component={VitaminListScreen} />
          {/* Add other screens here */}
          {/* <Stack.Screen name="VitaminInfo" component={VitaminInfoScreen} />
          <Stack.Screen name="DrugCategories" component={DrugCategoriesScreen} />
          <Stack.Screen name="DrugSearch" component={DrugSearchScreen} />
          <Stack.Screen name="DrugInfo" component={DrugInfoScreen} />
          <Stack.Screen name="Recommendations" component={RecommendationsScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
