import { connect } from 'mongoose';
import { URI } from './config.js';

async function connectDb() {
  await connect(URI).catch((err) => console.log(err));
  console.log('DB connected');
}

export default connectDb;
