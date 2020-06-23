import React, {Component} from 'react';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

import Home from './pages/home';

import oneSignalAppId from './config/onesignalkey';

export default class App extends Component {
  constructor(properties) {
    super(properties);
    OneSignal.init(oneSignalAppId.id, {kOSSettingsKeyAutoPrompt: true}); // set kOSSettingsKeyAutoPrompt to false prompting manually on iOS

    // OneSignal.addEventListener('received', this.onReceived);
    // OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillMount() {
    // console.log('asdsad', oneSignalAppId);
    // OneSignal.getUserId().then(function(userId) {
    //   console.log('OneSignal User ID:', userId);
    // });
  }

  // componentWillUnmount() {
  //   OneSignal.removeEventListener('received', this.onReceived);
  //   OneSignal.removeEventListener('opened', this.onOpened);
  //   OneSignal.removeEventListener('ids', this.onIds);
  // }

  onReceived(notification) {
    // console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    // console.log('Message: ', openResult.notification.payload.body);
    // console.log('Data: ', openResult.notification.payload.additionalData);
    // console.log('isActive: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    return <Home />;
  }
}
