
module.exports = {
    fetchData: (url,method,params, callback) => {
        const parametros = {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        }
        fetch('http://192.168.1.5:8000' + url, parametros)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if(responseJson.respuesta=='ok'){
                    callback(responseJson.data,undefined)
                }else{
                    callback(undefined,responseJson.respuesta)
                }
                
            })
            .catch(err => {
                callback(undefined,err)
            })
    },
}