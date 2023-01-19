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
  const steps = [2, 3, 4, 5, 7, 9, 11, 12, 13];

  const [step, setStep] = useState(2);
  const [uriConnector, setUriConnector] = useState('https://picsum.photos/200');
  const [uriDrop, setUriDrop] = useState('https://picsum.photos/200');

  const [step3, setStep3] = useState(null);
  const [step5, setStep5] = useState(null);
  const [step7, setStep7] = useState(null);
  const [step9, setStep9] = useState(step9);
  const [step11, setStep11] = useState(step11);
  const [step12, setStep12] = useState(step12);
  const [step13, setStep13] = useState(step13);

  const fetchAccess = async () => {
    try {
      const res = await axios.post(ip.backend_ip + 'access', {
        intervention: intervention,
      });

      return res.data.access;
    } catch (error) {
      console.log(error.message);
    }
  };

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
    if (steps.includes(step)) {
      const image = await launchCamera();
      if (image.didCancel) return;

      res = await fetchAI(image);
      if (res === undefined) {
        Alert.alert('Erro', 'Problemas de Rede', [{text: 'Cancel'}]);
        return;
      }
      if (res.data.error) {
        Alert.alert('Erro', res.data.error, [{text: 'Cancel'}]);
        return;
      }

      if (step === 2) {
        setUriConnector(res.data.image.uri);
      } else if (step === 3) {
        if (res.data.power1490 > -26 && res.data.power1550 > -15)
          setStep3(true);
        else {
          Alert.alert('Erro técnico', 'Potência Inválida', [
            {text: 'Cancelar'},
          ]);
          setStep3(false);
        }
      } else if (step === 4) {
        setUriDrop(res.data.image.uri);
      } else if (step === 5) {
        if (!res.data.result) {
          Alert.alert('Erro técnico', 'Slot de Drop Inválido', [
            {text: 'Cancelar'},
          ]);
        }
        setStep5(res.data.result);
      } else if (step === 7) {
        if (!res.data.result) {
          Alert.alert('Erro técnico', 'Tabuleiro Inválido', [
            {text: 'Cancelar'},
          ]);
        }
        setStep7(res.data.result);
      } else if (step === 9) {
        if (!res.data.result) {
          Alert.alert('Erro técnico', 'Conetor Inválido', [{text: 'Cancelar'}]);
        }
        setStep9(res.data.result);
      } else if (step === 11) {
        if (!res.data.result) {
          Alert.alert('Erro técnico', 'Revestimento dos Cabos Incorreto', [
            {text: 'Cancelar'},
          ]);
        }
        setStep11(res.data.result);
      } else if (step === 12) {
        if (!res.data.result) {
          Alert.alert('Erro técnico', 'Tabuleiro Aberto', [{text: 'Cancelar'}]);
        }
        setStep12(res.data.result);
      } else if (step === 13) {
        access = await fetchAccess();

        if (access !== res.data.access) {
          Alert.alert('Erro técnico', 'Nome do Acesso Errado', [
            {text: 'Cancelar'},
          ]);
        }
        setStep13(access === res.data.access);
      }
    }

    if (step === 14) {
      navigation.push('Notes', {
        intervention: intervention,
        startDate: startDate,
        step1: step1,
        step3: step3,
        step5: step5,
        step7: step7,
        step9: step9,
        step11: step11,
        step12: step12,
        step13: step13,
      });
    }

    setStep(step + 1);
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
        viroAppProps={{
          step: step,
          uriConnector: uriConnector,
          uriDrop: uriDrop,
        }}
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
