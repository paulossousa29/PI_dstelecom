import {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {ViroARSceneNavigator} from '@viro-community/react-viro';
import {launchCamera} from 'react-native-image-picker'

import SceneAR from '../scenes/SceneAR';
import colors from '../config/colors';

const AR = ({navigation}) => {
  const [step, setStep] = useState(1);

  const handleNextStep = async () => {
    if(step % 2 == 1) {
      const result = await launchCamera()

      if(result.didCancel) 
        return;

      // Envia para o AI e guarda na base de dados

      // Recebe do AI e avisa se não estiver correto

      // Se no step 1 a referencia estiver mal, navigate nova pagina
    }

    if (step < 13) {
      setStep(step + 1);
    } else {
      navigation.navigate('Notes');
    }
  };

  const handleQuit = () => {
    Alert.alert('Sair', 'Pretende mesmo sair?', [
      {
        text: 'Cancelar',
      },
      {
        text: 'Sair',
        onPress: () => navigation.navigate('Home'),
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
