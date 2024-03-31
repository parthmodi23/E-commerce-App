import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, Button, ActivityIndicator, Alert } from 'react-native'
import Card from '../../components/UI/Card'
import Forminput from '../../components/UI/forminput'
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth'
import CustomeButton from '../../components/shop/CustomeButton';

import { LinearGradient } from 'expo-linear-gradient';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };

        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const AuthScreen = props => {
    const dispatch = useDispatch();
    const [isloading, setIsLoading] = useState(false)
    const [issignin, Setissignin] = useState(false)
    const [error, setError] = useState(null)
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });
    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occured!', error, [{ type: 'okay' }])
            return
            // setIsLoading(false)
        }
    }, [error])

    const signupHandler = async () => {
        let action;
        if (issignin) {
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password
            )
            console.log('use login')

        } else {
            console.log(formState.inputValues.email)
            action = authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password
            )
            console.log('use sing up')
        }
        setError(null)
        setIsLoading(true);
        try {
            await dispatch(action)
            console.log(error)
            props.navigation.navigate('Main')
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }

    const inputissigninHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );


    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Forminput
                            id="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address."
                            onInputChange={inputissigninHandler}
                            initialValue="test7@gmail.com"
                        />
                        <Forminput
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            // minLength={4}
                            autoCapitalize="none"
                            errorText="Please enter a valid password."
                            //here is the main change 
                            onInputChange={inputissigninHandler}
                            initialValue="7777777"
                        />

                        <View style={styles.buttonContainer}>
                            <View>
                                {!isloading ?
                                    <CustomeButton style={styles.authbutton} onPress={signupHandler}>
                                        {issignin ? "Login" : "Sign Up"}

                                    </CustomeButton> :
                                    <ActivityIndicator size='large' color='black' />
                                }
                            </View>
                            <View>
                                {console.log(issignin, isloading)}
                                <CustomeButton style={styles.authbutton} onPress={() => Setissignin(prev => !prev)}
                                >
                                    {`Switch to ${issignin ? 'sign up' : 'login'}`}
                                </CustomeButton>
                            </View>
                        </View>
                    </ScrollView>
                </Card>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent:'center',

   },
    gradient: {

    },
    authContainer: {
        marginVertical: 20,
        marginHorizontal: 30
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin:2
    },
    authbutton: {
        backgroundColor: 'lightblue',
        borderRadius: 5,
        margin:5,
        width:'50%'
    }
});

export default AuthScreen;

