const LoginInitialState = {
  login: "Andri",
  id_admin: ""
};

export default function(state = LoginInitialState, action) {
  switch (action.type) {
    case "TES_ACTION":
      state = { ...state, id_admin: action.payload };
      break;
    default:
      state;
  }

  return state;
}
