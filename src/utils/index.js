import { Text, View } from "react-native";

export const check = (ox)=>(
    <View>
        <Text>{ox}</Text>
    </View>
);
export const convert = (data)=> {
    if(data) return check('O');
    else if(!data) return check('X');
}