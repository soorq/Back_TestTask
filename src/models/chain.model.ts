import { Schema, model } from 'mongoose';

const chainSchema = new Schema({
	trx_id: { type: String, required: true },
	block_time: { type: String },
	block_num: { type: Number, required: true },
});

export const ChainModel = model('chain', chainSchema);
