import React, {FunctionComponent, useCallback} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {WeatherMainStyle} from "../../style";

interface OwnProps {
    title: string;
    button?: boolean | undefined | null;
    onPress?: () => Promise<ReturnType<any>> | undefined | null;
    subTitle?: string;
}
type Props = OwnProps;

const SubTitleBar: FunctionComponent<Props> = ({     title
                                                   , button
                                                   , onPress
                                                   , subTitle
                                               }) => {
    const pressHandler = () => {
        if (button) {
            onPress();
        }
    };

    const subTitleMaker = useCallback( () => {
        if(subTitle && subTitle.length > 0){
            const Day  = subTitle?.split(',')[0];
            const Time = subTitle?.split(',')[1].substr(0,6);
            return (
                <>
                    <Text style={WeatherMainStyle.buttonTextTiny}>{ Day }</Text>
                    <Text style={WeatherMainStyle.buttonTextSmall}>{ Time }</Text>
                </>
            )
        }else{
            return <Text style={WeatherMainStyle.buttonTextTiny}>{''}</Text>
        }
    },[subTitle])

    return (
        <View
            style={{
                  width: '100%'
                , height: 40
                , backgroundColor: '#92d489'
                , padding: 5
                , flexDirection: 'row'
            }}>
            <View style={{
                width: '75%'
                , justifyContent: 'center'
                , paddingLeft: 15
                , alignItems: 'flex-start'
            }}>
                <Text style={WeatherMainStyle.buttonText18}>{title}</Text>
            </View>
            <View style={{
                width: '15%'
                , justifyContent: 'center'
                , alignItems: 'flex-end'
            }}>
                { subTitleMaker() }
            </View>
            <View style={{
                  width: '10%', paddingRight: 5
                , justifyContent: 'center', alignItems: 'flex-end'
            }}>
                { button &&
                (
                    <TouchableOpacity
                        onPress={pressHandler}
                        style={[WeatherMainStyle.buttonStyleSmall2]}>
                        <Text style={WeatherMainStyle.buttonIconText}>
                            {'↻'}
                        </Text>
                    </TouchableOpacity>
                )
                }
            </View>
        </View>
    );
};

export default SubTitleBar;
