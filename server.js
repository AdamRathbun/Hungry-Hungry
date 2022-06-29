const express = require('express')
const MongoClient = require('mongodb').MongoClient
const PORT = 5000
const app = express()
require('dotenv').config()

let db,
    dbConnectionStr = 'mongodb+srv://Grepe021:H98ddx20@cluster0.bkprt.mongodb.net/?retryWrites=true&w=majority',
    dbName = 'groceries'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('items').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addItem', (request, response) => {
    db.collection('items').insertOne({itemName: request.body.itemName.replace(/\s/g, "_").toLowerCase()})
    .then(result => {
        console.log('Item Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteItem', (request, response) => {
    db.collection('items').deleteOne({itemName: request.body.itemName})
    .then(result => {
        console.log('Item Deleted')
        response.json('Item Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})