const { Schema, model } = require('mongoose')


const quoteSchema = new Schema( 
    {
       idVendor: [],
       idTender:[],
       idAdmin:[],
       idComprador: [] 
    }
)

module.exports = model('Quote', quoteSchema)