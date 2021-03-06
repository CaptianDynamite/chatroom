const $chatHistory = document.getElementById('chat-history')
const $chatMessageBox = document.getElementById('chat-message-box')
const $chatText = document.getElementById('chat-message-box-text')
$chatMessageBox.onsubmit = (e) => {
    e.preventDefault()
    const message = $chatText.value
    // We are currently ignoring the result of this Promise since the server doesn't send back data
    fetch(`/messages/${roomName}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message})
    }).then().catch()
    $chatText.value = ''
}

// For this code to work the URL must be of the form .../room-name
const { href } = window.location
const lastDirectoryEndIndex = href.lastIndexOf('/')
// Gets "room-name" from the URL format specified above
const roomName = href.substring(lastDirectoryEndIndex + 1)

const formatDisplayMessages = (messages) => {
    $chatHistory.innerText = ''
    for (const message of messages) {
        $message = document.createElement('p')
        $message.innerText = message
        $chatHistory.appendChild($message)
    }
}

const getMessagesAndUpdate = () => {
    fetch(`/messages/${roomName}`)
        .then(res => res.json())
        .then(data => {
            formatDisplayMessages(data.messages)
        })
}

// Upon loading the page, load the messages in
getMessagesAndUpdate()

// Poll every 2 seconds for message data
setInterval(getMessagesAndUpdate, 2000)