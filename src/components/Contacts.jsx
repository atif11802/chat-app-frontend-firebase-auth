import React, { useState } from "react";
import "../styles/Contact.css";

const Contacts = ({ users, handleChat }) => {
	const [currentSelected, setCurrentSelected] = useState(undefined);

	const changeCurrentChat = (index, user) => {
		setCurrentSelected(index);
		handleChat(user);
	};

	return (
		<div>
			{users?.map((user, i) => (
				<div
					key={user._id}
					onClick={() => changeCurrentChat(i, user)}
					className={`contact ${i === currentSelected ? "selected" : ""}`}
				>
					<h1>{user.name}</h1>
				</div>
			))}
		</div>
	);
};

export default Contacts;
