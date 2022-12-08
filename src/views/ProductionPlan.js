/* eslint-disable */
import { useCallback, useState } from "react";
import { Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View, Button, ScrollView } from "react-native"
import BottomTool from "../components/BottonTool";
import  DocumentPicker  from 'react-native-document-picker'
// import { Button } from "@rneui/themed";
import { Row, Rows, Table, TableWrapper, Cell } from "react-native-table-component";
import { pRow, pData } from "../sampleData";
import { deleteProdPlanAPi, patchProdPlanAPi } from "../api";

const ProductionPlan= ({navigation}) =>{
  
  const row = pRow;
  const data = pData;

  const [fileResponse, setFileResponse] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

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

  const complete = (data)=>(
    
    <View>
      {
        isEdit ?
        <TouchableOpacity onPress={()=>{
          Alert.alert(
          '삭제',
          '정말로 삭제하시겠습니까?',
          [
            {
              text:'삭제',
              onPress:()=>deleteProdPlanAPi(),
            },
            {
              text:'취소',
              onPress:()=>{}
            }
          ],
          {
            cancelable:true,
            onDissmiss:()=>{}
          }
          );
        }}>
          <View >
              <Text>삭제</Text>
          </View>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={()=>{
          Alert.alert(
            '완료',
            '정말로 완료하시겠습니까?',
            [
              {
                text:'완료',
                onPress:()=>patchProdPlanAPi(),
              },
              {
                text:'취소',
                onPress:()=>{}
              }
            ],
            {
              cancelable:true,
              onDissmiss:()=>{}
            }
            );
        }}>
          <View >
              <Text>완료</Text>
          </View>
        </TouchableOpacity>
      }
    </View>
  );

  const edit = () => {
    setIsEdit(!isEdit);
  }
  const doneEdit = () =>{
    setIsEdit(!isEdit);
    //서버통신
  }

  return (
    <View>
      <View style={styles.container} >
        <View style={[styles.border, styles.center]}>
          <StatusBar barStyle={'dark-content'} />
          {fileResponse.map((file, index) => (
            <Text
              key={index.toString()}
              style={styles.uri}
              numberOfLines={1}
              ellipsizeMode={'middle'}>
              {file?.uri}
            </Text>
          ))}
          <Button title="Select " onPress={handleDocumentSelection} />
        </View>
        
        <View style={styles.border}>
            <Table>
              <Row data={row} />
              {/* <Rows data={rowData} /> */}
              {
                data.map((rowData, index)=>(
                  <TableWrapper key={index} style={styles.tableRow}>
                    {
                      rowData.map((cData,cIndex)=>(
                        <Cell key={cIndex} data={cData}/>
                      ))
                      
                    }
                      <Cell data={complete(rowData)}/>
                    
                  </TableWrapper>
                ))
              }
            </Table>
        </View>
      </View>
      

        <BottomTool navigation={navigation}>
              {
                isEdit ? 
                <Button title={'확인'}  onPress={()=>doneEdit()}/> 
                :
                <Button title={'수정'} onPress={()=>edit()} /> 
              }
              <Button title={'완료 기록'} />
        </BottomTool>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      width:'100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    border:{
      borderWidth:1,
      // flex:1,
      height: '45%',
      width: '100%',
      
    },
    center:{
      alignItems:"center",
      justifyContent:"center",
    },
    tableRow: {flexDirection: 'row', height: 40, backgroundColor: '#E7E6E1' },
  });

export default ProductionPlan;