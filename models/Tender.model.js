const { Schema, model } = require('mongoose')


const tenderSchema = new Schema ( 
    {
        tenderTitle: String,
        generalInfo: String,
        startDate: Date,
        endDate: Date,
        status:{
            type: String,
            default:'Abierta'
        },
        idPurchaser: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        tenderProducts: Array,
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