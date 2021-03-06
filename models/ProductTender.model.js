const { Schema, model } = require('mongoose')

const productTenderSchema = new Schema (
    {
        quantity: Number,
        price: String,
        idCreator: [],
        idTender: [],
        price: Number,
        idProduct:[]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.export = model('ProductTender', productTenderSchema)