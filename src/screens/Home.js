import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserWorkout } from '../state/actions/authActions';
import Exercises from './Exercises';
import CalendarStrip from 'react-native-calendar-strip';

class HomeScreen extends Component {
  static propTypes = {
    exercises: PropTypes.array,
    loading: PropTypes.bool,
    fetchUserWorkout: PropTypes.func
  }

  constructor() {
    super();

    this.state = {
      shouldRender: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        shouldRender: true
      });
    }, 3000);
  }

  dateSelected = (date) => {
    const day = date.day();

    if (day) {
      this.props.fetchUserWorkout(day);
    }
  }

  render() {
    return (
      <View style={styles.screen}>
        <CalendarStrip
          style={{ height: 75 }}
          calendarAnimation={{ type: 'sequence', duration: 100 }}
          calendarHeaderStyle={{ color: 'white' }}
          calendarColor={'#2196F3'}
          dateNumberStyle={{ color: 'white' }}
          dateNameStyle={{ color: 'white' }}
          highlightDateNumberStyle={{ color: 'white' }}
          highlightDateNameStyle={{ color: 'white' }}
          disabledDateNameStyle={{ color: 'black' }}
          disabledDateNumberStyle={{ color: 'black' }}
          maxDayComponentSize={48}
          iconContainer={{ flex: 0.1 }}
          daySelectionAnimation={{
            type: 'border',
            duration: 40,
            borderWidth: 1,
            borderHighlightColor: 'white'
          }}
          onDateSelected={this.dateSelected}
        />
        {
          this.props.loading || !this.state.shouldRender ?
            <ActivityIndicator
              animating={true}
              size='large'
              style={styles.loadingIncidator}
              color='#2196F3'
            /> :
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.container}>
              <Exercises exercises={this.props.exercises} loading={this.props.loading}/>
            </ScrollView>
        }
      </View>
    );
  }
}

const actionsToProps = {
  fetchUserWorkout
};

const mapStateToProps = state => ({
  exercises: state.auth.exercises,
  loading: state.auth.loading
});

export default connect(mapStateToProps, actionsToProps)(HomeScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  loadingIncidator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
