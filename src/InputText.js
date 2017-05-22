import React, { PropTypes, Component } from 'react';
import {
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import styles from './styles/styles';
import * as variables from './styles/variables';

export default class InputText extends Component {

  static propTypes = {
    // Config
    required: PropTypes.bool,
    type: PropTypes.string,
    keyboardType: PropTypes.string,

    // Label & placeholder
    label: PropTypes.string,
    defaultValue: PropTypes.string,

    // Styles
    containerStyles: PropTypes.any,
    labelContainerStyles: PropTypes.any,
    labelStyles: PropTypes.any,
    inputStyles: PropTypes.any,
    errorColor: PropTypes.string,
    placeholderColor: PropTypes.string
  }

  static defaultProps = {
    errorColor: variables.red,
    placeholderColor: variables.gray
  }

  state = {
    value: this.props.defaultValue || '',
    error: false
  }

  value() {
    return this.state.value;
  }

  valid() {
    return this.state.value && this.state.value.length > 0;
  }

  showError() {
    this.setState({ error: true });
  }

  _focusInput = () => {
    this.refs.input.focus();
  }

  _updateInput = (value) => {
    if (this.props.keyboardType === 'numeric') {
      value = this.parseNumericInput(value);
    }

    this.setState({
      value: value,
      error: false
    });
  }

  parseNumericInput(value) {
    let newValue = '';
    let numbers = '0123456789';

    for (var i = 0; i < value.length; i++) {
      if ( numbers.indexOf(value[i]) > -1 ) {
        newValue = newValue + value[i];
      }
    }

    return newValue;
  }

  render() {
    const { label, keyboardType, required, type, containerStyles, labelContainerStyles,
      labelStyles, inputStyles, errorColor, placeholderColor } = this.props;
    const { value, error } = this.state;

    const labelText = required ? `${label} *` : label;
    const placeholder = type === 'withLabel' ? '' : label;

    const containerStyle = [styles.formContainer, containerStyles];
    const labelContainerStyle = [styles.formLabelContainer, labelContainerStyles];
    const labelStyle = error ? [styles.formLabel, labelStyles, styles.error] : [styles.formLabel, labelStyles];
    const inputStyle = [styles.formInput, inputStyles];
    const placeholderTextColor = error ? errorColor : placeholderColor;

    return (
      <View style={containerStyle}>
        { type === 'withLabel' &&
          <TouchableWithoutFeedback onPress={this._focusInput}>
            <View style={labelContainerStyle}>
              <Text style={labelStyle}>{labelText}</Text>
            </View>
          </TouchableWithoutFeedback>
        }

        <TextInput
          ref="input"
          disableFullscreenUI={false}
          style={inputStyle}
          clearButtonMode="while-editing"
          keyboardType={keyboardType}
          onChangeText={(value) => this._updateInput(value)}
          underlineColorAndroid="transparent"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          {...this.props}
        />
    </View>
    );
  }
}