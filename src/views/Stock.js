/* eslint-disable */
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { Cell, Col, Row, TableWrapper } from "react-native-table-component";
import BottomTool from "../components/BottonTool";
import { sRowData, sRowHead } from "../sampleData";

const Stock= ({navigation}) =>{

    const rowHead=sRowHead;
    const rowData=sRowData;

    const cols=(data)=>(

        
        // data.map((colData, index)=>(
        //     <View>
        //         <Cell style={styles.} key={index} data={colData} />
        //         {/* <Text key={index}>{colData}</Text> */}
        //     </View>
        // ))
        <TableWrapper style={styles.tableCol}>
            {
                data.map((colData, index)=>(
                    <Text key={index}>{colData}</Text>
                ))
            }
        </TableWrapper>
    );

    const arrCheck =(data)=>{
        if(Array.isArray(data)){
            return cols(data);
        }

        return data;
    }

    return (
        <View style={styles.container}>
            <Text>This is Stock page</Text>
            <Row data={rowHead} style={styles.head}/>
            {
                rowData.map((rowData,index)=>(
                    <TableWrapper key={index} style={styles.tableRow}>
                        {
                            rowData.map((cellData, cellIndex)=>(
                                <Cell key={cellIndex} data={arrCheck(cellData)} />
                            ))
                        }
                    </TableWrapper>
                ))
                    
             }
            <BottomTool navigation={navigation} />
        </View>
    );
    
}

const styles= StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },

    head: { height: 40, backgroundColor: '#f1f8ff' },
    tableRow: {flexDirection: 'row', flex:1, backgroundColor: '#E7E6E1', borderWidth:1 },
    tableCol:{flexDirection:"column",}
});

export default Stock;