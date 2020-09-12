import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {createStackNavigator} from '@react-navigation/stack';

const stack = createStackNavigator();

export default function AuthStack()
{
    return(

        <stack.Navigator initialRouteName='LoginScreen'>

            <stack.Screen name='LoginScreen' component={LoginScreen}/>
            <stack.Screen name='RegisterScreen' component={RegisterScreen}/>

        </stack.Navigator>

    );
}