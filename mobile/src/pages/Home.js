import {StyleSheet, View, Text, Button} from 'react-native';

const Home = ({navigation}) => {
  const pressLogin = () => {
    navigation.navigate('Login');
  };

  const pressAR = () => {
    navigation.navigate('AR');
  };

  return (
    <View style={styles.container}>
      <Text>Página Inicial</Text>
      <Button onPress={pressLogin} title="Login" />
      <Button onPress={pressAR} title="AR" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
