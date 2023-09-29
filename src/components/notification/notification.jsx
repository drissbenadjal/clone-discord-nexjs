
const Notification = ({ title, content, onClose }) => {
    return (
        <div className='notification'>
            <h1>
                {title}
            </h1>
            <p>
                {content}
            </p>
            <div className='close-notification'>
                <button onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default Notification;