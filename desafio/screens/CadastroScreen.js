import React from 'react';
import {StyleSheet, Text, TextInput,View,TouchableOpacity} from 'react-native';

export default class CadastroScreen extends React.Component {
  
  static navigationOptions = {
    title: 'Cadastro',
  };

  constructor(){
    super();
    this.state = {name:"", hospital:"", id:""};
    this.cadastrar = this.cadastrar.bind(this);
  }

  /*
  Invocado imediatamente após um componente ser montado, é responsável por fazer o 
  setState dos parametros recebidos da screen anterior
  */
  componentDidMount(){
    var{params} = this.props.navigation.state;
    this.setState({id: params.id});
  }

  /*
  Metodo responsável por pegar os dados do state e cadastrar no banco de dados.
  */
 cadastrar(){
    var data = "name="+this.state.name+"&hospital="+this.state.hospital+"&user_id="+this.state.id;  //Data para ser enviada na requisição

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {  //Se a consulta já terminou
        if(this.responseText.indexOf("User add") != -1){ //Gera um alerta de acordo com a mensagem de resposta gerada pelo banco
            alert("Paciente adicionado com sucesso!");
        }
        else
            alert("Erro ao adicionar! " + this.responseText);
      }
    });
    
    xhr.open("POST", "http://globalbombas.com.br/prosel_carefy/Mobile/mobile_add_patient");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    
    xhr.send(data);
 }


  render() {
    var{navigate} = this.props.navigation;
    return (
        <View style={styles.container}>
        <TextInput placeholder="Nome" style={styles.input} onChangeText={(name)=>this.setState({name})} />
        <TextInput placeholder="Hospital" style={styles.input} onChangeText={(hospital)=>this.setState({hospital})} />
        <TouchableOpacity style={styles.button} onPress= {this.cadastrar}> 
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
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
});
