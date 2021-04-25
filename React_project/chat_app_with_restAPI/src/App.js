import { ChatEngine } from 'react-chat-engine';

import ChatFeed from './components/ChatFeed'

import './App.css';

const App = () => {
    return (
        <ChatEngine 
            height='100vh'
            projectID='0575def2-ae10-4994-b26a-7454611982d2'
            userName='Acc1'
            userSecret='3614329sS'
            renderChatFeed={(ChatAppProps) => <ChatFeed {...ChatAppProps}/>}
        />
    );
}

export default App;