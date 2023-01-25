import {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {ViroARSceneNavigator} from '@viro-community/react-viro';
import {launchCamera} from 'react-native-image-picker';
import axios from 'axios';

import SceneAR from '../scenes/SceneAR';
import colors from '../config/colors';
import ip from '../config/ip';

const AR1 = ({route, navigation}) => {
  const {intervention, startDate} = route.params;

  const fetchElement = async () => {
    try {
      const res = await axios.post(ip.backend_ip + 'element', {
        intervention: intervention,
      });

      return res.data.element;
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAI = async image => {
    const imageData = new FormData();

    imageData.append('step', 1);
    imageData.append('image', {
      uri: image.assets[0].uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    try {
      const res = await axios.post(ip.api_ip + 'detect', imageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res;
    } catch (err) {
      console.error(err);
    }
  };

  const handleNextStep = async () => {
    const image = await launchCamera();
    if (image.didCancel) return;

    res = await fetchAI(image);
    if (res === undefined) {
      Alert.alert('Erro', 'Problemas de Rede', [{text: 'Cancelar'}]);
      return;
    }
    if (res.status !== 200) {
      Alert.alert('Erro', 'Problemas de Rede', [{text: 'Cancelar'}]);
      return;
    }
    if (res.data.error) {
      Alert.alert('Erro', res.data.error, [{text: 'Cancelar'}]);
      return;
    }

    const element = await fetchElement();

    if (!(element === res.data.element)) {
      Alert.alert(
        'Referência de Elemento Errada',
        'Poderá pedir ao administrador para mudar de elemento',
        [{text: 'Continuar'}],
      );
      navigation.push('NewReference', {
        intervention: intervention,
        startDate: startDate,
        element: res.data.element,
      });
    } else {
      Alert.alert(
        'Referência de Elemento Reconhecida',
        'Poderá avançar para o processo de intervenção',
        [{text: 'Continuar'}],
      );
      navigation.push('AR2', {
        intervention: intervention,
        startDate: startDate,
        step1: true,
      });
    }
  };

  const handleQuit = () => {
    Alert.alert('Sair', 'Pretende mesmo sair?', [
      {
        text: 'Cancelar',
      },
      {
        text: 'Sair',
        onPress: () => navigation.popToTop(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{scene: SceneAR}}
        viroAppProps={{step: 1, uriDrop: 'empty', uriConnector: 'empty'}}
        style={styles.ar}
      />
      <View style={styles.controls}>
        <Text style={styles.text}>Passo 1/14</Text>
        <TouchableOpacity style={styles.button} onPress={handleNextStep}>
          <Text style={styles.buttonText}>Próximo Passo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonQuit} onPress={handleQuit}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AR1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.black,
  },
  ar: {
    flex: 1,
  },
  controls: {
    height: 150,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  text: {
    paddingTop: 15,
    color: colors.logoGreyDark,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: colors.red,
    paddingTop: 10,
    paddingBottom: 10,
    marginVertical: 7,
    marginHorizontal: 20,
  },
  buttonQuit: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: colors.logoGreyDark,
    paddingTop: 10,
    paddingBottom: 10,
    marginVertical: 3,
    marginHorizontal: 20,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
