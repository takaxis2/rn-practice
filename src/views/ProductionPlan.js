/* eslint-disable */
import { useCallback, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTool from "../components/BottonTool";
import  DocumentPicker  from 'react-native-document-picker'
import { Button } from "@rneui/themed";
import { Row, Rows, Table } from "react-native-table-component";

const ProductionPlan= ({navigation}) =>{
  
  const row = ['id', '품명', '납기', '수량'];
  const rowData =[
    [1,'a','2022/10/10', 300],
    [2,'b','2022/10/20', 200],
    [3,'c','2022/10/30', 100],
  ];

  const [fileResponse, setFileResponse] = useState([]);

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
              <Rows data={rowData} />
            </Table>
        </View>
      </View>

        <BottomTool navigation={navigation}/>
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
    }
  });

export default ProductionPlan;