import {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import ResultReference from './ResultReference';

import colors from '../config/colors';
import ip from '../config/ip';
import axios from 'axios';

const NewReference = ({route, navigation}) => {
  const {intervention} = route.params;
  const [reference, setReference] = useState(null);
  const [errorMsgRef, setErrorMsgRef] = useState(null);
  const [messageToWait, setMessageToWait] = useState(null);
  const invalid = [null, ''];

  const fetchNewReference = async () => {
    const res = await axios.post(ip.backend_ip + 'new_request', {
      id_intervention: intervention,
      description: reference,
    });
  };

  const validationRef = () => {
    if (!invalid.includes(reference)) {
      setReference(null);
      setMessageToWait('Vai ter de aguardar que o administrador valide...');

      fetchNewReference();
    } else {
      setErrorMsgRef('Necessário o nº da referência');
      setMessageToWait(null);
    }
  };

  return (
    <View style={styles.background}>
      <Image
        style={styles.logo}
        source={require('../assets/logo-black.png')}></Image>
      <View style={styles.container}>
        <Text style={styles.text}>Confirme o nº da referência, por favor!</Text>

        {errorMsgRef && <Text style={styles.errorMessage}>{errorMsgRef}</Text>}

        <TextInput
          style={styles.input}
          onChangeText={setReference}
          value={reference}
          placeholder="12345"
          placeholderTextColor={colors.placeholderGrey}></TextInput>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            validationRef();
          }}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>

        {messageToWait && <ResultReference messageToWait={messageToWait} />}
      </View>
    </View>
  );
};

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
  input: {
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

export default NewReference;
