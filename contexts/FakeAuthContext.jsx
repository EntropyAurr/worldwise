import { createContext, useContext, useReducer } from "react";

// 1. Create Context object: contains data that been shared between components
const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Aurora",
  email: "entropy.au@gmail.com",
  password: "aurora",
  avatar: "/avatar.jpg",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error("Unknown action type!");
  }
}

// 2. Create parent component that wraps child components with a Provider. Any component that is a child of the Provider component can access that shared data
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);
  // useReducer returns an array of 2 values: the current state and dispatch function that lets you update the state to a different value and trigger a re-render

  // Update UI
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}

// 3. Consume the Context
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("AuthContxet is used outside of AuthProvider.");
  return context;
}

export { AuthProvider, useAuth };
