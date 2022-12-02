/* eslint-disable */
import { StyleSheet, View} from 'react-native';
import { Button } from "@rneui/themed";
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = ({navigation}) => {
  return ( 
    // <SafeAreaView>
      <View style={[styles.spaceAround, styles.container]}>
        <View><Button size="lg" title ="모델" onPress={()=>navigation.push('Model')} /></View>
        <View><Button size="lg" title="생산 계획" onPress={()=>navigation.push('ProductionPlan')} /></View>
        <View><Button size="lg" title ="일일 작업 계획" onPress={()=>navigation.push('WorkPlan')}/></View>
        <View><Button size="lg" title ="B.O.M" onPress={()=>navigation.push('BOM')}/></View>
        {/* <View><Button size="lg" title ="도면" onPress={()=>navigation.push('Drawing')}/></View>
        <View><Button size="lg" title ="재고 현황" onPress={()=>navigation.push('Stock')}/></View>
        <View><Button size="lg" title ="부자재 주문" onPress={()=>navigation.push('Submaterial')}/></View> */}
        <View style={[styles.row, styles.spaceBetween]}>
          <Button size="lg" title="수정" />
          <Button size="lg" title="데이터 백업" />
        </View>
      </View>
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    spaceAround:{
        justifyContent: 'space-around',
        margin: 8,
        padding:10
    },
    container: {
      flex: 1,
      marginTop: 8,
      backgroundColor: "aliceblue",
    },
});

export default Home;