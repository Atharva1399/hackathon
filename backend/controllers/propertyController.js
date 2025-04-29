const Doris = require('../models/Doris');
const DLR = require('../models/DLR');
const CERSAI = require('../models/CERSAI');
const MCA21 = require('../models/MCA21');

exports.submitData = async (req, res) => {
    const data = req.body;

    try {
        const doris = await Doris.create(data);
        const dlr = await DLR.create(data);
        const cersai = await CERSAI.create(data);
        const mca21 = await MCA21.create(data);

        res.status(201).json({ message: "Data submitted to all clusters" });
    } catch (error) {
        res.status(500).json({ message: "Error submitting data", error });
    }
};

exports.getClusteredData = async (req, res) => {
    try {
        const doris = await Doris.find({});
        const dlr = await DLR.find({});
        const cersai = await CERSAI.find({});
        const mca21 = await MCA21.find({});

        res.json({
            doris,
            dlr,
            cersai,
            mca21
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving data", error });
    }
};
