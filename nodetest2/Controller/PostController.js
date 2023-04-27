const models = require('../models');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const Post=models.Post;
const Like=models.Like;


exports.post=async(req,res)=>{
    try {
        const userid = req.userid; 
        const user=Like.create({
         
            user_id:userid,
            post: {
              user_id:userid,
            post_content:req.body.post_content,
            image:req.file.filename,
            },
           
        } ,   
             
              {
                include:[{model:Post,as:'post'}]
              
               });
          
    
         

        
           res.status(201).json({ sucess: 'ok', data: user });
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
}


exports.postlike=async(req,res)=>{
    try{
        const userid = req.userid; 
        const {post_id}=req.body;
        const postuser=await Post.findOne({where:{id:post_id}});
        console.log(postuser);
        if(!postuser){
            return res.status(500).json({sucess:false, message:"post not found"});
        }
        const like=await Like.findOne({where:{[Op.and]:[{ post_id:post_id },{user_id:userid}],}});
        console.log(like);


      
        if(like){
            await like.update({is_like:!like.is_like},
                {where:{[Op.and]:[{ post_id:post_id },{user_id:userid}],}});
                console.log(uplike)
           
           
        } 
       
            
        res.status(201).json({ sucess: 'ok', data: "post liked"});
    }catch(error){
        
 
        
        res.status(400).json({error});
    }
}

exports.getpost=async(req,res)=>{
    try {
        const post=await Post.findAll({
         
            include:[{
               model:Like,
               attributes:['is_like']
            }]
        });
        res.status(200).json({sucess:'ok',data:post});
    } catch (error) {
        res.status(400).json({error});
    }
}