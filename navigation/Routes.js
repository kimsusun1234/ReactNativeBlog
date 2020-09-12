import React, { useContext, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native'

//import cac stack
import AdminStack from '../stacks/AdminStack';
import AuthStack from '../stacks/AuthStack';

//import context
import {AuthContext} from './AuthenticationProvider';
import { AsyncStorage, ToastAndroid } from 'react-native';

export default () => {

    //tạo mảng gồm các biến có cùng tên với các child trong context
    const {user, login} = useContext(AuthContext);

    useEffect(() => {

        AsyncStorage.getItem('user').then( (user) => {

            if (user){
                login();
            }
        })
        .catch((err) => {
            console.log('Something wrong! ' + err);
            ToastAndroid.show('Login Faled! Pleas try again!', 1);
        })

    }, []);

    return(

    <NavigationContainer>

        {/* nếu user = true thì app sẽ hiển thị AdminStack, nếu false thì app chạy Auth??? */}
        {user?<AdminStack/>:<AuthStack/>}

    </NavigationContainer>

    );

}