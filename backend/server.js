require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 8080 
const connectDB = require('./config/db')
connectDB()
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const memoRoutes = require('./routes/memoRoutes')
const commentRoutes = require('./routes/commentRoutes')
const { authorize } = require('./middleware/authMiddleware')
app.use(cors())
app.use(express.json())

app.use('/users', authorize, userRoutes)
app.use('/auth', authRoutes)
app.use('/memo', memoRoutes)
app.use('/comments/m/', commentRoutes)


app.listen(PORT, () => {
    console.log('Listening to the port: ' + PORT)
})