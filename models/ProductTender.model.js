const { Schema, model } = require('mongoose')

const productTenderSchema = new Schema (
    {
        quantity: Number,
        price: String,
        idCreator: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        idTender: [{ type: Schema.Types.ObjectId, ref: 'Tender' }],
        price: Number,
        idProduct:[{ type: Schema.Types.ObjectId, ref: 'Product' }]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.export = model('ProductTender', productTenderSchema)