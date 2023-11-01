export default function Chat(){
    return (
        <div>
            {/* <h1>Chat</h1> */}
            <script  src="http://localhost:3001/socket.io/socket.io.js"></script>
            <script  src="http://localhost:3001/script.js"></script>
            <div id="message-container" />
            <form id="send-container">
                <input type="text" id="message-input" />
                <button type="submit" id="send-button">Send</button>
            </form>
        </div>
    )
}