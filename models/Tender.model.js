const { Schema, model } = require('mongoose')


const tenderSchema = new Schema ( 
    {
        tenderTitle: String,
        generalInfo: String,
        startDate: Date,
        endDate: Date,
        idPurchaser: [],
        idProductsTender: [],
        idVendor:[],
        idQuote: [],
        idWinnerQuote: []
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('Tender', tenderSchema)