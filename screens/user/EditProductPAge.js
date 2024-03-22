import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useReducer } from 'react';
import { Alert, StyleSheet, Text, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import CustomeHaderButton from '../../components/UI/HeaderButton';
import * as productaction from '../../store/actions/productaction';

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
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const EditProductPage = (props) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const editProductId = route.params?.productid;
  const editableProduct = useSelector(state => state.products.userProducts.find(product => product.id === editProductId));

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editableProduct ? editableProduct.title : '',
      imageUrl: editableProduct ? editableProduct.imageUrl : '',
      price: editableProduct ? editableProduct.price.toString() : '',
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

  const handleInputChange = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: UPDATE_FORM_DATA,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    });
  }, [dispatchFormState]);


  const handleSubmit = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wait!', 'Please fill all the input fields.', [{ text: 'Okay', style: 'default' }]);
      return;
    }
    if (editableProduct) {
      dispatch(productaction.updateproduct(editProductId, formState.inputValues.title, formState.inputValues.imageUrl, +formState.inputValues.price, formState.inputValues.description));
    } else {
      dispatch(productaction.createproduct(formState.inputValues.title, formState.inputValues.imageUrl, +formState.inputValues.price, formState.inputValues.description));
    }
    props.navigation.goBack();
  }, [dispatch, formState, editableProduct, editProductId]);



  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View>
          <HeaderButtons HeaderButtonComponent={CustomeHaderButton}>
            <Item title="save"
              iconName="star"
              onPress={handleSubmit}
            />
          </HeaderButtons>
        </View>
      )
    });
  }, [props.navigation, handleSubmit]);

  return (
    <ScrollView>
      <View style={styles.mainscreen}>
        <View>
          <View style={styles.box}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.title}
              onChangeText={(text) => handleInputChange('title', text, text.trim().length > 0)}
              autoCapitalize='words'
            />
            {!formState.inputValidities.title && <Text>Please enter a valid title!</Text>}
          </View>
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
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainscreen: {
    flex: 1,
  },
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
  }
});

export default EditProductPage;
