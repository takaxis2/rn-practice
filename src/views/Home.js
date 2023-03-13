/* eslint-disable */
import { StyleSheet, View} from 'react-native';
import { Button } from "@rneui/themed";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from '@rneui/base';
import { useEffect, useState } from 'react';
import { socket } from '../api';
import { CRButton } from '../components/CustomButton';

const Home = ({navigation}) => {

  const [wpTask, setWpTask] = useState(0);
  const [ppTask, setPpTask] = useState(0);
  

  useEffect(()=>{
    // console.log('ws wp');
    socket.emit('work-plan');
    socket.on('wpNotification',(e)=>{
      // console.log(e);
      setWpTask(e);
    });
  },[]);

  useEffect(()=>{
    // console.log('ws pp');
    socket.emit('prod-plan');
    socket.on('ppNotification',(e)=>{
      setPpTask(e);
    })
  },[]);

  return ( 
    // <SafeAreaView>
      <View style={[styles.spaceAround, styles.container]}>
        <View><CRButton size="lg" title ="모델" onPress={()=>navigation.push('Model')} /></View>
        <View><CRButton size="lg" title={`생산 계획 : ${ppTask}`} onPress={()=>navigation.push('ProductionPlan')} /></View>
        <View >
          <CRButton size="lg" title ={`일일 작업 계획 : ${wpTask}`} onPress={()=>navigation.push('WorkPlan')}/>
          
        </View>
        <View><CRButton size="lg" title ="B.O.M" onPress={()=>navigation.push('BOM')}/></View>
        {/* <View><Button size="lg" title ="도면" onPress={()=>navigation.push('Drawing')}/></View>
        <View><Button size="lg" title ="재고 현황" onPress={()=>navigation.push('Stock')}/></View>
        <View><Button size="lg" title ="부자재 주문" onPress={()=>navigation.push('Submaterial')}/></View> */}
        <View style={[styles.row, styles.spaceBetween]}>
          <CRButton size="lg" title="수정" />
          <CRButton size="lg" title="데이터 백업" />
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
    column:{
      flexDirection:"column"
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