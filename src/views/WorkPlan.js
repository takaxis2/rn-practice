/* eslint-disable */
// import { Button } from "@rneui/base";
import { useEffect, useState } from "react";
import {  Alert, StyleSheet, Text, TouchableOpacity, View, Button, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { Table, Row, TableWrapper, Cell } from "react-native-table-component";
import { deleteWorkPlanAPi, getAllDoneWorkPlanAPi, getAllWorkPlanAPi, patchWorkPlanAPi, socket } from "../api";
import BottomTool from "../components/BottonTool";
import { wData, wPrevHead, wRowHead } from "../sampleData";

const WorkPlan= ({navigation}) =>{

    const Data = wData;
    const rowHead = wRowHead;
    const pHead = wPrevHead;
    

    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(true); //나중에는 true로
    const [prev, setPrev] = useState(false);
    const [data, setData] = useState([]);
    const [prevData, setPrevData] = useState([]);

    const getWorkPlans =async () =>{
      try {
        const json = await getAllWorkPlanAPi();
        setData(json)
        
      } catch (error) {
        
      }
    }
    const getPrevData= async()=>{
      try {
        const json = await getAllDoneWorkPlanAPi(0);
        setPrevData(json)
        // console.log(prevData);
      } catch (error) {
        
      }
    }

    useEffect(()=>{
      getWorkPlans();
      getPrevData();
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
              onPress: async ()=>{
                await deleteWorkPlanAPi(d.id);

                const newData= [...data];
                newData.splice(index, 1);
                setData(newData);
                socket.emit('work-plan');

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
                  try {
                    // console.log(data);
                    await patchWorkPlanAPi(d.id);

                    const newData= [...data];
                    newData.splice(index, 1);
                    setData(newData);
                    socket.emit('work-plan');

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
              <Text>완료</Text>
          </View>
        </TouchableOpacity>
      }
    </View>
      );

    const check = (ox)=>(
        <View>
            <Text>{ox}</Text>
        </View>
    );
    const convert = (data)=> {
        if(data) return check('O');
        else if(!data) return check('X');
    }

    const edit= () =>{
        setIsEdit(!isEdit);
    }
    const doneEdit = () => {
        setIsEdit(!isEdit);
    }

    return (
        <View>
            <View>
                {
                  loading ?
                  <ActivityIndicator size={'large'} />
                  :
                  <Table>
                      {
                        prev ?
                        <>
                          <Row data={pHead} style={styles.head} />
                          {
                                prevData.map((rowData, index)=>(
                                    <TableWrapper key={index} style={styles.tableRow}>
                                        {/* {
                                            rowData.map((cData, cIndex)=>(
                                                <Cell key={cIndex} data={typeof cData === 'boolean' ? convert(cData) : cData} />
                                            ))
                                        } */}
                                        <Cell data={index+1}/>
                                        <Cell data={rowData.createdAt}/>
                                        <Cell data={rowData.updatedAt}/>
                                        <Cell data={rowData.bom.pi}/>
                                        <Cell data={rowData.bom.size}/>
                                        <Cell data={convert(rowData.bom.CNC)}/>
                                        <Cell data={convert(rowData.bom.shorten)}/>
                                        <Cell data={convert(rowData.bom.enrlgmnt)}/>
                                        <Cell data={convert(rowData.bom.reduction)}/>
                                        <Cell data={rowData.EA}/>
                                    </TableWrapper>
                                ))
                            }
                        </>
                        :
                        <>
                          <Row data={rowHead} style={styles.head} />
                            {
                                data.map((rowData, index)=>(
                                    <TableWrapper key={index} style={styles.tableRow}>
                                        {/* {
                                            rowData.map((cData, cIndex)=>(
                                                <Cell key={cIndex} data={typeof cData === 'boolean' ? convert(cData) : cData} />
                                            ))
                                        } */}
                                        <Cell data={index+1}/>
                                        <Cell data={rowData.createdAt}/>
                                        <Cell data={rowData.bom.pi}/>
                                        <Cell data={rowData.bom.size}/>
                                        <Cell data={convert(rowData.bom.CNC)}/>
                                        <Cell data={convert(rowData.bom.shorten)}/>
                                        <Cell data={convert(rowData.bom.enrlgmnt)}/>
                                        <Cell data={convert(rowData.bom.reduction)}/>
                                        <Cell data={rowData.EA}/>
                                        <Cell data={complete(rowData, index)} />
                                    </TableWrapper>
                                ))
                            }
                        </>
                      }
                  </Table>
                }
                <BottomTool navigation={navigation}>
                    {
                        isEdit?
                        <Button title={'완료'} onPress={()=>doneEdit()}/>
                        :
                        <Button title={'수정'} onPress={()=>edit()}/>
                    }
                    <Button title={prev ? '현재 기록' : '완료 기록'} onPress={()=>{setPrev(!prev)}}/>
                </BottomTool>
            </View>
        </View>
    );
    
}

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#f1f8ff' },
    tableRow: {flexDirection: 'row', height: 40, backgroundColor: '#E7E6E1' },
})

export default WorkPlan;    