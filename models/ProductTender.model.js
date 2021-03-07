const { Schema, model } = require('mongoose')

const productTenderSchema = new Schema (
    {
        quantity: Number,
        price: Number,
        idCreator: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        idTender: [{ type: Schema.Types.ObjectId, ref: 'Tender' }],
        idProduct:[{ type: Schema.Types.ObjectId, ref: 'Product' }]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('ProductTender', productTenderSchema)