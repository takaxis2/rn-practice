import { Button } from "react-native";
import { Button as RButton } from "@rneui/themed";


export const CButton=({title, onPress,})=>(
    <Button title={title} onPress={onPress} color='#6D9BC3' />
);

export const CRButton=({title, onPress, size})=>(
    <RButton title={title} size={size} onPress={onPress} color='#6D9BC3' />
);
