import {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {ViroARSceneNavigator} from '@viro-community/react-viro';
import {launchCamera} from 'react-native-image-picker';
import axios from 'axios';

import SceneAR from '../scenes/SceneAR';
import colors from '../config/colors';
import ip from '../config/ip';

const AR2 = ({route, navigation}) => {
  const {intervention, startDate, step1} = route.params;

  const [step3, setStep3] = useState(null);
  const [step, setStep] = useState(2);
  const [uriConnector, setUriConnector] = useState(null);
  const [uriDrop, setUriDrop] = useState(null);

  const fetchConnector = async () => {
    try {
      const res = await axios.post(ip.backend_ip + 'conetor', {
        id_intervention: intervention,
      });

      return res.data.connector;
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchAI = async image => {
    const imageData = new FormData();

    if (step == 2) {
      connector = await fetchConnector();
      imageData.append('connector', connector);
    }

    imageData.append('step', step);
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
    navigation.push('ShowImageDrop', {
      intervention: intervention,
      startDate: startDate,
      step1: step1,
      step3: step3,
      uriDrop: 'https://picsum.photos/200',
      uriConnector: uriConnector,
    });
    // const image = await launchCamera();
    // if (image.didCancel) return;

    // res = await fetchAI(image);
    // if (res === undefined) {
    //   Alert.alert('Erro', 'Problemas de Rede', [{text: 'Cancel'}]);
    //   return;
    // }
    // if (res.data.error) {
    //   Alert.alert('Erro', res.data.error, [{text: 'Cancel'}]);
    //   return;
    // }

    // if (step === 2) {
    //   setUriConnector(res.data.image.uri);
    // } else if (step === 3) {
    //   if (res.data.power1490 > -26 && res.data.power1550 > -15) setStep3(true);
    //   else {
    //     Alert.alert('Erro técnico', 'Potência Inválida', [{text: 'Cancelar'}]);
    //     setStep3(false);
    //   }
    // } else if (step === 4) {
    //   setUriDrop(res.data.image.uri);
    // } else if (step === 5) {
    //   navigation.push('ShowImageDrop', {
    //     intervention: intervention,
    //     startDate: startDate,
    //     step1: step1,
    //     step3: step3,
    //     uriDrop: uriDrop,
    //     uriConnector: uriConnector,
    //   });
    // }

    // setStep(step + 1);
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
        viroAppProps={{step: step}}
        style={styles.ar}
      />
      <View style={styles.controls}>
        <Text style={styles.text}>Passo {step}/14</Text>
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

export default AR2;

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
