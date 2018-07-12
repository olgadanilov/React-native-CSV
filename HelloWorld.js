/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';

// import { store } from "./store";

// import {CSVLink, CSVDownload} from 'react-csv';
import RNFetchBlob from 'react-native-fetch-blob';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

let csvData = [
  ['name', 'asdf'],
  ['Ahmed', 12],
  ['John', 8]
];

const values = [
  ['名稱', '我的太阳, имя, имя'],
  ['生日', '我的太阳, 我的太阳, судно второго класса']
];

type Props = {};
export default class App extends Component<Props> {

  render() {
    return (  
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native! 
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>

        {/* <Button title="Widthraw" data-btn = {tech} onPress={this._handleWidthrawPress}>
        </Button>
        <Button title="Deposit" onPress={this._handleDepositPress}>
        </Button> */}

        <Text style={styles.instructions}>
          Balance : 1000
        </Text>

        <Button title="Export" onPress={this._exportCSV}>
        </Button>
      </View>
    );
  }

  _handleWidthrawPress() {
    
    Alert.alert('You tapped the button!')
  }

  _handleDepositPress() {
    Alert.alert('You tapped the button!')
  }

  _exportCSV() {
    // construct csvString
    const headerString = 'event,timestamp\n';
    const rowString = values.map(d => `${d[0]},${d[1]}\n`).join('');
    let csvString = `${headerString}${rowString}`;

    // write the current list of answers to a local csv file
    const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/data.csv`;
    console.log('pathToWrite', pathToWrite);
    // pathToWrite /storage/emulated/0/Download/data.csv

    //
    // csvString = 'data:text/csv;charset=utf-8' + csvString;
    csvString = csvString;
    

    // blob = new Blob('\uFEFF' + csvString, {type: 'text/csv'});
    // Alert.alert(blob);

    csvString = '\uFEFF' + csvString;
    // RNFetchBlob.fs.writeStream(pathToWrite, 'utf8')
    // .then((stream) => {
    //     stream.write(csvString)
    //     return stream.close()
    // });
    

    RNFetchBlob.fs
      .writeFile(pathToWrite, csvString, 'utf8')
      .then(() => {
        console.log(`wrote file ${pathToWrite}`);
        // wrote file /storage/emulated/0/Download/data.csv
      })
      .catch(error => console.error(error));

      Alert.alert('Exproted to : ' + pathToWrite);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
