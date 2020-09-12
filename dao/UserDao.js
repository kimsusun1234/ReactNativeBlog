import React, { useContext } from 'react';
import firebase from '../firebase/FirebaseConfig';
import { ToastAndroid } from 'react-native';
import {userProfile} from '../App';

var database = firebase.database();

export function addUser(userId, email, pass, name, phone){

    //db se tham chieu den path roi sau do ghi de cac gia tri json duoc truyen vao trong set
    database.ref().child('users').child(userId).set({
        userId: userId,
        email: email,
        password: pass,
        name: name,
        phone: phone,
    }).then(() => {
        Console.log('Added to db successfully!')
    })
    .catch((error)=>{
        Console.log('Error: ' + error);
    });

}

export function readUser (userId) {

    //Lấy snapshot của của child userId
    database.ref().child('users').child(userId).once('value').then((snapshot) => {
        
        //snapshot.val() trả về một đối tương JSON
        userProfile.uid = snapshot.val().userId;
        userProfile.email = snapshot.val().email;
        userProfile.password = snapshot.val().password;
        userProfile.name = snapshot.val().name;
        userProfile.phone = snapshot.val().phone;
        console.log(userProfile);
    });

}

export function updateUser(userId, name, phone, password, email)
{
    //db se tham chieu den path roi sau do ghi de cac gia tri json duoc truyen vao trong set
    database.ref().child('users').child(userId).set({
        userId: userId,
        email: email,
        password: password,
        name: name,
        phone: phone,
    }).then(() => {
        Console.log('Updated successfully!');
        ToastAndroid.show('Updated successfully!', 1)
    })
    .catch((error)=>{
        Console.log('Error: ' + error);
        ToastAndroid.show('Updated failed!', 1)
    });
}

export function changePassword(newPass)
{
    //tham chiếu đến đối tượng user đã đăng nhập vào ứng dụng
    var userRef = firebase.auth().currentUser;
    userRef.updatePassword(newPass).then(() => {
        ToastAndroid.show('Password changed', 1);
        console.log('pass changed successfully');
    }).catch((error) => {
        ToastAndroid.show('Some error happened. Please try again later!.', 1);
        ToastAndroid.show('Error: '+ error, 1);
        console.log(error);
    });

    //db se tham chieu den path roi sau do ghi de cac gia tri json duoc truyen vao trong set
    database.ref().child('users').child(userId).child('password').set(newPass).then(() => {
        Console.log('Updated password to db successfully!');

    })
    .catch((error)=>{
        Console.log('Error: ' + error);
        ToastAndroid.show('Updated password to db failed!', 1)
    });
}