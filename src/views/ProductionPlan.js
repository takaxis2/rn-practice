/* eslint-disable */
import { useCallback, useState } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import BottomTool from "../components/BottonTool";
import  DocumentPicker  from 'react-native-document-picker'
import { Button } from "@rneui/themed";
import { Row, Rows, Table, TableWrapper, Cell } from "react-native-table-component";
import { pRow, pData } from "../sampleData";

const ProductionPlan= ({navigation}) =>{
  
  const row = pRow;
  const data = pData;

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

  const complete = (data)=>(
    <TouchableOpacity onPress={()=>{
      alert(data);
    }}>
      <View >
          <Text>완료</Text>
      </View>
    </TouchableOpacity>
  );

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
    },
    tableRow: {flexDirection: 'row', height: 40, backgroundColor: '#E7E6E1' },
  });

export default ProductionPlan;