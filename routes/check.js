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

router.post("/pv/:status/:remarks/:id", async (req, res) => {
    const { status, remarks, id } = req.params;
    console.log(remarks);
    console.log(status);
    const _id = id;
    try {
        const xyz = await PvModel.findByIdAndUpdate(
            _id,
            {
                "Asset Status": status,
                "Remark": remarks
            })
        res.send("Updated");
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error2" });
    }
});
router.post("/pvnew/:category/:description/:assetstatus/:manufacturer/:remarks/:tag/:serial/:site", async (req, res) => {
    const { category, description, assetstatus, manufacturer, remarks, tag, serial, site } = req.params;

    try {
        console.log(category, description, assetstatus, manufacturer, remarks, tag, serial, site, Math.floor(Math.random() * (999999 - 100000 + 1) + 100000), new Date());
        const tagserialfar1 = await FarModel.findOne({ $or: [{ "Tag Number": tag }, { "Serial no": serial }] });
        if (tagserialfar1) {
            const addnew = await PvModel.create({
                "Asset Id": Math.floor(Math.random() * (999999 - 100000 + 1) + 100000),
                "Asset Status": assetstatus,
                "Asset Image": '',
                "Asset Timestamp": new Date(),
                "Tag Status": '',
                "Tag Number": tag,
                "Tag Image": '',
                "Tag Timestamp": new Date(),
                "Serial Number": serial,
                "Serial Number Image": '',
                "Serial TimeStamp": new Date(),
                "Asset Category": category,
                "Asset Category(Other)": '',
                "Asset Description": description,
                "Asset Description (Other)": '',
                "Manufacturer Name": manufacturer,
                "Manufacturer Name(Other)": '',
                "Latitude": '',
                "Longitude": '',
                "Site Id": site,
                "Remark": remarks,
                "User": 'Aashu',
                "Reconciliation": '1'
            });
            const xyz1 = await FarModel.findByIdAndUpdate(
                tagserialfar1["_id"],
                {
                    "Reconciliation": '1',
                },
            );
            res.send("New Added");
        }
        else {
            const addnew = await PvModel.create({
                "Asset Id": Math.floor(Math.random() * (999999 - 100000 + 1) + 100000),
                "Asset Status": assetstatus,
                "Asset Image": '',
                "Asset Timestamp": new Date(),
                "Tag Status": '',
                "Tag Number": tag,
                "Tag Image": '',
                "Tag Timestamp": new Date(),
                "Serial Number": serial,
                "Serial Number Image": '',
                "Serial TimeStamp": new Date(),
                "Asset Category": category,
                "Asset Category(Other)": '',
                "Asset Description": description,
                "Asset Description (Other)": '',
                "Manufacturer Name": manufacturer,
                "Manufacturer Name(Other)": '',
                "Latitude": '',
                "Longitude": '',
                "Site Id": site,
                "Remark": remarks,
                "User": 'Aashu',
                "Reconciliation": '0'
            })
            res.send("New Added");
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error2" });
    }
});

module.exports = router;
