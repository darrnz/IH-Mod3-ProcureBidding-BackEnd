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
        idPurcharser: [], //se utiliza para asignar a Venderor que sepa quien es su cliente
                        //Tender creador, Quote a quien entrega, 
        idVendor: [],
        idPO: [],
        idTender: [],
        idProducts: [],
        idQuote: [],
        winnedTenders:[] //Se agregan tenders a proveedor que gano
    },
    {
        timestamps:true,
        versionKey:false
    }
)

userSchema.plugin(PLM, { usernameField: 'email' })

module.exports = model('User', userSchema)
