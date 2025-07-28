import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Log user activity to the Postgres user_logs table
 * @param {Object} param0
 * @param {string} param0.email - User email
 * @param {string} [param0.username] - Username (optional)
 * @param {string} param0.url - Request URL
 * @param {string} param0.method - HTTP method
 */
export async function logUserActivityToDb({ email, username, url, method }) {
  try {
    await prisma.userLog.create({
      data: {
        email,
        username,
        url,
        method,
      },
    });
  } catch (err) {
    // Optionally log to file if DB fails
    // console.error('Failed to log user activity to DB:', err);
  }
}
