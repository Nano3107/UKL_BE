const PORT = 1234
const express = require(`express`)
const app = express()
const cors = require(`cors`)
const bodyParser = require('body-parser')
app.use(cors())
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const adminRoute = require('./routes/admin')
const menuRoute = require('./routes/menu')
const orderRoute = require('./routes/transaksi')

app.use(`/admin`, adminRoute)
app.use(`/food`, menuRoute)
app.use(`/order`, orderRoute)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})