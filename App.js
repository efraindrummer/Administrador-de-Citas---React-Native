/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import Cita from './componentes/cita';
import Formulario from './componentes/formulario';

const App = () => {

  const [mostrarForm, guardarMostrarForm] = useState(false);

  //definir el estado de las citas
  const [citas, setCitas] = useState([]);

  //eliminar los pacientes del state
  const eliminarPaciente = id => {
    setCitas( (citasActuales) => {
      return citasActuales.filter(cita => cita.id !== id);
    })
  }

  //muestra u oculta el formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  }

  //ocultar el teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Citas</Text>
        
        <View>
          <TouchableHighlight onPress={ () => mostrarFormulario() } style={styles.btnMostarFrom}>
            <Text style={styles.textoMostrarForm}> {mostrarForm ? 'Cancelar Crear Cita' : 'Crear Nueva Cita'} </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear Nueva Cita</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
              />
            </>
          ) : (
            <>
              <Text style={styles.titulo}>{citas.length > 0 ? 'Administra tus Citas' : 'No hay citas, Agrega una'}</Text>
              <FlatList
                style={styles.listado}
                data={citas}
                renderItem={ ({item}) => <Cita item={item} eliminarPaciente={eliminarPaciente}/> }
                keyExtractor={cita => cita.id}
              />
            </>
          )}
        
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1
  },
  titulo: {
    color: '#FFF',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1
  },
  btnMostarFrom: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoMostrarForm: {
      color: '#FFF',
      fontWeight: 'bold',
      textAlign: 'center'
  }

});

export default App;
