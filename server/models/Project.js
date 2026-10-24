import mongoose from 'mongoose';
const schema=new mongoose.Schema({
 title:{type:String,required:true},
 description:{type:String,required:true},
 stack:[String],
 liveUrl:String,
 githubUrl:String,
 featured:{type:Boolean,default:false},
 icon:{type:String,default:'💻'}
},{timestamps:true});
export default mongoose.model('Project',schema);
