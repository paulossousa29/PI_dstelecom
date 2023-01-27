import {
  ViroARScene,
  ViroText,
  ViroAmbientLight,
  ViroARTrackingTargets,
  ViroARImageMarker,
} from '@viro-community/react-viro';

import {StyleSheet} from 'react-native';

import passos from '../assets/passos.json';

import axios from 'axios';
import ip from '../config/ip';

const SceneAR = props => {
  const {step, intervention} = props.arSceneNavigator.viroAppProps;

  // const fetchConector = async () => {
  //   try {
  //     const res = await axios.post(backend_ip + 'conetor', {
  //       id_intervention: intervention,
  //     });

  //     return res.data.connector;
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // const getStep = async () => {
  //   // stepInt = step.toString();
  //   // const text = passos[stepInt];
  //   // if (step === 2 || step === 9) {
  //   //   connector = await fetchConector();

  //   //   text.concat(connector);
  //   // }

  //   // return text;
  //   return 'cona';
  // };

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      <ViroARImageMarker target={'marker'}>
        <ViroText
          text={passos[step.toString()]}
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
  marker: {
    source: require('../assets/qrcode.jpg'),
    orientation: 'Up',
    physicalWidth: 0.165,
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
