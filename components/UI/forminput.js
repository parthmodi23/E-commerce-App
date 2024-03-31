import React, { useEffect, useReducer } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import fonts from '../../constants/fonts'

const ACTIONS={
     INPUT_HANDLE:'INPUT_HANDLE',
     LOST_FOCUS:'LOST_FOCUS'
}

const inputReducer=(state,action)=>{
    if(action.type===ACTIONS.INPUT_HANDLE){
return{
    ...state,
    value:action.value,
    isValid:action.isValid
}
    }

    if(action.type===ACTIONS.LOST_FOCUS){
        return{
            ...state,
            touch:true

        }
    }

}
const Forminput = (props) => {


    const [inputState,dispatch]=useReducer(inputReducer,
        {
        value:props.initialValue ? props.initialValue:'',
        isValid:props.initiallyvalid,
        touch:false
    }
        )

//to avoid infinite rendering and we use object destructuring
const {onInputChange,id}=props 
useEffect(() => {
    console.log(inputState);
    if (inputState.touch) {
        onInputChange(id, inputState.value, inputState.isValid);
    }
}, [id, inputState.touch, inputState.value, inputState.isValid, onInputChange]);


        const textChangeHandler=(text)=>{
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            let isValid=true
            if(props.require && text.trim().length===0){
                isValid=false
            }
            if(props.email && !emailRegex.test(text.toLowerCase())){
                isValid=false
            }
            if(props.min!=null && +text < props.min){
                isValid=false
            }
            if(props.max!=null && +text < props.max){
                isValid=false
            }
            if(props.minLength!=null && text.length<props.minLength){
                isValid=false
            }
            dispatch(
                {
                    type:ACTIONS.INPUT_HANDLE,
                    value:text,
                    isValid:isValid
                }
            )
        }

         const lostfocus=()=>{
            dispatch({
                type:ACTIONS.LOST_FOCUS
            })
         }

  return (
    <View style={styles.box}>
    <Text style={styles.label}>{props.label}</Text>
    <TextInput
      {...props}
      style={styles.input}
      value={inputState.value}
      onChangeText={textChangeHandler}
      onBlur={lostfocus}
    />
    {!inputState.isValid && inputState.touch &&
    (<View style={styles.errorcontainer}>
        <Text style={styles.errortext}>Please enter a valid {props.label}!</Text>
    </View>)
    }
  </View>
    
  )
}

const styles=StyleSheet.create({
    box: {
        margin: 5,
        borderWidth: 1,
        borderColor: 'black',
        paddingBottom: 10,
        // paddingHorizontal: 5,
      },
      label: {
        backgroundColor: 'lightblue',
        fontSize: 15
      },
      input: {
        borderBottomColor: 'black',
        borderBottomWidth: 3,
        marginHorizontal: 5
      },
      errorcontainer:{
marginVertical:10
      },
      errortext:{
        fontFamily:fonts.commonfonts,
        color:'red',
        fontSize:12
      }
})
export default Forminput
