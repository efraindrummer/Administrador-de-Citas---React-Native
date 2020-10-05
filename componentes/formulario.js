import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableHighlight, Alert, ScrollView} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Formulario = ({citas, setCitas, guardarMostrarForm}) => {

    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('')
    const [sintomas, guardarSintomas] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = (date) => {
        const opciones = {year: 'numeric', month: 'long', day: "2-digit"};
        guardarFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };

    //muestra u oculta el timePkicer
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = (hora) => {
        const opciones = {hour: 'numeric', minute: '2-digit', hour12: false}
        guardarHora(hora.toLocaleString('en-US', opciones));
        hideTimePicker();
    };

    //crae nueva cita
    const crearNuevaCita = () => {
        //valida
        if(paciente.trim() === '' || propietario.trim() === '' || telefono.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            //falla la validacion
            mostrarAlerta();
            return;
        }

        //crear una cita
        const cita = {paciente, propietario, telefono, fecha, hora, sintomas};

        cita.id = shortid.generate();
        //console.log(cita);
        //agregar al state
        const citasNuevo = [...citas, cita];
        setCitas(citasNuevo);

        //oculta el formulario
        guardarMostrarForm(false);
        //resetear el formulario
        
    }

    //muestra la alerta si falla la validacion 
    const mostrarAlerta = () => {
        Alert.alert(
            'Error', //titulo
            'Todos los campos son obligatorios', //mensaje
            [{
                text: 'OK' //arreglo de botones
            }]
        )
    }

    return ( 
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Paciente:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={ texto => guardarPaciente(texto)}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Dueño:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={ texto => guardarPropietario(texto)}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Telefono Contacto:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={ texto => guardarTelefono(texto)}
                        keyboardType='numeric'
                    />
                </View>

                <View>
                    <Text style={styles.label}>Fecha:</Text>
                    <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDatePicker}
                    />
                    <Text>{fecha}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Hora:</Text>
                    <Button title="Seleccionar Hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                    />
                    <Text>{hora}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Sintomas:</Text>
                    <TextInput
                        multiline
                        style={styles.input}
                        onChangeText={ texto => guardarSintomas(texto)}
                    />
                </View>

                <View>
                    <TouchableHighlight onPress={ () => crearNuevaCita() } style={styles.botonSubmit}>
                        <Text style={styles.textoSubmit}> Crear Nueva Cita </Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    botonSubmit: {
        padding: 10,
        backgroundColor: '#7d024e',
        marginVertical: 10,
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
 
export default Formulario;
