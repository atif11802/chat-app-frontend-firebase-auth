import React, { useEffect } from "react";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
	const provider = new GoogleAuthProvider();
	const [token, setToken] = useLocalStorage("token", "");

	const navigate = useNavigate();

	useEffect(() => {
		if (token.user) {
			navigate("/chat");
		}
	}, [token]);

	const handleLogin = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				user.getIdToken().then(async function (idToken) {
					// axios.post("http://localhost:8000/api/user/googlelogin", {
					// 	headers: {
					// 		"Content-Type": "application/json",
					// 		Authorization: `Bearer ${idToken}`,
					// 	},
					// });
					const token = await idToken;
					axios
						.post(
							"http://localhost:8000/api/auth/googlelogin",
							{},
							{
								headers: {
									"Content-Type": "application/json",
									Authorization: `Basic ${token}`,
								},
							}
						)
						.then((res) => {
							setToken(res.data);
						});
				});
				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	};

	return (
		<Box
			w='100%'
			p={4}
			color='white'
			d='flex'
			justifyContent='center'
			alignItems='center'
		>
			<Button
				colorScheme='red'
				size='lg'
				border='2px'
				isFullWidth={true}
				onClick={handleLogin}
			>
				Sign in With google
			</Button>
		</Box>
	);
};

export default GoogleLogin;
