/* eslint-disable */
import { NavigationContainer,  } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BOM from "../views/BOM";
import BOMDetail from "../views/BomDetail";
import Drawing from "../views/Drawing";
import Home from "../views/Home";
import Model from "../views/Model";
import ModelDetail from "../views/ModelDetail";
import ProductionPlan from "../views/ProductionPlan";
import Stock from "../views/Stock";
import Submaterial from "../views/Submaterial";
import WorkPlan from "../views/WorkPlan";

const Stack = createNativeStackNavigator();

const Navigator= ()=>{
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
                <Stack.Screen name="Home" component={Home}></Stack.Screen>
                <Stack.Screen name="Model" component={Model}></Stack.Screen>
                <Stack.Screen name="ModelDetail" component={ModelDetail}></Stack.Screen>
                <Stack.Screen name="ProductionPlan" component={ProductionPlan}></Stack.Screen>
                <Stack.Screen name="WorkPlan" component={WorkPlan}></Stack.Screen>
                <Stack.Screen name="BOM" component={BOM}></Stack.Screen>
                <Stack.Screen name="Drawing" component={Drawing}></Stack.Screen>
                <Stack.Screen name="Stock" component={Stock}></Stack.Screen>
                <Stack.Screen name="Submaterial" component={Submaterial}></Stack.Screen>
                <Stack.Screen name="BOMDetail" component={BOMDetail}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;