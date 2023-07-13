import { GET_ALL_DOGS, GET_DOG_BY_ID, GET_DOG_BY_ID_ERROR } from "./actions";

const initialState = {
  allDogs: [],   
  dogDetail: {}, 
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_ALL_DOGS:
      return {
        ...state,
        allDogs: action.payload,
      };

    case GET_DOG_BY_ID:
      return {
        ...state,
        dogDetail: action.payload,
        dogDetailError: false
      };
    case GET_DOG_BY_ID_ERROR:
      return {
        ...state,
        dogDetailError: true,
      };
      
    default:
      return {
        allDogs: [],
        dogDetail: null,
        dogDetailError: false,
      }
    }
}

export default rootReducer;
