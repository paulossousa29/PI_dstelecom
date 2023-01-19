import {
  ViroARScene,
  ViroText,
  ViroAmbientLight,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroImage,
} from '@viro-community/react-viro';

import {StyleSheet} from 'react-native';

import passos from '../assets/passos.json';

const SceneAR = props => {
  const {step, uriConnector, uriDrop} = props.arSceneNavigator.viroAppProps;

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      <ViroARImageMarker target={'marker'}>
        {step === 1 ? (
          <ViroText
            text={passos[step.toString()]}
            position={[0.08, 0.05, 0]}
            scale={[0.1, 0.1, 0.1]}
            rotation={[-90, 0, 0]}
            style={styles.text_ar}
          />
        ) : (
          <ViroText
            text={passos[step.toString()]}
            position={[0.1, 0.05, -0.05]}
            scale={[0.1, 0.1, 0.1]}
            rotation={[-90, 0, 0]}
            style={styles.text_ar}
          />
        )}
        {step === 5 && (
          <ViroImage
            position={[0.1, 0.05, 0.03]}
            scale={[0.1, 0.1, 0.1]}
            rotation={[-90, 0, 0]}
            placeholderSource={require('../assets/redCheck.jpg')}
            source={{uri: uriDrop}}
          />
        )}
        {step === 9 && (
          <ViroImage
            position={[-0.25, 0.05, 0]}
            scale={[0.1, 0.1, 0.1]}
            rotation={[-90, 0, 0]}
            placeholderSource={require('../assets/redCheck.jpg')}
            source={{uri: uriConnector}}
          />
        )}
      </ViroARImageMarker>
    </ViroARScene>
  );
};

export default SceneAR;

ViroARTrackingTargets.createTargets({
  marker: {
    source: require('../assets/qrcode.jpg'),
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
