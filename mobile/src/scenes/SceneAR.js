import {
  ViroARScene,
  ViroText,
  ViroAmbientLight,
  ViroARTrackingTargets,
  ViroARImageMarker,
} from '@viro-community/react-viro';

import {StyleSheet} from 'react-native';

import passos from '../assets/passos.json';

const SceneAR = props => {
  const data = props.arSceneNavigator.viroAppProps;

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      <ViroARImageMarker target={'skull'}>
        <ViroText
          text={passos[data.step.toString()]}
          position={[0.25, 0.05, 0]}
          scale={[0.2, 0.2, 0.2]}
          rotation={[-90, 0, 0]}
          style={styles.text_ar}
        />
      </ViroARImageMarker>
    </ViroARScene>
  );
};

export default SceneAR;

ViroARTrackingTargets.createTargets({
  skull: {
    source: require('../assets/Skull.jpg'),
    orientation: 'Up',
    physicalWidth: 0.165,
    type: 'Image',
  },
  danger: {
    source: require('../assets/Laser-symbol3.png'),
    orientation: 'Up',
    physicalWidth: 0.02,
    type: 'Image',
  },
});

const styles = StyleSheet.create({
  text_ar: {
    fontFamily: 'Arial',
    fontSize: 10,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
