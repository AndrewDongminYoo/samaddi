import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Channel from '../screens/Channel';
import ChannelList from '../screens/ChannelList';
import ChannelCreation from '../screens/ChannelCreation';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={ChannelList}>
            <Stack.Screen name="Channel" component={Channel}/>
            <Stack.Screen name="ChannelList" component={ChannelList}/>
            <Stack.Screen name="ChannelCreation" component={ChannelCreation}/>
        </Stack.Navigator>
    )
}

export default MainStackNavigator;