import winston from 'winston';

// Main logger for system logs
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

// Dedicated user activity logger
const userActivityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, userId, action, details }) => {
      return `${timestamp} [USER_ACTIVITY]: User ${userId || 'anonymous'} performed ${action} - ${message} ${details ? `(${details})` : ''}`;
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

// Helper function to log user activities
export const logUserActivity = (userId, action, message, details = null) => {
  userActivityLogger.info(message, { userId, action, details });
};

export default logger; 