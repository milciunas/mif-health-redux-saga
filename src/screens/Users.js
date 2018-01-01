import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getUsers } from '../state/actions/authActions';
import Modal from 'react-native-modal';

class Users extends Component {
  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array
  }

  constructor() {
    super();

    this.state = {
      showModal: false,
      user: null
    };
  }

  componentWillMount() {
    this.props.getUsers();
  }

  keyExtractor = (item) => item.uid;

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>{'Manage users'}</Text>
          </View>
        </View>
        {
          this.props.users ?
            <ScrollView contentContainerStyle={styles.scrollView}>
              <FlatList
                data={this.props.users}
                keyExtractor={this.keyExtractor}
                renderItem={({ item }) =>
                  <View>
                    <TouchableOpacity
                      key={item.uid}
                      style={styles.menuRow}
                      onPress={() => this.setState({
                        showModal: !this.state.showModal,
                        user: item
                      })}>
                      <Text>{item.email}</Text>
                    </TouchableOpacity>
                    <View style={styles.splitter} />
                  </View>
                }
              />
            </ScrollView> : null
        }
        <Modal isVisible={this.state.showModal} style={styles.bottomModal}>
          <View style={styles.modalContent}>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.buttonModal} onPress={this.manageUsers}>
                <Text style={styles.buttonText}>{'Delete user'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.buttonModal} onPress={this.manageUsers}>
                <Text style={styles.buttonText}>{'Make admin'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.buttonModal} onPress={this.manageUsers}>
                <Text style={styles.buttonText}>{'Regenerate workout'}</Text>
              </TouchableOpacity>
            </View>
            {this._renderButton('Close', () => this.setState({ showModal: false }))}
          </View>
        </Modal>
      </View>
    );
  }
}

const actionsToProps = {
  getUsers
};

const mapStateToProps = state => ({
  users: state.admin.users
});

export default connect(mapStateToProps, actionsToProps)(Users);

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  scrollView: {
    paddingVertical: 20,
    paddingTop: 0
  },
  splitter: {
    borderBottomWidth: 1,
    borderColor: 'rgba(8,8,8,0.2)',
    marginLeft: 10,
    marginRight: 10
  },
  header: {
    borderBottomWidth: 1,
    borderColor: 'rgba(8,8,8,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    minHeight: 50
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center'
  },
  headerTextContainer: {
    flex: 1
  },
  menuRow: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  button: {
    backgroundColor: 'rgba(8,8,8,0.1)',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonModal: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'rgba(8,8,8,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#2196F3',
    padding: 10
  }
});
