import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import colors from '../config/colors';
import ip from '../config/ip';
import axios from 'axios';

const UserExperience = ({navigation}) => {
  const [defaultRating, setDefaultRating] = useState(0);
  const [errorMsgRating, setErrorMsgRating] = useState(null);
  const [defaultUsabilityRating, setUsabilityRating] = useState(0);
  const [errorMsgUsabilityRating, setErrorMsgUsabilityRating] = useState(null);
  const [defaultVisibilityRating, setVisibilityRating] = useState(0);
  const [errorMsgVisibilityRating, setErrorMsgVisibilityRating] =
    useState(null);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const RatingBarUsability = () => {
    return (
      <View style={styles.ratingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setUsabilityRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultUsabilityRating
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

  const RatingBarVisibility = () => {
    return (
      <View style={styles.ratingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setVisibilityRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultVisibilityRating
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

  const RatingBarDefault = () => {
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
    defaultUsabilityRating === 0
      ? setErrorMsgUsabilityRating('Avaliação necessária')
      : setErrorMsgUsabilityRating(null);
    defaultVisibilityRating === 0
      ? setErrorMsgVisibilityRating('Avaliação necessária')
      : setErrorMsgVisibilityRating(null);
    defaultRating === 0
      ? setErrorMsgRating('Avaliação necessária')
      : setErrorMsgRating(null);

    if (
      defaultUsabilityRating === 0 ||
      defaultVisibilityRating === 0 ||
      defaultRating === 0
    )
      return;

    Alert.alert('Concluir', 'Pretende submeter a sua resposta?', [
      {
        text: 'Cancelar',
      },
      {
        text: 'Sim, confirmo',
        onPress: async () => {
          try {
            const res = await axios.post(ip.backend_ip + 'user_experience', {
              usability_rate: defaultUsabilityRating,
              visibility_rate: defaultVisibilityRating,
              global_rate: defaultRating,
            });

            console.log(res.data);

            navigation.navigate('Home');
          } catch (err) {
            console.error(err.message);
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
        <Text style={styles.text}>
          Classifique a sua experiência em relação à utilização da aplicação:
        </Text>
        {errorMsgUsabilityRating && (
          <Text style={styles.errorMessage}>{errorMsgUsabilityRating}</Text>
        )}
        <RatingBarUsability />
        <Text style={styles.text}>
          Classifique a sua experiência em relação ao aspeto da aplicação:
        </Text>
        {errorMsgVisibilityRating && (
          <Text style={styles.errorMessage}>{errorMsgVisibilityRating}</Text>
        )}
        <RatingBarVisibility />
        <Text style={styles.text}>
          Classifique a sua experiência global da aplicação:
        </Text>
        {errorMsgRating && (
          <Text style={styles.errorMessage}>{errorMsgRating}</Text>
        )}
        <RatingBarDefault />
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submeter avaliação</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserExperience;

const styles = StyleSheet.create({
  starImageStyle: {
    width: 35,
    height: 35,
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
    bottom: -15,
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
    position: 'absolute',
    bottom: 40,
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
    paddingLeft: 20,
    paddingTop: 15,
    color: colors.logoGreyDark,
    fontWeight: 'bold',
    marginHorizontal: 10,
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
  ratingBarStyle: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
});
