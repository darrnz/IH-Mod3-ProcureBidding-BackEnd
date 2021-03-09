const { Schema, model } = require('mongoose')

const productSchema = new Schema (
    {
        idLocal: String,
        productDescription: String,
        boxSize: Number,
        uom:String,
        productFamily: String,
        idCreator: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        idTender: [{ type: Schema.Types.ObjectId, ref: 'Tender' }],
        price: Number,
        quantity:Number
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('Product', productSchema)