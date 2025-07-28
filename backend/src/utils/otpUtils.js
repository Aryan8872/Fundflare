import crypto from 'crypto';

// Generate a 6-digit OTP
export function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Hash the OTP using SHA256
export function hashOtp(otp) {
    return crypto.createHash('sha256').update(otp).digest('hex');
} 