import React, {Dispatch, FunctionComponent, SetStateAction} from 'react';
import {Pressable, Text, TouchableOpacity, View} from "react-native";
import {WStyle} from "../style";

interface TitleBarProps {
    title :  string,
    subTitle : string | null,
    onReset : () => Dispatch<SetStateAction<any>> | void,
};
type Props = TitleBarProps;

const TitleBar: FunctionComponent<Props> = ({title = 'title', subTitle, onReset }) => {
    return (
        <View style={WStyle.titleBarContainer}>
            <View style={WStyle.titleBarLeft}>
                <Text style={WStyle.titleBarText}>{title}</Text>
            </View>
            <View style={WStyle.titleBarRight}>
                { subTitle && subTitle.length > 0 &&
                    <>
                        <View style={WStyle.titleBarRightInnerLeft}>
                            <Text style={WStyle.titleBarSubText}>{subTitle}</Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={onReset}
                            style={WStyle.titleBarRightInnerRight}>
                            <Text style={{fontSize: 20, fontWeight:'bold'}}>{'↻'}</Text>
                        </TouchableOpacity>
                    </>
                }
            </View>
        </View>
    );
};

export default TitleBar;
