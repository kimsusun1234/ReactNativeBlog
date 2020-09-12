import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../navigation/AuthenticationProvider';


function RegisterScreen({ navigation }) {

    const { reg } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>Register</Text>

            <TextInput
                placeholder='Email'
                style={styles.textInput}
                onChangeText={text => setEmail(text)}
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'/>

            <TextInput
                placeholder='Pass'
                style={styles.textInput}
                onChangeText={text => setPass(text)}
                autoCapitalize='none'
                secureTextEntry={true} //dòng này để textIput ẩn text đi, dành cho mật khẩu
            />

            <TextInput
                placeholder='Password confirmation'
                style={styles.textInput}
                onChangeText={text => setConfirmPass(text)}
                autoCapitalize='none'
                secureTextEntry={true} //dòng này để textIput ẩn text đi, dành cho mật khẩu
            />

            <TextInput
                placeholder='Name'
                style={styles.textInput}
                onChangeText={text => setName(text)}
                keyboardType='name-phone-pad'
                textContentType='name'
                autoCapitalize= 'words'
                />

            <TextInput
                placeholder='Phone'
                style={styles.textInput}
                onChangeText={text => setPhone(text)}
                keyboardType='number-pad'
                textContentType='telephoneNumber'/>

            <TouchableOpacity
                style={styles.touchable}
                onPress={() => reg(email, pass, confirmPass, name, phone, navigation)}>

                <View style={styles.loginBtn}>

                    <Text style={styles.loginBtnText}>Register</Text>

                </View>

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.touchableRegister}
                onPress={() => navigation.navigate('LoginScreen')}>

                <Text style={styles.textReg}>Have an account? Login.</Text>

            </TouchableOpacity>
        </View>

    );
}

export default RegisterScreen;

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },

        loginText: {
            color: '#1e90ff',
            fontSize: 50,
            width: '100%',
            textAlign: "center",
            textShadowColor: '#000000',
            textShadowRadius: 10,
            marginTop: 50,
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