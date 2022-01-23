const express = require('express')

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const rooms = {}
rooms.addMessage = (roomName, message) => {
    const room = `room_${roomName}`
    if (!(Object.keys(rooms).includes(room))) return false
    const messages = rooms[room]
    // A message can't be more than 1000 characters
    if (message.length > 1000) return false
    messages.push(message)
    // Server will only store 200 messages per room
    if (messages.length > 200) messages.shift()
    return true
}
rooms.getMessages = (roomName) => {
    const room = `room_${roomName}`
    if (!(Object.keys(rooms).includes(room))) return false
    return room[room]
}
rooms.addRoom = (roomName) => {
    const room = `room_${roomName}`
    if (Object.keys(rooms).includes(room)) return false
    rooms[room] = []
    return true
}

app.route('/messages/:name')
    .get((req, res) => {
        const room = req.params.name
        const messages = rooms.getMessages(room)
        if (messages === false) return res.sendStatus(404)
        res.send({ messages })
    })
    .post((req, res) => {
        const room = req.params.name
        if (!req.body.message) return res.sendStatus(400)
        rooms.addMessage(room, req.body.message)
        res.sendStatus(200)
    })

app.route('/rooms')
    .post((req, res) => {
        const room = req.body.name
        if (!room) return res.sendStatus(404)
        if (rooms.addRoom(room)) return res.redirect(`/messages/${room}`)
        else return res.sendStatus(404)
    })

app.listen(3000, () => {
    console.log('Listening on port 3000')
})