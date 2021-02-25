import React, {FunctionComponent, useEffect, useState} from 'react';
import {WeatherMainStyle} from "../../style";
import Animated, {Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming} from "react-native-reanimated";
import {
    Pressable
    , StyleSheet, Text, TextInput, View
    , Keyboard
    , TouchableWithoutFeedback
    , Alert
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store";
import {getWiseWord, sendQuery} from "../../util/utils";
import {SET_MEMOBOARD_SHOW_HIDE, START_UPDATE_MONTH} from "../../reducer/actionTypes";
import {skyCode} from "../../util/weatherCode";

interface OwnProps {
    showHide? : boolean
}

type Props = OwnProps;

const MemoBoard: FunctionComponent<Props> = ({ showHide }) => {
  const dispatch = useDispatch();
  const [targetDate , setTargetDate] = useState('');
  const [inputValue , setInputValue] = useState('');
  const [wiseWords , setWiseWords] = useState({say:'', words: ''});
  const [isModify   , setIsModify] = useState(false);
  const { title, memo } = useSelector((state : RootReducerType) => state.weatherReducer['memoBoardData'] );
  const todayWeather = useSelector((state : RootReducerType) => state.weatherReducer['today_weather'] );
  const avoidingKeyboard = useSharedValue(90);
  const modalShowHide: boolean  = useSelector((state : RootReducerType) => state.weatherReducer['modalShowHide']);
    // useEffect(()=>{
    //     console.log('modalShowHide', modalShowHide);
    // },[modalShowHide])
    // <MemoBoard showHide={modalShowHide} />

    useEffect(() => {
        //DismissKeyboard().catch();
        dispatch({ type: START_UPDATE_MONTH, data: false })
        setWiseWords(getWiseWord());
        setTargetDate(title);
        if(memo && memo.hasOwnProperty('memo') && memo.memo.length > 0 ){
             setInputValue(memo.memo);
             setIsModify(true);
        }
    },[title, memo]);

    const updateInputText = (text: string) => {
        setInputValue(text);
    }

    const DismissKeyboard = async () => {
        await Keyboard.dismiss();
    };

    const saveMemo = async (type : 'PUT' | 'POST') => {
        if(inputValue && inputValue.trim().length > 0){
            (type === 'PUT') ?
                await sendQuery('PUT', targetDate, inputValue.trim())
                    .then((res) => {
                        if(res === 'DONE'){
                            closeModal();
                        }
                    })
                    .catch( (err) => {
                        console.log("[saveMemo]/PUT/ERROR :", err);
                        closeModal();
                    })
                :
                await sendQuery('POST', targetDate, inputValue.trim(), todayWeather)
                    .then((res) => {
                        if(res === 'DONE'){
                            dispatch({ type: START_UPDATE_MONTH, data: true })
                            closeModal();
                        }
                    })
                    .catch( (err) => {
                        console.log("[saveMemo]/POST/ERROR :", err);
                        closeModal();
                    })
        }
    }

    const deleteMemo = async (targetDate: string) => {
        await sendQuery('DELETE', targetDate)
            .then((res) => {
                console.log('[deleteMemo]/sendQuery ret :', res);
                if(res === 'DONE'){
                    dispatch({ type: START_UPDATE_MONTH, data: true })
                    closeModal();
                }
            })
            .catch((err)=>{
                console.log('[deleteMemo]/ERROR :', err);
                closeModal();
            });
    }

    const deleteAlert = () => {
        if(targetDate){
            let titleText = targetDate+'일\n메모을 삭제 하시겠습니까?\n메모를 복구 할 수 없습니다. ';
            Alert.alert('[알림]', titleText,
                [
                    {
                        text: '아니오', onPress: () => {
                            return false;
                        }, style: 'cancel'
                    }
                    , {text: '예', onPress: () => deleteMemo(targetDate) }
                ]
                , {cancelable: false});
        }
       return false;
    };

    const closeModal = async () => {
        await setTargetDate('');
        await setInputValue('');
        avoidingKeyboard.value = 90;
        await setIsModify(false);
        await dispatch({ type: SET_MEMOBOARD_SHOW_HIDE , data : false });
    };

    // modalLayout 300 paddingbottom 을 300정도 주면 괜찮게 보인다. 평상시에는 100정도면 될듯
    const keboardAvoid = ( type: 'FOCUS' | 'BLUR') => {
        if(type === 'FOCUS'){
            avoidingKeyboard.value = withSpring(330);
        }else{
            DismissKeyboard();
            avoidingKeyboard.value = withTiming(90, {
                duration: 500,
                easing: Easing.bounce
            });
        }
    }

    const paddingBottomAnimation =  useAnimatedStyle( () => {
        return {
            paddingBottom : avoidingKeyboard.value
        }
    })

  return (modalShowHide) ? (
            <TouchableWithoutFeedback
                onPress={DismissKeyboard}
                accessible={true}>
                      <Animated.View
                          style={[paddingBottomAnimation, WeatherMainStyle.modalLayout]}>
                          <Animated.View style={[WeatherMainStyle.modalContents]}>
                              <View style={StyleSheet.absoluteFill}>
                                  <View style={WeatherMainStyle.modalContentsTopLiner }>
                                      { (memo && memo?.weatherinfo ) ?
                                          <View style={{ width: '15%', justifyContent: 'center', alignItems:'center'}}>
                                              <Text style={{fontSize: 30}}>{skyCode['S'+memo.weatherinfo]}</Text>
                                          </View>
                                          :
                                          <View style={{ width: '15%', justifyContent: 'center', alignItems:'center'}}>
                                              <Text style={{fontSize: 25}}>{'🌏'}</Text>
                                          </View>
                                      }
                                      <View style={{ width: '75%', paddingLeft: 10}}>
                                          <Text style={{fontSize: 17}}>{targetDate.split('-').join('. ')}</Text>
                                      </View>
                                      <Pressable onPress={closeModal}>
                                          <View style={{width: '15%'
                                              , justifyContent: 'center'
                                              , alignItems:'center'}}>
                                              <View style={{
                                                  width: 25
                                                  , height: 25
                                                  , borderRadius : 2
                                                  , justifyContent: 'center', alignItems:'center'
                                                  , backgroundColor: '#FFFFFF'
                                              }}>
                                                  <Text style={{ color: '#000000', fontSize: 20, fontWeight: 'bold'}}>{'⨉'}</Text>
                                              </View>
                                          </View>
                                      </Pressable>
                                  </View>

                                  <View style={{ width: '100%',height: '69%'
                                                  , backgroundColor: '#e9fcbb'
                                                  , justifyContent : 'flex-start'
                                                  , padding : 10
                                                  }}>
                                      <View style={{alignSelf:'center' , width: '100%'
                                          , borderWidth: 1
                                          , borderColor: '#d7d7d7'
                                      }}>
                                          <TextInput
                                              autoFocus={false}
                                              onFocus={()=>keboardAvoid('FOCUS')}
                                              onBlur={()=>keboardAvoid('BLUR')}
                                              onChangeText={(text)=>updateInputText(text) }
                                              placeholder={'"'+wiseWords.words+'"'+'\n - '+wiseWords.say}
                                              scrollEnabled={true}
                                              style={{
                                                    fontSize: 15
                                                  , padding: 15
                                                  , color:'#333333'
                                                  , textAlignVertical: 'top'
                                                  , textAlign: 'left'
                                                  , width: '100%'
                                              }}
                                              multiline={true}
                                              editable={true}
                                              numberOfLines={15}
                                              value={inputValue}
                                          />
                                      </View>
                                  </View>

                                  <View style={{height: '12%', justifyContent:'space-around', width: '100%'
                                      , flexDirection: 'row'
                                      , alignItems: 'flex-start'
                                      , backgroundColor: '#e9fcbb'
                                  }}>

                                      { (isModify) ?
                                          <Pressable onPress={()=>deleteAlert()}>
                                              <View style={WeatherMainStyle.buttonStyleRed}>
                                                  <Text style={WeatherMainStyle.buttonTextNormal}>기록을 삭제 합니다</Text>
                                              </View>
                                          </Pressable>
                                          :
                                          <Pressable onPress={()=>closeModal()}>
                                              <View style={WeatherMainStyle.buttonStyleBlack}>
                                                  <Text style={WeatherMainStyle.buttonTextNormal}>닫기</Text>
                                              </View>
                                          </Pressable>
                                      }

                                      { (isModify) ?
                                          <Pressable onPress={()=>saveMemo('PUT')}>
                                              <View style={WeatherMainStyle.buttonStyleOrange}>
                                                  <Text style={WeatherMainStyle.buttonTextNormal}>기록을 수정 합니다</Text>
                                              </View>
                                          </Pressable>
                                          :
                                          <Pressable onPress={()=>saveMemo('POST')}>
                                              <View style={WeatherMainStyle.buttonStyleGreen}>
                                                  <Text style={WeatherMainStyle.buttonTextNormal}>기억을 기록 합니다</Text>
                                              </View>
                                          </Pressable>
                                      }
                                  </View>

                                  <View style={WeatherMainStyle.modalContentsBottomLiner } />
                              </View>
                          </Animated.View>
                      </Animated.View>
            </TouchableWithoutFeedback>
  ) : null;
};

export default React.memo(MemoBoard);
