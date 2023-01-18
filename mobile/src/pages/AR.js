import {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {ViroARSceneNavigator} from '@viro-community/react-viro';
import {launchCamera} from 'react-native-image-picker';
import axios from 'axios';

import SceneAR from '../scenes/SceneAR';
import colors from '../config/colors';
import ip from '../config/ip';

const AR = ({route, navigation}) => {
  const {intervention, username} = route.params;
  const [startDate, setStartDate] = useState(new Date());
  const [step1Result, setStep1Result] = useState(null);
  const [step3Result, setStep3Result] = useState(null);
  const [step5Result, setStep5Result] = useState(null);
  const [step7Result, setStep7Result] = useState(null);
  const [step9Result, setStep9Result] = useState(null);
  const [step11Result, setStep11Result] = useState(null);
  const [step12Result, setStep12Result] = useState(null);
  const [step13Result, setStep13Result] = useState(null);
  const [step, setStep] = useState(1);
  const [uriConnector, setUriConnector] = useState(null);
  const [uriDrop, setUriDrop] = useState(null);
  const steps = [1, 2, 3, 4, 5, 7, 9, 11, 12, 13];

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

    if (step == 2 || step == 9) {
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
    if (step === 5) {
      navigation.push('ShowImage', {
        uri: uriDrop,
        message: 'Passagem drop a utilizar',
      });
    } else if (step === 9) {
      navigation.push('ShowImage', {
        uri: uriConnector,
        message: 'Conetor a utilizar',
      });
    }

    if (steps.includes(step)) {
      const image = await launchCamera();
      if (!image.didCancel) return;

      res = await fetchAI(image);
      if (res.status !== 200) {
        Alert.alert('Erro', 'Problemas de Rede', [{text: 'Cancel'}]);
        return;
      }
      if (res.data.error) {
        Alert.alert('Erro', res.data.error, [{text: 'Cancel'}]);
        return;
      }

      if (step === 1) {
        element = await fetchElement();

        if (!element === res.data.element) {
          navigation.push('NewReference', {intervention: intervention});
        }
        setStep1Result(element === res.data.element);
      } else if (step === 2) {
        setUriConnector(res.data.image.uri);
      } else if (step === 3) {
        if (res.data.power1490 > -26 && res.data.power1550 > -15)
          setStep3Result(true);
        else {
          Alert.alert('Erro técnico', 'Potência Inválida', [
            {text: 'Cancelar'},
          ]);
          setStep3Result(false);
        }
      } else if (step === 4) {
        setUriDrop(res.data.image.uri);
      } else if (step === 5) {
        if (!res.data.result) {
          Alert.alert('Erro técnico', 'Slot de Drop Inválido', [
            {text: 'Cancelar'},
          ]);
        }
        setStep5Result(res.data.result);
      } else if (step === 7) {
        if (!res.data.result) {
          Alert.alert('Erro técnico', 'Tabuleiro Inválido', [
            {text: 'Cancelar'},
          ]);
        }
        setStep7Result(res.data.result);
      } else if (step === 9) {
        if (!res.data.result) {
          Alert.alert('Erro técnico', 'Conetor Inválido', [{text: 'Cancelar'}]);
        }
        setStep9Result(res.data.result);
      } else if (step === 11) {
        if (!res.data.result) {
          Alert.alert('Erro técnico', 'Revestimento dos Cabos Incorreto', [
            {text: 'Cancelar'},
          ]);
        }
        setStep11Result(res.data.result);
      } else if (step === 12) {
        if (!res.data.result) {
          Alert.alert('Erro técnico', 'Tabuleiro Aberto', [{text: 'Cancelar'}]);
        }
        setStep12Result(res.data.result);
      } else if (step === 13) {
        access = await fetchAccess();

        if (access !== res.data.access) {
          Alert.alert('Erro técnico', 'Nome do Acesso Errado', [
            {text: 'Cancelar'},
          ]);
        }
        setStep13Result(access === res.data.access);
      }
    }

    if (step === 14) {
      var pad = function (num) {
        return ('00' + num).slice(-2);
      };

      navigation.push('Notes', {
        intervention: intervention,
        startDate:
          startDate.getUTCFullYear() +
          '-' +
          pad(startDate.getUTCMonth() + 1) +
          '-' +
          pad(startDate.getUTCDate()) +
          ' ' +
          pad(startDate.getUTCHours()) +
          ':' +
          pad(startDate.getUTCMinutes()) +
          ':' +
          pad(startDate.getUTCSeconds()),
        step1: step1Result,
        step3: step3Result,
        step5: step5Result,
        step7: step7Result,
        step9: step9Result,
        step11: step11Result,
        step12: step12Result,
        step13: step13Result,
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
        onPress: () => navigation.pop(),
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
        <Text style={styles.text}>Passo {step}/13</Text>
        <TouchableOpacity style={styles.button} onPress={handleNextStep}>
          {step < 13 ? (
            <Text style={styles.buttonText}>Próximo Passo</Text>
          ) : (
            <Text style={styles.buttonText}>Concluir</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonQuit} onPress={handleQuit}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AR;

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
