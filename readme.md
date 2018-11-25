# React Native Tinkering

This is where I'm tracking all my progress as I familiarize myself with the React Native platform.  Eventually this might make a great application boilerplate.

### Technologies

 - React Native (duh!)
 - TypeScript
 - [Protoculture](https://github.com/atrauzzi/protoculture)
 - Visual Studio App Centre
 - React Navigation
 - React Native Elements
 - Facebook Login

### Useful Commands

##### Windows

> Use chocolatey to install everything!

 - Android SDK
 - Android Studio
 - OpenSSL.Light

To generate a "certificate" for your development app, use this command:

```powershell
keytool -exportcert -keystore ~\.android\debug.keystore -list -v

$sha1Bytes = [System.Text.Encoding]::Unicode.GetBytes($Text)
$sha1Hash = [Convert]::ToBase64String($sha1Bytes)

# https://stackoverflow.com/a/41293760/128991
# Delete the last 5 characters and add an `=` at the end of this output to get the Facebook hash.
keytool -exportcert -alias androiddebugkey -keystore ~\.android\debug.keystore | C:\Program` Files\OpenSSL\bin\openssl sha1 -binary | C:\Program` Files\OpenSSL\bin\openssl base64
```

```javascript
// To convert 32 to 28 characters...
btoa(atob("HASH_HERE").slice(0, -2));
```


Grab a current screenshot.

```poewrshell
adb shell screencap -p /sdcard/screen.png
adb pull /sdcard/screen.png
adb shell rm /sdcard/screen.png
```

### Lessons & Concepts

 - React Native's special relationship with native code and project structures
 - Babel
 - Linking
 - Occasional requirement to edit native files to set up bindings
 - Higher volume and complexity storage options (Realm)
 - Keystores and signing
 - Application bootstrap
 - The availability of on-device native SDKs vs. web-based SDKs
 - What files to avoid committing to source control, or that need to be transformed
   - `android\app\src\main\res\values\strings.xml` -> `secrets.xml` (as per [this article](https://github.com/codepath/android_guides/wiki/Storing-Secret-Keys-in-Android))
   - `android/app/src/main/assets/appcenter-config.json` -> ignored, can we move these values into XML?
 - Key hash is a big thing
 - Firebase is how Google wants you to do everything now it would appear?


### Other Useful Links

 - Facebook
   - https://developers.facebook.com/docs/facebook-login/access-tokens/
   - https://developers.facebook.com/docs/react-native/login
   - https://developers.facebook.com/docs/accountkit/accesstokens/#authcode
 - Android
   - https://facebook.github.io/react-native/docs/signed-apk-android.html