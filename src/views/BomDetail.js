/*eslint-disable*/
// import { Text } from "@rneui/themed";
import { useCallback, useEffect, useState } from "react";
import { Modal, StyleSheet, Switch, TextInput, TouchableOpacity, View, Text, ActivityIndicator, Alert, ScrollView, useWindowDimensions } from "react-native";
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";
import BottomTool from "../components/BottonTool";
import { bdRowHead, bdSampleBody } from "../sampleData";
import DocumentPicker from 'react-native-document-picker'
import { getAllBomAPi, patchBomAPi, postBomDrawingApi, postWorkPlanAPi, socket, URL } from "../api";
import { CButton as Button } from "../components/CustomButton";
import ImageModal from "react-native-image-modal";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const BOMDetail = ({ route, navigation }) => {
    const { id, type } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [imageVisible, setImageVisible] = useState(false);
    const [modalData, setModalData] = useState({});
    const [EA, setEA] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [fileResponse, setFileResponse] = useState([]);
    const [loading, setLoading] = useState(true); //나중에는 true로
    const [data, setData] = useState([]);
    const [image, setImage] = useState({});

    const { width, height } = useWindowDimensions();

    const rowHead = bdRowHead;
    const sampleBody = bdSampleBody;

    const getBoms = async () => {
        // console.log(id, type);
        const json = await getAllBomAPi(id, type);
        // console.log(id, type);
        setData(json);
        setLoading(false);
        // console.log(json);
    }

    useEffect(() => {
        getBoms();
    }, []);

    const edit = () => {
        setIsEdit(!isEdit);
    }
    const doneEdit = () => {
        setIsEdit(!isEdit);

        // 서버 작업
    }
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

    const drawing = (index) => (
        <View style={[styles.row, styles.spaceAround]}>
            <TouchableOpacity onPress={() => {
                if (isEdit) {
                    imageSelection(index);
                }
                else {
                    if (data[index].bomDrawing !== null) {
                        setImage(data[index].bomDrawing);
                        // console.log(image);
                        setImageVisible(!imageVisible);
                    } else {
                        alert('도면이 할당되지 않았습니다');
                    }
                }
            }}>


                {/* <Text>{data[index].id}</Text> */}
                <Text>{index + 1}</Text>

            </TouchableOpacity>

        </View>
    );

    const plan = (d, index) => (
        <View>
            {
                isEdit ?
                    <TouchableOpacity onPress={async () => {
                        const drawingData = new FormData();

                        drawingData.append('bomId', data[index].id);
                        drawingData.append('fileName', image.name);
                        drawingData.append('image', image);
                        try {

                            const bomDrawing = await postBomDrawingApi(drawingData);
                            const newData = [...data];
                            newData[index].bomDrawing = bomDrawing;
                            setData(newData);
                            setImage(bomDrawing);

                            // console.log(data[index]);
                        } catch (error) {
                        }
                        await patchBomAPi(data[index].id, data[index]);
                        Alert.alert('수정', '수정 완료');
                    }}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>확인</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => {
                        // setModalData(index);
                        setModalData(d);
                        setModalVisible(!modalVisible)
                    }}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>계획</Text>
                        </View>
                    </TouchableOpacity>
            }
        </View>
    );

    const cellInfo = (d, index, key) => (
        <View style={[styles.row]}>
            {
                isEdit ?
                    <TextInput value={`${d}`} onChangeText={(txt) => {
                        const newData = [...data];
                        newData[index][key] = txt;
                        setData(newData);
                    }} />
                    :
                    <Text>{d}</Text>

            }
        </View>
    );


    const check = (d, index, key) => (
        <View>
            {
                //이거 그냥 ox 바꾸는거로
                isEdit ?
                    <Switch value={d} onValueChange={(val) => {
                        const newData = [...data];
                        newData[index][key] = !d;
                        setData(newData);
                    }} />
                    :
                    d ?
                        <Text>{'O'}</Text>
                        :
                        <Text>{'X'}</Text>

            }
        </View>
    );



    return (
        <View style={[styles.spaceBetween, styles.container]}>

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
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>수량</Text>
                        <TextInput style={[styles.input, styles.text]} value={EA} onChangeText={setEA} placeholder={'수량'} placeholderTextColor={'#808080'} />
                        <View style={[styles.row, styles.spaceBetween]}>
                            <Button title={'확인'} onPress={async () => {
                                //여기서 값 저장 로직
                                const workPlan = {};
                                workPlan.bomId = modalData.id;
                                workPlan.EA = EA;
                                // console.log(modalData);
                                try {
                                    await postWorkPlanAPi(workPlan);
                                } catch (error) {
                                }
                                Alert.alert('계획', '일일계획 생성이 완료되었습니다');
                                setEA(0);
                                setModalVisible(!modalVisible);

                                socket.emit('work-plan');

                            }} />
                            <Button title={'취소'} onPress={() => setModalVisible(!modalVisible)} />
                        </View>
                    </View>
                </View>
            </Modal>



            {

                loading ?
                    <ActivityIndicator size={'large'} />
                    :
                    <View>
                        <Table>
                            <Row data={rowHead} style={styles.head} flexArr={[1, 1, 1, 1, 1, 1, 1, 1, 1.5, 1.5]} textStyle={styles.text} />
                            {
                                data.map((rowData, index) => (

                                    <TableWrapper style={styles.tableRow}>
                                        {/* <ScrollView horizontal={true} style={styles.cell}> */}
                                        {/* {
                                            data.map((cellData, cellIndex)=>(
                                                // <Cell key={cellIndex} data={typeof cellData === 'boolean' ? convert(cellData) : cellInfo(cellData)} />
                                                <Cell key={cellIndex} data={cell(cellData, cellIndex)} />
                                                ))
                                            } */}
                                        {/* <Cell flex={1} data={index + 1} /> */}
                                        <Cell flex={1} data={drawing(index)} />
                                        <Cell flex={1} data={cellInfo(rowData.pi, index, 'pi')} />
                                        <Cell flex={1} data={cellInfo(rowData.size, index, 'size')} />
                                        <Cell flex={1} data={check(rowData.CNC, index, 'CNC')} />
                                        <Cell flex={1} data={check(rowData.T, index, 'T')} />
                                        <Cell flex={1} data={check(rowData.enlrgmnt, index, 'enlrgmnt')} />
                                        <Cell flex={1} data={check(rowData.reduction, index, 'reduction')} />
                                        <Cell flex={1} data={check(rowData.shorten, index, 'shorten')} />
                                        <Cell flex={1.5} data={cellInfo(rowData.requirement, index, 'requirement')} />
                                        <Cell flex={1.5} data={plan(rowData, index)} />
                                        {/* </ScrollView> */}
                                    </TableWrapper>
                                ))
                            }
                        </Table>
                    </View>
            }



            <BottomTool navigation={navigation}>
                {
                    isEdit ?
                        <Button title={'완료'} onPress={() => doneEdit()} />
                        :
                        <Button title={'수정'} onPress={() => edit()} />
                }
            </BottomTool>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingBottom: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1 },
    tableRow: { flexDirection: 'row', height: 40, backgroundColor: '#8e8e8e' },
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
    row: { flexDirection: "row" },
    spaceBetween: { justifyContent: "space-between" },
    text: {
        color: '#808080'
    },
    input: {
        height: 40,
        width: 120,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    cell: {
        flex: 1,
    }
});

export default BOMDetail;