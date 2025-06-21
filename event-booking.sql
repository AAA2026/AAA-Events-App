-- Drop database if exists and create new one
DROP DATABASE IF EXISTS event_booking;
CREATE DATABASE event_booking;
USE event_booking;

-- Create Users table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Events table
CREATE TABLE Events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATETIME NOT NULL,
    venue VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    category VARCHAR(100),
    capacity INT,
    organizerId INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organizerId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Create Bookings table
CREATE TABLE Bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    eventId INT NOT NULL,
    status ENUM('confirmed', 'cancelled', 'completed') DEFAULT 'confirmed',
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (eventId) REFERENCES Events(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_user_email ON Users(email);
CREATE INDEX idx_event_date ON Events(date);
CREATE INDEX idx_booking_status ON Bookings(status);
CREATE INDEX idx_event_category ON Events(category);

-- Insert sample admin user (password: admin123)
INSERT INTO Users (username, email, password) VALUES
('admin', 'admin@example.com', '$2b$10$3euPcmQFCiblsZeEu5s7p.9BUe7i8Q5j0ZbQw5UfJqK5qK5qK5qK5');

-- Insert sample events
INSERT INTO Events (title, description, date, venue, price, category, capacity, organizerId) VALUES
('Tech Conference 2024', 
'Join us for the biggest tech conference of the year featuring the latest innovations in technology, AI, and software development.', 
'2024-06-15 09:00:00', 
'Convention Center, New York', 
299.99, 
'Technology', 
500, 
1),

('Summer Music Festival', 
'Experience the best of summer music with top artists from around the world. Food, drinks, and amazing performances!', 
'2024-07-20 14:00:00', 
'Central Park, New York', 
149.99, 
'Music', 
1000, 
1),

('Food & Wine Expo', 
'Taste the finest cuisines and wines from renowned chefs and wineries. Includes cooking demonstrations and wine tasting sessions.', 
'2024-08-10 11:00:00', 
'Grand Hotel, New York', 
79.99, 
'Food & Drink', 
300, 
1),

('Business Networking Event', 
'Connect with industry leaders and expand your professional network. Includes keynote speeches and networking sessions.', 
'2024-09-05 18:00:00', 
'Business Center, New York', 
199.99, 
'Business', 
200, 
1),

('Art Exhibition', 
'Explore contemporary art from emerging and established artists. Includes guided tours and artist meet-and-greets.', 
'2024-09-01 10:00:00', 
'Modern Art Museum, New York', 
49.99, 
'Arts', 
150, 
1);

-- Insert sample bookings
INSERT INTO Bookings (userId, eventId, status, booking_date) VALUES
(1, 1, 'confirmed', '2024-03-15 10:00:00'),
(1, 2, 'confirmed', '2024-03-15 10:30:00'),
(1, 3, 'cancelled', '2024-03-15 11:00:00');
