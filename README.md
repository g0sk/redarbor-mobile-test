# redarbor-mobile-test

## Mobile app based on [React Native](https://reactnative.dev) v0.63.

- Tested on android with a Pixel 6 emulator with Android Tiramisu API level 33

## Dowload, install and run the project

- `git clone https://github.com/g0sk/redarbor-mobile-test`
- `cd redarbor-mobile-test`
- `yarn install`
- `yarn android`

In order to connect to the [marvel api](https://https://developer.marvel.com/), a developer account is needed. Once created just initalize a .env file inside the project with:

- API_URL = `https://gateway.marvel.com`
- API_PUBLIC_KEY = `Your developer public key`
- API_HASH = `must be a md5 hash with (API_PUBLIC_KEY + timestamp + API_PRIVATE_KEY)`

More info on [marvel developer portal](https://developer.marvel.com/documentation/authorization)

# Errors

Used library [react-native-url-polifyll](https://github.com/charpeni/react-native-url-polyfill).
Known issues (non-exhaustive) with React Native's URL are:

- URL incorrectly adds trailing slash [react-native#24428](https://github.com/facebook/react-native/issues/24428).

- Creating an instance of URL like: new URL('http://something.com') throws an exception [react-native#16434](https://github.com/facebook/react-native/issues/16434).

# Android build failures since Nov 4th 2022

[Fix for android build](https://github.com/facebook/react-native/issues/35210)

# Authentication

User to log in: `user@user.com`
