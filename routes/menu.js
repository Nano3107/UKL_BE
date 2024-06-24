const express = require(`express`)
const app = express()
const control = require('../controller/food')

app.get("/search", control.searchMenu)
app.get("/:search", control.searchMenu)
app.post("/", control.addMenu)
app.put("/:id",  control.updateMenu)
app.delete("/:id",  control.deleteMenu)

module.exports = app