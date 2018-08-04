import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View, 
    Text, 
    Image, 
    StyleSheet, 
    Animated, 
    InteractionManager, 
    StatusBar, 
    TouchableOpacity, 
    Dimensions,
    Alert,
    Keyboard,
    ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {URL_WS} from '../utils/constantes';
import {NavigationActions, createStackNavigator} from 'react-navigation';
import {
    Input, 
    Logo, 
    Heading, 
    AlertStatus} from '../components';

import FBSDK, {
    LoginButton,
    AccessToken,
    LoginManager,
    GraphRequestManager, GraphRequest,
} from 'react-native-fbsdk'

const { width, height } = Dimensions.get('window')

export default class Login extends Component {

    static navigationOptions = {
        header: null,
    };
    state = {
        username: '', 
        password: '',
        logoPositionTop: new Animated.Value(-228),
        groupHeadingPositionLeft: new Animated.Value(-614),
        buttonPositionLeft: new Animated.Value(-696),
        statusPositionTop: new Animated.Value(1200),
        formPositionLeft: new Animated.Value(614),
        buttonPositionTop: new Animated.Value(1354),
        headerPositionTop: new Animated.Value(-148),
        cargando:false,
    };

    animateHome(){
        const timingToZero = (stateValue) => Animated.timing(
            stateValue,
            {
                toValue: 0,
                duration: 700
            }
        )
        Animated.sequence([
            Animated.delay(20),
            Animated.parallel([
                timingToZero(this.state.logoPositionTop),
                timingToZero(this.state.groupHeadingPositionLeft),
                timingToZero(this.state.buttonPositionLeft),
                Animated.timing(this.state.statusPositionTop, {
                    toValue: 0,
                    duration: 700
                })
            ])
        ]).start()
    }

    componentDidMount() {
        Animated.timing(this.state.headerPositionTop, {
            toValue: 0,
            duration: 725,
            delay: 100
        }).start();
        Animated.timing(this.state.formPositionLeft, {
            toValue: 0,
            duration: 700,
            delay: 120
        }).start();
        Animated.timing(this.state.buttonPositionTop, {
            toValue: 0,
            duration: 600,
            delay: 130
        }).start();
    }

    componentDidMount(){
        if(this.props.disableInteractionCheck) {
            this.animateHome();
        }
        else {
            InteractionManager.runAfterInteractions(() => {
                this.animateHome();
            })
        }
    }

    
    handleChangeInput(stateName, text) {
        this.setState({
            [stateName]: text
        })
    }

    handlePressSignUp() { 
        this.props.navigation.navigate('register')
    }

    loginFB = () => {
        
        this.setState({ progressVisible: true})
        LoginManager.logOut()
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then((result) => {
            if (result.isCancelled) {
                console.log('loging cancelled')
            }
            else {
                console.log('login success' + result.grantedPermissions)

                const infoRequest = new GraphRequest('/me', {
                    parameters: {
                        'fields': {
                            'string': 'email,first_name,last_name,picture,name'
                        }
                    }
                }, (err, res) => {
                    if (err) {
                        this.setState({ progressVisible: false })
                        alert('Intente mas luego...')
                    } else {
                        console.log(res.email)
                        /*const parametros = {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                email: res.email,
                            })
                        }*/
                        /*fetch(URL_WS_SOCKET + '/ws/isuser', parametros)
                            .then((response) => response.json())
                            .then((responseJson) => {
                                if (responseJson.res != "ok") {
                                    //Si no fue registrado
                                    const user_data = {
                                        id: res.id,
                                        name: res.name,
                                        first_name: res.first_name,
                                        last_name: res.last_name,
                                        email: res.email,
                                        picture: 'https://graph.facebook.com/' + res.id + '/picture?height=200&width=200' //res.picture.data.url,
                                        //https://graph.facebook.com/1501027589955221/picture?height=350&width=250
                                    }
                                    if (res.email != null && res.email != "") {
                                        const main = NavigationActions.reset({
                                            index: 0,
                                            actions: [
                                                NavigationActions.navigate(
                                                    {
                                                        routeName: 'registrodetalle',
                                                        params: { user: user_data.email, photoUrl: user_data.picture, nombre: res.name }
                                                    })
                                            ]
                                        })
                                        this.props.navigation.dispatch(main)
                                    } else {
                                        const main = NavigationActions.reset({
                                            index: 0,
                                            actions: [
                                                NavigationActions.navigate(
                                                    {
                                                        routeName: 'registro',
                                                        params: { user: user_data.email, photoUrl: user_data.picture }
                                                    })
                                            ]
                                        })
                                        this.props.navigation.dispatch(main)
                                    }
                                } else {
                                    //Si ya fue registrado
                                    const user = responseJson.user
                                    const user_data = {
                                        id: user._id,
                                        username: user.username,
                                        name: user.name,
                                        email: user.email,
                                        password: user.password,
                                        photo_url: user.photo_url,
                                    }
                                    AsyncStorage.setItem('USER_DATA', JSON.stringify(user_data), () => {
                                        const main = NavigationActions.reset({
                                            index: 0,
                                            actions: [
                                                NavigationActions.navigate(
                                                    {
                                                        routeName: 'main',
                                                    })
                                            ]
                                        })
                                        this.props.navigation.dispatch(main)
                                    }).catch(err => console.log('Error'));

                                }
                            })
                            .catch((error) => {
                                this.setState({ cargando: false, progressVisible: false })
                                Alert.alert('Error', 'Ocurrio un error, compruebe su conexion a internet')
                            });*/

                    }

                });
                new GraphRequestManager().addRequest(infoRequest).start();

            }
        }, (error) => {

            this.setState({ progressVisible: false })
            Alert.alert('Error', 'Ocurrio un error, compruebe su conexion a internet')
        })
    }

