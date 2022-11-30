/* eslint-disable */
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTool from "../components/BottonTool";

const Submaterial= ({navigation}) =>{
    return (
        <View>
            <View>
                <Text>This is SubMaterial page</Text>
                <BottomTool navigation={navigation} />
            </View>
        </View>
    );
    
}

export default Submaterial;