/* eslint-disable */
import { Button } from "@rneui/themed";
import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";
import BottomTool from "../components/BottonTool";

const BOM= ({navigation}) =>{
    
    const boms=['A','B','C','D','E',];
    const [modalVisible, setModalVisible]= useState(false);

    const bomPopupData =['A-1','A-2','A-3','A-4','A-5',];

    const [data, setData]= useState();


    return (
        
        <View style={[styles.container,styles.spaceAround]}>
            <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=>{setModalVisible(!modalVisible)}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* <Text>{data}</Text>
                        <View>
                            {
                                bomPopupData.map((data, index)=>(
                                    <Text key={index}>{data}</Text>
                                ))
                            }
                        </View> */}

                        <Table>
                            <Row data={[data]} style={styles.head} />
                            {
                                bomPopupData.map((data, index)=>(
                                        <Cell key={index} data={data} style={styles.tableRow} onPress={()=>{navigation.push('BOMDetail',{id:index,title:data})}}/>
                                ))
                            }
                        </Table>
                        
                        
                        <View style={[styles.row]}>
                            <Button title={'수정'} onPress={()=>{}} />
                            <Button title={'취소'} onPress={() => setModalVisible(!modalVisible)} />
                        </View>
                    </View>
                </View>
            </Modal>

            {
                boms.map((data, index)=>(
                    <View key={index}><Button title={data} onPress={()=>{
                        setData(data);
                        setModalVisible(!modalVisible);
                        }}/>
                        </View>
                ))
            }
            <BottomTool navigation={navigation} />
        </View>
        
    );
}
const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#f1f8ff', width:'100%', paddingLeft: 15 },
    tableRow: {flexDirection: 'row', height: 40, backgroundColor: '#E7E6E1' },
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

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        // width:'80%',
        // height:'50%',
      },
      modalView: {
        width:'90%',
        height:'60%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 60,
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
    spaceBetween:{
        justifyContent:"space-between"
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
});

export default BOM;