import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, SafeAreaView, StatusBar, Platform, FlatList, Modal, TouchableOpacity, ToastAndroid, Image, YellowBox, ScrollView } from 'react-native';
import { color } from 'react-native-reanimated';
import { database } from '../dao/PostDao';
import { editPost, deletePost } from '../dao/PostDao';
import { userProfile } from '../App';
import SwipeOut from 'react-native-swipeout';
import firebase from '../firebase/FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';


//khai báo biến tham chiếu đến storage
const storage = firebase.storage();

//hàm chọn ảnh, tham số setUri là một hàm, để setUri đã lấy được từ imagepicker 
const chooseImageAsync = async (setUri) => {

  //đợi yêu cầu cấp quyền, sau đó trả kết quả về cho permissionResult
  let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  //nếu kkhoong được cấp quyền
  if (permissionResult.granted == false) {
    //Toast và return hàm
    ToastAndroid.show("Need permission to use the gallery!", 1);
    return;
  }

  //nếu qua được return = đã được cấp quyền, đợi lấy data của bức ảnh rồi trả về cho pickResult
  //pickResult là một object JSON gồm các child: cancelled, height, width, type, uri
  let pickResult = await ImagePicker.launchImageLibraryAsync();
  console.log(pickResult);
  setUri(pickResult.uri);
}

//hàm chụp ảnh
const takePhotoAsync = async (setUri) => {

  //đợi yêu cầu cấp quyền, sau đó trả kết quả về cho permissionResult
  let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  //nếu kkhoong được cấp quyền
  if (permissionResult.granted == false) {
    //Toast và return hàm
    ToastAndroid.show("Need permission to use the camera!", 1);
    return;
  }

  //nếu qua được return = đã được cấp quyền, đợi lấy data của bức ảnh rồi trả về cho pickResult
  //pickResult là một object JSON gồm các child: cancelled, height, width, type, uri
  let pickResult = await ImagePicker.launchCameraAsync();
  console.log(pickResult);
  setUri(pickResult.uri);
}



export default function AdminHomeScreen({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [readPostModalVisible, setReadPostModalVisible] = useState(false);

  const showModal = (any) => { setModalVisible(any); };
  const setSelected = (item) => { setSelectedItem(item); console.log('selected item: '); console.log(selectedItem) };


  useLayoutEffect(() => {
    //setOptions là để viết lại các options được truyền vào trong stack.Screens của screen hiện tại
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity 
            style={{height: 40, width: 40, borderRadius: 20, marginLeft:10,}}
            onPress={() => {
              console.log('user information pressed');
              //navigate và truyền tham số tới cho Screen
              navigation.navigate('UserInformationScreen', {

                user: userProfile,

              });
              }}>

            <Image style={{ height: 40, width: 40,}} source={require('../images/icons8-male-user-24.png')}/>

        </TouchableOpacity>
    ),
    })
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>

      {/*truyền hàm setSelected vào MyFlatList*/}
      <MyFlatList setSelectedItem={setSelected} showModal={showModal}  showReadPostModal={setReadPostModalVisible}/>

      {/* FloatingButton */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => { setModalVisible(true); setSelectedItem(null); }}>

        <View
          style={styles.floatingButtonView}>

          <Text
            style={{
              width: 50,
              height: 50,
              fontWeight: 'bold',
              color: '#ffffff',
              fontSize: 30,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>+</Text>

        </View>

      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => { console.log('Modal closed!'); setModalVisible(false); }}>

        <PostModal item={selectedItem} showModal={setModalVisible}/>

      </Modal>

      <Modal
        visible={readPostModalVisible}
        animationType='slide'
        onRequestClose= {() => {console.log('Modal Closed'); setReadPostModalVisible(false)}}>

            <ReadPostModal postItem={selectedItem}/>

        </Modal>

    </SafeAreaView>
  );

}

