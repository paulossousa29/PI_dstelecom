import {StyleSheet, View, Text, Image, Button, StatusBar} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const Login = ({navigation}) => {
  return (
    <View style={styles.background}>
      <Image
        style={styles.logo}
        source={require('../assets/logo-black.png')}
        resizeMode="contain"></Image>
      <View style={styles.container}>
        <Text style={styles.text}>Utilizador</Text>
        <TextInput style={styles.loginInput}></TextInput>
        <Text style={styles.text}>Palavra-passe</Text>
        <TextInput style={styles.loginInput}></TextInput>
        <Button title="Iniciar Sessão"></Button>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#262525',
  },
  container: {
    width: '100%',
    height: '100%',
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -100,
    backgroundColor: '#eee',
  },
  loginButton: {
    width: '80%',
    height: 70,
    backgroundColor: '#fc5c65',
  },
  loginInput: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 50,
    height: 40,
    margin: 12,
    paddingLeft: 10,
  },
  logo: {
    width: '100%',
  },
  text: {
    paddingLeft: 20,
    paddingTop: 10,
  },
});
