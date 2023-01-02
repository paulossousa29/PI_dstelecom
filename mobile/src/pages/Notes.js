import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import colors from '../config/colors';
import ip from '../config/ip';
import axios from 'axios';

const Notes = ({route, navigation}) => {
  const {intervention, step1, step3, step5, step7, step9, step11, step13} =
    route.params;
  const [notes, setNotes] = useState(null);

  const handleSubmit = () => {
    Alert.alert('Concluir', 'Pretende mesmo concluir?', [
      {
        text: 'Cancelar',
      },
      {
        text: 'Concluir',
        onPress: async () => {
          try {
            await axios.post(ip.backend_ip + 'report', {
              id_intervention: intervention,
              observations: notes,
              step_1: step1,
              step_3: step3,
              step_5: step5,
              step_7: step7,
              step_9: step9,
              step_11: step11,
              step_13: step13,
            });
            navigation.navigate('Done');
          } catch (error) {
            console.log(error.message);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.background}>
      <Image
        style={styles.logo}
        source={require('../assets/logo-black.png')}></Image>

      <View style={styles.container}>
        <Text style={styles.text}>Escreva aqui as suas observações:</Text>
        <TextInput
          multiline={true}
          style={styles.input}
          onChangeText={setNotes}
          value={notes}></TextInput>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submeter observações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Notes;

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
  input: {
    borderColor: colors.logoGreyDark,
    color: colors.logoGreyDark,
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 30,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 0,
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
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
