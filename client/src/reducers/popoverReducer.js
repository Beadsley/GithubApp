const popoverReducer = (state = { message: undefined }, action) => {
  switch (action.type) {
    case 'UPDATE_MESSAGE':
      return {
        message: action.message,
      };

    default:
      return state;
  }
};

export default popoverReducer;
