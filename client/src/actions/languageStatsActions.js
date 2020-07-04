export const hasErrored = (boolean) => {
  return {
    type: 'HAS_ERRORED',
    errored: boolean,
  };
};
