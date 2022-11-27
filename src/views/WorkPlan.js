/* eslint-disable */
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTool from "../components/BottonTool";

const WorkPlan= ({navigation}) =>{
    return (
        <SafeAreaView>
            <View>
                <Text>This is WorkPlan page</Text>
                <BottomTool navigation={navigation} />
            </View>
        </SafeAreaView>
    );
    
}

export default WorkPlan;