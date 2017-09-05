import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, View } from 'react-native';

import DashboardHeader from '../components/DashboardHeader';
import MiniKeg from '../components/MiniKeg';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    width: '100%',
  },
  list: {
    flexGrow: 1,
  },
});

class Dashboard extends Component {
  static listKeyExtractor(item) {
    return item.id;
  }

  static renderItem({ item }) {
    return (
      <MiniKeg
        onPress={() => this.onPressItem(item.id)}
        {...item}
      />
    );
  }

  // TODO: Implement
  static onPressItem(/* itemId */) {
  }

  render() {
    const { kegs } = this.props;

    return (
      <View style={styles.container}>
        <DashboardHeader />
        <FlatList
          data={kegs}
          keyExtractor={Dashboard.listKeyExtractor}
          renderItem={Dashboard.renderItem}
          style={styles.list}
        />
      </View>
    );
  }
}

Dashboard.propTypes = {
  kegs: PropTypes.arrayOf(PropTypes.shape({
    capacity: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
  })).isRequired,
};

const mapStateToProps = () => ({
  kegs: [{
    capacity: 5,
    id: 1,
    name: 'Silly Keggy',
    volume: 3.5,
  }, {
    capacity: 5,
    id: 2,
    name: 'Monster Corn',
    volume: 0.5,
  }],
});

export default connect(mapStateToProps)(Dashboard);

