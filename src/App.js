import React from "react";
import FacebookLogin from "./components/FacebookLogin";
import GoogleLogin from "./components/GoogleLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import PrivateRoute from "./route/PrivateRoute";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route
					path='/chat'
					element={
						<PrivateRoute>
							<Chat />
						</PrivateRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
