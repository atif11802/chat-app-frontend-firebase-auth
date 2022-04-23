import React from "react";
import FacebookLogin from "./components/FacebookLogin";
import GoogleLogin from "./components/GoogleLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import PrivateRoute from "./route/PrivateRoute";
import SIgnin from "./components/SIgnin";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SIgnin />} />
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
