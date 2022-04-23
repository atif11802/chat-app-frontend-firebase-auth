import React, { useEffect } from "react";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const FacebookLogin = () => {
	const provider = new FacebookAuthProvider();
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
				// The signed-in user info.
				const user = result.user;

				// This gives you a Facebook Access Token. You can use it to access the Facebook API.
				const credential = FacebookAuthProvider.credentialFromResult(result);
				const accessToken = credential.accessToken;

				user.getIdToken().then(async function (idToken) {
					await axios
						.post(
							"https://chatappserverratul.herokuapp.com/api/auth/facebooklogin",
							{},
							{
								headers: {
									"Content-Type": "application/json",
									Authorization: `Basic ${idToken}`,
								},
							}
						)
						.then((res) => {
							setToken(res.data);
						});
				});
			})
			.catch((error) => {
				console.error(error);
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.email;
				// The AuthCredential type that was used.
				const credential = FacebookAuthProvider.credentialFromError(error);

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
				colorScheme='facebook'
				size='lg'
				// height='48px'
				// width='200px'
				onClick={handleLogin}
				isFullWidth={true}
				border='1px'
				type='facebook'
			>
				Sign in With facebook
			</Button>
		</Box>
	);
};

export default FacebookLogin;
