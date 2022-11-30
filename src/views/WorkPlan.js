/* eslint-disable */
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { Table, Row, TableWrapper, Cell } from "react-native-table-component";
import BottomTool from "../components/BottonTool";
import { wData, wRowHead } from "../sampleData";

const WorkPlan= ({navigation}) =>{

    const data = wData;
    const rowHead = wRowHead;

    const complete = (data)=>(
        <TouchableOpacity    onPress={()=>{
          alert(data);
        }}>
          <View >
              <Text>완료</Text>
          </View>
        </TouchableOpacity>
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
                <BottomTool navigation={navigation} />
            </View>
        </View>
    );
    
}

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#f1f8ff' },
    tableRow: {flexDirection: 'row', height: 40, backgroundColor: '#E7E6E1' },
})

export default WorkPlan;    