/* eslint-disable */
// import { Button } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View, Button, ActivityIndicator } from "react-native"
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";
import { getAllModelApi } from "../api";
import BottomTool from "../components/BottonTool";
import { BomPopupData, Boms } from "../sampleData";

const BOM= ({navigation}) =>{
    
    const boms=Boms;
    const bomPopupData =BomPopupData;

    const [modalVisible, setModalVisible]= useState(false);
    const [loading, setLoading] = useState(true);

    const [data, setData]= useState([]);
    const [modalData, setModalData] = useState({});

    const getModels = async() =>{
        try {
            const json = await getAllModelApi();
            console.log(json);
            setData(json);
            setLoading(!loading);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getModels()
    },[]);


    return (
        
        <View style={[styles.container,styles.spaceAround]}>
            <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=>{setModalVisible(!modalVisible)}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={[styles.row, styles.spaceBetween]}>
                            <Button title={'이전'} />
                            <Button title={'다음'} />
                        </View>

                        <Table>
                            <Row data={[modalData.name]} style={styles.head} />
                            <TableWrapper style={styles.flexRow}>
                                <TableWrapper style={styles.table}>
                                    {
                                        bomPopupData.map((data, index)=>(
                                                <Cell key={index} data={data} style={styles.tableRow} onPress={()=>{navigation.push('BOMDetail',{id:index,title:data})}}/>
                                        ))
                                    }
                                </TableWrapper>
                                <TableWrapper style={styles.table}>
                                    {
                                        bomPopupData.map((data, index)=>(
                                                <Cell key={index} data={data} style={styles.tableRow} onPress={()=>{navigation.push('BOMDetail',{id:index,title:data})}}/>
                                        ))
                                    }
                                </TableWrapper>
                            </TableWrapper>
                            
                        </Table>
                        
                        
                        <View style={[styles.row]}>
                            <Button title={'수정'} onPress={()=>{}} />
                            <Button title={'취소'} onPress={() => setModalVisible(!modalVisible)} />
                        </View>
                    </View>
                </View>
            </Modal>

            {
                loading ?
                <ActivityIndicator size={'large'} />
                :
                data.map((data, index)=>(
                    <View key={index}><Button title={data.name} onPress={()=>{
                        setModalData(data);
                        setModalVisible(!modalVisible);
                        //해당 bom 리스트 받아오기 g/l로 두개씩 useState로 관리하게
                        }}/>
                        </View>
                ))
            }
            <BottomTool navigation={navigation} >
                <Button title={'수정'} />
            </BottomTool>
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
        // alignItems: "center",
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
    flexRow: {
        flexDirection:"row",
        // flex:1
    },
    table:{
        width:'50%',
        height:'70%'
    }
});

export default BOM;