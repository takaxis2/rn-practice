/* eslint-disable*/

import { Button } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

const BottomTool = ({navigation}) =>{

    return (
        <View style={[styles.row,styles.spaceBetween]}>
            <Button title="수정"/>
            <View style={styles.row}>
                <Button title="이전 화면" onPress={()=>{
                    navigation.pop();
                }} />
                <Button title="Home" onPress={()=>{
                    navigation.navigate('Home');
                }}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    spaceBetween:{
        justifyContent:"space-between"
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
})

export default BottomTool;