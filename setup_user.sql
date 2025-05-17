-- Create user if not exists
CREATE USER IF NOT EXISTS 'event_user'@'localhost' IDENTIFIED BY 'Balo248:';

-- Grant privileges to the user for the event_booking database
GRANT ALL PRIVILEGES ON event_booking.* TO 'event_user'@'localhost';

-- Flush privileges to apply changes
FLUSH PRIVILEGES; 