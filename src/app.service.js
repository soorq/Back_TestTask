var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
import { DataDtoSchema } from './utils/schema';
import { ChainModel } from './models/chain.model';
import { AxiosContracts } from './utils/axios';
import { Logger } from './utils/logger';
import mongoose from 'mongoose';
import axios from 'axios';
export class AppService {
	constructor() {
		this.DATA_TO_API = { account_name: 'eosio', pos: -1, offset: -100 };
		this.API_URL = process.env.PUBLIC_API_URL;
		this.DB_URL = process.env.PUBLIC_DB_URL;
		this.fetchDataEos = () =>
			__awaiter(this, void 0, void 0, function* () {
				try {
					const { data } = yield axios
						.post(this.API_URL, this.DATA_TO_API)
						.then(AxiosContracts.responseContract(DataDtoSchema));
					const transformedData = data.actions.map(action => ({
						trx_id: action.action_trace.trx_id,
						block_time: action.block_time,
						block_num: action.block_num,
					}));
					yield this.saveData(transformedData);
				} catch (error) {
					Logger.error('Ошибка при выполнении запроса к API:', error);
				}
			});
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
	initializeDatabase() {
		return __awaiter(this, void 0, void 0, function* () {
			try {
				if (!mongoose.connection.db) {
					Logger.error('Ошибка: соединение с базой данных не установлено.');
					return;
				}
				const collections = (yield mongoose.connection.db.listCollections().toArray()) || [];
				const collectionExists = collections.some(
					collection => collection.name === ChainModel.collection.name,
				);
				if (!collectionExists) {
					yield ChainModel.init();
					Logger.success('Коллекция успешно создана: ' + ChainModel.collection.name);
				} else {
					Logger.success('Коллекция уже существует: ' + ChainModel.collection.name);
				}
			} catch (error) {
				Logger.error('Ошибка при инициализации базы данных:', error);
			}
		});
	}
	saveData(transformedData) {
		return __awaiter(this, void 0, void 0, function* () {
			const validData = transformedData.filter(action => action.block_time != null);
			if (validData.length === 0) {
				Logger.warn('Нет данных для сохранения в MongoDB');
				return;
			}
			try {
				yield ChainModel.insertMany(validData);
				Logger.success('Данные успешно сохранены в MongoDB');
			} catch (error) {
				Logger.error('Ошибка при сохранении данных в MongoDB:', error);
			}
		});
	}
}
