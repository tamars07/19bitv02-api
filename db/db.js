const mongoose = require('mongoose')

const connStr = 'mongodb+srv://tamtd:h7Xfcmf2GQnMDXKz@api-niie.xvnqi.mongodb.net/myapi?retryWrites=true&w=majority'

mongoose.set('debug',true)
mongoose
    .connect(connStr,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // reconnectTries: Number.MAX_VALUE,
        // autoReconnect: true
    })
    .then(()=>{
        console.log('Connected to the database')
    })
    .catch(err => {
        console.log('Cannot connect to the database!', err)
        process.exit()
    })