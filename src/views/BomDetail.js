/*eslint-disable*/
// import { Text } from "@rneui/themed";
import { useCallback, useEffect, useState } from "react";
import { Modal, StyleSheet, Switch, TextInput, TouchableOpacity, View, Button, Text, ActivityIndicator, Alert } from "react-native";
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";
import BottomTool from "../components/BottonTool";
import { bdRowHead, bdSampleBody } from "../sampleData";
import  DocumentPicker  from 'react-native-document-picker'
import { getAllBomAPi, patchBomAPi, postWorkPlanAPi, socket } from "../api";

const BOMDetail=({route, navigation})=>{
    const {id, type} =route.params;

    const [modalVisible, setModalVisible]=useState(false);
    const [modalData, setModalData]= useState({});
    const [EA,setEA] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [fileResponse, setFileResponse] = useState([]);
    const [loading, setLoading] = useState(true); //나중에는 true로
    const [data, setData] = useState([]);

    const rowHead=bdRowHead;
    const sampleBody=bdSampleBody;

    const getBoms = async()=>{
        const json = await getAllBomAPi(id,type);
        // console.log(id, type);
        setData(json);
        setLoading(false);
        // console.log(json);
    }

    useEffect(()=>{
        getBoms();
    },[]);
    
    const edit =() =>{
        setIsEdit(!isEdit);
    }
    const doneEdit = () =>{
        setIsEdit(!isEdit);

        // 서버 작업
    }
    
    const plan = (d, index) => (
        <View>
            {
                isEdit ?
                <TouchableOpacity onPress={async () =>{
                    try {
                        await patchBomAPi(data[index]);
                        Alert.alert('수정','수정 완료');
                        // console.log(data[index]);
                    } catch (error) {   
                    }
                }}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>확인</Text>
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => {
                    // setModalData(index);
                      setModalData(d);
                      setModalVisible(!modalVisible)
                      }}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>계획</Text>
                    </View>
                </TouchableOpacity>
            }
        </View>
      );

    const cellInfo = (d, index, key) =>(
        <View style={[styles.row]}>
            {
                isEdit ?
                <TextInput value={`${d}`} onChangeText={(txt)=>{
                    const newData = [...data];
                    newData[index][key] = txt;
                    setData(newData);
                }} />
                :
                <Text>{d}</Text>

            }
        </View>
    );


    const check = (d, index, key)=>(
        <View>
            {
                isEdit ?
                <Switch value={d} onValueChange={(val)=>{
                    const newData =[...data];
                    newData[index][key] = !d;
                    setData(newData);
                }}/>
                :
                d ?
                <Text>{'O'}</Text>
                :
                <Text>{'X'}</Text>

            }
        </View>
    );
    
    //얘도 안사용
    const convert = (data, index)=> {
        if(data) return check(data);
        else if(!data) return check( data);
    } 
    const drawing = (data) =>(
        <View>
            {
                isEdit ?
                <TouchableOpacity onPress={handleDocumentSelection}>
                    <Text>image</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>alert('image')}>
                    <Text>{data}</Text>
                </TouchableOpacity>
            }
        </View>
    )
    
    //얘도 안사용
    const cell = (data, index) =>{
        if(index === 0) return drawing(data);
        else if(typeof data === 'boolean') return convert(data);
        else return cellInfo(data);
    }

    return(
        <View style={styles.container}>
            

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
                            <Button title={'확인'} onPress={async ()=>{
                                //여기서 값 저장 로직
                                const workPlan={};
                                workPlan.bomId = modalData.id;
                                workPlan.EA = EA;
                                // console.log(modalData);
                                try {
                                    await postWorkPlanAPi(workPlan);
                                } catch (error) {
                                }
                                Alert.alert('계획','일일계획 생성이 완료되었습니다');
                                setEA(0);
                                setModalVisible(!modalVisible);

                                socket.emit('work-plan');

                            }}/>
                            <Button title={'취소'} onPress={()=>setModalVisible(!modalVisible)}/>
                        </View>
                    </View>
                </View>
            </Modal>

            {
                loading ?
                <ActivityIndicator size={'large'} />
                :
                <Table>
                    <Row data={rowHead} style={styles.head} />
                    {
                        data.map((rowData, index)=>(
                            <TableWrapper style={styles.tableRow}>
                                {/* {
                                    data.map((cellData, cellIndex)=>(
                                        // <Cell key={cellIndex} data={typeof cellData === 'boolean' ? convert(cellData) : cellInfo(cellData)} />
                                        <Cell key={cellIndex} data={cell(cellData, cellIndex)} />
                                    ))
                                } */}
                                <Cell data={index +1} />
                                <Cell data={cellInfo(rowData.pi, index, 'pi')} />
                                <Cell data={cellInfo(rowData.size, index, 'size')} />
                                <Cell data={check(rowData.CNC, index, 'CNC')} />
                                <Cell data={check(rowData.T, index, 'T')} />
                                <Cell data={check(rowData.enlrgmnt, index, 'enlrgmnt')} />
                                <Cell data={check(rowData.reduction, index, 'reduction')} />
                                <Cell data={check(rowData.shorten, index, 'shorten')} />
                                <Cell data={cellInfo(rowData.requirement, index, 'requirement')} />
                                <Cell data={plan(rowData, index)}/>
                            </TableWrapper>
                        ))
                    }
                </Table>
            }

            

            <BottomTool navigation={navigation}>
                {
                    isEdit ?
                    <Button title={'완료'} onPress={()=> doneEdit()}/>
                    :
                    <Button title={'수정'} onPress={()=>edit()}/>
                }
            </BottomTool>
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