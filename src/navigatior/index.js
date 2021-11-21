import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import {Spinner} from '../components';
import {ProgressContext, UserContext} from '../contexts';

const Navigator = () => {

    const {inProgress} = useContext(ProgressContext)
    const {user} = useContext(UserContext)

    return (
        <NavigationContainer>
            {user?.uid && user?.email ? <MainStackNavigator/> : <AuthStackNavigator/>}
            {inProgress && <Spinner/>}
        </NavigationContainer>
    );
};

export default Navigator;