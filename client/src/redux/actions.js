import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_BY_ID = "GET_DOG_BY_ID";
export const GET_DOG_BY_ID_ERROR = "GET_DOG_BY_ID_ERROR";
export const FIND_DOGS_BY_NAME = "FIND_DOGS_BY_NAME";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS"; 
export const CHANGE_FILTER = "CHANGE_FILTER"; 
export const RESET_FILTER = "RESET_FILTER"; 
export const CHANGE_ORDER = "CHANGE_ORDER"; 
export const CREATE_DOG = "CREATE_DOG";  
export const CHANGE_LOADING = "CHANGE_LOADING"; 

export const getAllDogs = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("http://localhost:3001/dogs"); // /dogs lo tiene desde rutas hecho con el controller

      return dispatch({
        type: GET_ALL_DOGS,
        payload: data,
      });
    } catch (error) {
      alert("Not Found");
    }
  };
}; 

export const getDogById = (id) => {
  return async (dispatch) => {
    try {      const { data } = await axios(`http://localhost:3001/dogs/${id}`); 

      return dispatch({
        type: GET_DOG_BY_ID,
        payload: data,
      });
    } catch (error) {
      return dispatch({ type: GET_DOG_BY_ID_ERROR });
    }
  }
}

export const findDogsByName = (searchCriteria) => {
  return async (dispatch) => {
    try {
      const { data } = await axios("http://localhost:3001/dogs/", {
        params: {
          name: searchCriteria,
        }
      });
      return dispatch({
        type: FIND_DOGS_BY_NAME,
        payload: {
          searchCriteria,
          data,
        },
      });
    } catch (error) {
      console.log({ error });
      alert("Not Found");
    }
  };
}; 

export const getAllTemperaments = () => {
  return async (dispatch) => {
    try {      const { data } = await axios("http://localhost:3001/temperaments");

      return dispatch({
        type: GET_ALL_TEMPERAMENTS,
        payload: data,
      });

    } catch (error) {
      
    }
  }
};

export const changeFilters = (newFilters) => {
  return (dispatch) => {
    return dispatch({
      type: CHANGE_FILTER,
      payload: newFilters,
    });
  }
}

export const resetFilters = () => {
  return (dispatch) => {
    return dispatch({
      type: RESET_FILTER,
    });
  }
}


export const changeOrder = (order) => {
  return {
     type: CHANGE_ORDER,
     payload: order 
  }
};

export const createNewDog = (newDogData, onDogCreated) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('http://localhost:3001/dogs', newDogData);
      onDogCreated(data.id);
      return dispatch({
        type: CREATE_DOG,
        payload: data
      });
    } catch (error) {
      throw new Error('error')
    }
  };
}

export const changeLoading = (newLoadingValue) => {
  return (dispatch) => {
    return dispatch({
      type: CHANGE_LOADING,
      payload: newLoadingValue,
    });
  }
}