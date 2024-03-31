import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useReducer, useState, } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, KeyboardAvoidingView,ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import CustomeHaderButton from '../../components/UI/HeaderButton';
import * as productaction from '../../store/actions/productaction';
import Forminput from '../../components/UI/forminput';
import { isLoading } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { AntDesign } from '@expo/vector-icons';

const UPDATE_FORM_DATA = 'UPDATE_FORM_DATA';

const formReducer = (state, action) => {
  if (action.type === UPDATE_FORM_DATA) {
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
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const EditProductPage = (props) => {
  const [isloading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const dispatch = useDispatch();
  const route = useRoute();
  const editProductId = route.params?.productid;
  const editableProduct = useSelector(state => state.products.userProducts.find(product => product.id === editProductId));
  console.log(editableProduct)

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editableProduct ? editableProduct.title : '',
      imageUrl: editableProduct ? editableProduct.imageUrl : '',
      price: editableProduct ? editableProduct.price : '',
      description: editableProduct ? editableProduct.description : ''
    },
    inputValidities: {
      title: editableProduct ? true : false,
      imageUrl: editableProduct ? true : false,
      price: editableProduct ? true : false,
      description: editableProduct ? true : false
    },
    formIsValid: editableProduct ? true : false
  });

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    console.log(inputValue);
    dispatchFormState({
      type: UPDATE_FORM_DATA,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    });
  }, [dispatchFormState]);

  useEffect(()=>{
    if(error){
      Alert.alert('An Error Occured!',error,[{type:'okay'}])
      return
    }
  },[error])

  const handleSubmit = useCallback(async () => {
    console.log(formState)
    if (!formState.formIsValid) {
      Alert.alert('Alert', 'Please fill all the input fields.', [{ text: 'Okay', style: 'default' }]);
      return;
    }
    try {
    setError(null)
    setIsLoading(true)
      if (editableProduct) {
        await dispatch(
          productaction.updateproduct(
            editProductId,
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            +formState.inputValues.price,
            formState.inputValues.description));
      } else {
        await dispatch(
          productaction.createproduct(
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            +formState.inputValues.price,
            formState.inputValues.description));
      }
      props.navigation.goBack();
    } catch(error) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [dispatch, formState, editableProduct, editProductId]);

 // Render the component
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View>
                      <TouchableOpacity>

          <HeaderButtons HeaderButtonComponent={CustomeHaderButton}>
            <AntDesign
                        name="checkcircle"
                        size={24}
                        color="black"
                        onPress={handleSubmit}
                        />
         
          </HeaderButtons>
          </TouchableOpacity>

        </View>
      )
    });
  }, [props.navigation, handleSubmit]);

  if(isloading){
    return(
      <View style={styles.loading}>
        <ActivityIndicator size='large' color='black'/>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.mainscreen}>
 
          <Forminput
            id='title'
            label="Title"
            keyboardType='default'
            autoCapitalize='words'
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editableProduct ? editableProduct.title : ""}
            initiallyValid={!!editableProduct}
            required
          />

          <Forminput
            id='imageUrl'
            label="Image Url"
            keyboardType='default'
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editableProduct ? editableProduct.imageUrl : ""}
            initiallyValid={!!editableProduct}
            required
          />

          <Forminput
            id='price'
            label="Price"
            keyboardType='decimal-pad'
            onFocus={() => console.log('hello')}
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editableProduct ? editableProduct.price.toString() : ""}
            initiallyValid={!!editableProduct}
            required
            multiline
            min={0.1}
          />

          <Forminput
            id='description'
            label="description"
            onFocus={() => console.log('hello')}
            returnKeyType="next"
            autoCapitalize='words'
            onInputChange={inputChangeHandler}
            autoCorrect
            multiline
            numberOfLines={3}
            initialValue={editableProduct ? editableProduct.description : ""}
            initiallyValid={!!editableProduct}
          />


          {/* 
          <View style={styles.box}>
            <Text style={styles.label}>Image Url</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.imageUrl}
              onChangeText={(text) => handleInputChange('imageUrl', text, text.trim().length > 0)}
            />
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={(text) => handleInputChange('price', text, !isNaN(text))}
              keyboardType='decimal-pad'
              onFocus={() => console.log('hello')}
            />
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.description}
              onChangeText={(text) => handleInputChange('description', text, text.trim().length > 0)}
            />
          </View> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainscreen: {
    flex: 1,
  },
  loading:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'  
  }
});

export default EditProductPage;
