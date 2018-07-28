import React from 'react';
import {StyleSheet, Text,View, ListView, TouchableOpacity} from 'react-native';

export default class ListaPacScreen extends React.Component {
  
  static navigationOptions = {
    title: 'Lista Paciente',
  };

  constructor(){
    super();
    this.state = {isLoading: true, pacientes: []};
  }

/*
Invocado imediatamente após um componente ser montado, é responsável por fazer a consulta no banco de dados;
*/
 componentDidMount(){
  var{params} = this.props.navigation.state;
  var data = "user_id:"+params.user_id;  //Data para ser enviada na requisição

  const options = {
    method: 'POST',
    body: JSON.stringify(data)};

  fetch('http://globalbombas.com.br/prosel_carefy/Mobile/get_patients', options)
  .then((response) => response.json())
  .then((responseJson) => {
    if(responseJson.message.indexOf("Success") == -1) //Verifica se a consulta obteve sucesso e gera um alerta em caso de falha.
      alert("Erro: " + responseJson.message);

    this.setState({isLoading: false,            //Atualiza o state de acordo com o response do banco de dados.
      pacientes: responseJson});
  });
}


  render() {
    var{navigate} = this.props.navigation;
    var{params} = this.props.navigation.state;

    //Se a consulta ao banco ainda não terminou
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          <Text> Carregando dados.. </Text>
        </View>
      )
    }

    //se a consulta ao banco já terminou, mostra os resultados.
    else {
      var standardDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var clone = standardDataSource.cloneWithRows( [{}]);

      //Se o banco retornou com Sucesso os pacientes, atualiza variavél clone do listview
      if(this.state.pacientes.message.indexOf("Success") != -1)
        clone = standardDataSource.cloneWithRows(this.state.pacientes.patients);      
      
      return (
        <View style={styles.container}>
          <ListView style={styles.listaView}
            dataSource = {clone}
            renderRow= {(rowData) => <Text style={styles.lista}>Nome: {rowData.name}, Hospital: {rowData.hospital}</Text>
                      }>
          </ListView>
          <TouchableOpacity style={styles.button} onPress= {() => navigate("Cadastro",{id: params.user_id})}> 
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D8D8D8',
  },
  listaView: {
    backgroundColor: '#D8D8D8',
    height: "90%",
  },
  lista: {
    marginTop: 20,
    fontSize: 20,
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
