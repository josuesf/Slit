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
    ScrollView,
} from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchData } from '../utils/fetchData';
export default class Pregunta extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor() {
        super()
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        this.state = {
            pregunta:"",
            alternativas:[]
        }
    }
    componentWillMount(){
        console.log('Entro aqui')
        this.GenerarPregunta()
    }
    GenerarPregunta=()=>{
        fetchData('/ws/question_random','POST',{},(res,err)=>{
            if(!err){
                var pregunta = res[0]
                this.setState({
                    pregunta:pregunta.preguntaDescripcion,
                    alternativas:pregunta.alternativas
                })
            }
        })
    }
    render() {
        const { navigate, goBack } = this.props.navigation;
        const {pregunta,alternativas} = this.state
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#008577"
                    barStyle="light-content"
                />
               <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10
                }}>
                    <TouchableOpacity onPress={() => goBack()} style={{ alignItems: 'center', marginRight: 20 }}>
                        <IconMaterial name="close" size={35} color="#00A896" />
                    </TouchableOpacity>
                    <Text style={{ color: '#00A896', fontSize: 16, fontWeight: 'bold' }}>Nueva Pregunta</Text>
                </View>
                <View style={{ alignContent: 'center', alignItems: 'center', padding: 20,marginTop:30 }}>
                    <Text style={{ color: '#00A896', fontSize: 35, alignSelf: 'center', fontWeight: 'bold' }}>{pregunta}?</Text>
                </View>
                <ScrollView>
                    {alternativas.map(a=>
                    <TouchableOpacity key={a.pk} onPress={()=>navigate('amigos')} style={{ backgroundColor: '#F0F3BD', marginHorizontal: 16, borderRadius: 5, marginVertical: 10 }}>
                        <Text style={{ color: '#008577', fontSize: 14, fontWeight: 'bold', padding: 10 }}>{a.alternativaDescripcion}</Text>
                    </TouchableOpacity>
                    )}
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    contenido: {
        marginHorizontal: 16
    }
});