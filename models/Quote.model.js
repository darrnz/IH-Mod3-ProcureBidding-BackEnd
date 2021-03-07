const { Schema, model } = require('mongoose')


const quoteSchema = new Schema( 
    {
        comments:String,
        totalSum: Number,
        winner: false,
        idProductQuote:[{type: Schema.Types.ObjectId, ref: 'ProductQuote'}],
        idVendor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        idTender:[{ type: Schema.Types.ObjectId, ref: 'Tender' }],
    }
)

module.exports = model('Quote', quoteSchema)