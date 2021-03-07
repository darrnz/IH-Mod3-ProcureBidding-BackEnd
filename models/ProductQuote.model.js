const { Schema, model } = require('mongoose')


const productQuoteSchema = new Schema( 
    {
        description: String,
        price: Number,
        sku: String,
        idQuote: [{ type: Schema.Types.ObjectId, ref: 'Quote' }],
    }
)

module.exports = model('ProductQuote', productQuoteSchema)