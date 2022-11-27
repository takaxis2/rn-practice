/*eslint-disable*/
import { Button, Text } from "@rneui/themed";
import { useState } from "react";
import { Modal, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";
import BottomTool from "../components/BottonTool";

const BOMDetail=({route, navigation})=>{
    const {id, title} =route.params;

    const [modalVisible, setModalVisible]=useState(false);
    const [EA,setEA] = useState(0);

    const rowHead=['id','파이','치수','중량','T뽑기','CNC','비고','일일계획',];
    const sampleBody=[
        [1,7,125,54,'유','무',' ',' '],
        [1,7,125,54,'유','무',' ',' '],
        [1,7,125,54,'유','무',' ',' '],
        [1,7,125,54,'유','무',' ',' '],
    ];

    const plan = (data, index) => (
        <TouchableOpacity onPress={() => {
        //   setModalData(index);
          setModalVisible(!modalVisible)
          }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>계획</Text>
          </View>
        </TouchableOpacity>
      );

    return(
        <View style={styles.container}>
            <Text>this is BOMDetail page</Text>
            <Text>{id}</Text>
            <Text>{title}</Text>

            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>수량</Text>
                        <TextInput value={EA} onChangeText={setEA} placeholder={'수량을 입력하세요'} />
                        <View style={[styles.row, styles.spaceBetween]}>
                            <Button title={'확인'} onPress={()=>{
                                //여기서 값 저장 로직
                                setModalVisible(!modalVisible);
                            }}/>
                            <Button title={'취소'} onPress={()=>setModalVisible(!modalVisible)}/>
                        </View>
                    </View>
                </View>
            </Modal>

            <Table>
                <Row data={rowHead} style={styles.head} />
                
                    {
                        sampleBody.map((rowData, index)=>(
                            <TableWrapper style={styles.tableRow}>
                                {
                                    rowData.map((cellData, cellIndex)=>(
                                        <Cell key={cellIndex} data={cellIndex === 7 ? plan(cellData, cellIndex): cellData} />
                                    ))
                                }
                            </TableWrapper>
                        ))
                    }
                
            </Table>

            <BottomTool navigation={navigation} />
        </View>
    );
}

const styles=StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    tableRow: {flexDirection: 'row', height: 40, backgroundColor: '#E7E6E1' },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        // width:'80%',
        // height:'50%',
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
      row:{flexDirection:"row"},
      spaceBetween:{justifyContent:"space-between"},
});

export default BOMDetail;