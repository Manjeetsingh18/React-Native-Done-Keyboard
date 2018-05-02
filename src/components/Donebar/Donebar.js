import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Keyboard,
    Animated,
    StyleSheet,
    LayoutAnimation,
    Dimensions,
    Platform
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './DonebarStyle';
let { width, height } = Dimensions.get('window');

export default class DoneBar extends React.Component {
    static propTypes = {
        keyboardType: PropTypes.string,
        includeLayoutAnimation: PropTypes.bool,
        text: PropTypes.string,
        onDone: PropTypes.func
    }

    static defaultProps = {
        keyboardType: 'numeric',
        includeLayoutAnimation: true,
        text: 'Done',
        onDone: () => { }
    }

    state = {
        height: 0,
        width: width,
        bottom: -81
    }

    componentWillMount(props) {
        const config = {
            duration: 250,
            update: {
                duration: 250,
                type: LayoutAnimation.Types.keyboard
            }
        };

        this.keyboardWillChangeFrameListener = Keyboard.addListener('keyboardWillChangeFrame', ({ endCoordinates }) => {
            let { screenY } = endCoordinates;

            if (screenY === height || this.props.keyboardType !== 'numeric') {
                bottom = -81;
            } else {
                bottom = endCoordinates.height - 40;
            }

            this.props.includeLayoutAnimation ? LayoutAnimation.configureNext(config) : null;
            this.setState({
                bottom,
                width: endCoordinates.width
            });
        });
    }

    render() {
        if (Platform.OS !== 'ios') {
            return null;
        }

        let { bottom, width } = this.state;

        return (
            <View style={[{ bottom, width }, styles.barWrapper]}>
                <View
                    style={styles.bar}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            Keyboard.dismiss();
                            this.props.onDone();
                        }}
                    >
                        <Text style={styles.done}>{this.props.text}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bar} />
            </View>
        );
    }

    componentWillUnmount() {
        this.keyboardWillChangeFrameListener.remove();
    }
}
