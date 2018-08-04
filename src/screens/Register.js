import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View, Text, Image, StyleSheet, Animated, InteractionManager, Alert,TouchableOpacity,
    AsyncStorage
} from 'react-native';
import {Input, Logo, Heading, AlertStatus} from '../components';
import { NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import {getPlatformValue} from '../utils';
import { fetchData } from '../utils/fetchData';
export default class Register extends Component {

    static navigationOptions = {
        title: 'Registrate',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#7e5682'
        },
    };
    
    state = {
        username: '',
        email: '',
        password: '',
        cargando:false,
        animation: {
            headerPositionTop: new Animated.Value(-148),
            formPositionLeft: new Animated.Value(614),
            buttonPositionTop: new Animated.Value(1354)
        }
    }

    handleChangeInput(stateName, text) {
        this.setState({
            [stateName]: text
        })
    }

    handleRegister() {
        
    }

    unmountComponent(callback) {
        const timing = Animated.timing;
        Animated.parallel([
            timing(this.state.animation.headerPositionTop, {
                toValue: -148,
                duration: 100,
                delay: 90
            }),
            timing(this.state.animation.formPositionLeft, {
                toValue: 614,
                duration: 200,
                delay: 110
            }),
            timing(this.state.animation.buttonPositionTop, {
                toValue: 1354,
                duration: 100,
                delay: 120
            })
        ]).start(callback);
    }

    handleBack() {
    }

    handleLogin() {
        //this.unmountComponent(() => { 
        this.props.navigation.goBack()
        //})
    }

    componentDidMount() {
        Animated.timing(this.state.animation.headerPositionTop, {
            toValue: 0,
            duration: 725,
            delay: 100
        }).start();
        Animated.timing(this.state.animation.formPositionLeft, {
            toValue: 0,
            duration: 700,
            delay: 120
        }).start();
        Animated.timing(this.state.animation.buttonPositionTop, {
            toValue: 0,
            duration: 600,
            delay: 130
        }).start();
    }
    Registrar = ()=>{
        let {token} = this.props.navigation.state.params
        fetchData('/ws/create_user','POST',{usuario:this.state.username,email:this.state.email,password:this.state.password,token,tipo:'android'},(res,err)=>{
            if (err) console.log(err)
            if(!err){

                AsyncStorage.setItem("USUARIO",JSON.stringify(
                    {usuario:this.state.username,email:this.state.email,password:this.state.password,token,tipo:'android'}
                ))
                this.props.navigation.navigate('home')
            }
        })
    }
    render() {
        return <View style={registerStyle.container}>
                <View style={registerStyle.loginContainer}>
                
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity activeOpacity={0.8}
                        style={{
                            padding: 0, marginTop: 10,
                        }}> 
                        <Icon name={"camera"} size={100} color={"#ffffff"} style={{ marginRight: 15 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={registerStyle.formContainer}>
                        <Animated.View style={{position: 'relative', left: this.state.animation.formPositionLeft}}>
                            <Input label="Usuario"
                                    icon={<Icon name="user"/>}
                                    marginTop={23}
                                    value={this.state.username}
                                    onChange={this.handleChangeInput.bind(this, 'username')}
                            />
                            <Input label="Email"
                                    icon={<Icon name="envelope-o"/>}
                                    value={this.state.email}
                                    marginTop={23}
                                    onChange={this.handleChangeInput.bind(this, 'email')}
                            />
                            <Input label="Contraseña"
                                    icon={<Icon name="key"/>}
                                    value={this.state.password}
                                    marginTop={23}
                                    onChange={this.handleChangeInput.bind(this, 'password')}
                                    secureTextEntry
                            />
                        </Animated.View>
                        <Animated.View style={{position: 'relative', top: this.state.animation.buttonPositionTop}}>

                            <TouchableOpacity onPress={()=>this.Registrar()}
                                    activeOpacity={0.8}
                                    disabled={this.state.cargando}
                                    style={{
                                        shadowOffset: {
                                            width: 5,
                                            height: 5,
                                        },
                                        shadowColor: 'black',
                                        shadowOpacity: 0.4,elevation: 5,
                                        borderWidth: 1, borderRadius: 2, 
                                        borderColor: '#6c56b7', backgroundColor: '#6c56b7',
                                        padding: 15, alignItems: 'center', 
                                        marginBottom: 10,marginTop:10, 
                                        flexDirection: 'row',
                                        marginLeft:10,marginRight:10,
                                        alignItems: 'center', justifyContent: 'center'
                                    }}>
                                    <Icon name='check' color='white' size={20} />
                                    <Text style={{ color: '#fff', fontWeight: 'bold', marginLeft: 10 }}>Registrar</Text>
                            </TouchableOpacity> 

                        </Animated.View>
                    </View>
                </View>
                <AlertStatus textHelper="Ya tienes una cuenta" textAction="Inicia sesión"
                            onPressAction={this.handleLogin.bind(this)}></AlertStatus>
        </View>
    }
}

const registerStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    loginContainer: {
        flex: 1,
        backgroundColor: '#7e5682'
    },
    formContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15
        //backgroundColor: '#ffffff'
    },
    avatar: {
        borderRadius: 10,
        width: 100,
        height: 100
    }
})