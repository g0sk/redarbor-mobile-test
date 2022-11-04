# redarbor-mobile-test

Mobile app based on [React Native](https://reactnative.dev) v0.63.

## Dowload and install the project

- `git clone https://github.com/g0sk/redarbor-mobile-test`
- `cd redarbor-mobile-test`
- `yarn install`

In order to connect to the [marvel api](https://https://developer.marvel.com/) a developer account is needed. Once created just initalize a .env file with:

- API_URL = `https://gateway.marvel.com`
- API_PUBLIC_KEY = `Your developer public key`
- API_HASH = `md5_hash(API_PUBLIC_KEY + timestamp + API_PRIVATE_KEY)`

# Errors

Used library react-native-url-polifyll because of:
Known issues (non-exhaustive) with React Native's URL are:

- URL incorrectly adds trailing slash [react-native#24428](https://github.com/facebook/react-native/issues/24428).

- Creating an instance of URL like: new URL('http://something.com') throws an exception [react-native#16434](https://github.com/facebook/react-native/issues/16434).

# Authentication

User to log in: `user@user.com`

Tested on android with a Pixel 6 emulator
