import fire from '../../conf/fire';
const exercisesRef = fire.database().ref().child('exercises');
const logsRef = fire.database().ref().child('logs');

function mapExerciseToKey(list) {
    let exercises = [];
    if (list) {
        Object.keys(list).forEach(key => {
            exercises.push(Object.assign({ key: key }, list[key]));
        })
    }
    return exercises;
}

export function fetchExercises(key) {
    return (
        dispatch => {
            if (key) {
                exercisesRef.orderByChild('type').equalTo(key).on('value', (snap) => {
                    dispatch({
                        type: 'GET_EXERCISES',
                        payload: mapExerciseToKey(snap.val())
                    });
                });
            } else {
                exercisesRef.on('value', snap => {
                    dispatch({
                        type: 'GET_EXERCISES',
                        payload: mapExerciseToKey(snap.val())
                    });
                });
            }
        }
    )
}

export function setExerciseDetail(exercise) {
    console.log('exercise --->', exercise);
    return dispatch => {
        logsRef.orderByChild('type').equalTo(parseInt(exercise.type, 10)).on('value', (snap) => {
            console.log(snap.val());
            var keys = Object.keys(snap.val()||{});
            var lastIdInSnapshot = keys[keys.length-1];
            if (lastIdInSnapshot) {
                logsRef.orderByKey().startAt(lastIdInSnapshot).on('child_added', (newSnap) => {
                    if (snap.key === lastIdInSnapshot) {
                        return;
                    }
                    dispatch({
                        type: 'GET_EXERCISE_DETAIL',
                        payload: { ...exercise, weight: newSnap.val().weight, unit: newSnap.val().unit, reps: newSnap.val().reps }
                    })
                    console.log(newSnap.val())
                })
            } else {
                dispatch({
                    type: 'GET_EXERCISE_DETAIL',
                    payload: { ...exercise, weight: 45, unit: 'lbs' }
                })
            }
            

        })
    }
}

export function createExercise(exercise) {
    return (
        dispatch => {
            exercisesRef.push(exercise).then(
                () => {
                    dispatch({
                        type: 'ADD_EXERCISE_FULLFILLED',
                    });
                }).catch((error) => {

                });
        }
    )
}

export function deleteExercise(key) {
    return (
        dispatch => {
            exercisesRef.child(key).remove();
        }
    )
}

export function fetchExercise(key) {
    
    return dispatch => exercisesRef.orderByKey().equalTo(key).on('child_added', (snap) => {
        const exercise = Object.assign({}, snap.val(), { key: key });
        dispatch({
            type: 'GET_EXERCISE',
            payload: exercise
        })
    });
}

export function updateExercise(exercise) {
    return (
        dispatch => {
            exercisesRef.child(exercise.key).update(exercise).then(
                () => {
                    dispatch({
                        type: 'EDIT_EXERCISE_FULLFILLED',
                        payload: exercise
                    });
                }).catch((error) => {

                });
        }
    )
}