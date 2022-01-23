const $chatHistory = document.getElementById('chat-history')
const $chatMessageBox = document.getElementById('chat-message-box')
const $chatText = document.getElementById('chat-message-box-text')
$chatMessageBox.onsubmit = (e) => {
    e.preventDefault()
    const message = $chatText.value
    fetch(`/messages/${roomName}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message})
    })
    $chatText.value = ''
}

const { href } = window.location
console.log(href)
const lastDirectoryEndIndex = href.lastIndexOf('/')
const roomName = href.substr(lastDirectoryEndIndex + 1)

const getMessagesAndUpdate = () => {
    fetch(`/messages/${roomName}`)
        .then(res => res.json())
        .then(data => {
            $chatHistory.innerText = data.messages
        })
}

getMessagesAndUpdate()

setInterval(getMessagesAndUpdate, 2000)