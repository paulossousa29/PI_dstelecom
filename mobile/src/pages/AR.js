import {
  ViroARSceneNavigator,
  ViroARScene,
  ViroText,
  ViroAmbientLight,
} from '@viro-community/react-viro';

import {useState} from 'react';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import passos from '../assets/passos.json';

const SceneAR = props => {
  let data = props.sceneNavigator.viroAppProps;

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      <ViroText text={passos[data.step.toString()]} position={[0, 0, -5]} />
    </ViroARScene>
  );
};

const AR = ({navigation}) => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        initialScene={{scene: SceneAR}}
        viroAppProps={{step: step}}
        style={{flex: 1}}
      />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
          <Text>Próximo Passo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controls: {
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {},
});
