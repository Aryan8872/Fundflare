import winston from 'winston';

// Main system logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'fundflare-backend' },
  transports: [
    new winston.transports.File({ filename: 'activity.log' }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});


export const userActivityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, userId, action, method, url, ip, details }) => {
      return `${timestamp} [USER_ACTIVITY]: IP ${ip || 'unknown'} | ${method || 'METHOD'} ${url || 'URL'} | User ${userId || 'anonymous'} performed ${action} - ${message}${details ? ` (${details})` : ''}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: 'user-activity.log' }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// New signature with full context
export const logUserActivity = (userId, action, message, details = null) => {
  logger.info(message, {
    userId,
    action,
    details,
    timestamp: new Date().toISOString(),
    service: 'fundflare-backend',
  });
};

export default logger;
