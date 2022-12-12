/*eslint-disable*/
// import { Text } from "@rneui/themed";
import { useCallback, useState } from "react";
import { Modal, StyleSheet, Switch, TextInput, TouchableOpacity, View, Button, Text, ActivityIndicator } from "react-native";
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";
import BottomTool from "../components/BottonTool";
import { bdRowHead, bdSampleBody } from "../sampleData";
import  DocumentPicker  from 'react-native-document-picker'

const BOMDetail=({route, navigation})=>{
    const {id, title} =route.params;

    const [modalVisible, setModalVisible]=useState(false);
    const [EA,setEA] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [fileResponse, setFileResponse] = useState([]);
    const [loading, setLoading] = useState(false); //나중에는 true로

    const rowHead=bdRowHead;
    const sampleBody=bdSampleBody;

    const handleDocumentSelection = useCallback(async () => {
        try {
          const response = await DocumentPicker.pick({
            presentationStyle: 'fullScreen',
          });
          setFileResponse(response);
        } catch (err) {
          console.warn(err);
        }
      }, []);
    
    const edit =() =>{
        setIsEdit(!isEdit);
    }
    const doneEdit = () =>{
        setIsEdit(!isEdit);

        // 서버 작업
    }
    
    const plan = (data, index) => (
        <View>
            {
                isEdit ?
                <TouchableOpacity onPress={() => alert('이 항목에대한 수정 완료')}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>완료</Text>
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => {
                    // setModalData(index);
                      setModalVisible(!modalVisible)
                      }}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>계획</Text>
                    </View>
                </TouchableOpacity>
            }
        </View>
      );

    const cellInfo = (data) =>(
        <View style={[styles.row]}>
            {
                isEdit ?
                <TextInput value={`${data}`} />
                :
                <Text>{data}</Text>

            }
        </View>
    );


    const check = (ox, data)=>(
        <View>
            {
                isEdit ?
                <Switch value={data} />
                :
                <Text>{ox}</Text>

            }
        </View>
    );
    const convert = (data)=> {
        if(data) return check('O', data);
        else if(!data) return check('X', data);
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

    const cell = (data, index) =>{
        if(index === 0) return drawing(data);
        else if(typeof data === 'boolean') return convert(data);
        else return cellInfo(data);
    }

    return(
        <View style={styles.container}>
            {/* <Text>this is BOMDetail page</Text>
            <Text>{id}</Text>
            <Text>{title}</Text> */}

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

            {
                loading ?
                <ActivityIndicator size={'large'} />
                :
                <Table>
                    <Row data={rowHead} style={styles.head} />
                    {
                        sampleBody.map((rowData, index)=>(
                            <TableWrapper style={styles.tableRow}>
                                {
                                    rowData.map((cellData, cellIndex)=>(
                                        // <Cell key={cellIndex} data={typeof cellData === 'boolean' ? convert(cellData) : cellInfo(cellData)} />
                                        <Cell key={cellIndex} data={cell(cellData, cellIndex)} />
                                    ))
                                }
                                <Cell data={plan(rowData)}/>
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