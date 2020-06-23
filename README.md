# React Native Push Notificações

#### Implementação de Push Notifications com OneSignal e Firebase.

[Seguiremos com instruções para implementação em android, para IOS consulte na documentação no o artigo respectivo --> [OneSignal IOS](https://documentation.onesignal.com/docs/ios-sdk-setup)]

Documentação específica para React Native da Onesignal: [OneSignal react-native & Expo SDK](https://documentation.onesignal.com/docs/react-native-sdk-setup)


###### Passo01 - OneSignal e Firebase
- Criar conta no [OneSignal](https://onesignal.com);
- Criar um novo App/website e definir plataforma a utilizar (Android);
- Após clicar na plataforma será necessário inserir o ServerKey e SenderID estes captados do Firebase;
- Criar conta no [Firebase Console](https://console.firebase.google.com);
- Criar um novo projeto e defina o nome desejado, após abrir a plataforma do Firebase adicionar um app Android (Na própria home tem um botão "+ Adicionar app");
 - Ao cria o app android coloquei o nome do pacote que será criado no projeto react-native, se o nome for meuprojeto o nome do pacote fica "com.meuprojeto" pois mais adiante iremos criar o porjeto `react-native init meuprojeto`;
- Com app criado va em "Project Overview" > configurações do projeto (à sua esquerda), clique em "Cloud Messaging" para visualizar suas credenciais (chave servidor -> ServerKey | Código do  Remetente -> SenderId );
- Após vincular ids o firebase acessar o projeto no onesignal e ir em Keys e Id la sera possível pegar o APP ID que será utilizar no projeto;
- Com Onesignal vinculado ao Firebase vamos ao projeto react-native;


###### Passo02 - Criar Projeto React Native

- Criar projeto react-native `react-native init nomeprojeto` ;
- Instalação da lib OneSinal
NPM: `npm install --save react-native-onesignal`
Yarn: `yarn add react-native-onesignal`
- Com projeto criado vamos algumas configurações, em "android/app/src/main/AndroidManifest.xml" implemente o código:
```
(…)
<!-- Logo apos abertura da tag <Manifest> --> 
<uses-permission android:name=”android.permission.ACCESS_COARSE_LOCATION”/>
(…)
<activity
andoid:launchMode=”singleTop”
(…)
```
- Agora vamos em "android/app/build.gradle" (Logo após o primeira import)
```js
buildscript {
    repositories {
     maven { url 'https://plugins.gradle.org/m2/' } // Gradle Plugin Portal 
    }
    dependencies {
    classpath 'gradle.plugin.com.onesignal:onesignal-gradle-plugin:[0.10.0, 0.99.99]'
    }
}
apply plugin: 'com.onesignal.androidsdk.onesignal-gradle-plugin'
```
- Agora em "android/build.gradle" veja se o minSdkVersion = 26;


###### Passo03 - Implementando o código
- No seu Arquivo App.js importe a lib ´import OneSignal from 'react-native-onesignal'´ e vamos inserir o seguinte componente:
 -- Arquivo App.js
 ```
import React, {Component} from 'react';
import OneSignal from 'react-native-onesignal';
import Home from './pages/home';
export default class App extends Component {
  constructor(properties) {
    super(properties);
    OneSignal.init(oneSignalAppId.id, {kOSSettingsKeyAutoPrompt: true}); // set kOSSettingsKeyAutoPrompt to false prompting manually on iOS

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillMount() {
    console.log('asdsad', oneSignalAppId);
    OneSignal.getUserId().then(function(userId) {
      console.log('OneSignal User ID:', userId);
    });
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    return <Home />;
  }
}
 ```
  -- Arquivo Home.js
  ```
      import React, {useState} from 'react';
      import {View, Text, TextInput, Button} from 'react-native';
      // importação do axios para requisição mas poderia usar fetch | yarn add axios 
      import axios from 'axios'; 
      export default function Index() {
      const [message, setmessage] = useState('');
      function onSubmit() {
        const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Basic YTRiNmQyMzQtM2YxNy00ZTY0LWJhY2QtY2M1MmYwYWIyMTNj'
		};
		
      const body = JSON.stringify({
      app_id: 'f12591e4-c22f-4119-8dda-0ee121fd57a', // Id do app do Onesignal
      contents: {en: message != '' ? message : 'Olá Sou um Push Notification!'}, // Conteudo a ser enviado
      // included_segments: ['All'], // Caso queira enviar a todos
      include_player_ids: ["9778ed86-3307-4922-935c-f26d125gd4cb"] // Caso queria enviar a um ou alguns usuarios especificos, separados por virgula
	  });
	       // Requisição com a url do Onesignal API Rest
      axios({
      method: 'POST',
      url: 'https://onesignal.com/api/v1/notifications',
      headers: headers,
      data: body,
      })
        .then(res => {
        console.log('Response Data', res);
      })
      .catch(err => {
        console.log('Erro', err);
      });
      }

      return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 22}}>Home Native - PushNoti</Text>
      <View style={{marginTop: '10%'}}>
        <TextInput
          value={message}
          onChangeText={text => setmessage(text)}
          style={{
            backgroundColor: '#6e6e6e20',
            margin: 3,
            width: 300,
            borderRadius: 8,
          }}
        />
        <Button
          title="Enviar Push"
          onPress={onSubmit}
          style={{width: 280, borderRadius: 8}}
        />
      </View>
      </View>
      );
      }
```
- Com tudo configurado no aplicativo sera renderizado um input e um button, ao clicar em 'Enviar Push" será chamado a função submit que cria a requisição com a mensagem e dispara a url rest da onesignal, e nesse momento e enviado a mensagem a todos ou a usuários específicos.


###### Conclusão
Toda a implementação foi feita diretamente no app mas como podemos observar na implementação podemos identificar o usuário ao logar no app e salvar o deviceID e enviar para uma api nossa gerir o fluxo com as demais regras e aplicabilidades, o Onesignal conta com segmentos que são grupos de envios q podem ser criados e disparado os push a eles, consulte a doc e as features de cada plano.

---
Implementado por [Hudson Oliveira](https://github.com/hog099).