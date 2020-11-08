const mongoose = require('mongoose');

var countrySchema = new mongoose.Schema({

    NameKaz:{
        type: String,
        required: "Необходио заполнить."
    },
    Id:
        {
            type:String,
            required: "Необходио заполнить."
        },
    Code:{
        type:String,
        required: "Необходио заполнить."
    },
    NameRus:{
        type:String,
        required: "Необходио заполнить."
    }
});



mongoose.model('Country',countrySchema);