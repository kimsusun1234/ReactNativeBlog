import React, { useContext, useState, useEffect } from 'react';
import firebase from '../firebase/FirebaseConfig';
import { ToastAndroid, Alert, Button } from 'react-native';

export var database = firebase.database();



//truyen tham so flatlist de khi nao lay xong du lieu thi moi cho vao flatlist
export function readAllPost(reference) {

    //khai báo mảng để chứa dữ liệu
    // const [data, setData] = useState([]);

    var data = [];

    //Lấy snapshot của của child posts
    reference.ref().child('posts').once('value', (snapshot) => {

        // setData([]);

        // var items =[];

        console.log('value change');

        console.log(snapshot);
        //mõi child của snapshot
        snapshot.forEach((childSnapshot) => {

            //set các thuộc tính cho state Item
            var item = {

                key: childSnapshot.key,
                title: childSnapshot.val().title,
                sum: childSnapshot.val().sum,
                content: childSnapshot.val().content,
                image: childSnapshot.val().image,
                publishDate: childSnapshot.val().publishDate,
                userId: childSnapshot.val().userId,

            };

            // items.push(item);
            data.push(item);

        });

        // console.log('Items:---------------------------------------------');
        // console.log(items);

        // setData(items);
        console.log('DATA:---------------------------------------------');
        console.log(data);
    });


    return data;

    // useEffect(() => {

    //     return(null);

    // });
    // , (error) => {

    //     if (error)
    //     {
    //         console.log('Error: ' + error);
    //     }
    //     else
    //     {
    //         console.log('Get data successfully!');
    //         posts = items;
    //         console.log(posts);
    //     }
    // });


    // return(
    //     <FlatList
    //         data={data}
    //         renderItem={({ item }) => <Posts title={item.title} sum={item.sum} author={item.author} />}
    //         keyExtractor={item => item.key}/>
    // );

}

export function editPost(id, title, sum, content, image, userId, publishDate) {

    if (validPost(title, sum, content, image)) {
        //db se tham chieu den path roi sau do ghi de cac gia tri json duoc truyen vao trong set
        //hàm set có một tham số được gọi khi tiến trình hoàn tất
        //ghi đè hàm đó để thực hiện các câu lệnh sau khi hoàn thành tiến trình (thành công, không thành công)
        database.ref().child('posts').child(id).set({
            title: title,
            sum: sum,
            content: content,
            image: image,
            userId: userId,
        }, (error) => {
            if (error) {

                //thats batj
                Console.log('Error: ' + error);
                ToastAndroid.show('Edited failed!', 1);
            }
            else {
                //thanh cong
                ToastAndroid.show('Edited successfully!', 1);
            }
        });
    }
    else {
        Alert.alert('Error', 'Please enter all the fields!', [
            {
                text: "Ok",
                style: "cancel"
            }
        ]);
    }
}

//validate post
export function validPost(title, sum, content, image) {
    if (title == '' || sum == '' || content == '' || image == '') {
        return false;
    }
    return true;
}

export function deletePost(id)
{
    database.ref().child('posts').child(id).remove((error) => {
        if (error)
        {
            console.log(error);
            ToastAndroid.show('Some error happened!', 1);
            ToastAndroid.show(error.toString());
        }
        else
        {
            console.log('Deleted');
            ToastAndroid.show('Deleted Successfully!', 1);
        }
    }).then(() => {
        firebase.storage().ref().child('image').child(id + '.jpg').delete().then(() => {console.log('Image Deleted!')});
    });
}