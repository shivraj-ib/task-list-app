import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/homeScreen';
import CreateScreen from './src/screens/createScreen';
import EditScreen from './src/screens/editScreen';

const navigator = createStackNavigator(
    {
        Home: HomeScreen,
        Create: CreateScreen,
        Edit: EditScreen,
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            title: 'Todos',
        },
    }
);

export default createAppContainer(navigator);
