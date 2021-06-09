import React from 'react';
import { ViewStyle, TextStyle, ImageSourcePropType } from 'react-native'

declare module '@zellosoft.com/react-native-toast-message' {
  interface AnyObject {
    [key: string]: any;
  }

  export type ToastPosition = 'top' | 'bottom'

  export interface BaseToastProps {
    leadingIcon?: ImageSourcePropType,
    trailingIcon?: ImageSourcePropType,
    title?: string,
    message?: string,
    onPress?: () => void,
    onTrailingIconPress?: () => void,
    onLeadingIconPress?: () => void,
    style?: ViewStyle,
    leadingIconContainerStyle?: ViewStyle,
    trailingIconContainerStyle?: ViewStyle,
    leadingIconStyle?: ViewStyle,
    trailingIconStyle?: ViewStyle,
    contentContainerStyle?: ViewStyle,
    titleStyle?: TextStyle,
    messageStyle?: TextStyle,
    activeOpacity?: number,
    titleNumberOfLines: number,
    messageNumberOfLines: number,
  }
  export const BaseToast: React.FC<BaseToastProps>

  export interface ToastProps {
    ref: (ref: any) => any;
    config?: AnyObject,
    style?: ViewStyle,
    topOffset?: number,
    bottomOffset?: number,
    keyboardOffset?: number,
    visibilityTime?: number,
    autoHide?: boolean,
    height?: number,
    position?: ToastPosition,
    type?: string
  }

  export default class Toast extends React.Component<ToastProps> {
    static show(options: {
      type: string,
      position?: ToastPosition,
      title?: string,
      message?: string,
      content?: string,
      visibilityTime?: number,
      autoHide?: boolean,
      showLoadingIcon?: boolean,
      topOffset?: number,
      bottomOffset?: number,
      props?: AnyObject,
      leadingIcon?: any,
      onShow?: () => void,
      onHide?: () => void,
      onOk?: () => void,
      onCancel?: () => void,
      onPress?: () => void
    }): void;

    static hide(): void;
    static ok(): void;
    static cancel(): void;

    static setRef(ref: any): any;
  }
}
