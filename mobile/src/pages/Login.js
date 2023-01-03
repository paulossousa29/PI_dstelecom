import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

import colors from '../config/colors';
import ip from '../config/ip';
import axios from 'axios';

const Login = ({navigation}) => {
  const [username, setUsername] = useState(null);
  const [pass, setPass] = useState(null);
  const [errorMsgUsername, setErrorMsgUsername] = useState(null);
  const [errorMsgPass, setErrorMsgPass] = useState(null);
  const invalid = [null, ''];

  const fetchLogin = async () => {
    const res = await axios.post(ip.backend_ip + 'login', {
      username: username,
      password: pass,
    });

    return res.status;
  };

  const validationAccount = () => {
    if (!invalid.includes(pass) && !invalid.includes(username)) {
      //const status = fetchLogin();
      const status = 200;

      if (status === 200) {
        navigation.navigate('Home', {
          username: username,
        });
      } else {
        setErrorMsgUsername('Utilizador ou Palavra-pass Inválidos!');
        setErrorMsgPass(null);
      }
    } else if (invalid.includes(pass) && !invalid.includes(username)) {
      setErrorMsgPass('Palavra-passe Obrigatória!');
      setErrorMsgUsername(null);
    } else if (!invalid.includes(pass) && invalid.includes(username)) {
      setErrorMsgPass(null);
      setErrorMsgUsername('Utilizador Obrigatório!');
    } else {
      setErrorMsgPass('Palavra-passe Obrigatória!');
      setErrorMsgUsername('Utilizador Obrigatório!');
    }
  };

  return (
    <View style={styles.background}>
      <Image
        style={styles.logo}
        source={require('../assets/logo-black.png')}></Image>
      <View style={styles.container}>
        <Text style={styles.text}>Utilizador</Text>
        {errorMsgUsername && (
          <Text style={styles.errorMessage}>{errorMsgUsername}</Text>
        )}

        <TextInput
          style={styles.loginInput}
          onChangeText={setUsername}
          value={username}
          placeholder="user@mail.pt"
          placeholderTextColor={colors.placeholderGrey}></TextInput>

        <Text style={styles.text}>Palavra-passe</Text>
        {errorMsgPass && (
          <Text style={styles.errorMessage}>{errorMsgPass}</Text>
        )}

        <TextInput
          style={styles.loginInput}
          onChangeText={setPass}
          value={pass}
          placeholder="xxxxxxxxxxx"
          secureTextEntry
          placeholderTextColor={colors.placeholderGrey}></TextInput>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            validationAccount();
          }}>
          <Text style={styles.buttonText}>Iniciar Sessão</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.logoGreyDark,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.lightGrey,
  },
  loginButton: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: colors.red,
    paddingTop: 14,
    paddingBottom: 14,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  loginInput: {
    backgroundColor: colors.white,
    color: colors.logoGreyDark,
    width: '90%',
    borderRadius: 50,
    height: 40,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingLeft: 10,
  },
  logo: {
    width: '90%',
    height: '30%',
    resizeMode: 'contain',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    paddingLeft: 30,
    paddingTop: 15,
    color: colors.logoGreyDark,
    fontWeight: 'bold',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  errorMessage: {
    fontSize: 12,
    color: colors.red,
    fontWeight: 'bold',
    paddingLeft: 30,
  },
});
