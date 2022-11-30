/* eslint-disable */
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTool from "../components/BottonTool";

const Drawing= ({navigation}) =>{
    return (
        <View>
            <View>
                <Text>This is Drawing page</Text>
                <BottomTool navigation={navigation} />
            </View>
        </View>
    );
    
}

export default Drawing;