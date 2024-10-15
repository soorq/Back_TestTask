import { AppService } from './app.service';
import { Logger } from './utils/logger';
import cron from 'node-cron';
export class AppModule {
	constructor() {
		this.appService = new AppService();
		this.initializeCronJobs();
	}
	initializeCronJobs() {
		// Запускаем каждые 60 секунд
		cron.schedule('* * * * *', () => {
			Logger.success('Запускаем запрос данных EOS API...');
			this.appService.fetchDataEos();
		});
		return;
	}
}
