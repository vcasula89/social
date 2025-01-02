import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
const dbName = 'social'
const user='valentinacasula70'

const password='XIXxCtDSJp5yt0jL'

const connectionUrl = `mongodb+srv://
${user}:${password}
@clustertodolist.9ynuq.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=ClusterToDoList'`

const connect = async () => {
  try {
    console.log("NODE_ENV: -" + process.env.NODE_ENV +"-", typeof process.env.NODE_ENV)
    if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV.toString() === 'test') {
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri(), {dbName: dbName});
      console.log('connected to in memory db');
    }
    else {
      await mongoose.connect(connectionUrl);
      console.log('- Connected to MongoDB server');
    }
  } catch (error) {
    console.log('- Connection error', error);
    throw(error);
  }
}
export default connect;