import {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {ViroARSceneNavigator} from '@viro-community/react-viro';
import {launchCamera} from 'react-native-image-picker';
import axios from 'axios';

import SceneAR from '../scenes/SceneAR';
import colors from '../config/colors';
import ip from '../config/ip';

const AR3 = ({route, navigation}) => {
  const {intervention, startDate, step1, step3, uriConnector} = route.params;

  const [step5, setStep5] = useState(null);
  const [step7, setStep7] = useState(null);
  const [step, setStep] = useState(5);

  const fetchAI = async image => {
    const imageData = new FormData();

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
    navigation.push('ShowImageConnector', {
      intervention: intervention,
      startDate: startDate,
      step1: step1,
      step3: step3,
      step5: step5,
      step7: step7,
      uriConnector: 'https://picsum.photos/200',
    });
    // if (step === 5 || step === 7) {
    //   const image = await launchCamera();
    //   if (image.didCancel) return;

    //   res = await fetchAI(image);
    //   if (res.status !== 200) {
    //     Alert.alert('Erro', 'Problemas de Rede', [{text: 'Cancel'}]);
    //     return;
    //   }
    //   if (res.data.error) {
    //     Alert.alert('Erro', res.data.error, [{text: 'Cancel'}]);
    //     return;
    //   }

    //   if (step === 5) {
    //     if (!res.data.result) {
    //       Alert.alert('Erro técnico', 'Slot de Drop Inválido', [
    //         {text: 'Cancelar'},
    //       ]);
    //     }
    //     setStep5(res.data.result);
    //   } else if (step === 7) {
    //     if (!res.data.result) {
    //       Alert.alert('Erro técnico', 'Tabuleiro Inválido', [
    //         {text: 'Cancelar'},
    //       ]);
    //     }
    //     setStep7(res.data.result);
    //   }
    // }

    // if (step === 9) {
    //   navigation.push('ShowImageConnector', {
    //     intervention: intervention,
    //     startDate: startDate,
    //     step1: step1,
    //     step3: step3,
    //     step5: step5,
    //     step7: step7,
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

export default AR3;

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
