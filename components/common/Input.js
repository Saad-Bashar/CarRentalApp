import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';

export default class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {
			borderColor: '#9999',
			borderWidth: 1,
		};
	}

	handleBlur = () => {
		this.setState({
			borderColor: '#9999',
			borderWidth: 1,
		});

		if (this.props.onBlur) {
			this.props.onBlur();
		}
	};

	render() {
		const { placeholder, handleInput, secureTextEntry, customStyle, error, containerStyle } = this.props;
		const { borderColor, borderWidth } = this.state;

		return (
			<View style={[{ marginBottom: 20 }, containerStyle]}>
				<TextInput
					style={[
						{
							height: 50,
							borderRadius: 8,
							padding: 10,
							borderColor,
							borderWidth,
						},
						customStyle,
					]}
					placeholder={placeholder}
					onChangeText={handleInput}
					autoCorrect={false}
					autoCapitalize={'none'}
					secureTextEntry={secureTextEntry}
					onFocus={() => this.setState({ borderColor: '#8D02CE', borderWidth: 2 })}
					onBlur={this.handleBlur}
				/>

				{error && <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{error}</Text>}
			</View>
		);
	}
}
