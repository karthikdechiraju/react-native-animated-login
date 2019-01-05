import React , { Component } from 'react'
import { Animated, BackHandler, Easing, ToastAndroid, Dimensions } from 'react-native'
import WrappedComponent from './view'

class Login extends Component{

    constructor(props){
        super(props)
        this.state = {
            hasSubmitted:false,
            showButton:true
        }
        // animation stuff
        this.scaleX = new Animated.Value(0)
        this.scaleY = new Animated.Value(0)
        this.borderRadius = new Animated.Value(0)
        this.translateY = new Animated.Value(0)
        this.opacityOut = new Animated.Value(0)
        this.scaledBoxOpacity = new Animated.Value(0)
        this.opacityIn = new Animated.Value(0)
        this.scaleButton = new Animated.Value(0)

        this.widthScale = (Dimensions.get('window').width - 40)/130
        this.heightScale = 6;
        this.showBackAnimation = false;
    }

    componentDidMount(){
        console.log(this.props)
        BackHandler.addEventListener('hardwareBackPress',this.handleBack)
    }

    componentWillUnmount(){
        this.showBackAnimation = null;
        BackHandler.removeEventListener('hardwareBackPress',this.handleBack)
    }

    handleBack = () => {
        if(this.showBackAnimation){
            Animated.parallel([
                this.createParellelAnimation({property:this.opacityIn,toValue:0,duration:200}),
                this.createParellelAnimation({property:this.scaledBoxOpacity,toValue:0,duration:100}),
                this.createParellelAnimation({property:this.scaleX,toValue:0,duration:200,delay:100}),
                this.createParellelAnimation({property:this.scaleY,toValue:0,duration:200,delay:100}),
                this.createParellelAnimation({property:this.borderRadius,toValue:0,duration:200,delay:100}),
                this.createParellelAnimation({property:this.translateY,toValue:0,duration:200,delay:100}),
            ]).start((e)=>{
                Animated.timing(
                    this.opacityOut,
                    {
                        toValue:0,
                        duration:100,
                        useNativeDriver:true
                    }
                ).start()
            })
            this.showBackAnimation = false;
            return true
        }else{
            this.showBackAnimation = true;
            return false
        }
    }


    createParellelAnimation = (animConfig) => {
        let { property,toValue,duration,delay } = animConfig;
        return Animated.timing(
            property,
            {
                toValue,
                duration,
                // easing:Easing.ease,
                delay: delay ? delay : 0,
                useNativeDriver:true
            }
        )
    }

    forwardAnimation = () => {
        Animated.timing(
            this.opacityOut,
            {
                toValue:1,
                duration:100,
                useNativeDriver:true
            }
        ).start(()=>{
            Animated.parallel([
                this.createParellelAnimation({property:this.scaleX,toValue:1,duration:200}),
                this.createParellelAnimation({property:this.scaleY,toValue:1,duration:200}),
                this.createParellelAnimation({property:this.borderRadius,toValue:1,duration:200}),
                this.createParellelAnimation({property:this.translateY,toValue:1,duration:200}),
            ]).start((e)=>{
                if(e.finished){
                    
                    Animated.parallel([
                        this.createParellelAnimation({property:this.opacityIn,toValue:1,duration:100}),
                        this.createParellelAnimation({property:this.scaledBoxOpacity,toValue:1,duration:200})
                    ]).start()
                    // })
                }
            })
        })
        this.showBackAnimation = true;
    }

    render(){
        const animationSpec = {
            scaleX:this.scaleX.interpolate({
                inputRange:[0,1],
                outputRange:[1,this.widthScale]
            }),
            scaleY:this.scaleY.interpolate({
                inputRange:[0,1],
                outputRange:[1,this.heightScale]
            }),
            borderRadius:this.borderRadius.interpolate({
                inputRange:[0,1],
                outputRange:[50,1]
            }),
            translateY:this.translateY.interpolate({
                inputRange:[0,1],
                outputRange:[0,-17.5]
            }),
            opacityIn:this.opacityIn.interpolate({
                inputRange:[0,1],
                outputRange:[0,1]
            }),
            opacityOut:this.opacityOut.interpolate({
                inputRange:[0,1],
                outputRange:[1,0]
            }),
            scaledBoxOpacity:this.scaledBoxOpacity.interpolate({
                inputRange:[0,1],
                outputRange:[1,0]
            }),
            scaleButton:this.scaleButton.interpolate({
                inputRange:[0,1],
                outputRange:[1,10]
            })
        }
        return(
            <WrappedComponent 
                onPress={this.forwardAnimation}
                {...this.props}
                showButton={this.state.showButton}
                animationSpec= {animationSpec}
                hasSubmitted={this.state.hasSubmitted}
            />
        )
    }
}
 
export default Login;