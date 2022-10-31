# redarbor-mobile-test

Mobile app based on [React Native](https://reactnative.dev) v0.63.

Libraries used:

- @react-navigation/native
- @react-navigation/native-stack

Theme

- @shopify/restyle

Store credentials securely on device

- react-native-sensitive-info

# Errors

Used library react-native-url-polifyll because of:
Known issues (non-exhaustive) with React Native's URL are:

- URL incorrectly adds trailing slash [react-native#24428](https://github.com/facebook/react-native/issues/24428).

- Creating an instance of URL like: new URL('http://something.com') throws an exception [react-native#16434](https://github.com/facebook/react-native/issues/16434).
