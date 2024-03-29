import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import Colors from "../../constants/Colors";

const CustomeHaderButton = (props)=>{
    return <HeaderButton 
    {...props}
     IconComponent={Ionicons}
     iconSize={30} 
     color={Platform.OS==='android' ? 'blue': Colors.alert}
    />
}

export default CustomeHaderButton;