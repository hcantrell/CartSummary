import * as React from 'react';
import { Alert, Text, TextInput, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { connect } from 'react-redux';
import Tooltip from 'react-native-walkthrough-tooltip';

import { loadPurchase } from '../reducers/PurchaseReducer';
import { promoCodeChange } from '../reducers/PromoCodeReducer';

class PurchaseSummary extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showDetails: false,
            showPromo: false,
            toolTipVisible: false
        };
    }

    componentDidMount() {
        this._loadPricingData();
    }

    _loadPricingData() {
        this.props.loadPurchase(this.props.promoCode);
    }

    _onApplyPromoCode() {
        this._loadPricingData();
    }

    _onToggleDetails() {
        this.setState({
            showDetails: !this.state.showDetails
        });
    }

    _onTogglePromoCode() {
        this.setState({
            showPromo: !this.state.showPromo
        });
    }

    _renderDiscount() {
        if (this.props.purchases.pricing.discount != undefined && this.props.purchases.pricing.discount != 0) {
            return (
                <View style={styles.sectionRow}>
                    <Text style={styles.sectionTitle}>Promo savings</Text>
                    <Text style={[styles.sectionAmount, { color: '#ff0000', fontWeight: 'bold' }]}>-${this.props.purchases.pricing.discount == undefined ? 0.00 : this.props.purchases.pricing.discount.toFixed(2)}</Text>
                </View>
            );
        }
        return null;
    }

    _renderDetails() {
        if (this.state.showDetails) {
            return (
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        accessibilityRole={'button'}
                        onPress={() => this._onToggleDetails()}
                        style={styles.sectionRow}>
                        <Text style={styles.expander}>Hide item details</Text>
                        <Text style={styles.expanderSym}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.rowContainer}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={{ uri: this.props.purchases.itemDetails.image }}
                        />
                        <Text style={{ flex: 1, paddingStart: 10 }}>{this.props.purchases.itemDetails.item_name}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={{ flex: 1, fontWeight: "bold", paddingStart: 60 }}>${this.props.purchases.itemDetails.price == undefined ? 0.00 : this.props.purchases.itemDetails.price.toFixed(2)}</Text>
                        <Text style={{ flex: 1, textAlign: "right" }}>Qty: {this.props.purchases.itemDetails.quantity}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={{ flex: 1, paddingStart: 60, color: '#999999', fontWeight: "bold", textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>${this.props.purchases.itemDetails.originalPrice == undefined ? 0.00 : this.props.purchases.itemDetails.originalPrice.toFixed(2)}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <TouchableOpacity
                    accessibilityRole={'button'}
                    onPress={() => this._onToggleDetails()}
                    style={styles.sectionRow}>
                    <Text style={styles.expander}>See item details</Text>
                    <Text style={styles.expanderSym}>+</Text>
                </TouchableOpacity>
            );
        }
    }

    _renderPromo() {
        if (this.state.showPromo) {
            return (
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        accessibilityRole={'button'}
                        onPress={() => this._onTogglePromoCode()}
                        style={styles.sectionRow}>
                        <Text style={styles.expander}>Hide promo code</Text>
                        <Text style={styles.expanderSym}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.rowContainer}>
                        <Text style={{ flex: 1, color: '#666666' }}>Promo code</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <TextInput
                            style={styles.promoInput}
                            placeholder=""
                            autoCapitalize="characters"
                            onChangeText={(promoCode) => { this.props.promoCodeChange(promoCode); }}
                            value={this.props.promoCode} />
                        <TouchableOpacity
                            onPress={() => this._onApplyPromoCode()}
                            style={styles.button}>
                            <Text style={{ lineHeight: 26 }}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            return (
                <TouchableOpacity
                    accessibilityRole={'button'}
                    onPress={() => this._onTogglePromoCode()}
                    style={styles.sectionRow}>
                    <Text style={styles.expander}>Apply promo code</Text>
                    <Text style={styles.expanderSym}>+</Text>
                </TouchableOpacity>
            );
        }
    }

    render() {
        return (
            <Card>
                <View style={styles.container}>
                    <View style={styles.sectionRow}>
                        <Text style={styles.sectionTitle}>Subtotal</Text>
                        <Text style={styles.sectionAmount}>${this.props.purchases.pricing.subtotal == undefined ? 0.00 : this.props.purchases.pricing.subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.sectionRow}>
                        <Tooltip
                            arrowSize={{ width: 16, height: 8 }}
                            backgroundColor="rgba(0,0,0,0)"
                            isVisible={this.state.toolTipVisible}
                            content={<Text>{'Picking up your order in the\nstore helps cut costs, and we\npass the savings on to you.'}</Text>}
                            placement="bottom"
                            onClose={() => this.setState({ toolTipVisible: false })}>
                            <TouchableOpacity
                                accessibilityRole={'button'}
                                onPress={() => this.setState({ toolTipVisible: true })}>
                                <Text style={[styles.sectionTitle, styles.underline, { zIndex: 1 }]}>Pickup savings</Text>
                            </TouchableOpacity>
                        </Tooltip>
                        <Text style={[styles.sectionAmount, { color: '#ff0000', fontWeight: 'bold' }]}>-${this.props.purchases.pricing.savings == undefined ? 0.00 : this.props.purchases.pricing.savings.toFixed(2)}</Text>
                    </View>
                    {this._renderDiscount()}
                    <View style={styles.sectionRow}>
                        <Text style={styles.sectionTitle}>{'Est. taxes & fees\n(Based on '}{this.props.purchases.pricing.zip}{')'}</Text>
                        <Text style={styles.sectionAmount}>${this.props.purchases.pricing.tax == undefined ? 0.00 : this.props.purchases.pricing.tax.toFixed(2)}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.sectionRow}>
                        <Text style={styles.totalTitle}>Est. total</Text>
                        <Text style={styles.totalAmount}>${this.props.purchases.pricing.total == undefined ? 0.00 : this.props.purchases.pricing.total.toFixed(2)}</Text>
                    </View>
                    {this._renderDetails()}
                    <View style={styles.separator} />
                    {this._renderPromo()}
                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
        padding: 16
    },
    toggleContainer: {
    },
    rowContainer: {
        flexDirection: 'row'
    },
    sectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 6,
        paddingBottom: 6
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#000000',
    },
    sectionAmount: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
    },
    promoInput: {
        flex: 1,
        height: 30,
        borderColor: '#dddddd',
        borderWidth: 1,
        marginEnd: 8,
        paddingStart: 5
    },
    totalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        lineHeight: 30,
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        lineHeight: 30,
    },
    expander: {
        fontSize: 14,
        color: '#000000',
        lineHeight: 34,
        textDecorationLine: 'underline'
    },
    expanderSym: {
        flex: 1,
        fontSize: 28,
        color: '#000000',
        lineHeight: 30,
        paddingStart: 6,
    },
    underline: {
        textDecorationLine: 'underline'
    },
    separator: {
        flexDirection: 'row',
        backgroundColor: '#dddddd',
        height: 1,
        marginTop: 10,
        marginBottom: 10
    },
    button: {
        height: 30,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 15,
        paddingStart: 10,
        paddingEnd: 10
    },
    tooltip: {
        fontSize: 10,
        zIndex: 2
    }
});

const mapStateToProps = (state) => {
    return {
        promoCode: state.promoCode.value,
        purchases: state.purchases.value
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPurchase: (promoCode) => dispatch(loadPurchase(promoCode)),
        promoCodeChange: (promoCode) => dispatch(promoCodeChange(promoCode))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseSummary);
