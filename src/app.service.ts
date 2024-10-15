import { DataDto, DataDtoSchema } from './utils/schema';
import { ChainModel } from './models/chain.model';
import { AxiosContracts } from './utils/axios';
import { Logger } from './utils/logger';
import mongoose from 'mongoose';
import axios from 'axios';

export class AppService {
	private readonly DATA_TO_API = { account_name: 'eosio', pos: -1, offset: -100 };
	private readonly API_URL = process.env.PUBLIC_API_URL as string;
	private readonly DB_URL = process.env.PUBLIC_DB_URL as string;

	constructor() {
		mongoose
			.connect(this.DB_URL + '/test_task')
			.then(() => {
				Logger.success('Успешное подключение к базе данных test_task');
				this.initializeDatabase();
			})
			.catch(error => {
				Logger.error('Ошибка подключения к базе данных:', error);
			});
	}

	private async initializeDatabase() {
		try {
			if (!mongoose.connection.db) {
				Logger.error('Ошибка: соединение с базой данных не установлено.');
				return;
			}

			const collections: Array<{ name: string }> =
				(await mongoose.connection.db.listCollections().toArray()) || [];

			const collectionExists = collections.some(
				collection => collection.name === ChainModel.collection.name,
			);

			if (!collectionExists) {
				await ChainModel.init();
				Logger.success('Коллекция успешно создана: ' + ChainModel.collection.name);
			} else {
				Logger.success('Коллекция уже существует: ' + ChainModel.collection.name);
			}
		} catch (error) {
			Logger.error('Ошибка при инициализации базы данных:', error);
		}
	}

	public fetchDataEos = async () => {
		try {
			const { data } = await axios
				.post<DataDto>(this.API_URL, this.DATA_TO_API)
				.then(AxiosContracts.responseContract(DataDtoSchema));

			const transformedData = data.actions.map((action: any) => ({
				trx_id: action.action_trace.trx_id,
				block_time: action.block_time,
				block_num: action.block_num,
			}));

			await this.saveData(transformedData);
		} catch (error) {
			Logger.error('Ошибка при выполнении запроса к API:', error);
		}
	};

	private async saveData(
		transformedData: Array<{ trx_id: string; block_time: string; block_num: number }>,
	) {
		const validData = transformedData.filter(action => action.block_time != null);

		if (validData.length === 0) {
			Logger.warn('Нет данных для сохранения в MongoDB');
			return;
		}

		try {
			await ChainModel.insertMany(validData);
			Logger.success('Данные успешно сохранены в MongoDB');
		} catch (error) {
			Logger.error('Ошибка при сохранении данных в MongoDB:', error);
		}
	}
}
