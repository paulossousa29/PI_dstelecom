import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthContext} from '../components/AuthContext';

import Login from '../pages/Login';
import AR from '../pages/AR';
import Home from '../pages/Home';
import Notes from '../pages/Notes';
import NewReference from '../pages/NewReference';
import Done from '../pages/Done';
import UserExperience from '../pages/UserExperience';
import ResultReference from '../pages/ResultReference';
import ShowImage from '../pages/ShowImage';
import Splash from '../pages/Splash';

const HomeStack = createStackNavigator();

const AuthStack = createStackNavigator();

const MyStack = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [token, setToken] = React.useState(null);
  const [username, setUsername] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      login: ({token, username}) => {
        setIsLoading(false);
        setUsername(username);
        setToken(token);
      },
      logout: () => {
        setIsLoading(false);
        setUsername(null);
        setToken(null);
      },
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {token ? (
          <HomeStack.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false}}>
            <HomeStack.Screen
              name="Home"
              component={Home}
              initialParams={{username: username}}
            />
            <HomeStack.Screen name="AR" component={AR} />
            <HomeStack.Screen name="Notes" component={Notes} />
            <HomeStack.Screen name="NewReference" component={NewReference} />
            <HomeStack.Screen
              name="ResultReference"
              component={ResultReference}
            />
            <HomeStack.Screen name="Done" component={Done} />
            <HomeStack.Screen
              name="UserExperience"
              component={UserExperience}
            />
            <HomeStack.Screen name="ShowImage" component={ShowImage} />
          </HomeStack.Navigator>
        ) : (
          <AuthStack.Navigator
            initialRouteName="Login"
            screenOptions={{headerShown: false}}>
            <AuthStack.Screen name="Login" component={Login} />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default MyStack;
