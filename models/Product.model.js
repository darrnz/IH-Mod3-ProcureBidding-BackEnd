const { Schema, model } = require('mongoose')

const productSchema = new Schema (
    {
        idLocal: String,
        productDescription: String,
        boxSize: Number,
        productFamily: String,
        idCreator: [],
        idTender: [],
        price: Number
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.export = model('Product', productSchema)