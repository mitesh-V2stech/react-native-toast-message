/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-06-08 23:59:14
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { View, ActivityIndicator, Text, Dimensions, TouchableOpacity } from 'react-native';

import Icon from './icon';
import { icons } from '../assets';
import { stylePropType } from '../utils/prop-types';

import styles from './base/styles';

const propTypes = {
	content: PropTypes.node,
	title: PropTypes.string,
	message: PropTypes.string,
	isVisible: PropTypes.bool,
	inProgress: PropTypes.bool,
	showLoadingIcon: PropTypes.bool,
	trailingIcon: Icon.propTypes.source,
	activeOpacity: PropTypes.number,
	onTrailingIconPress: PropTypes.func,
	trailingIconStyle: stylePropType,
	titleStyle: stylePropType,
 	messageStyle: stylePropType,
 	leadingIcon: PropTypes.any,
};

const defaultProps = {
	content: null,
	title: '',
	message: '',
	isVisible: false,
	inProgress: false,
	showLoadingIcon: true,
	trailingIcon: icons.close,
	activeOpacity: 0.8,
	onTrailingIconPress: f => f,
	trailingIconStyle: {},
	titleStyle: {},
  	messageStyle: {},
	leadingIcon: null,
};

const { width, height } = Dimensions.get('window');

const Dialog = (props) => {
	const { content, leadingIcon, title, message, isVisible, inProgress, trailingIcon, onTrailingIconPress, activeOpacity, trailingIconStyle, titleStyle, messageStyle, showLoadingIcon } = props;

	if ((!isVisible || inProgress) && !(!isVisible && inProgress)) {
		return null;
	}
	return (
		<View
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 9999,
				backgroundColor: 'rgba(0, 0, 0, 0.6)',
				height: height + 100,
				width: width,
				padding: 15,
				position: 'absolute',
				bottom: -100,
			}}
		>
			<View
				style={{
					width: '100%',
					backgroundColor: '#fff',
					borderRadius: 8,
					// flexDirection: 'row',
					padding: 20,
					paddingVertical: 30,
					marginBottom: 100,
					zIndex: 9999,
					position: 'relative',
				}}
			>
				{trailingIcon && (
					<TouchableOpacity
						testID='trailingIcon'
						style={{
							position: 'absolute',
							right: 15,
							top: 15,
						}}
						onPress={onTrailingIconPress}
						activeOpacity={onTrailingIconPress ? activeOpacity : 1}>
						<Icon
							style={{ ...styles.trailingIcon, ...trailingIconStyle }}
							source={trailingIcon}
						/>
					</TouchableOpacity>
				)}

				{
					content ||
					<>
						{
							showLoadingIcon &&
							<ActivityIndicator
								size="large"
							/>
						}
						{
							leadingIcon
						}
						<View
							style={{
								marginTop: 20,
							}}
						>
							<Text
								style={[
									{
										textAlign: 'center',
										marginBottom: 10,
										fontSize: 16,
										fontWeight: 'bold',
									},
									titleStyle,
								]}
							>
								{title}
							</Text>
							<Text
								style={[
									{
										textAlign: 'center',
										fontSize: 14,
									},
									messageStyle,
								]}
							>
								{message}
							</Text>
						</View>
					</>
				}
			</View>
		</View>
	);
};

Dialog.propTypes = propTypes;

Dialog.defaultProps = defaultProps;

export default Dialog;
