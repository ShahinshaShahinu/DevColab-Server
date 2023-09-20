import mongoose  from'mongoose'

export const db=()=>{
    mongoose.connect(`${process.env.DATABASE_URL}`).then(()=>{
        console.log('database connected ');
        
    }).catch((error)=>{
console.log(error.message);

    })
} 