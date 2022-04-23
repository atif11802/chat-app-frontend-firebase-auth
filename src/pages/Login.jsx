import React from "react";
import FacebookLogin from "../components/FacebookLogin";
import GoogleLogin from "../components/GoogleLogin";
import PhoneAuth from "../components/PhoneAuth";
import { Container, Input, Stack } from "@chakra-ui/react";

const Login = () => {
	return (
		<Container>
			<GoogleLogin />
			<FacebookLogin />
			<PhoneAuth />
		</Container>
	);
};

export default Login;
