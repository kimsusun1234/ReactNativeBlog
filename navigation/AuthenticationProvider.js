import React, { createContext, useState } from 'react';
import firebase from '../firebase/FirebaseConfig';
import { ToastAndroid } from 'react-native';
//file này là kiểu chứa các hàm, biến, để được gọi ở một file khác (Provider)
import validator from 'validator';
import * as UserDao from '../dao/UserDao';

//khai báo một context
export const AuthContext = createContext({

    //đối tượng user
    user: null,
    login: () => { },
    logout: () => { },
    reg: () => { },
});


//tham số "children" để cho phép truyền được tham số vào async
export const AuthenticationProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    return (

        //chỉnh sửa các thuộc tính đã khai báo trong creatContext ở phần value
        <AuthContext.Provider
            value={{

                //truyền state user vào thuộc tính user của context
                user,

                login: async (email, pass) => {
                    console.log('login() called');

                    //await là chờ hàm này chạy xong rồi mới chạy dòng tiếp theo
                    await firebase.auth().signInWithEmailAndPassword(email, pass).then((user) => {


                        //nếu đăng nhập thành công, set đối tượng JSON user cho state 
                        setUser(user.user);
                        console.log('Login successfully!');
                        ToastAndroid.show('Login successfully!', 1);
                        UserDao.readUser(user.user.uid);

                    })
                        .catch((error) => {
                            //nếu thất bại thì thông báo và log
                            const { code, message } = error;
                            console.log('Error: ' + message);
                            ToastAndroid.show('Login failed! Please try again.', 1);
                        });
                },

                reg: async (email, pass, confirmPass, name, phone, navigation) => {

                    console.log('reg() called');

                    await firebase.auth().createUserWithEmailAndPassword(email, pass).then((user) => {

                            //sau khi đăng kí thành công thì thông báo và chuyển hướng sang trang login
                            console.log('reg successfully');
                            ToastAndroid.show('Registed successfully!', 1);
                            navigation.navigate('LoginScreen');

                            //console.log(user);
                            //đối tượng user nhận được từ then là một objec JSON, từ user phải truy cập vào child có tên "user" thì mới có child uid
                            UserDao.addUser(user.user.uid, email, pass, name, phone);
                     

                    })
                        .catch((error) => {
                            //thất bại thì thông báo
                            const { code, message } = error;
                            console.log('Error: ' + message);
                            ToastAndroid.show('Registed failed! Please try again.', 1);

                        });

                
                },

                logout: async () => { console.log('reg() called'); setUser(null) },

            }}>

            {children}

        </AuthContext.Provider>

    );

}

//hàm validate 
function validateReg(email, pass, confirmPass, name, phone) {
    if (email == '' || pass == '' || confirmPass == '' || name == '' || phone == '') {
        ToastAndroid.show('Please enter all the given fields above!', 1);
        console.log('One or more field is empty');
        return false;
    }
    else {
        if (!validator.isEmail(email)) {
            ToastAndroid.show('Please enter right format of email!', 1);
            console.log('Wrong Email Format');
            return false;
        }
        else {
            if (pass != confirmPass) {
                ToastAndroid.show('Confirm password must be the same with password!', 1);
                console.log('Wrong confirm pass');
                return false;
            }
            else {
                return true;
            }
        }
    }
}

function validateLogin(email, pass) {
    if (email == '' || pass == '') {
        ToastAndroid.show('Please enter all the given fields above!', 1);
        console.log('One or more field is empty');
        return false;
    }
    else {
        if (!validator.isEmail(email)) {
            ToastAndroid.show('Please enter right format of email!', 1);
            console.log('Wrong Email Format');
            return false;
        }
        else {
            return true;
        }
    }
}
