import { useEffect, useState } from "react";
import { socket } from "@/utils/socket";

const Commands = () => {

    const [sounds, setSounds] = useState({});

    useEffect(() => {
        setSounds({
            souhait: new Audio("./sounds/souhait.mp3"),
            dormir: new Audio("./sounds/dormir.mp3"),
            skype: new Audio("./sounds/skype.mp3"),
            whatsapp: new Audio("./sounds/whatsapp.mp3"),
        })
    }, [])

    useEffect(() => {
        const command = (command) => {
            console.log("on command", command)

            switch (command) {
                case '/souhait':
                    sounds.souhait.play();
                    break;

                case '/dormir':
                    sounds.dormir.play();
                    break;

                case '/skype':
                    sounds.skype.play();
                    break;

                case '/whatsapp':
                    sounds.whatsapp.play();
                    break;
                    
                default:
                    break;
            }
        }

        socket.on('command', command);

        return () => {
            socket.off('command', command);
        }
    }, [sounds])

    return (
        <div>

        </div>
    )
}

export default Commands;