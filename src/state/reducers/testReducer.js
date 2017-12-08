import { Record, List } from 'immutable';
import { FETCH_TEST, LOGIN_EMAIL, SIGN_UP_EMAIL } from '../actions/actionTypes';

const initialState = Record({
  exercises: List()
});

const Exercise = Record({
  id: null,
  description: null,
  level: null,
  muscle: null,
  name: null,
  reps: null,
  sets: null,
  type: null,
  image: null
});

function setExercises(state, exercises) {
  let stateExercises = state.get('exercises');

  if (exercises) {
    for (let i = 0; i < exercises.length; i++) {
      const exerciseIndex = exercises
        .findIndex(exercise => 
          stateExercises.get('id') === exercises[i].id
        );
      
      if (exerciseIndex >= 0) {
        stateExercises = stateExercises.update(exerciseIndex, function() {
          return new Exercise(exercises[i]);
        });
      } else {
        stateExercises = stateExercises.push(new Exercise(exercises[i]));
      }
    }
  }

  stateExercises = stateExercises.sortBy(a => a.id);

  return state.set('exercises', stateExercises);
}

export default function(state = new initialState(), action) {
  switch (action.type) {
    case FETCH_TEST.REQUESTED:
      return state;
    case FETCH_TEST.SUCCESS:
      return setExercises(state, action.exercises);
    case FETCH_TEST.ERROR:
      return state;
    default:
      return state;
  }  
}
