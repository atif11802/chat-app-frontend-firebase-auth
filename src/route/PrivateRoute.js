import { Navigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

function PrivateRoute({ children }) {
	const [token, setToken] = useLocalStorage("token", "");

	return token ? children : <Navigate to='/login' />;
}

export default PrivateRoute;
