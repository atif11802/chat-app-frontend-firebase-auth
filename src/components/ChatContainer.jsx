import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Chatcontainer.css";
import InputChat from "./Input";
import useLocalStorage from "../hooks/useLocalStorage";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import ScrollableFeed from "react-scrollable-feed";

let socket;

const ChatContainer = ({ currentChat, user }) => {
	const [message, setMessage] = useState("");
	const [token, setToken] = useLocalStorage("token", "");
	const [messages, setMessages] = useState([]);

	let ENDPOINT = "https://chatappserverratul.herokuapp.com/";

	useEffect(() => {
		socket = io(ENDPOINT);
		socket.emit("join", { currentChat, user }, (error) => {
			if (error) {
				alert(error);
			}
		});
		socket.on(`${currentChat.name}`, ({ user, message }) => {
			if (user._id === token.user._id) {
				setMessages((messages) => [
					...messages,
					{
						message,
						sender: user._id,
					},
				]);
			}
		});
	}, [currentChat]);

	useEffect(() => {
		const fetchchats = async () => {
			const res = await axios.post(
				"https://chatappserverratul.herokuapp.com/api/chat/getChat",
				{
					sender: user._id,
					to: currentChat._id,
				},
				{
					headers: {},
				}
			);
			setMessages(res.data.messages);
		};
		fetchchats();

		return () => {
			socket.disconnect();
			socket.off();
		};
	}, [currentChat]);

	const sendChatMessage = () => {
		axios.post("https://chatappserverratul.herokuapp.com/api/chat/postChat", {
			message: message,
			sender: user._id,
			to: currentChat._id,
		});
		socket.emit("message", { currentChat, user, message });

		setMessage("");
	};

	console.log(messages);

	return (
		<div className='chatContainer'>
			<div className='chatMessage'>
				<ScrollableFeed>
					{messages?.map((message, i) => {
						return (
							<div
								key={i}
								className={
									message.sender === token.user._id
										? "chatContainer__to"
										: "chatContainer__from"
								}
							>
								{message.message}
							</div>
						);
					})}
				</ScrollableFeed>
			</div>

			{/* <div className='chatContainer__from'>ratul</div>
			<div className='chatContainer__to'>sharna</div>
			<div className='chatContainer__from'>ratul</div>
			<div className='chatContainer__to'>sharna</div> */}
			<InputChat
				sendChatMessage={sendChatMessage}
				message={message}
				setMessage={setMessage}
			/>
		</div>
	);
};

export default ChatContainer;
