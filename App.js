import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/screens/homeScreen";
import CreateScreen from "./src/screens/createScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Create: CreateScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Todos"
    }
  }
);

export default createAppContainer(navigator);
