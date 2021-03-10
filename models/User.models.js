const { Schema, model } = require('mongoose')
const PLM = require('passport-local-mongoose')

const userSchema = new Schema(
    {
        role: String,
        firstName: String,
        lastName: String,
        email: String,
        companyName:String,
        address:String,
        zipCode:String,
        rfc:String,
        password:{
            type:String
        },
        idPurcharser: [{ type: Schema.Types.ObjectId, ref: 'User' }], //se utiliza para asignar a Venderor que sepa quien es su cliente               //Tender creador, Quote a quien entrega, 
        idVendor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        idTender: [{ type: Schema.Types.ObjectId, ref: 'Tender' }],
        idProducts: [{ type: Schema.Types.ObjectId, ref: 'Products' }],
        idCompany: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        idQuote: [{ type: Schema.Types.ObjectId, ref: 'Quote' }],
        winnedTenders:[{ type: Schema.Types.ObjectId, ref: 'Tender' }] //Se agregan tenders a proveedor que gano
    },
    {
        timestamps:true,
        versionKey:false
    }
)

userSchema.plugin(PLM, { usernameField: 'email' })

module.exports = model('User', userSchema)
