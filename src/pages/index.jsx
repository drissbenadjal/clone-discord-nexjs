/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef, useContext } from 'react'
import { socket } from "@/utils/socket";
import { useRouter } from "next/router";
import Inputs from "@/components/Inputs";
import Commands from '@/components/Commands';
import { LoadingContext } from "@/context/LoadingContext";
import Notification from '@/components/notification/notification';

import SoundBoardIcon from '@/assets/icons/soundboard.svg'

const Home = () => {
    const { setLoading } = useContext(LoadingContext);
    const { push } = useRouter();
    const [messages, setMessages] = useState([]);
    const [last40Messages, setLast40Messages] = useState([]);
    const [usersConnected, setUsersConnected] = useState([]);
    const [soundBoardPopup, setSoundBoardPopup] = useState(false);
    const [error, setError] = useState()
    const chatBoxRef = useRef(null);

    const onSession = ({ sessionID, userID }) => {
        socket.auth = { sessionID };
        localStorage.setItem("sessionID", sessionID);
        socket.userID = userID;
    }

    const onMessage = (message) => {
        setMessages((oldMessages) => [...oldMessages, message]);
    }

    const getMessagesAtInit = (messagesAtInit) => {
        setMessages(messagesAtInit);
    }

    const scrollToBottom = () => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }

    const playSoundBoard = (command) => {
        socket.emit("message", { content: command });
    }

    const getUsersConnected = (users) => {
        setUsersConnected(users);
    }

    const onConnexionError = (error) => {
        console.log(error);
        localStorage.clear();
        push("/login");
    }

    const onError = ({ code, error }) => {
        let title = "";
        let content = "";

        switch (code) {
            case 100:
                title = `Erreur ${code} : Spam`;
                content = `Tu spam trop chefffff`;
                break;

            default:
                break;
        }

        setError({
            title,
            content
        })
    }

    useEffect(() => {
        const sessionID = localStorage.getItem("sessionID");

        if (sessionID) {
            socket.auth = { sessionID };
            socket.connect();
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } else if (localStorage.getItem("username")) {
            const username = localStorage.getItem("username");
            socket.auth = { username };
            socket.connect();
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } else {
            push("/login");
        }

        socket.on("error", onError);
        socket.on("session", onSession);
        socket.on("message", onMessage);
        socket.on("messages", getMessagesAtInit);
        socket.on("users", getUsersConnected);
        socket.on("connect_error", onConnexionError);

        return () => {
            socket.disconnect();
            socket.off("error", onError);
            socket.off("session", onSession);
            socket.off("message", onMessage);
            socket.off("messages", getMessagesAtInit);
            socket.off("users", getUsersConnected);
            socket.off("connect_error", onConnexionError);
        };
    }, []);

    useEffect(() => {
        setLast40Messages(messages.slice(Math.max(messages.length - 40, 0)));
    }, [messages]);

    useEffect(() => {
        scrollToBottom();
    }, [last40Messages]);


    useEffect(() => {
        const closePopup = (e) => {
            if (soundBoardPopup && !e.target.closest('.soundboard-popup') && !e.target.closest('.soundboard-btn')) {
                setSoundBoardPopup(false);
            }
        }

        window.addEventListener('click', closePopup);

        return () => {
            window.removeEventListener('click', closePopup);
        }
    }, [soundBoardPopup])

    return (
        <>
            {
                error && (
                    <Notification title={error.title} content={error.content} onClose={() => setError()} />
                )
            }
            <div className="container">
                <Commands />
                <div className='dm-list'>
                    <ul>
                        <li>
                            <img src="https://ui-avatars.com/api/?name=G" alt="avatar" draggable="false" />
                            <p className='name'>Salon Général</p>
                        </li>
                        <li>
                            <img src="https://ui-avatars.com/api/?name=Saku" alt="avatar" draggable="false" />
                            <p className='name'>Saku</p>
                        </li>
                    </ul>
                </div>
                <div className='chat-container'>
                    <div className='chat-title'>
                        <h2>
                            𝐺𝑒𝑛𝑒𝑟𝑎𝑙
                        </h2>
                    </div>
                    <div className='chat-box' ref={chatBoxRef}>
                        <div className='message header'>
                            <img src={`https://ui-avatars.com/api/?name=G`} alt="avatar" draggable="false" />
                            <div className='message-content'>
                                <h2>𝐺𝑒𝑛𝑒𝑟𝑎𝑙</h2>
                                <p>Bienvenue sur le salon 𝐺𝑒𝑛𝑒𝑟𝑎𝑙 !</p>
                            </div>
                        </div>
                        {
                            last40Messages.map((message, key) => {
                                return (
                                    <div key={key} className='message'>
                                        <img src={`https://ui-avatars.com/api/?name=${message.username}`} alt="avatar" draggable="false" />
                                        <div className='message-content'>
                                            <h2>{message.username}</h2>
                                            <p>{message.content}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='chat-input'>
                        <p className='typing'>
                            Saku is typing...
                        </p>
                        <Inputs />
                        <button className='soundboard-btn' onClick={() => setSoundBoardPopup(!soundBoardPopup)}>
                            <img src={`./assets/icons/soundboard.svg`} alt="soundboard" draggable="false" />
                        </button>
                        {
                            soundBoardPopup &&
                            <div className='soundboard-popup'>
                                <p className='title'>
                                    Soundboard
                                </p>
                                <ul>
                                    <li>
                                        <button onClick={() => playSoundBoard('/souhait')}>
                                            <p>/souhait</p>
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => playSoundBoard('/dormir')}>
                                            <p>/dormir</p>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
                <div className='user-online'>
                    <p className='title'>
                        Utilisateurs en ligne - {usersConnected.length}
                    </p>
                    <ul>
                        {usersConnected.map((user) => (
                            <li key={user.userID}>
                                <img src={`https://ui-avatars.com/api/?name=${user.username}`} alt="avatar" draggable="false" />
                                <p className='name'>{user.username}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Home;