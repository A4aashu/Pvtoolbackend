const mongoose = require("mongoose");
const farSchema = new mongoose.Schema({
    "Unique Key": String,
    "PONumber": String,
    "Job Number": String,
    "Site Id": String,
    "Pat Date": String,
    "Currency": String,
    "Vendor": String,
    "Invoice Number": String,
    "CULCode": String,
    "CULDescription": String,
    "Level 2": String,
    "Level 3": String,
    "Level 4": String,
    "As Built Quantity": String,
    "Final_PurchaseCost_PerUnit_Or_Set": String,
    "Tag Number": String,
    "Serial no": String,
    "Reconciliation": String
},
    {
        collection: "FarData"
    }
);

module.exports = mongoose.model("FarData", farSchema);