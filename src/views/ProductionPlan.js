/* eslint-disable */
import { useCallback, useEffect, useState } from "react";
import { Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View, Button, ScrollView, ActivityIndicator } from "react-native"
import BottomTool from "../components/BottonTool";
import DocumentPicker  from 'react-native-document-picker'
// import FileViewer from "react-native-file-viewer";
import { Row, Rows, Table, TableWrapper, Cell } from "react-native-table-component";
import { pRow, pData, pPrevRow } from "../sampleData";
import { deleteProdPlanAPi, getAllDoneProdPlanAPI, getAllProdPlanAPi, patchProdPlanAPi, socket } from "../api";
import RnFetchBlob from'react-native-blob-util';
import {read, write} from 'xlsx';

const ProductionPlan= ({navigation}) =>{
  
  const row = pRow;
  const prevRow = pPrevRow;
  const Data = pData;

  const [fileResponse, setFileResponse] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true); //나중에 false로 바꿀것
  const [data, setData] = useState([]);
  const [doneData, setDoneData] = useState([]);
  const [prev, setPrev] = useState(false);

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

  const viewFile = async() =>{
    try {
      const f = await DocumentPicker.pickSingle({
        // type: [DocumentPicker.types.allFiles],
        allowMultiSelection:false,
        copyTo:'documentDirectory',
        mode:"open",
      });
      setFileResponse(f);

      // console.log(f);

      const uri = f.uri;
      // uri.replace('content://', '')

      const res = await RnFetchBlob.fs.readFile(uri, 'ascii');
      const excel = read(new Uint8Array(res), {type:'buffer'});
      console.log(excel.Sheets);
      
    } catch (e) {
      console.log(e);
    }
  }

  const getProdPlans = async ()=>{
    try {
      const json = await getAllProdPlanAPi();
      setData(json);
      // console.log(json);
    } catch (error) {
      
    }
  }

  const getDoneData = async ()=>{
    try {
      const json = await getAllDoneProdPlanAPI(0);
      setDoneData(json);
      console.log(doneData);
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getProdPlans();
    getDoneData();
    setLoading(false);
  },[])

  const complete = (d, index)=>(
    
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
              onPress:async ()=>{
                try {
                  await deleteProdPlanAPi(d.id);

                  const newData = [...data];
                  newData.splice(index, 1);
                  setData(newData);
                  socket.emit('prod-plan');
                  
                } catch (error) {
                }
              },
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
                onPress:async ()=>{
                  await patchProdPlanAPi(d.id);
                  
                  const newData = [...data];
                  newData.splice(index, 1);
                  setData(newData);
                  socket.emit('prod-plan');
                },
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
      {
        loading ?
        <ActivityIndicator size={'large'} />
        :
        <>
          <View style={styles.container} >
            <View style={[styles.border, styles.center]}>
              <StatusBar barStyle={'dark-content'} />
              {/* {fileResponse.map((file, index) => (
                <Text
                  key={index.toString()}
                  style={styles.uri}
                  numberOfLines={1}
                  ellipsizeMode={'middle'}>
                  {file?.uri}
                </Text>
              ))} */}
              <Button title="Select " onPress={()=>viewFile() } />
            </View>
            
            <View style={styles.border}>
              
                {
                  prev ?
                  <Table>
                    <Row data={prevRow}/>
                    <ScrollView>
                    {
                      doneData.map((rowData, index)=>(
                        <TableWrapper key={index} style={styles.tableRow}>
                          <Cell data={index + 1}/>
                          <Cell data={rowData.createdAt}/>
                          <Cell data={rowData.modelDetail.name}/>
                          <Cell data={rowData.dueDate}/>
                          <Cell data={rowData.EA}/>
                        </TableWrapper>
                      ))
                    }
                    </ScrollView>
                  </Table>
                  :
                  <Table>
                  <Row data={row} />
                  <ScrollView>
                  {
                    data.map((rowData, index)=>(
                      <TableWrapper key={index} style={styles.tableRow}>
                        
                          <Cell data={index +1}/>
                          <Cell data={rowData.createdAt}/>
                          <Cell data={rowData.modelDetail.name}/>
                          <Cell data={rowData.dueDate}/>
                          <Cell data={rowData.EA}/>
                          <Cell data={complete(rowData, index)}/>
                        
                      </TableWrapper>
                    ))
                  }
                  </ScrollView>
                </Table>
                }
            </View>
          </View>
        </>
      }
      
      

        <BottomTool navigation={navigation}>
              {
                isEdit ? 
                <Button title={'확인'}  onPress={()=>doneEdit()}/> 
                :
                <Button title={'수정'} onPress={()=>edit()} /> 
              }
              <Button title={prev ? '현재 기록':'완료 기록'} onPress={()=>{setPrev(!prev)}}/>
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