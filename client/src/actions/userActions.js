export const addUsername = (username) => {
  return {
    type: 'ADD_USERNAME',
    username,
  };
};

export const hasErrored = (message) => {
  return {
    type: 'ERROR',
    message,
  };
};
