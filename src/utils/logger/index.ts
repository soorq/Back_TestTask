export class Logger {
	private static readonly COLORS = {
		green: '\x1b[32m', // Зеленый
		red: '\x1b[31m', // Красный
		yellow: '\x1b[33m', // Желтый
		reset: '\x1b[0m', // Сброс цвета
	};

	// Форматирование логов
	private static formatLog(level: string, color: string, message: string) {
		return `${color}[${level}] - ${message}${Logger.COLORS.reset}`;
	}

	public static success(message: string) {
		console.log(Logger.formatLog('УСПЕХ', Logger.COLORS.green, message));
	}

	public static error(message: string, error?: any) {
		console.error(Logger.formatLog('ОШИБКА', Logger.COLORS.red, message), error);
	}

	public static warn(message: string) {
		console.warn(Logger.formatLog('ВНИМАНИЕ', Logger.COLORS.yellow, message));
	}
}
