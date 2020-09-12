import React, { useContext } from 'react';
import AdminHomeScreen from '../screens/AdminHomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { userProfile } from '../App';
import { Button, View, TouchableOpacity, Text, Image } from 'react-native';
import { AuthContext } from '../navigation/AuthenticationProvider';
import UserInformationScreen from '../screens/UserInformationScreen';

const stack = createStackNavigator();


export default function AdminStack() {

    const { logout } = useContext(AuthContext);

    return (
        <stack.Navigator initialRouteName='AdminHomeScreen'>

            <stack.Screen
                name='AdminHomeScreen'
                component={AdminHomeScreen}
                options={{
                    title: 'Admin Screen',
                    headerRight: () => (

                        <Button title='LOGOUT' onPress={() => logout()} />

                    ),
                    
                }} />

            <stack.Screen
                name='UserInformationScreen'
                component={UserInformationScreen}/>

        </stack.Navigator>
    );


}

