import React from "react";
import { InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react";

const InputChat = ({ sendChatMessage, message, setMessage }) => {
	return (
		<div style={{}}>
			<InputGroup size='md'>
				<Input
					pr='4.5rem'
					type='text'
					placeholder='Type a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<InputRightElement width='4.5rem'>
					<Button
						colorScheme='teal'
						h='1.75rem'
						size='sm'
						onClick={sendChatMessage}
					>
						send
					</Button>
				</InputRightElement>
			</InputGroup>
		</div>
	);
};

export default InputChat;
