const express = require('express')
const compression = require('compression')
const history = require('connect-history-api-fallback')
const app = express()

app.use(compression())
app.use(history())
app.use(express.static('./dist'))

app.listen(8072, () => {
  console.log('cms server running at 8072')
})
