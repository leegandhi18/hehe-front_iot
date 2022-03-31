const express = require('express')
const morgan = require('morgan')
const indexRouter = require('./routes')
const app = express()

app.set('port', process.env.PORT || 3000)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use((err, req, res, next) => {
  // res.locals.message = err.message
  // res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}
  res.status(err.status || 500)
  if(err.code === 'ECONNREFUSED') return res.send("MQTT Connection failed!")
  // res.render('error')
  res.send(err)
})

app.listen(3000, () => {
  console.log("3000번 포트에서 실행중!")
})


