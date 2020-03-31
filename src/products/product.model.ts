import * as mongoose from 'mongoose';

export const ProductSchema= new mongoose.Schema({
    email:{type:String,required:true},
    title: {type:String,required:true,unique:true},
    description: {type:String,required:true},
    duration: {type:String,required:true},
    progress: {type:String, required:true}
})


export interface Course {
    
        id: string;
        email:string,
        title: string; 
        description: string; 
        duration: String,
        progress:string
}