import React from "react";
import "../styles/Welcome.css";
import WelcomeLogo from "../assessts/AS002803_15.gif";

const Welcome = ({ user }) => {
	return (
		<div className='welcome'>
			<div className='welcome__greet'>
				<h1>Welcome {user} to Chat App</h1>
			</div>
			<img src={WelcomeLogo} alt='welcome logo' />
		</div>
	);
};

export default Welcome;
