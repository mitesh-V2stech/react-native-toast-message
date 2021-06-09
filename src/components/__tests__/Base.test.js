/* eslint-env jest */

import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import colors from '../../colors';
import { icons } from '../../assets';
import Base from '../base';

describe('test Base component', () => {
  it('renders default Views', () => {
    const { queryByTestId } = render(<Base />);
    const rootView = queryByTestId('rootView');
    const leadingIcon = queryByTestId('leadingIcon');
    const trailingIcon = queryByTestId('trailingIcon');
    const title = queryByTestId('title');
    const message = queryByTestId('message');

    expect(rootView).toBeTruthy();
    expect(rootView).toHaveStyle({
      height: 60,
      width: '90%',
      borderLeftWidth: 5,
      borderLeftColor: colors.alto
    });
    expect(title).toBeFalsy();
    expect(message).toBeFalsy();
    expect(leadingIcon).toBeFalsy();
    expect(trailingIcon).toBeTruthy();
    expect(trailingIcon.children[0].props.source).toBe(icons.close);
  });

  it('renders custom leadingIcon and trailingIcon', () => {
    const mockIcon = { uri: 'iconSource' };

    const { queryByTestId } = render(
      <Base leadingIcon={mockIcon} trailingIcon={mockIcon} />
    );
    const leadingIcon = queryByTestId('leadingIcon');
    const trailingIcon = queryByTestId('trailingIcon');

    expect(leadingIcon.children[0].props.source).toBe(mockIcon);
    expect(trailingIcon.children[0].props.source).toBe(mockIcon);
  });

  it('renders title and message', () => {
    const t1 = 'foo';
    const t2 = 'bar';
    const { queryByTestId } = render(<Base title={t1} message={t2} />);
    const title = queryByTestId('title');
    const message = queryByTestId('message');

    expect(title.children[0]).toBe(t1);
    expect(message.children[0]).toBe(t2);
  });

  it('fires onPress', () => {
    const onPress = jest.fn();
    const { queryByTestId } = render(<Base onPress={onPress} />);
    const rootView = queryByTestId('rootView');

    fireEvent.press(rootView);

    expect(onPress).toHaveBeenCalled();
  });

  it('fires onLeadingIconPress and onTrailingIconPress', () => {
    const onLeadingIconPress = jest.fn();
    const onTrailingIconPress = jest.fn();
    const mockIcon = { uri: 'mock' };

    const { queryByTestId } = render(
      <Base
        leadingIcon={mockIcon}
        trailingIcon={mockIcon}
        onLeadingIconPress={onLeadingIconPress}
        onTrailingIconPress={onTrailingIconPress}
      />
    );
    const leadingIcon = queryByTestId('leadingIcon');
    const trailingIcon = queryByTestId('trailingIcon');

    fireEvent.press(leadingIcon);
    expect(onLeadingIconPress).toHaveBeenCalledTimes(1);
    expect(onTrailingIconPress).toHaveBeenCalledTimes(0);

    fireEvent.press(trailingIcon);
    expect(onLeadingIconPress).toHaveBeenCalledTimes(1);
    expect(onTrailingIconPress).toHaveBeenCalledTimes(1);
  });

  it('sets custom style on root View', () => {
    const mockStyle = {
      height: 20
    };
    const { queryByTestId } = render(<Base style={mockStyle} />);
    const rootView = queryByTestId('rootView');

    expect(rootView).toHaveStyle(mockStyle);
  });

  it('sets custom style on leading icon container', () => {
    const mockStyle = {
      width: 40
    };
    const { queryByTestId } = render(
      <Base
        leadingIcon={{ uri: 'mock' }}
        leadingIconContainerStyle={mockStyle}
      />
    );
    const leadingIcon = queryByTestId('leadingIcon');

    expect(leadingIcon).toHaveStyle(mockStyle);
  });

  it('sets custom style on trailing icon container', () => {
    const mockStyle = {
      width: 40
    };
    const { queryByTestId } = render(
      <Base trailingIconContainerStyle={mockStyle} />
    );
    const trailingIcon = queryByTestId('trailingIcon');

    expect(trailingIcon).toHaveStyle(mockStyle);
  });

  it('sets custom style on leading icon', () => {
    const mockStyle = {
      width: 25,
      height: 25
    };
    const { queryByTestId } = render(
      <Base leadingIcon={{ uri: 'mock' }} leadingIconStyle={mockStyle} />
    );
    const leadingIcon = queryByTestId('leadingIcon');

    expect(leadingIcon.children[0]).toHaveStyle(mockStyle);
  });

  it('sets custom style on trailing icon', () => {
    const mockStyle = {
      width: 25,
      height: 25
    };
    const { queryByTestId } = render(
      <Base trailingIcon={{ uri: 'mock' }} trailingIconStyle={mockStyle} />
    );
    const trailingIcon = queryByTestId('trailingIcon');

    expect(trailingIcon.children[0]).toHaveStyle(mockStyle);
  });

  it('has default content container style', () => {
    const { queryByTestId } = render(<Base />);
    const contentContainer = queryByTestId('contentContainer');

    expect(contentContainer).toHaveStyle({
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start'
    });
  });

  it('sets custom content container style', () => {
    const mockStyle = {
      backgroundColor: 'tomato'
    };
    const { queryByTestId } = render(
      <Base contentContainerStyle={mockStyle} />
    );
    const contentContainer = queryByTestId('contentContainer');

    expect(contentContainer).toHaveStyle(mockStyle);
  });

  it('sets custom title and message style', () => {
    const mockStyle1 = {
      fontSize: 10
    };
    const mockStyle2 = {
      fontSize: 8
    };
    const { queryByTestId } = render(
      <Base
        title='Foo'
        message='Bar'
        titleStyle={mockStyle1}
        messageStyle={mockStyle2}
      />
    );
    const title = queryByTestId('title');
    const message = queryByTestId('message');

    expect(title).toHaveStyle(mockStyle1);
    expect(message).toHaveStyle(mockStyle2);
  });

  it('renders default number of lines', () => {
    const { queryByTestId } = render(<Base title='Foo' message='Bar' />);
    const title = queryByTestId('title');
    const message = queryByTestId('message');

    expect(title.props.numberOfLines).toBe(1);
    expect(message.props.numberOfLines).toBe(2);
  });

  it('sets custom number of lines', () => {
    const { queryByTestId } = render(
      <Base
        title='Foo'
        message='Bar'
        titleNumberOfLines={2}
        messageNumberOfLines={3}
      />
    );
    const title = queryByTestId('title');
    const message = queryByTestId('message');

    expect(title.props.numberOfLines).toBe(2);
    expect(message.props.numberOfLines).toBe(3);
  });
});
