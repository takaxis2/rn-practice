/* eslint-disable*/

// import { Button } from "@rneui/themed";
import { StyleSheet, View, Button } from "react-native";
import { CButton } from "./CustomButton";

const BottomTool = ({navigation, children}) =>{

   


    return (
        <View style={[styles.row,styles.spaceBetween, styles.footer]}>
            <View style={styles.row}> 
                {children}
            </View>

            <View style={styles.row}>
                <CButton title="이전 화면" onPress={()=>{
                    navigation.pop();
                }} />
                <CButton title="Home" onPress={()=>{
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
    footer:{
        left:0,
        right:0,
        bottom:0,
        position:'relative'
    }
})

export default BottomTool;