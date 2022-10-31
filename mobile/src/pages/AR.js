import {
  ViroARSceneNavigator,
  ViroARScene,
  ViroText,
} from '@viro-community/react-viro';
import {View, Text, StyleSheet} from 'react-native';

const HelloWorldSceneAR = () => {
  return (
    <ViroARScene>
      <ViroText text="Passo 1:" position={[0, 0, -5]} />
    </ViroARScene>
  );
};

const AR = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ViroARSceneNavigator initialScene={{scene: HelloWorldSceneAR}} />
    </View>
  );
};

export default AR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
