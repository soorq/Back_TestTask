export class Logger {
	// Форматирование логов
	static formatLog(level, color, message) {
		return `${color}[${level}] - ${message}${Logger.COLORS.reset}`;
	}
	static success(message) {
		console.log(Logger.formatLog('УСПЕХ', Logger.COLORS.green, message));
	}
	static error(message, error) {
		console.error(Logger.formatLog('ОШИБКА', Logger.COLORS.red, message), error);
	}
	static warn(message) {
		console.warn(Logger.formatLog('ВНИМАНИЕ', Logger.COLORS.yellow, message));
	}
}
Logger.COLORS = {
	green: '\x1b[32m',
	red: '\x1b[31m',
	yellow: '\x1b[33m',
	reset: '\x1b[0m',
};
