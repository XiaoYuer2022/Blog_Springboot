const express = require('express')
const compression = require('compression')
const history = require('connect-history-api-fallback')
const app = express()

app.use(compression())
app.use(history())
app.use(express.static('./dist'))

app.listen(8071, () => {
  console.log('view server running at 8071')
})
