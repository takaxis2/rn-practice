/* eslint-disable */
import { useCallback, useEffect, useState } from "react";
import { Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, FlatList } from "react-native"
import BottomTool from "../components/BottonTool";
import DocumentPicker from 'react-native-document-picker'
import FileViewer from "react-native-file-viewer";
import { Row, Rows, Table, TableWrapper, Cell } from "react-native-table-component";
import { pRow, pData, pPrevRow } from "../sampleData";
import { deleteProdPlanAPi, getAllDoneProdPlanAPI, getAllProdPlanAPi, patchProdPlanAPi, socket } from "../api";
import RnFetchBlob from 'react-native-blob-util';
import { read, write, utils } from 'xlsx';
import { dateFormat } from "../utils";
import { CButton as Button} from "../components/CustomButton";

const ProductionPlan = ({ navigation }) => {

  const row = pRow;
  const prevRow = pPrevRow;
  const Data = pData;

  const [fileResponse, setFileResponse] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true); //나중에 false로 바꿀것
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [doneData, setDoneData] = useState([]);
  const [prev, setPrev] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [page, setPage] = useState(0);


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

  const viewFile = async () => {
    try {
      const f = await DocumentPicker.pickSingle({
        // type: [DocumentPicker.types.allFiles],
        allowMultiSelection: false,
        copyTo: 'documentDirectory',
        mode: "open",
      });
      setFileResponse(f); //이거 필요함?

      // console.log(f);

      const uri = f.uri;
      // uri.replace('content://', '')

      const res = await RnFetchBlob.fs.readFile(uri, 'ascii');
      const workbook = read(new Uint8Array(res), { type: 'array' });
      const workSheet = workbook.Sheets[workbook.SheetNames[0]];
      const sheetData = utils.sheet_to_json(workSheet, { header: 1 });
      // console.log(sheetData.splice(2));
      setExcelData(sheetData);


      // await FileViewer.open(uri);


    } catch (e) {
      console.log(e);
    }
  }

  const getProdPlans = async () => {
    try {
      const json = await getAllProdPlanAPi();
      setData(json);
      // console.log(json);
    } catch (error) {

    }
  }

  const getDoneData = async () => {
    try {
      const json = await getAllDoneProdPlanAPI(page);

      setDoneData([...doneData ,...json]);

      // console.log(json);
      setLoad(false);
      setPage(page+1);
    } catch (error) {

    }
  }

  useEffect(() => {
    getProdPlans();
    getDoneData();
    setLoading(false);
    setExcelData([]);
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
                    await patchProdPlanAPi(d.id);

                    const newData = [...data];
                    newData.splice(index, 1);
                    setData(newData);
                    socket.emit('prod-plan');
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

  const edit = () => {
    setIsEdit(!isEdit);
  }
  const doneEdit = () => {
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
              <View style={[styles.border]}>
                {/* <StatusBar barStyle={'dark-content'} /> */}

                {Object.entries(excelData).length === 0 ?
                  <Button title="Select " onPress={() => viewFile()} />
                  :
                  // <Text>{excelData[1][1]}</Text>

                  <Table>
                    <Row data={excelData[1]} />
                    <ScrollView>

                      {
                        excelData.splice(2).map((rowData, index) => (
                          <TableWrapper style={styles.tableRow}>
                            {/* <Cell data={rowData[0]}/> */}
                            <Cell data={typeof rowData[0] === 'undefined' ? "" : rowData[0]} />
                            <Cell data={typeof rowData[1] === 'undefined' ? "" : rowData[1]} />
                            <Cell data={typeof rowData[2] === 'undefined' ? "" : rowData[2]} />
                            <Cell data={typeof rowData[3] === 'undefined' ? "" : rowData[3]} />
                            <Cell data={typeof rowData[4] === 'undefined' ? "" : rowData[4]} />
                            <Cell data={typeof rowData[5] === 'undefined' ? "" : rowData[5]} />
                            <Cell data={typeof rowData[6] === 'undefined' ? "" : rowData[6]} />
                            <Cell data={typeof rowData[7] === 'undefined' ? "" : rowData[7]} />
                            <Cell data={typeof rowData[8] === 'undefined' ? "" : rowData[8]} />
                            <Cell data={typeof rowData[9] === 'undefined' ? "" : rowData[9]} />
                          </TableWrapper>
                        ))
                      }
                    </ScrollView>

                  </Table>


                }

              </View>

              <View style={[styles.border, styles.text]}>

                {
                  prev ?
                    <Table>
                      <Row textStyle={styles.text} flexArr={[1,2,1,2,1]} data={prevRow} />
                      <FlatList
                        data={doneData}
                        renderItem={({item, index})=>(
                        <TableWrapper key={index} style={styles.tableRow}>
                          <Cell flex={1} data={index + 1} />
                          <Cell flex={2} data={dateFormat(item.createdAt)} />
                          <Cell flex={1} data={item.modelDetail.name} />
                          <Cell flex={2} data={dateFormat(item.dueDate)} />
                          <Cell flex={1} data={item.EA} />
                        </TableWrapper>)}
                        onEndReached={()=>{
                          if(doneData.length >= page * 10){
                            // console.log('end reached');
                            setLoad(true);
                            getDoneData();
                          }
                        }}
                        // onEndReachedThreshold={0.6}
                        ListFooterComponent={load && <ActivityIndicator />}
                      />
                    </Table>
                    :
                    <Table>
                      <Row data={row} textStyle={styles.text} flexArr={[1,2,1,2,1,1]} />
                      <ScrollView>
                        {
                          data.map((rowData, index) => (
                            <TableWrapper key={index} style={styles.tableRow}>

                              <Cell flex={1} data={index + 1} />
                              <Cell flex={2} data={dateFormat(rowData.createdAt)} />
                              <Cell flex={1} data={rowData.modelDetail.name} />
                              <Cell flex={2} data={dateFormat(rowData.dueDate)} />
                              <Cell flex={1} data={rowData.EA} />
                              <Cell flex={1} data={complete(rowData, index)} />

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
            <Button title={'확인'} onPress={() => doneEdit()} />
            :
            <Button title={'수정'} onPress={() => edit()} />
        }
        <Button title={prev ? '현재 기록' : '완료 기록'} onPress={() => { setPrev(!prev) }} />
      </BottomTool>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    borderWidth: 1,
    // flex:1,
    height: '46%',
    width: '100%',
    
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  tableRow: { flexDirection: 'row', height: 40, backgroundColor: '#8e8e8e' },
  text:{
    color:'#808080'
  },
});

export default ProductionPlan;