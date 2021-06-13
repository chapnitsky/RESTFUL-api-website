const mongoose = require('mongoose');
const id_validator = require ('mongoose-id-validator');

var TourSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
    start_date: {
        type: Date,
        default: false,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    path:[{
        name:{
            type: String,
            required: true,
            trim: true
        },
        country:{
            type: String,
            required: true,
            trim: true
        }
    }],
    guide:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Guide'
    },
}, { timestamps: true });
TourSchema.plugin(id_validator);
TourSchema.index("id");


const Tour = mongoose.model('Tour', TourSchema );

module.exports = Tour