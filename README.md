About Fork
-------
- Disable Swipe Gestures by adding prop: `swipeable = false`
- Created a completely new type - `dialog`, building the layout from scratch. To push a message dialog to the user.
- Added new methods: `Toast.ok()` and `Toast.cancel()` along with `onOk: () => {}` and `onCancel: () => {}`

# react-native-toast-message

[![npm version](https://img.shields.io/npm/v/@zellosoft.com/react-native-toast-message)](https://www.npmjs.com/package/@zellosoft.com/react-native-toast-message)
[![npm downloads](https://img.shields.io/npm/dw/@zellosoft.com/react-native-toast-message)](https://www.npmjs.com/package/@zellosoft.com/react-native-toast-message)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
<!-- [![Build](https://github.com/calintamas/@zellosoft.com/react-native-toast-message/workflows/tests/badge.svg)](https://github.com/calintamas/@zellosoft.com/react-native-toast-message/actions?query=workflow%3Atests) -->

Animated toast message component for React Native.

- Imperative API
- Keyboard aware
- Flexible config

## Install

```
yarn add @zellosoft.com/react-native-toast-message
```

![ToastSuccess](success-toast.gif)

## Usage

Render the `Toast` component in your app entry file (along with everything that might be rendered there) and set a ref to it.

```js
// App.jsx
import Toast from '@zellosoft.com/react-native-toast-message';

function App(props) {
  return (
    <>
      {/* ... */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}

export default App;
```

Then use it anywhere in your app (even outside React components), by calling any `Toast` method directly:

```js
import Toast from '@zellosoft.com/react-native-toast-message';

function SomeComponent() {
  React.useEffect(() => {
    Toast.show({
      title: 'Hello',
      message: 'This is some something 👋'
    });
  }, []);

  return <View />;
}
```

## API

### `show(options = {})`

When calling the `show` method, you can use the following `options` to suit your needs. Everything is optional, unless specified otherwise.

The usage of `|` below, means that only one of the values show should be used.
If only one value is shown, that's the default.

```js
Toast.show({
  type: 'success | error | info | dialog',
  position: 'top | bottom',
  title: 'Hello',
  message: 'This is some something 👋',
  visibilityTime: 4000,
  autoHide: true,
  topOffset: 30,
  bottomOffset: 40,
  onShow: () => {},
  onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
  onPress: () => {},
  onOk: () => {},
  onCancel: () => {},
  props: {} // any custom props passed to the Toast component
});
``` 
```js
Toast.show({
  type: 'dialog', 
  title: 'Hello',
  message: 'This is some something 👋',
  showLoadingIcon: false,
  content: (
    <View
      style={{

      }}
    >
      { /* Any component */ }
    </View>
  ),
  visibilityTime: 4000,
  autoHide: true, 
  onShow: () => {},
  onHide: () => {},  
  onPress: () => {},
  onOk: () => {},
  onCancel: () => {}, 
});
```
### `hide()`

```js
Toast.hide();
```
### `ok()`

```js
Toast.ok();
```
### `cancel()`

```js
Toast.cancel();
```

## props

Props that can be set on the `Toast` instance. They act as defaults for all Toasts that are shown.

```js
const props = {
  type: 'success | error | info | dialog',
  position: 'top' | 'bottom',
  visibilityTime: Number,
  autoHide: Boolean,
  topOffset: Number,
  bottomOffset: Number,
  keyboardOffset: Number,
  config: Object,
  style: ViewStyle,
  height: Number,
  swipeable: Boolean, // Disable Swipe Gestures

  // for dialog type
  content: Component, // Replace title and message with itself
  leadingIcon: Component, 
  showLoadingIcon: Boolean,
};
```

> Default `Animated.View` styles can be found in [styles.js](https://github.com/calintamas/react-native-toast-message/blob/master/src/styles.js#L4). They can be extended using the `style` prop.

## Customize layout

If you want to add custom types - or overwrite the existing ones - you can add a `config` prop when rendering the `Toast` in your app `root`. 

You can either use the default `BaseToast` style and adjust its layout, or create Toast layouts from scratch.

```js
// App.jsx
import Toast, { BaseToast }  from 'react-native-toast-message';

const toastConfig = {
  /* 
    overwrite 'success' type, 
    modifying the existing `BaseToast` component
  */
  success: ({ title, props, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      titleStyle={{
        fontSize: 15,
        fontWeight: '400'
      }}
      title={title}
      message={props.uuid}
    />
  ),
  
  /* 
    or create a completely new type - `my_custom_type`,
    building the layout from scratch
  */
  my_custom_type: ({ title, props, ...rest }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{title}</Text>
    </View>
  )
};

function App(props) {
  // pass `toastConfig` to the Toast instance
  return (
    <>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}

export default App;
```

Then just use the library as before

```js
Toast.show({
  type: 'my_custom_type',
  props: { uuid: 'bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70' }
});
```

Available `props` on `BaseToast`:

```js
const baseToastProps = {
  leadingIcon: ImageSource,
  trailingIcon: ImageSource,
  title: String,
  message: String,
  onPress: Function,
  onLeadingIconPress: Function,
  onTrailingIconPress: Function,
  style: ViewStyle,
  leadingIconContainerStyle: ViewStyle,
  trailingIconContainerStyle: ViewStyle,
  leadingIconStyle: ViewStyle,
  trailingIconStyle: ViewStyle,
  contentContainerStyle: ViewStyle,
  titleStyle: ViewStyle,
  messageStyle: ViewStyle,
  activeOpacity: Number, 
};
```

## FAQ

### How to render the Toast when using [react-navigation](https://reactnavigation.org)?

To have the toast visible on top of the navigation `View` hierarchy, simply render it inside the `NavigationContainer`.

```js
import Toast from '@zellosoft.com/react-native-toast-message'
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      {...}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}
```

### How to mock the library for testing with [jest](https://jestjs.io)?

```js
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn()
}));
```

### How to show the Toast inside a Modal?

When a `Modal` is visible, the Toast gets rendered behind it. This is due to [the way `Modal` is implemented](https://stackoverflow.com/a/57402783). As a workaround, you can have 2 separate Toast instances: one inside the Modal (let's call it a "modal toast") and a normal one outside.

For the one outside, set the ref on the Toast object (like usual)
```js
<Toast ref={ref => Toast.setRef(ref) />
```

And for the "modal toast", use another ref
```js
function ScreenWithModal() {
  const modalToastRef = React.useRef();

  return (
    <Modal>
      <Toast ref={modalToastRef} />
    </Modal>
  );
}
```
Then, when you want to show the "modal toast", call it using `modalToastRef.current.show()`.

## Credits

The icons for the default `success`, `error` and `info` types are made by [Pixel perfect](https://www.flaticon.com/authors/pixel-perfect) from [flaticon.com](www.flaticon.com).
