/* eslint-disable */
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Image, ScrollView, useWindowDimensions } from "react-native"
import BottomTool from "../components/BottonTool";
import DocumentPicker from 'react-native-document-picker'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { useCallback, useEffect, useState } from "react";
import { mdTableData, mdTableHead } from "../sampleData";
import { getAllModelDetailAPi, patchModelDetailAPi, postDrawingApi, postProdPlanAPi, socket, URL } from "../api";
import { Overlay, registerCustomIconType } from "@rneui/base";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImageModal from 'react-native-image-modal';
import { CButton as Button } from "../components/CustomButton";

const ModelDetail = ({ route, navigation }) => {
  const { modelId } = route.params;

  const [isEdit, setIsEdit] = useState(false);

  const [fileResponse, setFileResponse] = useState([]);

  const [imageVisible, setImageVisible] = useState(false);
  const [image, setImage] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  const [bomModal, setBomModal] = useState(false);
  const [bomModalData, setBomModalData] = useState({});

  const [EA, setEA] = useState(0);
  const [dueMonth, setDueMonth] = useState();
  const [dueDate, setDueDate] = useState();
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { width, height } = useWindowDimensions();


  const tableHead = mdTableHead;
  const tableData = mdTableData;

  const getModelDetails = async () => {
    try {
      const json = await getAllModelDetailAPi(modelId);
      console.log(json);
      setData(json);
      setLoading(false);
      // console.log(data);
    } catch (error) {

    }
  }

  useEffect(() => {
    getModelDetails();
  }, [])



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

  const imageSelection = async (id) => {
    Alert.alert(
      "뭘로 올릴래?",
      "선택해",
      [
        {
          text: "카메라로 찍기",
          onPress: async () => {
            const result = await launchCamera({
              mediaType: 'photo',
              cameraType: 'back',
            });
            if (result.didCancel) {
              return null;
            }
            const localUri = result.assets[0].uri;
            const uriPath = localUri.split("//").pop();
            const imageName = localUri.split("/").pop();
            // setPhoto("file://"+uriPath);
          }
        },
        {
          text: "앨범에서 선택",
          onPress: async () => {
            const result = await launchImageLibrary();
            if (result.didCancel) {
              return null;
            }
            const localUri = result.assets[0].uri;
            const uriPath = localUri.split("//").pop();
            const imageName = localUri.split("/").pop();


            const newData = [...data];
            newData[id].drawing = localUri;
            // console.log(result);
            setData(newData);

            const img = {};
            img.name = result.assets[0].fileName;
            img.uri = localUri;
            img.type = result.assets[0].type;
            setImage(img);
            // console.log(img);

          }
        },
      ],
      { cancelable: true }
    );
  };

  const bom = (d, index) => (
    <TouchableOpacity onPress={() => {
      //null 값이 아닐때만

      setBomModal(!bomModal);
      setBomModalData(d);
    }}>
      <View>
        <Text>B.O.M</Text>
      </View>
    </TouchableOpacity>
  );

  const plan = (d, index) => (
    <View>
      {
        isEdit ?
          <TouchableOpacity onPress={async () => {
            // console.log(data[index]);
            // 서버에 이미지를 올리고
            //그 결과를 받아서 수정
            const drawingData = new FormData();

            drawingData.append('modelDetailId', data[index].id);
            drawingData.append('fileName', image.name);
            drawingData.append('image', image);
            // console.log(drawingData);
            try {

              const drawing = await postDrawingApi(drawingData);

              const newData = [...data];
              newData[index].drawing = drawing;
              setData(newData);
              setImage(drawing);

            } catch (error) {

            }
            await patchModelDetailAPi(data[index].id, data[index]);
            Alert.alert('수정', '수정이 완료되었습니다');
          }}>
            <View>
              <Text>확인</Text>
            </View>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => {
            setModalData(d);
            setModalVisible(!modalVisible)
          }}>
            <View>
              <Text>계획</Text>
            </View>
          </TouchableOpacity>
      }
    </View>

  );

  const drawing = (d, index) => (
    <View style={[styles.row, styles.spaceAround]}>
      <TouchableOpacity onPress={() => {
        if (data[index].drawing !== null) {
          setImage(data[index].drawing);
          // console.log(image);
          setImageVisible(!imageVisible);
        } else {
          alert('도면이 할당되지 않았습니다');
        }
      }}>

        {isEdit ?
          <TextInput value={d} onChangeText={(txt) => {
            const newData = [...data];
            newData[index].name = txt;
            // console.log(e);
            setData(newData);
            // console.log(data);
          }} />
          :
          <Text>{data[index].name}</Text>
        }

      </TouchableOpacity>
      <TouchableOpacity onPress={() => imageSelection(index)}>

        {
          isEdit &&
          // <Icon type='antdesign' name="upload" />
          <Text style={styles.fontWeight}> image </Text>
        }
      </TouchableOpacity>
    </View>
  );


  const edit = () => {
    setIsEdit(!isEdit);

  }

  const doneEdit = () => {
    setIsEdit(!isEdit);

    //서버 통신 로직
  }


  return (
    <View style={[styles.container, styles.spaceBetween]}>


      <Modal
        animationType="none"
        transparent={true}
        visible={imageVisible}
        onRequestClose={() => setImageVisible(false)}
      >
        {/* <ScrollView> */}
        <ImageModal
          imageBackgroundColor="#FFFFFF"
          resizeMode="contain"
          style={{ width: width, height: height }}
          source={{ uri: `${URL}/${image.fileName}` }} />
        {/* <Image style={{width:image.assets[0].width, height: image.assets[0].height}} source={{uri:`${image.assets[0].uri}`}}/> */}
        {/* </ScrollView> */}

      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(false) }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.text}>model name : {modalData.name}</Text>

            <View>
              <TextInput style={[styles.input, styles.text]} value={dueMonth} onChangeText={setDueMonth} placeholder="납기월" placeholderTextColor={'#808080'} />
              <TextInput style={[styles.input, styles.text]} value={dueDate} onChangeText={setDueDate} placeholder="납기일" placeholderTextColor={'#808080'} />
              <TextInput style={[styles.input, styles.text]} value={EA} onChangeText={setEA} placeholder='수량' placeholderTextColor={'#808080'} />
            </View>



            <View style={[styles.spaceBetween, styles.row]}>
              <Button title={'확인'} onPress={async () => {
                // 서버 통신 로직 필요
                const date = new Date();
                if (dueMonth - 1 < date.getMonth()) date.setFullYear(date.getFullYear() + 1);
                date.setMonth(dueMonth - 1);
                date.setDate(dueDate);
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);

                const data = {};
                data.modelId = modalData.model.id;
                data.EA = EA;
                data.dueDate = date;

                // console.log(JSON.stringify(data));
                try {
                  await postProdPlanAPi(data);
                } catch (error) {
                }

                setEA(0);
                setDueDate(0);
                setDueMonth(0);
                setModalVisible(!modalVisible);

                socket.emit('prod-plan');

              }} />
              <Button title={'취소'} onPress={() => {

                setEA(0);
                setDueDate(0);
                setDueMonth(0)
                setModalData([]);
                setModalVisible(false);
              }} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={bomModal}
        onRequestClose={() => { setBomModal(false) }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, styles.row]}>
            <Button title="  g  " onPress={() => {
              navigation.push('BOMDetail', { id: bomModalData, type: "g" });
              setBomModal(false);
            }} />
            <Button title="  l   " onPress={() => {
              navigation.push('BOMDetail', { id: bomModalData, type: "l" });
              setBomModal(false);
            }} />
          </View>
        </View>
      </Modal>
      <View>
        <Text style={styles.text}> model {modelId}</Text>
        {
          loading ?
            <ActivityIndicator size={'large'} />
            :
            <Table>
              <Row data={tableHead} style={styles.head} textStyle={styles.text} />
              {
                data.map((rowData, index) => (
                  <ScrollView>

                    <TableWrapper key={index} style={styles.tableRow}>

                      {
                        // rowData.map((cellData, cellIndex) => (
                        //   // <Cell key={cellIndex} data={cellIndex === 3 ? plan(cellData, index) : cellData} />
                        //   <Cell key={cellIndex} data={cell(cellIndex, rowData, index)} />
                        // ))

                        <>
                          <Cell data={index + 1} />
                          <Cell data={drawing(rowData.name, index)} />
                          <Cell data={bom(rowData.id, index)} />
                          <Cell data={plan(rowData, index)} />
                        </>
                      }
                    </TableWrapper>
                  </ScrollView>
                ))
              }
            </Table>
        }
      </View>


      <BottomTool navigation={navigation} >
        {
          isEdit ? <Button title={'완료'} onPress={() => doneEdit()} /> : <Button title={'수정'} onPress={() => edit()} />
        }

      </BottomTool>
    </View>
  );

}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 16, paddingTop: 16, backgroundColor: '#fff' },
  head: { borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1 },
  table: { margin: 10 },

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
  tableRow: { flexDirection: 'row', height: 40, backgroundColor: '#8e8e8e' },
  input: {
    height: 40,
    width: 120,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  row: { flexDirection: "row" },
  spaceBetween: {
    justifyContent: "space-between"
  },
  spaceAround: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  fontWeight: {
    fontWeight: 'bold'
  },
  bomBtn: {
    width: 300,
    height: '10%'
  },
  text: {
    color: '#808080'
  },
});

export default ModelDetail;


