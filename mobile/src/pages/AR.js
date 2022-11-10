import {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ViroARSceneNavigator} from '@viro-community/react-viro';

import SceneAR from '../scenes/SceneAR';

const AR = ({navigation}) => {
  const [step, setStep] = useState(1);

  const handleNextStep = async () => {
    if (step < 13) {
      setStep(step + 1);
    } else {
      navigation.navigate('Home');
    }
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
      </View>
    </View>
  );
};

export default AR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'black',
  },
  ar: {
    flex: 1,
  },
  controls: {
    height: 120,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  text: {
    paddingTop: 15,
    color: 'grey',
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: 'red',
    paddingTop: 10,
    paddingBottom: 10,
    marginVertical: 15,
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
