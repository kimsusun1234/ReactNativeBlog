import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView, StatusBar, Platform, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { min } from 'react-native-reanimated';
import {addPost} from '../dao/PostDao';
import { userProfile } from '../App';

export default function ({ navigation }) {

    const [title, setTitle] = React.useState('');
    const [sum, setSum] = React.useState('');
    const [content, setContent] = React.useState('');
    const [image, setImage] = React.useState('');
    
    return (
        <View>

            <TextInput
                placeholder='Title'
                style={styles.inputTextTitle}
                onChangeText={(text) => setTitle(text)}/>

            <TextInput
                placeholder='Summary'
                style={styles.inputTextSum}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => setSum(text)}/>

            <TextInput
                placeholder='Content'
                style={styles.inputTextContent}
                multiline={true}
                onChangeText={(text) => setContent(text)}/>

            <TextInput
                placeholder='Image'
                style={styles.inputTextImage}
                onChangeText={(text) => setImage(text)}/>

            <TouchableOpacity
                style={
                    {
                        alignSelf: 'flex-end',
                        marginRight: 10,
                    }
                }
                onPress={() => {
                    var date = new Date();
                    console.log(date);
                    addPost(title, sum, content, 'image', userProfile.uid, date.toString());
                }}
                >

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
                        }}>Post</Text>
                </View>

            </TouchableOpacity>

        </View>
    );
} 
const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignContent: 'center',
    },

    inputTextTitle: {

        height: 50,
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
    },

    inputTextSum: {

        height: 100,
        fontSize: 16,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
        textAlignVertical: 'top',
        paddingTop: 10,
    },


    inputTextContent: {

        height: 200,
        fontSize: 16,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
        textAlignVertical: 'top',
        paddingTop: 10,
    },

    inputTextImage: {

        height: 50,
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
    },


});

