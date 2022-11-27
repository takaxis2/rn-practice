/*eslint-disable*/
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

export default  ModelDetails =()=> {
  
  const tableHead =['/','품명','B.O.M','계획'];
  const tableData = [
    [1,	'abcd','B.O.M',	'계획'],
    [2,	'DFS','B.O.M',	'계획'],
    [3,	'SE','B.O.M',	'계획'],
    [4,	'SES','B.O.M',	'계획'],
    [5,	'W','B.O.M',	'계획'],
    [6,	'AWE','B.O.M',	'계획'],
    [7,	'SESE','B.O.M',	'계획'],
    [8,	'SF','B.O.M',	'계획'],
    [9,	'X','B.O.M',	'계획'],
    [10, 'VADSFA','B.O.M',	'계획'],
    [11,'XZVSS','B.O.M',	'계획'],
    [12,'E', 'B.O.M','계획'],
    [13,'SVEW','B.O.M',	'계획'],
    [14,'SSE','B.O.M',	'계획'],
    [15,'SWWQ','B.O.M',	'계획']
      ];

  _alertIndex=(index) => {
    Alert.alert(`This is row ${index + 1}`);
  }

  const element = (data, index) => (
    <TouchableOpacity onPress={() => this._alertIndex(index)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>button</Text>
      </View>
    </TouchableOpacity>
  );

 
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          {
            tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
    )
  
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});