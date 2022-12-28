import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import colors from '../config/colors';

const UserExperience = ({navigation}) => {
  const [defaultRating, setDefaultRating] = useState(1);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const RatingBar = () => {
    return (
      <View style={styles.ratingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? require('../assets/starFilled.png')
                    : require('../assets/starEmpty.png')
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const handleSubmit = () => {
    Alert.alert('Concluir', 'Pretende submeter a sua resposta?', [
      {
        text: 'Cancelar',
      },
      {
        text: 'Sim, confirmo.',
        onPress: () => navigation.navigate('Home'),
      },
    ]);
  };

  return (
    <View style={styles.background}>
      <Image
        style={styles.logo}
        source={require('../assets/logo-black.png')}></Image>

      <View style={styles.container}>
        <Text style={styles.text}>Classifique a sua experiência:</Text>
        <RatingBar />
        <Text style={styles.text}>
          {defaultRating} / {Math.max.apply(null, maxRating)}
        </Text>
        <TouchableOpacity style={styles.startButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Obter o valor selecionado</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserExperience;

const styles = StyleSheet.create({
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
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
  workOrderInput: {
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
