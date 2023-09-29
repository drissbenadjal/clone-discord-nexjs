import { socket } from "@/utils/socket";

const Inputs = () => {

    const HandleSubmit = (e) => {
        e.preventDefault();
        const { message } = e.target.elements;
        if (message.value.trim() !== "" && message.value.trim() !== null && message.value.trim() !== undefined && message.value.trim() !== " ") {
            socket.emit("message", { content: message.value });
            e.target.reset();
        }
    }

    return (
        <>
            <form onSubmit={(e) => { HandleSubmit(e) }}>
                <input type="text" placeholder="Enter your message" id="message" name="message" />
            </form>
        </>
    )
}

export default Inputs;  