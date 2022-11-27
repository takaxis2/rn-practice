/* eslint-disable */
import {  Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import BottomTool from "../components/BottonTool";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { useState } from "react";
import { Button, Input } from "@rneui/themed";
// import DateTimePickerModal from "react-native-modal-datetime-picker";

const ModelDetail= ({route, navigation}) =>{
    const { title } = route.params;
    
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState();

    const [EA, setEA] = useState(0);
    const [dueDate, setDueDate] = useState();
    const [open, setOpen] = useState(false);


    const tableHead =['/','품명','B.O.M','계획'];
    const tableData =[
        [1,	'abcd','B.O.M',	'계획'],
        [2,	'DFS','B.O.M',	'계획'],
        [3,	'SE','B.O.M',	'계획'],
        [4,	'SES','B.O.M',	'계획'],
        [5,	'W','B.O.M',	'계획'],
        [6,	'AWE','B.O.M',	'계획'],
        [7,	'SESE','B.O.M',	'계획'],
        [8,	'SF','B.O.M',	'계획'],
        [9,	'X','B.O.M',	'계획'],
        [10, 'VADSFA','B.O.M',	'계획'],
        [11,'XZVSS','B.O.M',	'계획'],
        [12,'E', 'B.O.M','계획'],
        [13,'SVEW','B.O.M',	'계획'],
        [14,'SSE','B.O.M',	'계획'],
        [15,'SWWQ','B.O.M',	'계획']
    ];

    const bom = (data, index)=>(
      <TouchableOpacity onPress={()=>this.alert(`this is bom ${index}`)}>
        <View>
          <Text>B.O.M</Text>
        </View>
      </TouchableOpacity>
    );

    const plan = (data, index) => (
      <TouchableOpacity onPress={() => {
        setModalData(index);
        setModalVisible(!modalVisible)
        }}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>계획</Text>
        </View>
      </TouchableOpacity>
    );

    const cell=(cellIndex, data, index)=>{
      if(cellIndex ===2) return bom(data,index);
      else if(cellIndex ===3) return plan(data, index);
      
      return data;
    }
    
    
    
    return (
      <View style={styles.container}>
        <Text>this is model {title}'s detail page</Text>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={()=>{setModalVisible(!modalVisible)}}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>model detail id number : {modalData}</Text>
              {/* <Text>{dueDate}</Text>
              <Text>{EA}</Text> */}

              {/* <DateTimePickerModal
              isVisible={open}
              mode='date'
              onConfirm={(date)=>setDueDate(date)}
              onCancel={()=>{setOpen(!open)}}
              /> */}
              <TextInput style={styles.input} value={dueDate} onChangeText={setDueDate} placeholder="납기일"/>
              <Text onPress={()=>setOpen(!open)}>{dueDate}</Text>
              <TextInput style={styles.input} value={EA} onChangeText={setEA} placeholder="수량"/>

              <View style={[styles.spaceBetween, styles.row]}>
                <Button title={'확인'} onPress={()=>{
                  setEA(0);
                  setDueDate();
                  setModalVisible(!modalVisible);

                }} />
                <Button title={'취소'} onPress={()=>{

                  setEA(0);
                  setDueDate();

                  setModalData();
                  setModalVisible(!modalVisible);
                  }} />
              </View>
            </View>
          </View>
        </Modal>
        <Table>
          <Row data={tableHead} style={styles.head}  />
          {
            tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.tableRow}>
                {
                  rowData.map((cellData, cellIndex) => (
                    // <Cell key={cellIndex} data={cellIndex === 3 ? plan(cellData, index) : cellData} />
                    <Cell key={cellIndex} data={cell(cellIndex, cellData, index)} />
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
  });

export default ModelDetail;


// /**
//  * //     <View style={styles.centeredView}>
//     //   <Modal
//     //     animationType="fade"
//     //     transparent={true}
//     //     visible={modalVisible}
//     //     onRequestClose={() => {
//     //       Alert.alert("Modal has been closed.");
//     //       setModalVisible(!modalVisible);
//     //     }}
//     //   >
//     //     <View style={styles.centeredView}>
//     //       <View style={styles.modalView}>
//     //         <Text style={styles.modalText}>Hello World!</Text>
//     //         <Pressable
//     //           style={[styles.button, styles.buttonClose]}
//     //           onPress={() => setModalVisible(!modalVisible)}
//     //         >
//     //           <Text style={styles.textStyle}>Hide Modal</Text>
//     //         </Pressable>
//     //       </View>
//     //     </View>
//     //   </Modal>
//     //   <Pressable
//     //     style={[styles.button, styles.buttonOpen]}
//     //     onPress={() => setModalVisible(true)}
//     //   >
//     //     <Text style={styles.textStyle}>Show Modal</Text>
//     //   </Pressable>
//     // </View>
//  */