import mongoose  from'mongoose'


export const db=()=>{
    mongoose.connect('mongodb://localhost:27017/DevColab').then(()=>{
        console.log('database connected ');
        
    }).catch((error)=>{
console.log(error.message);

    })
} 