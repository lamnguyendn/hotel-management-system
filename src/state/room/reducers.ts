export const roomReducers = (state = [], action: { data?: any; type: string }): any => {
  const { type, data } = action;
  switch (type) {
    case 'FETCHING_FILMS_SUCCESS':
      return data;
    default:
      return state;
  }
};
