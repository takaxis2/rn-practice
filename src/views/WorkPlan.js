/* eslint-disable */
// import { Button } from "@rneui/base";
import { useState } from "react";
import {  Alert, StyleSheet, Text, TouchableOpacity, View, Button } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { Table, Row, TableWrapper, Cell } from "react-native-table-component";
import { deleteWorkPlanAPi, patchWorkPlanAPi } from "../api";
import BottomTool from "../components/BottonTool";
import { wData, wRowHead } from "../sampleData";

const WorkPlan= ({navigation}) =>{

    const data = wData;
    const rowHead = wRowHead;
    

    const [isEdit, setIsEdit] = useState(false);

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
              onPress:()=>deleteWorkPlanAPi(),
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
                onPress:()=>patchWorkPlanAPi(),
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
        // 서버 작업
    }

    return (
        <View>
            <View>
                <Text>This is WorkPlan page</Text>
                <Table>
                    <Row data={rowHead} style={styles.head} />
                    {
                        data.map((rowData, index)=>(
                            <TableWrapper key={index} style={styles.tableRow}>
                                {
                                    rowData.map((cData, cIndex)=>(
                                        <Cell key={cIndex} data={typeof cData === 'boolean' ? convert(cData) : cData} />
                                    ))
                                }
                                <Cell data={complete(rowData)} />
                            </TableWrapper>
                        ))
                    }
                </Table>
                <BottomTool navigation={navigation}>
                    {
                        isEdit?
                        <Button title={'완료'} onPress={()=>doneEdit()}/>
                        :
                        <Button title={'수정'} onPress={()=>edit()}/>
                    }
                    <Button title={'완료 기록'} />
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