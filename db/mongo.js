const mongoose = require('mongoose')
const db = 'ellaro'
mongoose.connect(`mongodb://127.0.0.1:27017/${db}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})