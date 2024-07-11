import { ChatEngine } from 'react-chat-engine';

import './Chatroom.css';
import LoginFrom from '../../components/LoginForm';
import ChatFeed from '../../components/ChatFeed';


const Chatroom= () => {
    if(!localStorage.getItem('username')) return <LoginFrom/>
    return (
        <ChatEngine
            height="100vh"
            projectID="a2b62aaa-34ed-4aba-aa8e-b8aefb49697a"
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed = {(chatAppProps) => <ChatFeed {...chatAppProps}/>}
        />
    );
}

export default Chatroom;