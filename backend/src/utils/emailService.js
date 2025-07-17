import moment from 'moment';
import nodemailer from 'nodemailer';

// Create transporter (you'll need to configure this with your email service)
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your preferred email service
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Email templates
const emailTemplates = {
    bookingConfirmation: (booking) => ({
        subject: `Booking Confirmed - ${booking.campingSite.name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; border-radius: 10px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px;">Booking Confirmed!</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px;">Your camping adventure awaits</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-top: 20px;">
                    <h2 style="color: #374151; margin-top: 0;">Booking Details</h2>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
                        <h3 style="color: #10b981; margin-top: 0;">${booking.campingSite.name}</h3>
                        <p style="color: #6b7280; margin: 5px 0;"><strong>Location:</strong> ${booking.campingSite.location}</p>
                        <p style="color: #6b7280; margin: 5px 0;"><strong>Type:</strong> ${booking.campingSite.type}</p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                        <div style="background: white; padding: 20px; border-radius: 8px;">
                            <h4 style="color: #374151; margin-top: 0;">Check-in</h4>
                            <p style="color: #10b981; font-size: 18px; font-weight: bold; margin: 5px 0;">
                                ${moment(booking.checkin).format('MMM DD, YYYY')}
                            </p>
                            <p style="color: #6b7280; margin: 0;">After 2:00 PM</p>
                        </div>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px;">
                            <h4 style="color: #374151; margin-top: 0;">Check-out</h4>
                            <p style="color: #10b981; font-size: 18px; font-weight: bold; margin: 5px 0;">
                                ${moment(booking.checkout).format('MMM DD, YYYY')}
                            </p>
                            <p style="color: #6b7280; margin: 0;">Before 11:00 AM</p>
                        </div>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <p style="color: #6b7280; margin: 5px 0;"><strong>Guests:</strong> ${booking.guests}</p>
                                <p style="color: #6b7280; margin: 5px 0;"><strong>Nights:</strong> ${Math.ceil((new Date(booking.checkout) - new Date(booking.checkin)) / (1000 * 60 * 60 * 24))}</p>
                            </div>
                            <div style="text-align: right;">
                                <p style="color: #6b7280; margin: 5px 0; font-size: 14px;">Total Amount</p>
                                <p style="color: #10b981; font-size: 24px; font-weight: bold; margin: 0;">$${booking.total.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 15px 0;">
                        <h4 style="color: #0369a1; margin-top: 0;">What to Bring</h4>
                        <ul style="color: #374151; margin: 10px 0; padding-left: 20px;">
                            <li>Sleeping bags and pillows</li>
                            <li>Personal toiletries</li>
                            <li>Weather-appropriate clothing</li>
                            <li>Flashlight or headlamp</li>
                            <li>First aid kit</li>
                        </ul>
                    </div>
                    
                    <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 15px 0;">
                        <h4 style="color: #d97706; margin-top: 0;">Important Information</h4>
                        <p style="color: #374151; margin: 10px 0;">
                            Please arrive at the camping site during check-in hours. 
                            If you need to modify or cancel your booking, please contact us at least 24 hours in advance.
                        </p>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px; color: #6b7280;">
                    <p>Thank you for choosing GCamping!</p>
                    <p>For any questions, contact us at support@gcamping.com</p>
                </div>
            </div>
        `
    }),

    bookingCancellation: (booking) => ({
        subject: `Booking Cancelled - ${booking.campingSite.name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 30px; border-radius: 10px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px;">Booking Cancelled</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px;">We're sorry to see you go</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-top: 20px;">
                    <h2 style="color: #374151; margin-top: 0;">Cancellation Details</h2>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
                        <h3 style="color: #ef4444; margin-top: 0;">${booking.campingSite.name}</h3>
                        <p style="color: #6b7280; margin: 5px 0;"><strong>Location:</strong> ${booking.campingSite.location}</p>
                        <p style="color: #6b7280; margin: 5px 0;"><strong>Cancelled on:</strong> ${moment().format('MMM DD, YYYY')}</p>
                    </div>
                    
                    <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 15px 0;">
                        <h4 style="color: #dc2626; margin-top: 0;">Cancellation Policy</h4>
                        <p style="color: #374151; margin: 10px 0;">
                            Your booking has been successfully cancelled. If you cancelled more than 24 hours before your check-in date, 
                            you may be eligible for a refund according to our cancellation policy.
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:5174'}/search" 
                           style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
                            Book Another Adventure
                        </a>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px; color: #6b7280;">
                    <p>We hope to see you again soon!</p>
                    <p>For any questions, contact us at support@gcamping.com</p>
                </div>
            </div>
        `
    }),

    bookingRescheduled: (booking, oldDates) => ({
        subject: `Booking Rescheduled - ${booking.campingSite.name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; border-radius: 10px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px;">Booking Rescheduled</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px;">Your dates have been updated</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-top: 20px;">
                    <h2 style="color: #374151; margin-top: 0;">Updated Booking Details</h2>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
                        <h3 style="color: #f59e0b; margin-top: 0;">${booking.campingSite.name}</h3>
                        <p style="color: #6b7280; margin: 5px 0;"><strong>Location:</strong> ${booking.campingSite.location}</p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                        <div style="background: #fef3c7; padding: 20px; border-radius: 8px;">
                            <h4 style="color: #d97706; margin-top: 0;">Previous Dates</h4>
                            <p style="color: #6b7280; margin: 5px 0;">
                                <strong>Check-in:</strong> ${moment(oldDates.checkin).format('MMM DD, YYYY')}
                            </p>
                            <p style="color: #6b7280; margin: 5px 0;">
                                <strong>Check-out:</strong> ${moment(oldDates.checkout).format('MMM DD, YYYY')}
                            </p>
                        </div>
                        
                        <div style="background: #d1fae5; padding: 20px; border-radius: 8px;">
                            <h4 style="color: #10b981; margin-top: 0;">New Dates</h4>
                            <p style="color: #6b7280; margin: 5px 0;">
                                <strong>Check-in:</strong> ${moment(booking.checkin).format('MMM DD, YYYY')}
                            </p>
                            <p style="color: #6b7280; margin: 5px 0;">
                                <strong>Check-out:</strong> ${moment(booking.checkout).format('MMM DD, YYYY')}
                            </p>
                        </div>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <p style="color: #6b7280; margin: 5px 0;"><strong>Guests:</strong> ${booking.guests}</p>
                                <p style="color: #6b7280; margin: 5px 0;"><strong>Nights:</strong> ${Math.ceil((new Date(booking.checkout) - new Date(booking.checkin)) / (1000 * 60 * 60 * 24))}</p>
                            </div>
                            <div style="text-align: right;">
                                <p style="color: #6b7280; margin: 5px 0; font-size: 14px;">Total Amount</p>
                                <p style="color: #10b981; font-size: 24px; font-weight: bold; margin: 0;">$${booking.total.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px; color: #6b7280;">
                    <p>Your booking has been successfully updated!</p>
                    <p>For any questions, contact us at support@gcamping.com</p>
                </div>
            </div>
        `
    }),

    adminNotification: (booking, action) => ({
        subject: `Booking ${action} - ${booking.campingSite.name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; padding: 30px; border-radius: 10px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px;">Booking ${action}</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px;">Admin notification</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-top: 20px;">
                    <h2 style="color: #374151; margin-top: 0;">Booking Details</h2>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
                        <h3 style="color: #6366f1; margin-top: 0;">${booking.campingSite.name}</h3>
                        <p style="color: #6b7280; margin: 5px 0;"><strong>User:</strong> ${booking.user.name} (${booking.user.email})</p>
                        <p style="color: #6b7280; margin: 5px 0;"><strong>Action:</strong> ${action}</p>
                        <p style="color: #6b7280; margin: 5px 0;"><strong>Date:</strong> ${moment().format('MMM DD, YYYY HH:mm')}</p>
                    </div>
                    
                    <div style="background: #e0e7ff; padding: 20px; border-radius: 8px; margin: 15px 0;">
                        <h4 style="color: #4f46e5; margin-top: 0;">Booking Information</h4>
                        <p style="color: #374151; margin: 5px 0;"><strong>Check-in:</strong> ${moment(booking.checkin).format('MMM DD, YYYY')}</p>
                        <p style="color: #374151; margin: 5px 0;"><strong>Check-out:</strong> ${moment(booking.checkout).format('MMM DD, YYYY')}</p>
                        <p style="color: #374151; margin: 5px 0;"><strong>Guests:</strong> ${booking.guests}</p>
                        <p style="color: #374151; margin: 5px 0;"><strong>Total:</strong> $${booking.total.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        `
    })
};

export const sendEmail = async (to, template, data) => {
    try {
        const emailContent = emailTemplates[template](data);

        const mailOptions = {
            from: process.env.EMAIL_USER || 'noreply@gcamping.com',
            to: to,
            subject: emailContent.subject,
            html: emailContent.html
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result.messageId);
        return result;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export const sendBookingConfirmation = async (booking) => {
    return sendEmail(booking.user.email, 'bookingConfirmation', booking);
};

export const sendBookingCancellation = async (booking) => {
    return sendEmail(booking.user.email, 'bookingCancellation', booking);
};

export const sendBookingRescheduled = async (booking, oldDates) => {
    return sendEmail(booking.user.email, 'bookingRescheduled', booking, oldDates);
};

export const sendAdminNotification = async (booking, action) => {
    // Send to admin email (you can configure this in environment variables)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@gcamping.com';
    return sendEmail(adminEmail, 'adminNotification', booking, action);
}; 