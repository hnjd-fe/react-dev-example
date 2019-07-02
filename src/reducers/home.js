
const initState = {
  sync: null,
  async: null
}

export const home = (state = initState, action) => {
  switch (action.type) {
    case 'SET_SYNC':
      return {
        ...state,
        async: action.sync
      }
    case 'SET_ASYNC':
      return {
        ...state,
        async: action.async
      }
    default:
      return state
  }
}
