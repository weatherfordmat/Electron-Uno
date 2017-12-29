const modal = (state = {
    open: false
  }, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
        return Object.assign({}, state, {
            open: !state.open
        });
    default:
      return state
    }
}

export default modal;