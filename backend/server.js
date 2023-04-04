require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 8080 
const connectDB = require('./config/db')
connectDB()
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const { authorize } = require('./middleware/authMiddleware')
app.use(cors())
app.use(express.json())

app.use('/users', authorize, userRoutes)
app.use('/auth', authRoutes)
app.use('/posts', postRoutes)
app.use('/comments/p/', commentRoutes)


app.listen(PORT, () => {
    console.log('Listening to the port: ' + PORT)
})