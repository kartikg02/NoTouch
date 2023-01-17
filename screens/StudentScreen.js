import { useState } from 'react';
import { StyleSheet, Text, View,TextInput,ScrollView,Pressable, Alert,Platform } from 'react-native';
export default function StudentScreen({navigation}){
    const [inputVal,setInput]=useState('')
    const [disable,setDisable]=useState(true)
    function enterDetails(){
      navigation.navigate('DetailsScreen')
    }
    const otpEntered=(txt)=>
    {
         setInput(txt)
         
    }
    const verifyOTP=(otp)=>{
        fetch('https://capstone-b1d1d-default-rtdb.firebaseio.com/OTP.json',{
                method:'GET',
                
            }).then((res)=>{
                //console.log('done')
                return res.json();
            })
            .then((resp)=>{
                let myarr=Object.keys(resp);
                let myotp=Object.keys(resp[myarr]);    
                if(parseInt(inputVal)===resp[myarr[0]].genOTP)
                {
                    if(inputVal && inputVal.length===4)
                    {
                      setDisable(false)
                    }
                }
                else{
                    Alert.alert('Invalid OTP entered')
                    setInput('')
                    setDisable(true)
                }
                
            })
            .catch((Err)=>{
                Alert.alert('OTP not generated, Contact your respective teacher')
                setInput('')
                setDisable(true)
            })
        
    }
    return (
           <View style={styles.container}>
            <TextInput style={styles.input} placeholder='Enter OTP generated by teacher' placeholderTextColor="#ffffff" keyboardType='numeric' name="txtinp" value={inputVal} onChangeText={otpEntered}/>
            <Pressable style={Platform.OS==="ios"?styles.pressAble:styles.androidpressAble} onPress={verifyOTP} disabled={!disable}>
                {disable?<Text style={styles.text}>Verify OTP</Text>:<></>}
            </Pressable>
            <Pressable style={Platform.OS==="ios"?styles.pressAble:styles.androidpressAble} onPress={enterDetails} disabled={disable}>
                {!disable?<Text style={styles.text}>Verified!Press to Continue</Text>:<></>}
            </Pressable>
            </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    androidpressAble:{
        borderColor:"#CFD2CF",
        borderRadius:7
      },
    pressAble:{
        borderWidth:2,
        borderColor:"#CFD2CF",
        borderRadius:7
    },
    text:{
        backgroundColor:'#495C83',
        color:'#ffffff',
        padding:10,
        borderRadius:100,
        fontSize:20
    },
    input:{
        backgroundColor:'#7A86B6',
        borderColor:"#495C83",
        borderWidth:4,
        borderRadius:20,
        padding:20,
        marginVertical:20,
        color:'#ffffff',
        width:350

    }
  });