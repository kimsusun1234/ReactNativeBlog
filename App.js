import React, { useState, createContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import Provider from './navigation/Provider';

export default Provider;

export const userProfile = {

  email: null,
  password: null,
  uid: null,
  phone: null,
  name: null,

};

// export default function App() {
//   const [a, setA] = useState(0);
//   const [b, setB] = useState(0);
//   const [c, setC] = useState(0);
//   return (
//     <View style={styles.container}>
//       <Text style={styles.loginText}>Login</Text>
      
//       <TextInput
//           placeholder='User'
//           style={styles.textInputUserPass}/>
//         <TextInput
//           placeholder='Pass'
//           style={styles.textInputUserPass}/>

//         <Button
//           title='Login'
//           style={styles.loginBtn}/>
//     </View>
//   );

  
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:"center",
    justifyContent: 'center',
  },

  
});
