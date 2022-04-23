import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import "../styles/Chat.css";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

const Chat = () => {
	const [token, setToken] = useLocalStorage("token", "");
	const [users, setUsers] = useState([]);
	const [currentChat, setCurrentChat] = useState(undefined);

	const navigate = useNavigate();

	useEffect(() => {
		if (!token.user) {
			navigate("/login");
		}

		if (token.user) {
			const fetchUsers = async () => {
				const { data } = await axios.get(
					"https://chatappserverratul.herokuapp.com/api/user/getusers",
					{
						headers: {
							Authorization: `Bearer ${token.token}`,
						},
					}
				);
				setUsers(data);
			};

			fetchUsers();
		}
	}, [navigate, token]);

	const handleChat = (user) => {
		setCurrentChat(user);
	};

	return (
		<div className='chat'>
			<div className='chat-box'>
				<div className='chat-users'>
					<Contacts users={users} handleChat={handleChat} />
				</div>
				<div className='chat-messages'>
					{currentChat === undefined ? (
						<Welcome user={token.user.username} />
					) : (
						<ChatContainer currentChat={currentChat} user={token.user} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Chat;
