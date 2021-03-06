const { Schema, model } = require('mongoose')


const quoteSchema = new Schema( 
    {
        comments:String,
        idVendor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        idTender:[{ type: Schema.Types.ObjectId, ref: 'Tender' }],
        idAdmin:[{ type: Schema.Types.ObjectId, ref: 'User' }],
        idComprador: [{ type: Schema.Types.ObjectId, ref: 'User' }] 
    }
)

module.exports = model('Quote', quoteSchema)