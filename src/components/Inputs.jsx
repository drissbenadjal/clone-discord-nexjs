import { socket } from "@/utils/socket";

const Inputs = ({ selectedUser, setSelectedUser }) => {

    const HandleSubmit = (e) => {
        e.preventDefault();
        const { message } = e.target.elements;
        if (message.value.trim() !== "" && message.value.trim() !== null && message.value.trim() !== undefined && message.value.trim() !== " ") {
            if (selectedUser) {
                socket.emit("private message", { content: message.value, to: selectedUser.userID });
                const _selectedUser = { ...selectedUser };

                _selectedUser.messages.push({
                    content: message.value,
                    // fromSelf: true,
                    username: localStorage.getItem("username"),
                    from: socket.userID,
                });

                // change the reference to trigger a render
                setSelectedUser(_selectedUser);
            } else {
                socket.emit("message", { content: message.value });
            }
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