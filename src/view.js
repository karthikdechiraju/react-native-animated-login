import { View, Text, StatusBar, TouchableNativeFeedback, Dimensions, Animated, Image,TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import Styles from './styles';
import React from 'react'
import propTypes from 'prop-types';

const UiLayer = ({
        onPress,
        showButton,
        animationSpec,
        hasSubmitted,

        // user defined props
        logo,
        primaryColor="#512DA8",
        accentColor="#fff",
        FormComponent,
        title="APP NAME",
        submitText="DONE",
        submitTextColor="#000",
        submitButtonColor="#14ccad",
        onSubmit,
        titleColor='#fff'
        //end
    }) => {
    const { scaleX, scaleY, borderRadius, translateY, opacityIn, opacityOut, scaledBoxOpacity } = animationSpec
    return(
        <View style={[Styles.ViewStyle,{backgroundColor:primaryColor}]}>
            <StatusBar backgroundColor={primaryColor} barStyle="light-content"  />
            <View style={Styles.MainView}>
                <Animated.View style={[Styles.ImageView,{transform:[{translateY}]}]}>
                    <Image source={logo} style={Styles.Image} resizeMode="contain" />
                    <Text style={[Styles.TitleStyle,{color:titleColor}]} >{title}</Text>
                </Animated.View>
                <View style={Styles.AnimationView}>

                    <Animated.View 
                        style={ [Styles.FormView,{backgroundColor:accentColor,opacity:opacityIn}]}
                    >
                        <Animated.View>
                            <FormComponent />
                        </Animated.View>
                        <Animated.View style={Styles.SubmitButton}>
                            <TouchableOpacity 
                                activeOpacity={0.8} 
                                onPress={onSubmit}
                                
                            >
                                <Animated.View style={[Styles.SubmitInnerButton,{backgroundColor:submitButtonColor}]}>
                                    {hasSubmitted ? <ActivityIndicator size="large" color="#fff" /> : <Text style={[Styles.ButtonText,{color:'#fff'}]}>DONE</Text> }
                                </Animated.View>
                            </TouchableOpacity>
                        </Animated.View>
                    </Animated.View>

                    <Animated.View style={[Styles.InitialButton,{opacity:scaledBoxOpacity}]}>
                        <TouchableOpacity activeOpacity={1} onPress={onPress}>
                            <Animated.View 
                                style={[Styles.ButtonStyle,{
                                    transform:[{
                                        scaleX,
                                    },{
                                        scaleY
                                    },{
                                        translateY
                                    }],
                                    borderRadius,
                                    backgroundColor:accentColor
                                }]}
                            >
                                <Animated.Text style={[Styles.ButtonText,{opacity:opacityOut,backgroundColor:accentColor,color:submitTextColor}]}>{submitText}</Animated.Text>
                            </Animated.View>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </View>
    )
}


UiLayer.propTypes = {
    onPress : propTypes.func.isRequired,
    showButton: propTypes.bool.isRequired,
    animationSpec: propTypes.object.isRequired,
    hasSubmitted: propTypes.bool.isRequired,
    logo: propTypes.node,
    primaryColor: propTypes.string,
    accentColor: propTypes.string,
    FormComponent: propTypes.oneOfType([
        propTypes.element,
        propTypes.func
    ]).isRequired,
    title: propTypes.string,
    titleColor:propTypes.string,
    submitText: propTypes.string,
    submitTextColor: propTypes.string,
    submitButtonColor: propTypes.string,
    onSubmit: propTypes.func.isRequired
}

export default UiLayer;