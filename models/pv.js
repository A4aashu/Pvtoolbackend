const mongoose = require("mongoose");
const pvSchema = new mongoose.Schema({
    "Asset Id": String,
    "Asset Status": String,
    "Asset Image": String,
    "Asset Timestamp": String,
    "Tag Status": String,
    "Tag Number": String,
    "Tag Image": String,
    "Tag Timestamp": String,
    "Serial Number": String,
    "Serial Number Image": String,
    "Serial TimeStamp": String,
    "Asset Category": String,
    "Asset Category(Other)": String,
    "Asset Description": String,
    "Asset Description (Other)": String,
    "Manufacturer Name": String,
    "Manufacturer Name(Other)": String,
    "Latitude": String,
    "Longitude": String,
    "Site Id": String,
    "Remark": String,
    "User": String,
    "Reconciliation": String
},
    {
        collection: "PvData"
    }
);

module.exports = mongoose.model("PvData", pvSchema);