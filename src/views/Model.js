/* eslint-disable */
// import { Button } from "@rneui/themed";
import { useState, useEffect } from "react";
import {  StyleSheet, Text, View, Modal, ActivityIndicator, Button } from "react-native";
import BottomTool from "../components/BottonTool";
import { getAllModelApi } from "../api/index";
import { model } from "../sampleData";

const Model= ({navigation}) =>{
    const modelData = model;
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const getModels = async() => {
        try {
            //   const result = 
              const json = await getAllModelApi();
              console.log(json);
              setData(json);
              console.log(json);
        } catch (error) {
            console.log(error);
        }
       
       
    };

    useEffect(() => {
        getModels();    
    }, []);

    return (
        
        <View style={[styles.container,styles.spaceAround]}>
            
            {/* <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={()=>setModalVisible(!modalVisible)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>수정 입니다</Text>
                    </View>
                </View>
            </Modal> */}
            {
                data.map((data, index)=>(
                    <View key={index}>
                        <Button key={data.id} style={styles.button} title={data.name} onPress={()=>{navigation.push('ModelDetail',{title: data.name})}}/>
                    </View>
                    ))

                    
            }
            {/* <Button title={'test'} onPress={()=>setModalVisible(!modalVisible)}/> */}
            <BottomTool navigation={navigation} >
                <Button onPress={()=>setModalVisible(!modalVisible)} title={'수정'}/>
            </BottomTool>
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
        width:'50%',
        height:'50%',
        padding:10,
        margin:10,
        flex:1
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
});

export default Model;