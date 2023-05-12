# Docudash

# Steps:

1. use npx create-expo-app -t expo-template-blank-typescript this will init the project in typescript

2. add the web support `npx expo install react-dom react-native-web @expo/webpack-config`

3. add React Navigation both native and stack `yarn add @react-navigation/native @react-navigation/stack @react-navigation/native-stack @react-navigation/bottom-tabs @react-navigation/drawer @react-navigation/material-top-tabs react-native-tab-view`

4. add expo react navigation dependencies and add gesture handle `npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler`

- make sure to add this code in index.js or App.js: at the top

```
import 'react-native-gesture-handler';
```

5. add tailwind class name library `yarn add twrnc`

6. add tailwind config file for autocomplete add style to the class name in tailwind autocomplete `npx tailwindcss init`

7. add firebase to the project `yarn add @react-native-firebase/firestore @react-native-firebase/auth @react-native-firebase/app @react-native-google-signin/google-signin`

- in app.json

```
"ios": {
      "googleServicesFile": "./GoogleService-Info.plist",
      "supportsTablet": true,
      "bundleIdentifier": "host.exp.exponent"
    },
     "android": {
      "googleServicesFile": "./google-services.json",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "host.exp.exponent"
    },
    "plugins": [
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "@react-native-google-signin/google-signin",
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ]
    ]
```

8. add expo build properties `yarn add expo-build-properties`
9. use command to clean and add to android and ios `npx expo prebuild --clean`
10. run build with `npx expo run:ios`

11. add react native paper `yarn add react-native-paper`
12. add react native paper alert `yarn add react-native-paper-alerts`

13. add localization `yarn add i18n-js@3.8.0 react-native-localize@2.2.0`
14. add type of i18n-js `yarn add @types/i18n-js@3.8.2`

15. add google analytics `yarn add @react-native-firebase/analytics`

16. add country picker `yarn add react-native-country-picker-modal`

17. add lib phone number `yarn add libphonenumber-js`

18. add signature view `yarn add react-native-signature-canvas`

- add react native webview as its the depedency use `npx expo install react-native-webview`