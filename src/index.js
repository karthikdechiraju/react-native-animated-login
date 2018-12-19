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
        this.opacityIn = new Animated.Value(0)
        this.scaleButton = new Animated.Value(0)

        this.widthScale = (Dimensions.get('window').width - 40)/130
        this.heightScale = 300/50;
    }

    componentDidMount(){
        console.log(this.props)
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

    animate = () => {
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
                    this.setState({showButton:false},()=>{
                        Animated.parallel([
                            this.createParellelAnimation({property:this.opacityIn,toValue:1,duration:100}),
                            this.createParellelAnimation({property:this.scaleButton,toValue:1,duration:100}),
                        ]).start()
                    })
                }
            })
        })
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
            scaleButton:this.scaleButton.interpolate({
                inputRange:[0,1],
                outputRange:[1,10]
            })
        }
        return(
            <WrappedComponent 
                onPress={this.animate}
                {...this.props}
                showButton={this.state.showButton}
                animationSpec= {animationSpec}
                hasSubmitted={this.state.hasSubmitted}
            />
        )
    }
}
 
export default Login;