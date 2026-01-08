import * as fs from 'fs';
import * as path from 'path';

export class Logger {
  private logDir = 'logs';
  private logFile = '';

  constructor() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    this.logFile = path.join(this.logDir, `test-${timestamp}.log`);
  }

  private writeLog(level: string, message: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}\n`;
    fs.appendFileSync(this.logFile, logMessage);
    console.log(logMessage.trim());
  }

  info(message: string) {
    this.writeLog('INFO', message);
  }

  error(message: string) {
    this.writeLog('ERROR', message);
  }

  debug(message: string) {
    this.writeLog('DEBUG', message);
  }

  warn(message: string) {
    this.writeLog('WARN', message);
  }
}

export const logger = new Logger();