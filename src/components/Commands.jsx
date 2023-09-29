import { useEffect, useState } from "react";
import { socket } from "@/utils/socket";

const Commands = () => {

    const [sounds, setSounds] = useState({});

    useEffect(() => {
        setSounds({
            souhait: new Audio("./sounds/souhait.mp3"),
            dormir: new Audio("./sounds/dormir.mp3"),
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