'use strict';

import Realm from 'realm';

class ChatList extends Realm.Object {}
ChatList.schema = {
    name: 'ChatList',
    primaryKey: 'id_mensaje',
    properties: {
        id_mensaje: 'string',
        mensaje:'string',
        tipo_mensaje:'string',
        timestamp:'date',
        estado_mensaje: 'string',
        id_chat:'string',
        id_usuario:'string'
    },
};

class Chats extends Realm.Object {}
Chats.schema = {
    name: 'Chats',
    primaryKey: 'id_chat',
    properties: {
        id_chat: 'string',
        usuario: 'string',
        token:'string',
        ultimo_mensaje:'string',
        timestamp:'date',
        avatar:'string',
        estado_mensaje:'string',
        rol:'string',
        tipo_mensaje:'string'
    },
};

export default new Realm({schema: [ChatList, Chats]});