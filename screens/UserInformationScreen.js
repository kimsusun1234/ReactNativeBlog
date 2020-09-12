import * as React from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, Image, ToastAndroid, Modal } from 'react-native';
import { updateUser, changePassword} from '../dao/UserDao';
import firebase from '../firebase/FirebaseConfig';
import { useSafeArea } from 'react-native-safe-area-context';


export default function UserInformationScreen({ navigation, route }) {

    const { user } = route.params;
    const [name, setName] = React.useState(user.name);
    const [phone, setPhone] = React.useState(user.phone);
    const [modalVisible, setModalVisible] = React.useState(false);

    React.useLayoutEffect(() => {

        navigation.setOptions({
            title: 'User Information',
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => { 
                        console.log('Change password press!'); 
                        setModalVisible(true);
                    }}>

                    <Text style={{ marginRight: 5, color: '#1e90ff' }}>Change password</Text>

                </TouchableOpacity>
            ),
        })

    }, [navigation]);

    React.useEffect(() => {
        console.log('user: ');
        console.log(user)
    }, []);


    return (
        <View style={styles.container}>

            <TextInput
                placeholder='Email'
                style={styles.textInput}
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                editable={false}
                value={user.email} />

            <TextInput
                placeholder='Name'
                style={styles.textInput}
                onChangeText={text => setName(text)}
                keyboardType='name-phone-pad'
                textContentType='name'
                autoCapitalize='words'
                value={user.name} />

            <TextInput
                placeholder='Phone'
                style={styles.textInput}
                onChangeText={text => setPhone(text)}
                keyboardType='number-pad'
                textContentType='telephoneNumber'
                value={user.phone} />

            <TouchableOpacity
                style={{ alignSelf: 'center' }}
                onPress={() => console.log('Change image pressed')}>

                <Image style={styles.image} source={require('../images/icons8-male-user-24.png')} />

            </TouchableOpacity>

            <View
                style={{ flexDirection: 'row', alignSelf: 'flex-end', }}>
                <TouchableOpacity
                    style={
                        {
                            marginRight: 10,
                        }
                    }
                    onPress={() => {
                        console.log('cancel pressed');
                    }}>

                    <View
                        style={{
                            backgroundColor: '#1e90ff',
                            width: 50,
                            height: 30,
                            borderRadius: 10,

                        }}>
                        <Text
                            style={{
                                color: '#ffffff',
                                width: 50,
                                height: 30,
                                textAlign: 'center',
                                textAlignVertical: 'center',
                            }}>Cancel</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    style={
                        {
                            marginRight: 10,
                        }
                    }
                    onPress={async () => {

                        console.log('update pressed');
                        if (valid(name, phone)) {
                            await updateUser(user.userId, name, phone, user.password, user.email);

                            navigation.navigate('AdminHomeScreen');
                        }

                    }}>

                    <View
                        style={{
                            backgroundColor: '#1e90ff',
                            width: 50,
                            height: 30,
                            borderRadius: 10,

                        }}>
                        <Text
                            style={{
                                color: '#ffffff',
                                width: 50,
                                height: 30,
                                textAlign: 'center',
                                textAlignVertical: 'center',
                            }}>Update</Text>
                    </View>

                </TouchableOpacity>
            </View>

            <Modal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                animationType='slide'>
                    
                    <ChangePasswordModal currentPass={user.password} setModalVisible={setModalVisible}/>

            </Modal>

        </View>
    );
}

//hàm giao diện modal

function ChangePasswordModal(props) {

    //cac state luu tru mat khau
    const [oldPass, setOldPass] = React.useState('');
    const [newPass, setNewPass] = React.useState('');
    const [confirmPass, setConfirmPass] = React.useState('');
    const [currentPass] = React.useState(props.currentPass);


    function validPass() {
        if (oldPass == '' || newPass == '' || confirmPass == '') {
            ToastAndroid.show('Please fill all the field!', 1);
            console.log('Fields empty');
            return false;
        }
        else {
            if (oldPass != currentPass) {
                ToastAndroid.show('Old password does not match', 1);
                console.log('Old pass wrong');
                return false;
            }
            else {
                if (newPass != confirmPass) {
                    ToastAndroid.show('Confirm password does not match!', 1);
                    console.log('confirm pass wrong');
                    return false;
                }
                else {
                    console.log('validated');
                    return true;
                }
            }
        }
    }

    return (
        <View style={styles.container}>


            <Text
                style={{

                    fontSize: 30,
                    fontWeight: 'bold',
                    color: '#1e90ff',
                    textAlign: 'center',
                    marginVertical: 10,

                }}>Change Password</Text>

            <TextInput
                placeholder='Old Password'
                style={styles.textInput}
                textContentType='password'
                secureTextEntry={true}
                onChangeText={(text) => setOldPass(text)}
                autoCapitalize='none'
            />

            <TextInput
                placeholder='New Password'
                style={styles.textInput}
                textContentType='newPassword'
                secureTextEntry={true}
                onChangeText={(text) => setNewPass(text)}
                autoCapitalize='none'/>

            <TextInput
                placeholder='Confirm Password'
                style={styles.textInput}
                textContentType='newPassword'
                secureTextEntry={true}
                onChangeText={(text) => setConfirmPass(text)}
                autoCapitalize='none'/>

            <View
                style={{ flexDirection: 'row', alignSelf: 'flex-end', }}>
                <TouchableOpacity
                    style={
                        {
                            marginRight: 10,
                        }
                    }
                    onPress={() => {
                        console.log('cancel pressed');
                        props.setModalVisible(false);
                    }}>

                    <View
                        style={{
                            backgroundColor: '#1e90ff',
                            width: 50,
                            height: 30,
                            borderRadius: 10,

                        }}>
                        <Text
                            style={{
                                color: '#ffffff',
                                width: 50,
                                height: 30,
                                textAlign: 'center',
                                textAlignVertical: 'center',
                            }}>Cancel</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    style={
                        {
                            marginRight: 10,
                        }
                    }
                    onPress={async () => {

                        console.log('Change passpressed');
                        if(validPass())
                        {
                            await changePassword(newPass);
                            props.setModalVisible(false);
                        }

                    }}>

                    <View
                        style={{
                            backgroundColor: '#1e90ff',
                            width: 50,
                            height: 30,
                            borderRadius: 10,

                        }}>
                        <Text
                            style={{
                                color: '#ffffff',
                                width: 50,
                                height: 30,
                                textAlign: 'center',
                                textAlignVertical: 'center',
                            }}>Submit</Text>
                    </View>

                </TouchableOpacity>
            </View>


        </View>
    );


}

function valid(name, phone) {
    if (name == '' || phone == '') {
        ToastAndroid.show('Please fill all the field', 1);
        console.log('Error, blank field');
        return false;
    }
    else {
        return true;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    image: {
        width: 200,
        height: 200,
    }

});