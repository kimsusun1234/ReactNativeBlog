import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ToastAndroid, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import { color } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

//import context
import { AuthContext } from '../navigation/AuthenticationProvider';



export default function HomeScreen({ navigation }) {
    const [email, setEmail] = useState('admin@gmail.com');
    const [pass, setPass] = useState('123456');
    const { login } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>

            <Image style={styles.logo} source={require('../images/logo.png')} />

            <TextInput
                placeholder='Email'
                style={styles.textInput}
                onChangeText={text => setEmail(text)}
                autoCapitalize='none'>admin@gmail.com</TextInput>

            <TextInput
                placeholder='Pass'
                style={styles.textInput}
                onChangeText={text => setPass(text)}
                autoCapitalize='none'
                secureTextEntry={true} >123456</TextInput>

            <TouchableOpacity
                style={styles.touchable}
                onPress={() => login(email, pass)}>

                <View style={styles.loginBtn}>
                    <Text style={styles.loginBtnText}>Login</Text>
                </View>

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.touchableRegister}
                onPress={() => navigation.navigate("RegisterScreen")}>

                <Text style={styles.textReg}>Register</Text></TouchableOpacity>

        </SafeAreaView>
    );


}



const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0, //câu lệnh này để xác định xem OS đang dùng là gì, nếu laf android thì paddingTop bằng với chiều cao của statusbar
        },

        logo: {
            width: 100,
            height: 100,
            alignSelf: 'center'
        },

        textInput: {
            height: 40,
            marginVertical: 10,
            marginHorizontal: 50,
            borderColor: '#000000',
            borderStyle: "solid",
            borderWidth: 1,
            paddingHorizontal: 10,
            borderRadius: 10,

        },

        touchable: {
            alignSelf: 'center',
        },

        loginBtn: {
            width: 100,
            height: 50,
            fontSize: 50,
            color: '#1e90ff',
            backgroundColor: '#1e90ff',
            justifyContent: 'center',
            borderColor: '#9c9c9c',
            borderRadius: 10,
        },

        loginBtnText: {
            textAlign: 'center',
            fontSize: 20,
            color: '#ffffff',
        },

        touchableRegister: {
            marginTop: 10,
        },

        textReg: {
            fontSize: 12,
            color: '#1e90ff',
            textAlign: 'center',
            marginRight: 10,
        },

    })

