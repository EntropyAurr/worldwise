import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/FakeAuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/" replace />;
  // isAuthenticated = false in 2 cases: when the page is first rendered & wrong email/passsword

  return children;
}

export default ProtectedRoute;
