const mongoose = require('mongoose')

module.exports.connection = async()=>{

    try{
        mongoose.connect(process.env.MONGO_DB_URL,{useNewUrlParser: true, useUnifiedTopology:true})
        console.log('database connected successfully')
    }
    catch(err){
        console.log('error')
        throw err
    }

}