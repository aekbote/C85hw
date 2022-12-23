import React, { Component } from "react";
import { StyleSheet, View, Image,Text, TextInput, Alert, SafeAreaView } from "react-native";
import firebase from "firebase";
import * as Font from "expo-font";
//import { RFValue } from "react-native-responsive-fontsize";

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

const appIcon = require("../assets/logo.png");


export default class RegisterScreen extends Component {
    constructor(props){
        super(props);
        this.state={
          fontsLoaded: false,
          email: '',
          password: '',
          first_name:'',
          last_name: '',
          confirmPassword: '',
          
        }
    }
    
      async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
      }

      registerUser = (email,password,confirmPassword,first_name,last_name) => {
            if(password==confirmPassword){
                firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    Alert.alert("User is Registered!");
                })
                .catch(error => {
                    Alert.alert(error.message);
                });
            }else{
            Alert.alert("The password put in doesn't match!") }
         
        };

        render() {
            if (this.state.fontsLoaded) {
              SplashScreen.hideAsync();
              const {email, password, confirmPassword, first_name, last_name} = this.state;
        
              return (
                <SafeAreaView>
                  <View style={styles.container}>
                    <Text style={styles.title}>Register</Text>  
        
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={(text) => this.setState({first_name: text})}
                      placeHolder={"Enter first Name"}
                      placeholderTextColor={"pink"}
                    />   
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={(text) => this.setState({last_name: text})}
                      placeHolder={"Enter Last Name"}
                      placeholderTextColor={"pink"}
                    />  

                    <TextInput
                      style={styles.inputBox}
                      onChangeText={(text) => this.setState({email: text})}
                      placeHolder={"Enter Email"}
                      placeholderTextColor={"pink"}
                    />   

                    <TextInput
                      style={styles.inputBox}
                      onChangeText={(text) => this.setState({password: text})}
                      placeHolder={"Enter Password"}
                      placeholderTextColor={"pink"}
                    />   
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={(text) => this.setState({confirPassword: text})}
                      placeHolder={"Confirm Password"}
                      placeholderTextColor={"pink"}
                    />

                    <TouchableOpacity
                    onPress={() => this.registerUser(email,password,first_name, last_name, confirmPassword)}
                    ><Text>Register</Text></TouchableOpacity>
                    
                    <TouchableOpacity
                    onPress={() => this.props.navigate.navigation("LoginScreen")}
                    ><Text>Login</Text></TouchableOpacity>
        
                  </View>
                </SafeAreaView>
               
              )
            }
          }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black"
    },
    title: {
      textAlign: 'center',
      color: 'purple',
      fontSize: 22,
    },
    inputBox: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '80%',
      height: 40,
      borderWidth: 4,
    },
  
  })