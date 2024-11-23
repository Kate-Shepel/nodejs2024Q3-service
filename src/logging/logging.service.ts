import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService {
  private errorFilePath: string = path.join(__dirname, '../../logs/error.log');
  private logFilePath: string = path.join(__dirname, '../../logs/app.log');
  private logLevel: string = process.env.LOG_LEVEL || 'info';
  private maxLogFileSize: number = parseInt(process.env.LOG_FILE_MAX_SIZE_KB || '1024', 10) * 1024;

  constructor() {
    const logDirectory = path.dirname(this.logFilePath);

    console.log(`Log directory: ${logDirectory}`);

    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory, { recursive: true });
    }
  }

  private archiveIfExceedsSize(filePath: string) {
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > this.maxLogFileSize) {
      const archivePath = `${filePath}.${Date.now()}`;
      fs.renameSync(filePath, archivePath);
    }
  }

  private createLog(filePath: string, msg: string) {
    this.archiveIfExceedsSize(filePath);
    fs.appendFileSync(filePath, msg + '\n');
  }

  log(msg: string) {
    if (this.logLevel === 'info') {
      console.log(msg);
      this.createLog(this.logFilePath, `[INFO] ${new Date().toISOString()} - ${msg}`);
    }
  }

  error(msg: string, trace?: string) {
    console.error(msg);
    this.createLog(this.errorFilePath, `[ERROR] ${new Date().toISOString()} - ${msg}`);
    if (trace) {
      this.createLog(this.errorFilePath, trace);
    }
  }

  warn(msg: string) {
    if (['info', 'warn'].includes(this.logLevel)) {
      console.warn(msg);
      this.createLog(this.logFilePath, `[WARN] ${new Date().toISOString()} - ${msg}`);
    }
  }

}
