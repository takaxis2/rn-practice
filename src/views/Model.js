/* eslint-disable */
import { Button } from "@rneui/themed";
import { useEffect, useState } from "react";
import {  StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTool from "../components/BottonTool";
import { URL } from "../api/index";

const Model= ({navigation}) =>{
    const modelData=['A','B','C','D','E',];
    const {data, setData} = useState();

    const getModels = async () => {
        const res = await fetch(`${URL}/model`, {
          method: "GET",
        });
        setData(res);
        alert(res);
    };

    useEffect(()=>{
        getModels();
    });

    return (
        
        <View style={[styles.container,styles.spaceAround]}>
            
            {
                modelData.map((data, index)=>(
                    <View key={index}><Button title={data} onPress={()=>{navigation.push('ModelDetail',{title: data})}}/></View>
                ))
            }
            <BottomTool navigation={navigation} />
        </View>
        
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "aliceblue",
      },
      spaceAround:{
        justifyContent: 'space-around',
        margin: 8,
    },
    button:{
        width:100,
        height:50,
        padding:10,
        margin:10
    },
});

export default Model;