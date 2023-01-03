import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

import colors from '../config/colors';
import ip from '../config/ip';
import axios from 'axios';

const Home = ({route, navigation}) => {
  const {username} = route.params;
  const [intervention, setIntervention] = useState('#2021041965000118_2');
  const [errorMsgIntervention, setErrorMsgIntervention] = useState(null);
  const invalid = [null, ''];

  const fetchIntervencoes = async () => {
    try {
      const res = await axios.post(ip.backend_ip + 'intervention', {
        intervention: intervention,
        username: username,
      });

      return res.status;
    } catch (error) {
      console.log(error.message);
    }
  };

  const validationID = async () => {
    if (!invalid.includes(intervention)) {
      const status = await fetchIntervencoes();

      if (status === 200) {
        navigation.navigate('AR', {
          intervention: intervention,
        });
      } else {
        setErrorMsgIntervention('ID da Intervenção inválido!');
      }
    } else {
      setErrorMsgIntervention('ID da Intervenção necessário!');
    }
  };

  return (
    <View style={styles.background}>
      <Image
        style={styles.logo}
        source={require('../assets/logo-black.png')}></Image>
      <View style={styles.container}>
        <Text style={styles.text}>ID da Intervenção</Text>
        {errorMsgIntervention && (
          <Text style={styles.errorMessage}>{errorMsgIntervention}</Text>
        )}

        <TextInput
          style={styles.interventionInput}
          onChangeText={setIntervention}
          value={intervention}
          placeholder="#2021041965000118_2"
          placeholderTextColor={colors.placeholderGrey}></TextInput>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => validationID()}>
          <Text style={styles.buttonText}>Começar trabalho</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Terminar Sessão</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

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
  logoutButton: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: colors.logoGreyDark,
    paddingTop: 14,
    paddingBottom: 14,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  startButton: {
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
  interventionInput: {
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
