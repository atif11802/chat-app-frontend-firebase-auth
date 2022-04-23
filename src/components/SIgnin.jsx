import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SIgnin = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/chat");
	});

	return <div>SIgnin</div>;
};

export default SIgnin;