    login=() => {
        Keyboard.dismiss()
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usuario: (this.state.username).toLocaleLowerCase().trim(),
                password: this.state.password
            })
        }
        fetch(URL_WS + '/ws/login_user', parametros)
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.respuesta=='ok'){

                }else{

                }
            })
    }

    

    render() {
        return <View style={loginStyle.container}>
                <ScrollView style={loginStyle.loginContainer} keyboardShouldPersistTaps='handled'>
                    <View style={loginStyle.loginContainer}>
                        <StatusBar
                            backgroundColor="#422A44"
                            barStyle="light-content"
                        />
                        <Animated.View style={{position: 'relative', top: this.state.logoPositionTop}}>
                            <Logo/>
                        </Animated.View> 

                        <Animated.View style={{position: 'relative', marginBottom:20, paddingLeft: 15, paddingRight: 15, left: this.state.buttonPositionLeft}}>
                                <Input label="Usuario"
                                    icon={<Icon name="face"/>} 
                                    value={this.state.username}
                                    marginBottom={23}
                                    onChange={this.handleChangeInput.bind(this, 'username')}
                                />
                                <Input label="Contraseña"
                                    icon={<Icon name="key"/>}
                                    marginTop={23}
                                    value={this.state.password} 
                                    onChange={this.handleChangeInput.bind(this, 'password')}
                                    secureTextEntry
                                />
                        </Animated.View>

                        <Animated.View style={{position: 'relative', left: this.state.buttonPositionLeft}}>
                            <TouchableOpacity activeOpacity={0.8}
                                    disabled={this.state.cargando}
                                    style={{
                                        shadowOffset: {
                                            width: 5,
                                            height: 5,
                                        },
                                        shadowColor: 'black',
                                        shadowOpacity: 0.4,elevation: 5,
                                        borderWidth: 1, borderRadius: 2, borderColor: '#6c56b7', backgroundColor: '#6c56b7',
                                        padding: 15, alignItems: 'center', marginBottom: 10, flexDirection: 'row',
                                        marginLeft:10,marginRight:10,
                                        alignItems: 'center', justifyContent: 'center'
                                    }}
                                    onPress={() => this.login()}>
                                    <Icon name='account-check' color='white' size={20} />
                                    <Text style={{ color: '#fff', fontWeight: 'bold', marginLeft: 10 }}>Iniciar sesion</Text>
                            </TouchableOpacity> 
                        </Animated.View>
                    

                        <Animated.View style={{position: 'relative', left: this.state.buttonPositionLeft}}>
                            <TouchableOpacity activeOpacity={0.8}
                                disabled={this.state.cargando}
                                style={{
                                    shadowOffset: {
                                        width: 5,
                                        height: 5,
                                    },
                                    shadowColor: 'black',
                                    shadowOpacity: 0.4,elevation: 5,
                                    borderWidth: 1, borderRadius: 2, borderColor: '#4090db', backgroundColor: '#4090db',
                                    padding: 15, alignItems: 'center', marginBottom: 10, flexDirection: 'row',
                                    marginLeft:10,marginRight:10,
                                    alignItems: 'center', justifyContent: 'center'
                                }}
                                onPress={() => this.loginFB()}>
                                <Icon name='facebook-box' color='white' size={20} />
                                <Text style={{ color: '#fff', fontWeight: 'bold', marginLeft: 10 }}>Iniciar sesion con Facebook</Text>
                            </TouchableOpacity> 
                        </Animated.View>
        
                    </View>
                </ScrollView>
                <Animated.View style={{position: 'relative', top: this.state.statusPositionTop}}>
                        <AlertStatus
                            textHelper="No tienes una cuenta aún" textAction="Registrarse"
                            onPressAction={this.handlePressSignUp.bind(this)}
                        />
                </Animated.View>
            </View>
    }
}

Login.propTypes = {
    disableInteractionCheck: PropTypes.bool
}

const loginStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7e5682'
    },
    loginContainer: {
        flex: 1,
        paddingTop: 30,
    },
    formContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 45
    }
})