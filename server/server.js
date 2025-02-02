const express = require('express')
const app = express()
const createCoverLetter = require('./gemini') 
const { db } = require('./firebase.js')
const cors = require('cors')

app.use(express.json())
app.use(cors())


app.post('/setUserInfo/:userID', (req, res) => { // from frontend
    const userID = req.params.userID
    const userInfo = req.body
    const userRef = db.collection('users').doc(userID)   
    userRef.set(userInfo, { merge: true })
        .then(() => {
            res.status(200).send("User information updated successfully")
        })
        .catch((err) => {
            res.status(500).send("Error updating user information: " + err)
        })
})

app.get('/api', async(req, res) => {
    let response = 'off'
    const user = db.collection('users').doc('1')
    user.set({
        name: "John"
    })
    // response = await createCoverLetter('eyad', 'apple', 'swe intern')
    res.json({"response": response})
    // .then(data => {res.json({"response": data})})
})

app.listen(5000 ,() => {console.log("Server listening at port 5000")} )