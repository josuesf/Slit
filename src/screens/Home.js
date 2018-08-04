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
} from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import realm from '../bdrealm/realm'
export default class Home extends Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: 'Splash',
    };
    constructor() {
        super()
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        this.state = {
            pagina: 'home',
            chats: realm.objects('Chats').sorted('timestamp',true),
        }
    }
    componentWillMount(){
        // realm.write(() => {
        //     let allBooks = realm.objects('Chats');
        //     realm.delete(allBooks); // Deletes all books
        //     let chatsss = realm.objects('ChatList');
        //     realm.delete(chatsss); // Deletes all books
        //   });
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#008577"
                    barStyle="light-content"
                />
                <View style={{
                    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16,
                    height: 50, backgroundColor: '#00A896', marginBottom: 10, justifyContent: 'center'
                }}>
                    <Image source={require('../img/Slit.png')} resizeMode="stretch" style={{ height: 40, width: 50 }} />

                </View>
                {this.state.pagina == 'home' && <View style={styles.contenido}>

                    <TouchableOpacity onPress={() => navigate('amigos')} activeOpacity={0.7}
                        style={{ paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, backgroundColor: '#00A896', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#F0F3BD', flex: 1, fontWeight: 'bold' }}>Nuevo Mensaje</Text>
                        <IconMaterial name="chevron-right" size={35} color="#F0F3BD" />
                    </TouchableOpacity>
                    <View style={{ marginVertical: 20 }}>
                        {this.state.chats.map(c =>
                            <TouchableOpacity key={c.usuario} onPress={() => navigate('chat',{usuario:c.usuario})}
                                activeOpacity={0.6} style={{ paddingVertical: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../img/avatar_1.jpg')} style={{ height: 50, width: 50, borderRadius: 25, marginRight: 20 }} />
                                    <View style={{flex:1}}>
                                    <Text style={{  color: '#6B6B6B',fontWeight:'bold' }}>{c.usuario}</Text>
                                    <Text style={{  color: c.rol=="receptor"?'#028090':'#6B6B6B' }}>{c.ultimo_mensaje}</Text>
                                    </View>
                                    {c.rol=="receptor" && <View style={{ height: 20, width: 20, borderRadius: 10, backgroundColor: '#02C39A', alignItems: 'center' }}>
                                        <Text style={{ color: '#FFF' }}>1</Text>
                                    </View>}
                                    
                                </View>
                                <View style={{ height: 1, backgroundColor: '#E8E8E8', marginLeft: 50, marginTop: 5 }} />
                            </TouchableOpacity>
                        )}

                        {/* <TouchableOpacity activeOpacity={0.6} style={{ paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../img/avatar_2.jpg')} style={{ height: 50, width: 50, borderRadius: 25, marginRight: 20 }} />
                                <Text style={{ flex: 1, color: '#A4A4A4' }}>@mariano_123</Text>
                            </View>
                            <View style={{ height: 1, backgroundColor: '#E8E8E8', marginLeft: 50, marginTop: 5 }} />
                        </TouchableOpacity> */}
                    </View>

                </View>}
                {this.state.pagina == 'friends' && <View style={styles.contenido}>
                    <View activeOpacity={0.7} style={{ padding: 10, borderRadius: 5, backgroundColor: '#C7E2DF', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#008577', flex: 1, fontWeight: 'bold' }}>Pregunta algo, anonimamente</Text>
                        <IconMaterial name="help" size={35} color="#008577" />
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <View activeOpacity={0.6} style={{ paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <Text style={{ flex: 1, color: '#A4A4A4' }}>¿Qué superpoder tendrías?</Text>
                                <TouchableOpacity style={{ borderRadius: 5, backgroundColor: '#02C39A', alignItems: 'center' }}>
                                    <Text style={{ color: '#F0F3BD', padding: 5, fontSize: 12, fontWeight: 'bold' }}>Responder</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: 1, backgroundColor: '#E1DADF', marginTop: 5 }} />
                        </View>
                        <View activeOpacity={0.6} style={{ paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <Text style={{ flex: 1, color: '#A4A4A4' }}>Si sólo pudieras tener un hobby, ¿cuál sería?</Text>
                                <TouchableOpacity style={{ borderRadius: 5, backgroundColor: '#02C39A', alignItems: 'center' }}>
                                    <Text style={{ color: '#F0F3BD', padding: 5, fontSize: 12, fontWeight: 'bold' }}>Responder</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: 1, backgroundColor: '#E1DADF', marginTop: 5 }} />
                        </View>
                    </View>

                </View>}
                <View style={styles.bottomNav}>
                    <View style={{ borderTopColor: '#7E5682', borderTopWidth: 1, borderTopColor: '#E8E8E8', paddingVertical: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                        {/* <Image source={require('../img/Que5.png')} resizeMode="stretch" style={{ height: 50, width: 120, marginRight: 30 }} /> */}
                        <TouchableOpacity style={{ alignItems: 'center', flex: 1 }} onPress={() => this.setState({ pagina: 'home' })}>
                            <IconMaterial name="home" size={35} color={this.state.pagina == 'home' ? "#02C39A" : "#D9D9D9"} />
                            <Text style={{ color: this.state.pagina == 'home' ? "#02C39A" : "#AFAEAE", fontSize: 10 }}>Inicio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center', flex: 1 }} onPress={() => this.setState({ pagina: 'friends' })}>
                            <IconMaterial name="checkbox-multiple-blank-circle-outline" size={35} color={this.state.pagina == 'friends' ? "#02C39A" : "#AFAEAE"} />
                            <Text style={{ color: this.state.pagina == 'friends' ? "#02C39A" : "#AFAEAE", fontSize: 10 }} >Preguntas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center', flex: 1 }}>
                            <IconMaterial name="account" size={35} color="#AFAEAE" />
                            <Text style={{ color: this.state.pagina == 'profile' ? "#02C39A" : "#AFAEAE", fontSize: 10 }}>Perfil</Text>
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
        backgroundColor: '#FFFFFF',

    },
    contenido: {
        marginHorizontal: 16,
        marginVertical: 20
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