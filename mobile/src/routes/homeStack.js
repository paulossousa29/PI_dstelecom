import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Home from '../pages/Home';
import Login from '../pages/Login';
import AR from '../pages/AR';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {},
  },
  Login: {
    screen: Login,
    navigationOptions: {},
  },
  AR: {
    screen: AR,
    navigationOptions: {},
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    title: 'dstelecom',
    headerStyle: {
      backgroundColor: '#ccc',
      height: 60,
    },
  },
});

export default createAppContainer(HomeStack);
