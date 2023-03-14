import { useReducer, useState } from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'

const API_KEY = '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'

function Chatbot() {
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "Hello, I am your travel guide AI!",
            sender: "ChatGPT"
        }
    ]);


    const handleSend = async(message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: 'outgoing' //will show essage on the right
        }

        const newMessages = [...messages, newMessage] //this is adding newMessage to the old messages list

        //update the state message
        setMessages(newMessages);

        //set typing indication
        setTyping(true);

        //send the message to ChatGPT and recieve a response
        await handleChatGPTMessage(newMessages);

    }


    //function to handle communication with chatGPT
    const handleChatGPTMessage = async(chatMessages) => {
        //our format => { sender: "user"/"ChatGPT" , message: "This is the message" }
        //API format => { role: "user"/"assistant" , content: "This is the message" }

        //convert the current format to the API format by mapping over the object
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if(messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message }
        });


        //There are 3 types of roles that can be passed. 
        //1) user -> message from the user
        //2) assistant -> message from ChatGPT
        //3) system -> an initial message defining how we want ChatGPT to talk

        //set stytem
        const systemMessage = {
            role: "system",
            content: "Speak like a travel agent with 20 years of experience, be very clear about everything related to travel, and do not answer anything not related to travel."
        }


        //create an apiRequestBody to use for fetching
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }

        //fetch request
        await fetch('https://api.openai.com/v1/chat/completions', {

            method: "POST",

            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },

            body: JSON.stringify(apiRequestBody)

        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data);
            console.log(data.choices[0].message.content)
            setMessages(
                [ ...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT"
                }]
            );
            setTyping(false);
        });

    }


    return (
        <div style={{ position: 'relative', height: "800px", width: '700px'}}>
            <MainContainer>
                <ChatContainer>
                    <MessageList scrollBehavior='smooth' typingIndicator={typing ? <TypingIndicator content="Your travel AI is typing..."/> : null } >
                        {messages.map((message, index) => {  //itterate through everything stored in the message list
                            return <Message key={index} model={message} /> //give it a message model
                        })}
                    </MessageList>
                    <MessageInput placeholder="Type here..." onSend={handleSend}/>: {/* user input */}
                </ChatContainer>
            </MainContainer>
        </div>
    )
}

export default Chatbot;