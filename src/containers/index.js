console.disableYellowBox = true;

import React from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput
} from 'react-native';
import styles from './Style';
import { Donebar } from '../components';

export default class Example extends React.Component {
    state = {
        keyboardType: 'default'
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                keyboardVerticalOffset={this.state.keyboardType === 'numeric' ? 40 : 0}
            >
                <TextInput
                    placeholder="Default Keyboard"
                    keyboardType="default"
                    onFocus={() => this.setState({ keyboardType: 'default' })}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Numeric Keyboard"
                    keyboardType="numeric"
                    onFocus={() => this.setState({ keyboardType: 'numeric' })}
                    style={styles.input}
                />
                <Donebar
                    keyboardType={this.state.keyboardType}
                    onDone={() => console.log('done!')}
                />
            </KeyboardAvoidingView>
        );
    }
}
