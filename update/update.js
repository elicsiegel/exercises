const update = (state = {}, action) => {
  
  if (typeof action.hasOwnProperty !== 'function') {
    return Object.assign({}, state, deepDup(action, "$set"));
  }
  if (action.hasOwnProperty('$push')) {
    return state.concat(action['$push'])
  } else if (action.hasOwnProperty('$unshift')){
    return action['$unshift'].concat(state);
  }
  else if (action.hasOwnProperty('$splice')){
    let arr = action['$splice'][0]
    state.splice(arr[0], arr[1], arr[2])
    return state
  } else if (action.hasOwnProperty('$merge')) {
    return Object.assign(state, action['$merge'])
  } else if (action.hasOwnProperty('$set')) {
    return action['$set']
  } else if (action.hasOwnProperty('$apply')) {
    return action['$apply'](state)
  }
  else {
    return Object.assign({}, state, deepDup(action, "$set"));
  }
};

var deepDup = function(obj, label) {
  let deepCopy = {};
  
  for(var property in obj) {
    if (property === label) {
      return obj[property];
    }
    else if (typeof obj[property] === "object") {
      deepCopy = Object.assign({}, { [property]: deepDup(obj[property], label)} )
    } else {
      deepCopy = Object.assign(deepCopy, obj[property])
    }
  }
  
  return deepCopy;
}

module.exports = update;