const yogaModel = require('../models/yoga');

// to get all yogapose
module.exports.getAllYogaPoses = async (req, res) => {

    const getAllYogaPoses = await yogaModel.find();

    return res.json(getAllYogaPoses);

}



module.exports.getSpecificYogaPoses =  async (req, res) => {

    const { id } = req.params;

    const getSpecificYogaPoses = await yogaModel.findOne({ _id: id });

    if (getSpecificYogaPoses === null) {

        return res.json({ "Error": `No Yoga Pose Found : ${id}` });
    }

    return res.json(getSpecificYogaPoses);
}

// to get YogaPose in category
module.exports.getSpecificYogaPoseOnCategory = async (req, res) => {

    const { category } = req.params;

    const getSpecificYogaPoseOnCategory = await yogaModel.find({ category: category });


    if (getSpecificYogaPoseOnCategory.length === 0) {

        return res.json({ "error": `No Yoga Pose Found for the category of : ${category}` });

    }

    return res.json(getSpecificYogaPoseOnCategory);

}

// to add new 
module.exports.addNewYogaPose = async (req, res) => {

    const addNewYogaPose = await yogaModel.create(req.body);

    console.log(addNewYogaPose);

    return res.json({
        poseAdded: addNewYogaPose,
        message: "Yoga Pose Added Successfully!!!"
    });

}

// to update yogapose
module.exports.updateYogaPose = async (req, res) => {

    const { id } = req.params;

    const updateYogaPose = await yogaModel.findOneAndUpdate({ _id: id }, req.body, { new: true });

    return res.json({
        updatedBook: updateYogaPose,
        message: "Yoga Pose Updated Successfully!!!"
    });

}

// to delete YogaPose
module.exports.deleteYogaPose = async (req, res) => {

    console.log(req.params);
    const { id } = req.params;

    const deleteYogaPose = await yogaModel.deleteOne({ _id: id });

    console.log(deleteYogaPose);

    return res.json({

        deletedBook: deleteYogaPose,
        message: "Yoga Pose Deleted Successfully!!!"

    });
}
