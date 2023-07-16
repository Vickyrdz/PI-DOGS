import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_BY_ID = "GET_DOG_BY_ID";
export const GET_DOG_BY_ID_ERROR = "GET_DOG_BY_ID_ERROR";

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
    try {
      const { data } = await axios(`http://localhost:3001/dogs/${id}`); 

      return dispatch({
        type: GET_DOG_BY_ID,
        payload: data,
      });
    } catch (error) {
      return dispatch({ type: GET_DOG_BY_ID_ERROR });
    }
  }
}