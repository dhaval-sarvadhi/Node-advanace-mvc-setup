import { Request, Response, NextFunction } from 'express';
import { Logger } from '../core/Logger';
// export default function (req: Request, res: Response, next: NextFunction) {
//   Logger.info(`${res.statusCode} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
//   next();
// }
import chalk from 'chalk';

export default function (req: Request, res: Response, next: NextFunction) {
  res.on('finish', () => {
    const statusColor =
      res.statusCode >= 500 ? chalk.red :
        res.statusCode >= 400 ? chalk.yellow :
          chalk.green;

    Logger.info(
      statusColor(`${res.statusCode}`) + ` - ${req.method} ${req.originalUrl} - ${req.ip}`
    );
  });
  next();
} 