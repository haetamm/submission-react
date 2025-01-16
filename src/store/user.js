const token = localStorage.getItem("accessToken");

const DEFAULT_STATE = {
  token: token || "",
  name: "",
  img_url: "",
};

export const userReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload.token };
    case "SET_USER":
      return {
        ...state,
        name: action.payload.name,
        img_url: action.payload.img_url,
      };
    case "LOGOUT":
      return {
        token: "",
        name: "",
        img_url: "",
      };
    default:
      return state;
  }
};