//function getAll
function readAllPost(databaseRef, setItemList) {
  //khai báo mảng để chứa dữ liệu
  // const [data, setData] = useState([]);



  //Lấy snapshot của của child posts
  databaseRef.ref().child('posts').on('value', (snapshot) => {

    // setData([]);
    // var items =[];

    var data = [];

    console.log('value change');

    console.log(snapshot);
    //mõi child của snapshot
    snapshot.forEach((childSnapshot) => {

      //set các thuộc tính cho state Item
      var item = {

        id: childSnapshot.key,
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

    setItemList(data);
  });


}


//Component render Flatlist
function MyFlatList(props) {
  //khai bao state chua list data
  const [itemList, setItemList] = useState([]);

  const [userList, setUserList] = useState([]);


  //lấy danh sách các user, mỗi child chỉ mang 2 giá trị, id và name
  const getUser = () => {

    firebase.database().ref().child('users').once('value', (snapshot) => {

      console.log('snapshot')
      console.log(snapshot);
      var data = [];

      snapshot.forEach((childSnapshot) => {

        console.log('childsnapshot');
        console.log(childSnapshot);
        var item = {
          userId: childSnapshot.val().userId,
          name: childSnapshot.val().name,
        };

        data.push(item);

      })

      setUserList(data);
      console.log('userLIst');
      console.log(userList);

    })

  }
  useEffect(() => {

    getUser();

    //thêm biến mounted để tránh lỗi can't perform unmounted component
    //chưa hiểu lắm cách hoạt động
    var mounted = true;

    if (mounted) {
      readAllPost(database, setItemList)
    }

    YellowBox.ignoreWarnings(['Setting a timer', 'Warning:']);

    return () => mounted = false;

    // console.log('useEffect called');
    // var data = readAllPost(database);
    // console.log('Data:--------------------------');
    // console.log(data);
    // setItemList(data);
    // console.log('ItemList:---------------------------');
    // console.log(itemList);


  }, []);// useEffect nay duoc goi khi component đã render xong.

  //FlatList ở dưới tự động thay đổi thì itemList bị thay đổi
  return (
    <FlatList
      data={itemList}
      /*Mỗi item của FlatList sẽ được truyền vào một props postItem là child của itemList*/
      /*setSelected được truyền function lấy từ props của MyFlatList */
      renderItem={({ item }) => <Posts postItem={item} userList={userList} setSelected={props.setSelectedItem} showModal={props.showModal} showReadPostModal={props.showReadPostModal}/>}
      keyExtractor={item => item.id}
    />

  );
}


//component design giao dien cho cac item trong flatlist
export function Posts(props) {

  const swipeoutConfig = {

    autoClose: true,
    onClose: () => {
      console.log('Close Swipe');
    },
    onOpen: () => {
      console.log('Open Swipe');
      console.log('Post item');
      console.log(props.postItem)
      //props của Post hiện tại có 2 thuộc tính là postItem và setSelected
      //Ta sẽ gọi thuộc tính setSelected trong props, truyền cho nó giá trị là postItem trong props
      //lúc này, selectedItem đã tồn tại => nếu bấm edit thì mở modal => modal sẽ là modal để edit
      var item = props.postItem
      props.setSelected(item);
    },
    left: [
      {
        text: 'Delete',
        onPress: () => {
          console.log('Delete button clicked');
          console.log()
          Alert.alert('Delete?', 'Are you sure?', [{ text: 'Yes', onPress: () => deletePost(props.postItem.id) }, { text: 'No' }])

        },
        backgroundColor: '#dc143c',
      }
    ],
    right: [
      {
        text: 'Edit',
        onPress: () => {
          console.log('Edit button clicked');
          //lấy thuộc tính showModal trong props ra
          props.showModal(true);
        },
        backgroundColor: '#1e90ff',
      },

      {
        text: 'Read',
        onPress: () => {
          console.log('Read button clicked');
          props.showReadPostModal(true);
        },
      },
    ]

  };

  var getAuthor = (id) => {

    console.log('getAuthor call');
    props.userList.forEach((user) => {

      if (id === user.id)
      {
        console.log(user.name)
        return (user.name);
      }

    });
  }

  return (

    <SwipeOut
      {...swipeoutConfig}
      style={{ margin: 5, backgroundColor: '#ffffff' }}>

      <View style={itemStyles.itemContainer}>

        {/* flex giống như weight của linearlayout */}

        {/*View của phần text*/}
        <View style={{ flexDirection: 'column', flex: 13, }}>

          <View style={{ flex: 2, }}><Text style={itemStyles.titleText}>{props.postItem.title}</Text></View>
          <View style={{ flex: 6, }}><Text style={itemStyles.sumText}>{props.postItem.sum}</Text></View>
          <View style={{ flex: 2, }}><Text style={itemStyles.authorText}>{getAuthor(props.postItem.userId)}</Text></View>

        </View>

        {/*View của phần ảnh*/}
        <View style={{ flex: 7, backgroundColor: '#0300a3' }}>

          <Image style={itemStyles.image} source={{ uri: props.postItem.image, }} />

        </View>


      </View>

    </SwipeOut>


  );
}

function ReadPostModal(props)
{

  const [item] = useState(props.postItem);

  useEffect(() => {

    console.log(item);

  }, [])

  return(

    <ScrollView style={{padding: 10,}}>

      <Text style={{

        fontSize: 35,
        fontWeight: 'bold',

      }}>{item.title}</Text>

      <Image style={{backgroundColor: '#a52a2a', height: 200,}} source={{uri: item.image}}/>

      <Text style={{

        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,

      }}>{item.sum}</Text>

      <Text style={{

        fontSize: 14,

      }}>{item.content}</Text>

    </ScrollView>

  );
}

//function render Modal
function PostModal(props) {

  const [title, setTitle] = React.useState('');
  const [sum, setSum] = React.useState('');
  const [content, setContent] = React.useState('');
  const [imageUri, setImageUri] = React.useState('https://firebasestorage.googleapis.com/v0/b/react-native-blog-cf965.appspot.com/o/logo-og.png?alt=media&token=946be21a-60a6-43b3-a295-78ce40e9f8cb');

  //nếu không truyền item vào thì item sẽ null, nghĩa là modal này sẽ làm chức năng post bài
  const [item] = React.useState(props.item);
  const [isNullItem] = useState(item == null); //neu item bị null thi la true, ko null thi la false


  const insert = async (title, sum, content, imageURI, userId, publishDate, showModal) => {


    console.log('addpost called');
    ToastAndroid.show('Posting...', 1);

    //db se tham chieu den path roi sau do ghi de cac gia tri json duoc truyen vao trong set
    var key = await database.ref().child('posts').push().key;

    console.log(key);

    var imageURL = await uploadImage(imageURI, key);

    if (validPost(title, sum, content, imageURL)) {


      //hàm set có một tham số được gọi khi tiến trình hoàn tất
      //ghi đè hàm đó để thực hiện các câu lệnh sau khi hoàn thành tiến trình (thành công, không thành công)
      database.ref().child('posts').child(key).set({
        title: title,
        sum: sum,
        content: content,
        image: imageURL,
        userId: userId,
        publishDate: publishDate,
      }, (error) => {
        if (error) {

          //thats batj
          Console.log('Error: ' + error);
          ToastAndroid.show('Posted failed!', 1);
        }
        else {
          //thanh cong
          ToastAndroid.show('Posted successfully!', 1);
          showModal(false);
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

  const uploadImage = async (uri, id) => {


    //Promise là một lớp xử lí bất đồng bộ
    //Promise ĐẠI DIỆN cho dữ liệu chúng ta lấy về
    //ở đây, return một Promise, lúc này nếu thành công, Promise sẽ có giá trị là URL sau khi Upload
    //resolve và Reject là 2 tham số hiểu function() được truyền vào callback của promise.
    //nếu lấy dữ liệu thành công, truyền dữ liệu vào hàm resolve để gán giá trị cho Promise
    return new Promise(async (resolve, reject) => {

      //fetch dùng để yêu cầu lấy giá trị 
      //trong đây, fetch(uri) nghĩa là yêu cầu lấy giá trị của uri
      //hàm này là một hàm bất đồng bộ, trả về respone là dữ liệu của uri, trong đây là ảnh
      const response = await fetch(uri);

      //cái này đ hiểu gì hết
      const file = await response.blob();

      //khai báo let để upload sử dụng local
      let uploadTask = storage.ref().child('image').child(id + '.jpg').put(file);

      //định nghĩa các hàm theo dõi quá trình upload
      //các hàm sẽ được gọi mỗi khi trạng thái (state) bị thay đổi
      uploadTask.on('state_changed', (snapshot) => {

        //đây là hàm theo dõi quá trình upload được gọi mỗi khi trạng thái upload thay đổi

        //lấy % hoàn thành
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        //trạng thái hiện tại
        // switch (snapshot.state) {
        //   case firebase.storage.TaskState.: // or 'paused'
        //     console.log('Upload is paused');
        //     break;
        //   case firebase.storage.TaskState.RUNNING: // or 'running'
        //     console.log('Upload is running');
        //     break;
        // }

      }, (error) => {

        //bat loi
        console.log(error);
        ToastAndroid.show('' + error);
        reject(error);

      }, async () => {

        //thanh cong
        //url se co dang https://firebasestorage.googleapis.com/...
        await uploadTask.snapshot.ref.getDownloadURL().then((url) => {

          console.log(url);
          //đã lấy được url, gắn vào cho resolve
          resolve(url);

        });

      });
    });
  };

  //validate post
  function validPost(title, sum, content, image) {

    if (title == '' || sum == '' || content == '' || image == '') {
      return false;
    }
    return true;
  }

  useEffect(() => {
    console.log('item trong modal')
    console.log(item);
    console.log(isNullItem);
    if (!isNullItem) {
      //nếu có item thì đổ dữ liệu từ item ra các component
      setTitle(item.title);
      setSum(item.sum);
      setContent(item.content);
      setImageUri(item.image);
      ToastAndroid.show('Item khong null', 1);
    }
  }, []);

  return (



    <View>

      {/*Nếu item bị null thì là post, item không null thì là edit */}
      <Text style={{
        fontSize: 50,
        fontWeight: 'bold',
        color: '#1e90ff',
        textAlign: 'center',
        margin: 10,
      }}>

        {isNullItem ? 'New Post' : 'Edit Post'}

      </Text>

      <TouchableOpacity
        style={{ width: 200, alignSelf: 'center', }}
        onPress={() => {
          console.log('image on press');
          chooseImageAsync(setImageUri);
        }} >

        <Image
          style={postModalStyles.image}
          source={{ uri: imageUri }}
        />

      </TouchableOpacity>


      <TextInput
        placeholder='Title'
        style={postModalStyles.inputTextTitle}
        onChangeText={(text) => setTitle(text)}
        value={title} />

      <TextInput
        placeholder='Summary'
        style={postModalStyles.inputTextSum}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setSum(text)}
        value={sum} />

      <TextInput
        placeholder='Content'
        style={postModalStyles.inputTextContent}
        multiline={true}
        onChangeText={(text) => setContent(text)}
        value={content} />

      <View
        style={{ flexDirection: 'row', alignSelf: 'flex-end', }}>
        <TouchableOpacity
          style={
            {
              marginRight: 10,
            }
          }
          onPress={() => {
            props.showModal(false);
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
              }}>Cancel</Text>
          </View>

        </TouchableOpacity>

        <TouchableOpacity
          style={
            {
              marginRight: 10,
            }
          }
          onPress={() => {

            //neu item bi null
            if (isNullItem) {

              //chay ham addPost
              var date = new Date();
              console.log(date);
              insert(title, sum, content, imageUri, userProfile.uid, date.toString(), props.showModal);
            }
            else {
              //neu item ko bi null thi chay ham edit
              editPost(item.id, title, sum, content, imageUri, item.userId, item.publishDate);
              props.showModal(false);
            }


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
              }}>{isNullItem ? "Post" : "Update"}</Text>
          </View>

        </TouchableOpacity>
      </View>

    </View>


  );

}





const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0, //câu lệnh này để xác định xem OS đang dùng là gì, nếu laf android thì paddingTop bằng với chiều cao của statusbar
      backgroundColor: '#ffffff'
    },

    floatingButton: {
      alignSelf: 'center',
    },

    floatingButtonView: {
      width: 50,
      height: 50,
      backgroundColor: '#1e90ff',
      marginBottom: 10,
      borderRadius: 25,
    },

  })

const itemStyles = StyleSheet.create({

  itemContainer: {
    height: 100,
    flexDirection: 'row', //flexdirection để xác định hướng xếp nối tiếp nhau của các child (giống với LinearLayout với orientation vertical)
    margin: 5,
    borderColor: '#bdbdbd',
    borderWidth: 1,
    borderRadius: 15,
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingHorizontal: 7,

  },

  sumText: {
    color: '#454545',
    fontSize: 12,
    paddingHorizontal: 7,

  },

  authorText: {
    color: '#454545',
    fontSize: 12,
    paddingLeft: 7,

  },

  image: {
    height: 100,
  },

});

const postModalStyles = StyleSheet.create({

  container: {
    alignContent: 'center',
  },

  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
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

