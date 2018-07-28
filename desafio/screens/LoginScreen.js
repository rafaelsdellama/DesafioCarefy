import React from 'react';
import {StyleSheet, Text,TextInput,View, TouchableOpacity, Image} from 'react-native';

export default class LoginScreen extends React.Component {
  
  static navigationOptions = {
    title: 'Login',
  };

  constructor(){
    super();
    this.state = {pass:"", email:""};
    this.login = this.login.bind(this);
    var name;
    var user_id;
    var email;
  }

  login(){
    var{navigate} = this.props.navigation;
    var data = "email="+this.state.email+"&password="+this.state.pass; // //Data para ser enviada na requisição
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var respString = this.response.toString();
  
        //Se a consulta obteve sucesso encontrando o usuário, trata a mensagem de resposta para capturar os dados
        if(respString.indexOf("Success") != -1){ 
          var resp = respString.split(",");

          aux = resp[2].split(":");
          this.user_id = aux[1].substring(1,aux[1].length -1);

          aux = resp[3].split(":");
          this.name = aux[1].substring(1,aux[1].length -1);

          aux = resp[4].split(":");
          this.email = aux[1].substring(1,aux[1].length -1);

          navigate("ListaPac",{user_id: this.user_id});
          
        }
        else //Se o usuário não for encontrado no banco de dados, gera um alerta.
          alert("Usuário não cadastrado!");
      }
    });
    
    xhr.open("POST", "http://globalbombas.com.br/prosel_carefy/Mobile/login");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "7d0ac8b4-6d0e-4144-a16d-7bd9763dc2b6");
    
    xhr.send(data);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={{width: 100, height: 100}} source={{uri: 'http://icons-for-free.com/free-icons/png/512/375260.png'}}/>
        <TextInput placeholder="Email" style={styles.input} onChangeText={(email)=>this.setState({email})}/>
        <TextInput placeholder="Password" style={styles.input} secureTextEntry={true} onChangeText={(pass)=>this.setState({pass})}/>
        <TouchableOpacity style={styles.button} onPress={this.login}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.authorText}>Autor: Rafael S. Del Lama</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D8D8D8',
  },

  input: {
    height:80,
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    marginTop: 20,
    width: "100%",
    color: '#000000',
  },

  button: {
    backgroundColor: '#89ffa5',
    width: "100%",
  },

  buttonText: {
      alignSelf: 'center',
      padding: 10,
      fontSize: 25,
      color: '#000000',
      fontWeight: 'bold',
  },

  authorText: {
    marginTop: 20,
    fontSize: 15,
    color: '#000000',
  },
});
