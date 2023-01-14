const mongoose = require("mongoose");

const workItemSchema = new mongoose.Schema({
    item :{
        type :String,
        required : true,       
    },
    description : {
        type : String,
        required : true,
    }

});

const WorkItem  = mongoose.model("WorkItme",workItemSchema);

module.exports = WorkItem;