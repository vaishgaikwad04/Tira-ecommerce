import mongoose from 'mongoose';

const connectedToDb = async () => {
    try{
        await mongoose.connect(process.env.URI);
        console.log('mongodb connected');

    }catch(error){
        console.log('error connecting to db', error);
    }
}

export default connectedToDb;