/* eslint-disable */
// import { Button } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, ScrollView } from "react-native"
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";
import { getAllGBomAPi, getAllLBomAPi, getAllModelApi, getAllModelDetailAPi } from "../api";
import BottomTool from "../components/BottonTool";
import { BomPopupData, Boms } from "../sampleData";
import { CButton as Button } from "../components/CustomButton";

const BOM = ({ navigation }) => {

    const boms = Boms;
    const bomPopupData = BomPopupData;

    const [modalVisible, setModalVisible] = useState(false);

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState([]);
    const [modalData, setModalData] = useState({});
    const [bomList, setBomList] = useState([]);

    const [edit, setEdit] = useState(false);

    // const [gBoms, setGBoms] =useState([]);
    // const [lBoms, setLBoms] =useState([]);

    // const getGBoms = async(id)=>{
    //     const json = await getAllGBomAPi(id);
    //     setGBoms(json);
    // };
    // const getLBoms = async(id)=>{
    //     const json = await getAllLBomAPi(id);
    //     setLBoms(json);
    // };

    const getModelDetails = async (id) => {
        const json = await getAllModelDetailAPi(id);
        setBomList(json);
        // console.log(json);
    }

    const getModels = async () => {
        try {
            const json = await getAllModelApi();
            // console.log(json);
            setData(json);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const glCell = (name, id, type) => (
        <View style={[styles.row, styles.glSpace]}>

            {
                edit ?
                    <TextInput value={name} onChangeText={() => { }} />
                    :
                    <TouchableOpacity onPress={() => {
                        setModalVisible(!modalVisible);
                        navigation.push('BOMDetail', { id: id, type: type, name: name });
                    }}>
                        <Text>{name}</Text>
                    </TouchableOpacity>

            }

            <TouchableOpacity onPress={() => { }}>
                {
                    edit &&
                    <Text>{'확인'}</Text>
                }
            </TouchableOpacity>

        </View>
    );



    useEffect(() => {
        getModels()
    }, []);


    return (

        <View style={[styles.container, styles.spaceAround]}>



            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(!modalVisible) }}>
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, styles.spaceBetween]}>
                        {/* <View style={[styles.row, styles.spaceBetween]}>
                            <Button title={'이전'} />
                            <Button title={'다음'} />
                        </View> */}

                        <Table>
                            <Row data={[modalData.name]} textStyle={styles.text} style={styles.head} />
                            <Row data={['g', 'l']} textStyle={[styles.text, styles.textalign]} style={styles.head} />
                            <TableWrapper style={styles.flexRow}>
                                <TableWrapper style={styles.table}>
                                    <ScrollView style={[styles.scrollview]}>
                                        {
                                            bomList.map((data, index) => (
                                                // <Cell key={index} data={data.name} style={styles.tableRow} onPress={()=>{
                                                //     setModalVisible(!modalVisible);
                                                //     navigation.push('BOMDetail',{id:data.id, type:"g", });
                                                // }}/>
                                                <Cell key={index} data={glCell(data.name, data.id, "g")} style={styles.tableRow} />
                                            ))
                                        }
                                    </ScrollView>
                                </TableWrapper>

                                <TableWrapper style={styles.table}>
                                    <ScrollView>
                                        {
                                            bomList.map((data, index) => (
                                                <Cell key={index} data={glCell(data.name, data.id, "l")} style={styles.tableRow} />
                                            ))
                                        }
                                    </ScrollView>
                                </TableWrapper>
                            </TableWrapper>

                        </Table>


                        <View style={[styles.row]}>
                            {/* <Button title={edit ? '완료' : '수정'} onPress={() => setEdit(!edit)} /> */}
                            <Button title={'취소'} onPress={() => setModalVisible(!modalVisible)} />
                        </View>
                    </View>
                </View>
            </Modal>

            {
                loading ?
                    <ActivityIndicator size={'large'} />
                    :
                    data.map((data, index) => (
                        <View key={index}><Button title={data.name} onPress={() => {
                            setModalData(data);
                            setModalVisible(!modalVisible);
                            //해당 bom 리스트 받아오기 g/l로 두개씩 useState로 관리하게
                            getModelDetails(data.id);
                            // getLBoms(data.id);
                            // getGBoms(data.id);
                        }} />
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
    head: { borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1 },
    tableRow: { flexDirection: 'row', height: 40, backgroundColor: '#8e8e8e' },
    container: {
        flex: 1,
        backgroundColor: "aliceblue",
    },
    spaceAround: {
        justifyContent: 'space-around',
        margin: 8,
    },
    glSpace: {
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        width: 100,
        height: 50,
        padding: 10,
        margin: 10
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
        width: '90%',
        height: '50%',
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
    spaceBetween: {
        justifyContent: "space-between"
    },
    row: {
        flexDirection: "row",
    },
    flexRow: {
        flexDirection: "row",
        // flex:1
    },
    table: {
        width: '50%',
        height: '70%'
    },
    text: {
        color: '#808080',
    },
    textalign: {
        textAlign: 'center'
    },
    scrollview:{
        height:'100%'
    },
});

export default BOM;