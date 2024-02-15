const Category = require('../models/Category');


exports.createCategory = async(req, res) => {
    try{

        // fetching data
        const {name, description} = req.body;

        

        //validation
        if(!name || ! description){
            res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }

        //checking if category is already created

        const category = await Category.findOne({name});

        if(category){
            return res.status(400).json({    
                success:false,
                message:"Category already exist"
            })
        }

        //create entry in DB
        const newCategory = await Category.create({
            name,
            description,
        })

        return res.status(200).json({
            success:true,
            message:"Category created succesfully"
        })


    }catch(err){

        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while creating Category"
        })

        // return response

        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        })

    }
}


//get all tags

exports.showAllCategories = async(req, res) => {
    try{
        //fetch all categories from DB
        const getCategories = await Category.find({}, {name:true, description:true});
        
        // if tags not found then return response
        if(getCategories.length == 0){
            res.status(401).json({
                success:false,
                message:"No tags found"
            })
        }

        //categories fetched return response
        return res.status(200).json({
            success:true,
            message:"All tags fetched",
            data:getCategories
        })
        clg
    }catch(err){

        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while fetching all tags"
        })
    }
}

exports.categoryPageDetails = async(req, res) => {
    try{
        
        const {categoryId} = req.body;

        const category = await Category.findOne({categoryId}).populate("course").exec();

        if(!category){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            })
        }


        //get courses for different categories

        const diffCategories = await Category.find({
                _id:{$ne:categoryId},
        }).populate('courses').exec(); 


        //return response
        return res.status(200).json({
            success:true,
            message:"Category fetched successfully",
            category,
            diffCategories
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while fetching particular category"
        })
    }
}