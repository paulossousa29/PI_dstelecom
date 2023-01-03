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
  const [step13Result, setStep13Result] = useState(null);
  const [step, setStep] = useState(1);

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

  const fetchAI = async image => {
    const imageData = new FormData();
    imageData.append('image', {
      uri: image.assets[0].uri,
      type: image.assets[0].type,
      name: image.assets[0].filename,
    });

    try {
      const res = await axios.post(ip.api_ip + 'detect', imageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleNextStep = async () => {
    if (step % 2 == 1) {
      const image = await launchCamera();
      if (image.didCancel) return;

      //res = await fetchAI(image);
      //console.log(res);
      res = true;

      if (step == 1) {
        access = await fetchAccess();

        compare = true;

        if (compare) {
          setStep1Result(true);
        } else {
          navigation.push('NewReference', {intervention: intervention});
        }
      } else if (step == 3) {
        setStep3Result(res);
      } else if (step == 5) {
        setStep5Result(res);
      } else if (step == 7) {
        setStep7Result(res);
      } else if (step == 9) {
        setStep9Result(res);
      } else if (step == 11) {
        setStep11Result(res);
      } else if (step == 13) {
        setStep13Result(res);

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
            pad(startDate.getUTCDate()),
          step1: step1Result,
          step3: step3Result,
          step5: step5Result,
          step7: step7Result,
          step9: step9Result,
          step11: step11Result,
          step13: step13Result,
        });
      }
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
