import movieSchema from './models/bms.model.js'

export async function getMovies(req,res) {
    try {
        const employees=await employSchema.find();
        res.status(200).send(employees)
        
    } catch (error) {
        res.status(404).send({msg:error})
    }
}
export async function addMovie(req,res){
    try{
        const{...movie}=req.body;
        const data=await movieSchema.create({...movie});
        return res.status(201).send({msg:data});
        
    }catch(error){
        res.status(404).send({msg:error})
    }
}