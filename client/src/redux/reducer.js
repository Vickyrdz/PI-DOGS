import { 
  GET_ALL_DOGS, 
  GET_DOG_BY_ID, 
  GET_DOG_BY_ID_ERROR,
  FIND_DOGS_BY_NAME,
  GET_ALL_TEMPERAMENTS,
  CHANGE_FILTER,
  RESET_FILTER,
  CHANGE_PRIMARY_ORDER,
  CHANGE_SECONDARY_ORDER
} from "./actions";

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
    case FIND_DOGS_BY_NAME:
      return {
        ...state,
        search: action.payload.searchCriteria,
        dogsByName: action.payload.data,
      };
    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        getTemperaments: action.payload, 
      };
    case CHANGE_FILTER: 
      return {
        ...state,
        currentFilter: action.payload,
      };
    case RESET_FILTER:
      return {
        ...state,
        currentFilter: {
          tempName: 'ALL',
          origin: 'ALL',
        },
      }; 
    case CHANGE_PRIMARY_ORDER:
      return {
        ...state,
        primaryOrder: action.payload,
      };
    case CHANGE_SECONDARY_ORDER:
      return {
        ...state,
        secondaryOrder: action.payload,
      };
  
    default:
      return {
        allDogs: [],
        dogsByName: [],
        search: null,
        dogDetail: null,
        dogDetailError: false,
        getTemperaments: [],
        currentFilter: {
          tempName: 'ALL',
          source: 'ALL',
        },
        primaryOrder: "A-Z",
        secondaryOrder: "LIGHTER",
      }
    }
}

export default rootReducer;
