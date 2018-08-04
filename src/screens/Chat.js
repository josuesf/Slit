/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    TextInput,
} from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import realm from '../bdrealm/realm'
export default class Chat extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super()
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        this.state = {
            id_usuario: 'josuesf',
            mensajes: realm.objects('ChatList').filtered('id_chat="'+props.navigation.state.params.usuario+'"').sorted('timestamp'),
            chat_con: props.navigation.state.params.usuario
        }
    }
    componentWillMount() {

    }
    EnviarMensaje = () => {
        let time = new Date()
        //Crear o Actulizar Chat
        realm.write(() => {
            realm.create('Chats', {
                id_chat: this.state.chat_con,
                usuario: this.state.chat_con,
                token: '',
                ultimo_mensaje: this.state.mensaje,
                timestamp: time,
                avatar: '',
                estado_mensaje: 'guardado',
                rol: 'emisor',
                tipo_mensaje: 'texto'
            },true);
        });
        //Agregar Mensaje
        realm.write(() => {
            realm.create('ChatList', {
                id_mensaje: this.state.chat_con + this.state.id_usuario + Date.now(),
                mensaje: this.state.mensaje,
                tipo_mensaje: 'texto',
                timestamp: time,
                estado_mensaje: 'guardado',
                id_chat: this.state.chat_con,
                id_usuario: this.state.id_usuario
            });
        });
        this.setState({mensajes:realm.objects('ChatList').filtered('id_chat="'+this.state.chat_con+'"').sorted('timestamp')})
    }
    render() {
        const { navigate, goBack } = this.props.navigation;
        const { mensajes } = this.state
        const name_icon = (estado) => {
            if (estado == "guardado")
                return "clock-outline"
            else if (estado == "ENVIADO")
                return "check"
            else
                return "check-all"
        }
        const Hora = (date)=>{
            var hora = date.getHours()>9?date.getHours():"0"+date.getHours()
            var minutos = date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes()
            return hora+":"+minutos
        }
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#008577"
                    barStyle="light-content"
                />
                <View style={{
                    flexDirection: 'row', alignItems: 'center', backgroundColor: '#00A896',
                    paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10
                }}>
                    <TouchableOpacity onPress={() => goBack()} style={{ alignItems: 'center', marginRight: 20 }}>
                        <IconMaterial name="arrow-left" size={35} color="#F0F3BD" />
                    </TouchableOpacity>
                    <Text style={{ color: '#F0F3BD', fontSize: 16, fontWeight: 'bold' }}>Preguntas con {this.state.chat_con}</Text>
                </View>
                {mensajes.map(m => m.id_usuario == this.state.id_usuario ?
                    <View key={m.id_mensaje} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1 }} />
                        <View style={{
                            padding: 10, backgroundColor: '#F0F3BD', borderRadius: 10, marginBottom: 5, marginLeft: 20, marginRight: 5
                        }}>
                            <Text style={{ color: '#6B6B6B', fontSize: 15, paddingRight: 5 }}>{m.mensaje}</Text>
                            <View style={{ flexDirection: 'row', marginLeft: 5, alignItems: 'center', alignSelf: 'flex-end' }}>
                                <Text style={{ color: '#6B6B6B', fontSize: 11, marginRight: 2, }}>{Hora(m.timestamp)}</Text>
                                {/* <IconMaterial size={15} color="#6B6B6B" name="clock-outline" /> */}
                                <IconMaterial size={15} color={m.estado_mensaje == "VISTO" ? "#70CDEB" : "#6B6B6B"} name={name_icon(m.estado_mensaje)} />
                                {/* <IconMaterial size={15} color="#6B6B6B" name="check-all"/> */}
                                {/* <IconMaterial size={15} color="#70CDEB" name="check-all" /> */}
                            </View>
                        </View>
                    </View> :
                    <View key={m.id_mensaje} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ padding: 10, backgroundColor: '#FFF', borderRadius: 10, marginBottom: 5, marginRight: 20, marginLeft: 5 }}>
                            <Text style={{ color: '#6B6B6B', fontSize: 15 }}>{m.mensaje}</Text>
                            <View style={{ flexDirection: 'row', marginLeft: 5, alignItems: 'center', alignSelf: 'flex-end' }}>
                                <Text style={{ color: '#6B6B6B', fontSize: 11, marginRight: 2 }}>{m.timestamp}</Text>
                            </View>

                        </View>

                        <View style={{ flex: 1 }} />
                    </View>
                )}


                <View style={styles.bottomNav}>
                    <View style={{ paddingVertical: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                        <View style={{ backgroundColor: '#FFF', borderRadius: 20, height: 50, flex: 1, margin: 10, justifyContent: 'center', paddingLeft: 10 }}>
                            <TextInput onChangeText={(text) => this.setState({ mensaje: text })} underlineColorAndroid="transparent" style={{ paddingLeft: 5 }} placeholder="Escribir mensaje" />
                        </View>
                        <TouchableOpacity onPress={() => this.EnviarMensaje()} style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#00A896', marginRight: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <IconMaterial color="#FFF" size={25} name="send" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
    },
    contenido: {
        marginHorizontal: 16
    },
    bottomNav: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',

    }
});