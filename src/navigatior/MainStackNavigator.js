import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import MyPage from '../screens/MyPage';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={Signin}>
            <Stack.Screen name="Signin" component={Signin}/>
            <Stack.Screen name="Signup" component={Signup}/>
            <Stack.Screen name="MyPage" component={MyPage}/>
        </Stack.Navigator>
    )
}

export default MainStackNavigator;