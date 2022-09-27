// require extarnal npm
require('dotenv').config()

// require internal files
const app=require('./app')

// defaind a port variable
const PORT=process.env.PORT


// listen this app with a pori
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})