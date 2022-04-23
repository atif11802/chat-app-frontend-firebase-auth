import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
	Button,
	Container,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
} from "@chakra-ui/react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const PhoneAuth = () => {
	const [number, setNumber] = useState("");
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [sentOtp, setSentOtp] = useState(false);
	const [phoneVerified, setPhoneVerified] = useState(false);
	const [token, setToken] = useLocalStorage("token", "");

	const [otp, setOtp] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		if (token.user) {
			navigate("/chat");
		}
	}, [token]);

	const generateRecaptcha = () => {
		window.recaptchaVerifier = new RecaptchaVerifier(
			"recaptcha",
			{
				size: "invisible",
				callback: (response) => {
					// reCAPTCHA solved, allow signInWithPhoneNumber.
				},
			},
			auth
		);
	};

	const handleAuth = () => {
		if (number.length > 10 && name && email && password) {
			generateRecaptcha();
			const appVerifier = window.recaptchaVerifier;
			signInWithPhoneNumber(auth, "+" + number, appVerifier)
				.then((confirmationResult) => {
					// SMS sent. Prompt user to type the code from the message, then sign the
					// user in with confirmationResult.confirm(code).
					window.confirmationResult = confirmationResult;
					setSentOtp(true);
					console.log(confirmationResult);
					// ...
				})
				.catch((error) => {
					// Error; SMS not sent
					console.error("Error", error);
					window.localStorage.removeItem("_grecaptcha");

					// ...
				});
		}
	};

	const handleOtp = () => {
		if (otp.length === 6) {
			let confirmationResult = window.confirmationResult;

			confirmationResult
				.confirm(otp)
				.then((result) => {
					// User signed in successfully.
					const user = result.user;
					console.log(user);
					setPhoneVerified(true);
					// ...
				})
				.catch((error) => {
					// User couldn't sign in (bad verification code?)
					// ...
				});
		}
	};

	const handliSignUp = () => {
		axios
			.post("https://chatappserverratul.herokuapp.com/api/auth/signup", {
				name,
				email,
				password,
				number,
				verified: phoneVerified,
			})
			.then((res) => {
				setToken(res.data);
			});
	};

	return (
		<>
			<Container maxW='lg' color='black' centerContent>
				<Stack spacing={2}>
					<Input
						placeholder='name'
						size='md'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						placeholder='email'
						size='md'
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<InputGroup size='md'>
						<Input
							pr='4.5rem'
							type={show ? "text" : "password"}
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<InputRightElement width='4.5rem'>
							<Button h='1.75rem' size='sm' onClick={handleClick}>
								{show ? "Hide" : "Show"}
							</Button>
						</InputRightElement>
					</InputGroup>

					{sentOtp ? (
						<Stack>
							{!phoneVerified && (
								<Input
									placeholder='otp'
									size='md'
									value={otp}
									onChange={(e) => setOtp(e.target.value)}
								/>
							)}

							{!phoneVerified && (
								<Button colorScheme='cyan' onClick={handleOtp}>
									Verify otp
								</Button>
							)}
						</Stack>
					) : (
						<Stack>
							<PhoneInput
								country={"bd"}
								// value={number}
								onChange={(phone) => setNumber(phone)}
							/>
							<Button colorScheme='cyan' onClick={handleAuth}>
								Send OTP
							</Button>
						</Stack>
					)}
					{phoneVerified && (
						<Button colorScheme='cyan' onClick={handliSignUp}>
							signUp
						</Button>
					)}
				</Stack>
				<div id='recaptcha'></div>
			</Container>
		</>
	);
};

export default PhoneAuth;
