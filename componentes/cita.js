import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight} from 'react-native';

const Cita = ({item, eliminarPaciente}) => {

    const dialogoEliminar = id => {
        console.log('eliminando...', id);
        eliminarPaciente(id);
    }

    return (
        <View style={styles.cita}>
            <View>
                <Text style={styles.label}>Paciente:</Text>
                <Text style={styles.texo}>{item.paciente}</Text>    
            </View>
            <View>
                <Text style={styles.label}>Propietario:</Text>
                <Text style={styles.texo}>{item.propietario}</Text>    
            </View>
            <View>
                <Text style={styles.label}>Sintomas:</Text>
                <Text style={styles.texo}>{item.sintomas}</Text>    
            </View>

            <View>
                <TouchableHighlight onPress={ () => dialogoEliminar(item.id) } style={styles.botonEliminar}>
                    <Text style={styles.textoEliminar}> Eliminar &times;</Text>
                </TouchableHighlight>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    cita: {
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
    },
    texo:{
        fontSize: 18,
    },
    botonEliminar: {
        padding: 10,
        backgroundColor: 'red',
        marginVertical: 10,
    },
    textoEliminar: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default Cita;