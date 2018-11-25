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

Use chocolatey to install everything.

 - Android SDK
 - Android Studio
 - OpenSSL.Light

To generate a "certificate" for your development app, use this command:

```powershell
keytool -exportcert -alias androiddebugkey -keystore ~\.android\debug.keystore | C:\Program` Files\OpenSSL\bin\openssl sha1 -binary | C:\Program` Files\OpenSSL\bin\openssl base64
```

In PowerShell, for some reason this hash comes out as 32 characters, but can be converted to 28 using some equivalent to:

```javascript
btoa(atob("HASH_HERE").slice(0, -2));
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
