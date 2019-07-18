import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import PurchaseSummary from './components/PurchaseSummary';
import configureStore from './Store';

const store = configureStore();

const App = () => {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <PurchaseSummary />
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#ecf0f1',
        padding: 8
    }
});

export default App;
