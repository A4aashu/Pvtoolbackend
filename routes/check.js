const router = require("express").Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const FarModel = require("../models/far");
const PvModel = require("../models/pv");


router.get("/far", async (req, res) => {
    const tagNumber = req.query.tag;
    const serialNumber = req.query.serial;
    let query = {};
    if (tagNumber && serialNumber) {
        query = { $or: [{ "Tag Number": tagNumber }, { "Serial Number": serialNumber }] };
    }
    else if (tagNumber) {
        query = { "Tag Number": tagNumber };
    }
    else if (serialNumber) {
        query = { "Serial Number": serialNumber };
    }

    try {
        const tagserialpv = await PvModel.findOne(query);
        if (tagserialpv) {
            res.send("Already existed in PV reconciled with Far");
        }
        else {
            const tagserialfar = await FarModel.findOne(query);
            if (tagserialfar) {
                const xyz1 = await FarModel.findByIdAndUpdate(
                    tagserialfar["_id"],
                    {
                        "Reconciliation": '1',
                    },
                    { new: true }
                ).exec();
                res.send("Exists in FAR");
            }
            else
                res.send("Not Found in PV and FAR");
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error2" });
    }
});
router.get("/pvcheck", async (req, res) => {
    const tagNumber = req.query.tag;
    const serialNumber = req.query.serial;
    let query = {};
    if (tagNumber && serialNumber) {
        query = { $or: [{ "Tag Number": tagNumber }, { "Serial Number": serialNumber }] };
    }
    else if (tagNumber) {
        query = { "Tag Number": tagNumber };
    }
    else if (serialNumber) {
        query = { "Serial Number": serialNumber };
    }

    try {
        const tagserialpv = await PvModel.findOne(query);
        res.send(tagserialpv);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error2" });
    }
});

router.post("/pvupdate", async (req, res) => {
    console.log("in pv");
    const _id = req.body.id;
    const status = req.body.status;
    const remarks = req.body.remarks;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const assetimage = req.body.dataUri;
    const tagimage = req.body.dataUri2;
    const serialimage = req.body.dataUri1;
    const assettimestamp = req.body.assettimestamp;
    const tagtimestamp = req.body.tagtimestamp;
    const serialtimestamp = req.body.serialtimestamp;
    console.log(req.body);
    console.log(_id);
    try {
        const xyz = await PvModel.findByIdAndUpdate(
            _id,
            {
                "Asset Status": status,
                "Remark": remarks,
                "Latitude": latitude,
                "Longitude": longitude,
                "Asset Image": assetimage,
                "Tag Image": tagimage,
                "Serial Number Image": serialimage,
                "Asset Timestamp": assettimestamp,
                "Tag Timestamp": tagtimestamp,
                "Serial Timestamp": serialtimestamp
            })
        res.send("Updated");
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error2" });
    }
});
router.post("/pvnew", async (req, res) => {
    const _id = req.body.id;
    const status = req.body.status;
    const remarks = req.body.remarks;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const assetimage = req.body.dataUri;
    const tagimage = req.body.dataUri2;
    const serialimage = req.body.dataUri1;
    const assettimestamp = req.body.assettimestamp;
    const tagtimestamp = req.body.tagtimestamp;
    const serialtimestamp = req.body.serialtimestamp;
    const tagnumber = req.body.tagnumber;
    const serialnumber = req.body.serialnumber;
    const assetcate = req.body.assetcate;
    const assetdesc = req.body.assetdesc;
    const Manufacturer = req.body.Manufacturer;
    const site = req.body.site;
    const reconcilation = req.body.reconcilation;
    try {
        const addnew = await PvModel.create({
            "Asset Id": Math.floor(Math.random() * (999999 - 100000 + 1) + 100000),
            "Asset Status": status,
            "Asset Image": assetimage,
            "Asset Timestamp": assettimestamp,
            "Tag Status": '',
            "Tag Number": tagnumber,
            "Tag Image": tagimage,
            "Tag Timestamp": tagtimestamp,
            "Serial Number": serialnumber,
            "Serial Number Image": serialimage,
            "Serial TimeStamp": serialtimestamp,
            "Asset Category": assetcate,
            "Asset Category(Other)": '',
            "Asset Description": assetdesc,
            "Asset Description (Other)": '',
            "Manufacturer Name": Manufacturer,
            "Manufacturer Name(Other)": '',
            "Latitude": latitude,
            "Longitude": longitude,
            "Site Id": site,
            "Remark": remarks,
            "User": 'Aashu',
            "Reconciliation": reconcilation
        });
        res.send("New Added");
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error2" });
    }
});

module.exports = router;
