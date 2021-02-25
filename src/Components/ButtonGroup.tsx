import React, {Dispatch, FunctionComponent, SetStateAction, useCallback} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {WStyle} from "../style";

interface ButtonGroupProps {
    onPress : (text : string) => Dispatch<SetStateAction<any>> | void,
    data : string[],
    selected : string | null,
}

type Props = ButtonGroupProps;

const ButtonGroup: FunctionComponent<Props> = ({ onPress, data , selected }) => {

    const buttonGroup =  useCallback(  (data) => {
        return data.map((el: string, index: number) => {
            if(el){
                return (
                    <TouchableOpacity
                        key={'sidoState'+':'+index }
                        activeOpacity={0.5}
                        onPress={ () => onPress(el) }
                        style={[WStyle.buttonLayout,{ borderWidth: (el === selected) ? 3 : 0 }]}>
                        <Text style={[WStyle.buttonText,{
                            fontSize : (el.length > 7) ? 10 : 12
                        }]}>{el}</Text>
                    </TouchableOpacity>
                )
            }
        });
    },[data, selected]);

    if(data && data.length > 0){
        return (
            <View style={WStyle.buttonGroupContainer}>
                { buttonGroup(data) }
            </View>
        );
    }else{
        return null;
    }
};

export default React.memo(ButtonGroup);
