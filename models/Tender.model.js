const { Schema, model } = require('mongoose')


const tenderSchema = new Schema ( 
    {
        tenderTitle: String,
        generalInfo: String,
        startDate: Date,
        endDate: Date,
        status:String,
        idPurchaser: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        idProductsTender: [{ type: Schema.Types.ObjectId, ref: 'ProductsTender' }],
        idVendor:[{ type: Schema.Types.ObjectId, ref: 'User' }],
        idQuote: [{ type: Schema.Types.ObjectId, ref: 'Quote' }],
        idWinnerQuote: [{ type: Schema.Types.ObjectId, ref: 'Quote' }]
        
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('Tender', tenderSchema)