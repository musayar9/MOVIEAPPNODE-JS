const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    
    director_id:Schema.Types.ObjectId,
    title:{
        type:String,
        required: [true, '`{PATH } alanı zorunludur`'],
        maxlength: [15, '`{PATH }` alanı (`{VALUE}`) ({MAXLENGHT}) KARAKTERDEN KÜÇÜK OLMALIDIR`'],
        minlength: [4, '`{PATH }` alanı (`{VALUE}`) ({MINLENGTH}) KARAKTERDEN BÜYÜK OLMALIDIR`'],


    }, 
    category:{
        type:String,
        maxlength:30, 
        minlength:1
    },
    country: {
        type:String,
        maxlength:30,
        minlength:1
    },
    year: {
        type:String,
        max:2040,
        min:1920
    },
    imdb_score: {
        type:Number,
        max:10,
        min:0
    },

    createdAt:{
        type: Date,
        default: Date.now
    }

   
   

    

});

module.exports = mongoose.model('movie', MovieSchema)