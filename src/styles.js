import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'

let deviceWidth = Dimensions.get('window').width;

const Styles = StyleSheet.create({
    MainView:{
        flex:1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    ImageView:{
        flex:1,
        justifyContent:'center',
        marginTop:100
    },
    Image:{
       width:120,
       height:120
    },
    AnimationView:{
        height:400,
        justifyContent:'flex-end',
        position:'relative'
    },
    ViewStyle:{
        flex:1
    },
    ButtonStyle:{
        height:50,
        width:130,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 50,
        elevation:5,
        marginBottom:100
    },
    ButtonText:{
        fontSize: 16,
        fontWeight: '600',
    },
    FormView:{
        height:300,
        width:deviceWidth-40,
        padding: 30,
        borderRadius: 4,
        marginBottom:70,
        elevation:5,
        transform:[{
            translateY:-10
        }],
        position:'relative'
    },
    SubmitButton:{
        width:'100%',
        height:50,
        alignItems:'center'
    },
    SubmitInnerButton:{
        width:100,
        height:50,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center'
    },
    TitleStyle:{
        fontWeight:'600',
        textAlign:'center',
        fontSize:20
    },
    InitialButton:{
        position:'absolute',
        zIndex:1,
        top:250,
        left:0,
        elevation:5,
        height:50,
        width:(Dimensions.get('window').width - 40),
        alignItems:'center'
    }
})

export default Styles;