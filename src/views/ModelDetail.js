/* eslint-disable */
import {  Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from "react-native"
import BottomTool from "../components/BottonTool";
import  DocumentPicker  from 'react-native-document-picker'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { useCallback, useEffect, useState } from "react";
// import { Button, Input } from "@rneui/themed";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { mdTableData, mdTableHead } from "../sampleData";
import { Icon } from "@rneui/themed";
import { getAllModelDetailAPi } from "../api";

const ModelDetail= ({route, navigation}) =>{
    const { modelId } = route.params;
    
    const [isEdit, setIsEdit] = useState(false);

    const [fileResponse, setFileResponse] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});

    const [EA, setEA] = useState(0);
    const [dueMonth, setDueMonth] = useState();
    const [dueDate, setDueDate] = useState();
    const [open, setOpen] = useState(false);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    const tableHead =mdTableHead;
    const tableData = mdTableData;

    const getModelDetails = async () =>{
      try {
        const json = await getAllModelDetailAPi(modelId);
        // console.log(json);
        setData(json);
        setLoading(!loading);
      } catch (error) {
        
      }
    }

    useEffect(()=>{
      getModelDetails();
    },[])



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

    const bom = (data, index)=>(
      <TouchableOpacity onPress={()=>{navigation.push('BOMDetail', {title: data})}}>
        <View>
          <Text>B.O.M</Text>
        </View>
      </TouchableOpacity>
    );

    const plan = (data, index) => (
      <View>
        {
          isEdit ? 
          <TouchableOpacity onPress={()=>alert('수정')}>
            <View>
              <Text>수정</Text>
            </View>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => {
            setModalData(data);
            setModalVisible(!modalVisible)
            }}>
            <View>
              <Text>계획</Text>
            </View>
          </TouchableOpacity>
        }
      </View>
      
    );

    const drawing= (data, index)=>(
      <View style={[styles.row, styles.spaceAround]}>
        <TouchableOpacity onPress={()=>this.alert(`this is drawing ${data}`)}>
        
        {isEdit ?
          <TextInput value={data}/>
            : 
          <Text>{data}</Text>
        }

        </TouchableOpacity>
        <TouchableOpacity onPress={handleDocumentSelection}>

          {
            isEdit && 
            // <Icon type='antdesign' name="upload" />
            <Text style={styles.fontWeight}> image </Text>
          }
        </TouchableOpacity>
      </View>
    );

   

    const cell=(cellIndex, data, index)=>{
      if(cellIndex ===1) return drawing(data, index);
      else if(cellIndex ===2) return bom(data,index);
      else if(cellIndex ===3) return plan(data, index);
      else return data[cellIndex];
      
    }
    
    const edit = ()=>{
      setIsEdit(!isEdit);

    }

    const doneEdit =() =>{
      setIsEdit(!isEdit);

      //서버 통신 로직
    }
    
    
    return (
      <View style={styles.container}>
        <Text>this is model {modelId}'s detail page</Text>
        <View style={[styles.row, styles.spaceBetween]}>
          <Button title={'이전'} />
          <Button title={'다음'} />
        </View>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={()=>{setModalVisible(!modalVisible)}}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>model name : {modalData.name}</Text>
              
              <View style={styles.row}>
                <TextInput style={styles.input} value={dueMonth} onChangeText={setDueMonth} placeholder="납기월"/>
                <TextInput style={styles.input} value={dueDate} onChangeText={setDueDate} placeholder="납기일"/>
              </View>

              <Text onPress={()=>setOpen(!open)}>{dueDate} {dueMonth}</Text>
              <TextInput style={styles.input} value={EA} onChangeText={setEA} placeholder="수량"/>

              <View style={[styles.spaceBetween, styles.row]}>
                <Button title={'확인'} onPress={()=>{
                  // 서버 통신 로직 필요
                  const date = new Date();
                  date.setMonth(dueMonth -1);
                  date.setDate(dueDate);
                  date.setHours(0);
                  date.setMinutes(0);
                  date.setSeconds(0);
                  date.setMilliseconds(0);
                  console.log(date);

                  setEA(0);
                  setDueDate(0);
                  setDueMonth(0);
                  setModalVisible(!modalVisible);
                }} />
                <Button title={'취소'} onPress={()=>{

                  setEA(0);
                  setDueDate(0);
                  setDueMonth(0)
                  setModalData([]);
                  setModalVisible(!modalVisible);
                  }} />
              </View>
            </View>
          </View>
        </Modal>
        <Table>
          <Row data={tableHead} style={styles.head}  />
          {
            data.map((rowData, index) => (
              <TableWrapper key={index} style={styles.tableRow}>
                {
                  // rowData.map((cellData, cellIndex) => (
                  //   // <Cell key={cellIndex} data={cellIndex === 3 ? plan(cellData, index) : cellData} />
                  //   <Cell key={cellIndex} data={cell(cellIndex, rowData, index)} />
                  // ))
                  
                  <>
                    <Cell data={index +1} /> 
                    {/* 위에거 rowData.id 였는데 보기 싫어서 바꿈 */}
                    <Cell data={drawing(rowData.name)} />
                    <Cell data={bom(rowData.id)} />
                    <Cell data={plan(rowData)} />
                  </>
                }
              </TableWrapper>
            ))
          }
        </Table>
        <BottomTool navigation={navigation} >
          {
            isEdit ? <Button title={'확인'} onPress={()=>doneEdit()}/> : <Button title={'수정'} onPress={()=>edit()}/>
          }
          
        </BottomTool>
      </View>
    );
    
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    table:{margin:10},

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
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      tableRow: {flexDirection: 'row', height: 40, backgroundColor: '#E7E6E1' },
      input: {
        height: 40,
        width: 120,
        margin: 12,
        borderWidth: 1, 
        padding: 10,
      },
      row:{ flexDirection:"row"},
      spaceBetween:{ 
        justifyContent:"space-between"
      },
      spaceAround:{
        justifyContent:"space-around",
        alignItems:"center",
      },
      fontWeight:{
        fontWeight:'bold'
      }
  });

export default ModelDetail;


