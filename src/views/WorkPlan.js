/* eslint-disable */
// import { Button } from "@rneui/base";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, ScrollView, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { Table, Row, TableWrapper, Cell } from "react-native-table-component";
import { deleteWorkPlanAPi, getAllDoneWorkPlanAPi, getAllWorkPlanAPi, patchWorkPlanAPi, socket } from "../api";
import BottomTool from "../components/BottonTool";
import { wData, wPrevHead, wRowHead } from "../sampleData";
import { dateFormat } from "../utils";
import { CButton as Button } from "../components/CustomButton";

const WorkPlan = ({ navigation }) => {

  const Data = wData;
  const rowHead = wRowHead;
  const pHead = wPrevHead;


  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true); //나중에는 true로
  const [prev, setPrev] = useState(false);
  const [data, setData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(0);

  const getWorkPlans = async () => {
    try {
      const json = await getAllWorkPlanAPi();
      setData(json)

    } catch (error) {

    }
  }
  const getPrevData = async () => {
    try {
      const json = await getAllDoneWorkPlanAPi(page);
      setPrevData([...prevData, ...json]);
      // console.log(prevData);
      setLoad(false);
      setPage(page + 1);
    } catch (error) {

    }
  }

  useEffect(() => {
    getWorkPlans();
    getPrevData();
    setLoading(false);
  }, [])

  const complete = (d, index) => (
    <View>
      {
        isEdit ?
          <TouchableOpacity onPress={() => {
            Alert.alert(
              '삭제',
              '정말로 삭제하시겠습니까?',
              [
                {
                  text: '삭제',
                  onPress: async () => {
                    await deleteWorkPlanAPi(d.id);

                    const newData = [...data];
                    newData.splice(index, 1);
                    setData(newData);
                    socket.emit('work-plan');

                  },
                },
                {
                  text: '취소',
                  onPress: () => { }
                }
              ],
              {
                cancelable: true,
                onDissmiss: () => { }
              }
            );
          }}>
            <View >
              <Text>삭제</Text>
            </View>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => {
            Alert.alert(
              '완료',
              '정말로 완료하시겠습니까?',
              [
                {
                  text: '완료',
                  onPress: async () => {
                    try {
                      // console.log(data);
                      await patchWorkPlanAPi(d.id);

                      const newData = [...data];
                      newData.splice(index, 1);
                      setData(newData);
                      socket.emit('work-plan');

                    } catch (error) {

                    }
                  },
                },
                {
                  text: '취소',
                  onPress: () => { }
                }
              ],
              {
                cancelable: true,
                onDissmiss: () => { }
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

  const check = (ox) => (
    <View>
      <Text>{ox}</Text>
    </View>
  );
  const convert = (data) => {
    if (data) return check('O');
    else if (!data) return check('X');
  }

  const edit = () => {
    setIsEdit(!isEdit);
  }
  const doneEdit = () => {
    setIsEdit(!isEdit);
  }

  return (

    <View style={[styles.spaceBetween, styles.container]}>
      {
        loading ?
          <ActivityIndicator size={'large'} />
          :
          <Table>
            {
              prev ?
                <>
                  <Row data={pHead} textStyle={styles.text} style={styles.head} flexArr={[1, 2.5, 2.5, 1, 1, 1, 1, 1, 1, 1]} />
                  <FlatList
                    data={prevData}
                    renderItem={({ item, index }) => (
                      <TableWrapper key={index} style={styles.tableRow}>
                        <Cell flex={1} data={index + 1} />
                        <Cell flex={2.5} data={dateFormat(item.createdAt)} />
                        <Cell flex={2.5} data={dateFormat(item.updatedAt)} />
                        <Cell flex={1} data={item.bom.pi} />
                        <Cell flex={1} data={item.bom.size} />
                        <Cell flex={1} data={convert(item.bom.CNC)} />
                        <Cell flex={1} data={convert(item.bom.shorten)} />
                        <Cell flex={1} data={convert(item.bom.enrlgmnt)} />
                        <Cell flex={1} data={convert(item.bom.reduction)} />
                        <Cell flex={1} data={item.EA} />
                      </TableWrapper>
                    )}
                    onEndReached={() => {
                      if (prevData.length >= page * 10) {
                        setLoad(true);
                        getPrevData();
                      }
                    }}
                    ListFooterComponent={load && <ActivityIndicator />}
                  />
                </>
                :
                <>
                  <Row data={rowHead} flexArr={[1, 3, 1, 1, 1, 1, 1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
                  <ScrollView>
                    {
                      data.map((rowData, index) => (
                        <TableWrapper key={index} style={styles.tableRow}>
                          {/* {
                                          rowData.map((cData, cIndex)=>(
                                            <Cell key={cIndex} data={typeof cData === 'boolean' ? convert(cData) : cData} />
                                            ))
                                          } */}
                          <Cell flex={1} data={index + 1} />
                          <Cell flex={3} data={dateFormat(rowData.createdAt)} />
                          <Cell flex={1} data={rowData.bom.pi} />
                          <Cell flex={1} data={rowData.bom.size} />
                          <Cell flex={1} data={convert(rowData.bom.CNC)} />
                          <Cell flex={1} data={convert(rowData.bom.shorten)} />
                          <Cell flex={1} data={convert(rowData.bom.enrlgmnt)} />
                          <Cell flex={1} data={convert(rowData.bom.reduction)} />
                          <Cell flex={1} data={rowData.EA} />
                          <Cell flex={1} data={complete(rowData, index)} />
                        </TableWrapper>
                      ))
                    }
                  </ScrollView>
                </>
            }
          </Table>
      }
      <BottomTool navigation={navigation}>
        {
          isEdit ?
            <Button title={'완료'} onPress={() => doneEdit()} />
            :
            <Button title={'수정'} onPress={() => edit()} />
        }
        <Button title={prev ? '현재 기록' : '완료 기록'} onPress={() => { setPrev(!prev) }} />
      </BottomTool>
    </View>

  );

}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom:16, backgroundColor: '#fff' },
  head: { borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1 },
  tableRow: { flexDirection: 'row', height: 40, backgroundColor: '#8E8E8E' },
  text: {
    color: '#808080'
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
})

export default WorkPlan;    