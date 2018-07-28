import React from 'react';
import {Text,View} from 'react-native';

import {StackNavigator} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import ListaPacScreen from './screens/ListaPacScreen';
import CadastroScreen from './screens/CadastroScreen';

const Navigation = StackNavigator({
  Login: {screen: LoginScreen},
  ListaPac: {screen: ListaPacScreen},
  Cadastro: {screen: CadastroScreen}
})

export default Navigation;
