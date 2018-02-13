import fire from '../../conf/fire';
const logsRef = fire.database().ref().child('logs');

export function logExercise(exercise) {
    return dispatch => logsRef.push(exercise);
}