import fire from '../../conf/fire';
const logsRef = fire.database().ref().child('logs');

export function logExercise(exercise) {
    return dispatch => logsRef.push(exercise);
}

export function retrieveLatestByType(type) {
    return dispatch => {
        logsRef.orderByChild('type').equalTo(type).on('value', (snap) => {
            console.log(snap.val());
            var keys = Object.keys(snap.val()||{});
            var lastIdInSnapshot = keys[keys.length-1];
            if (lastIdInSnapshot) {
                logsRef.orderByKey().startAt(lastIdInSnapshot).on('child_added', (newSnap) => {
                    if (snap.key === lastIdInSnapshot) {
                        return;
                    }
                    dispatch({
                        type: 'GET_RECENT_EXERCISE',
                        payload: { weight: newSnap.val().weight, unit: newSnap.val().unit, reps: newSnap.val().reps }
                    })
                    console.log(newSnap.val())
                })
            } else {
                dispatch({
                    type: 'GET_RECENT_EXERCISE',
                    payload: { weight: 45, unit: 'lbs', reps: 8 }
                })
            }
            

        })
    }
}