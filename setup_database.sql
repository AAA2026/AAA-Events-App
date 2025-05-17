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

-- Create Categories table
CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_user_email ON Users(email);
CREATE INDEX idx_event_date ON Events(date);
CREATE INDEX idx_booking_status ON Bookings(status);
CREATE INDEX idx_event_category ON Events(category);

-- Insert sample admin user (password: admin123)
INSERT INTO Users (username, email, password) VALUES
('admin', 'admin@example.com', '$2b$10$3euPcmQFCiblsZeEu5s7p.9BUe7i8Q5j0ZbQw5UfJqK5qK5qK5qK5');

-- Insert categories
INSERT INTO Categories (name, description) VALUES
('Technology', 'Events focused on technology, innovation, and digital transformation'),
('Music', 'Live performances, concerts, and musical experiences'),
('Food & Drink', 'Culinary events, tastings, and food festivals'),
('Business', 'Professional networking, conferences, and business seminars'),
('Arts', 'Art exhibitions, performances, and creative workshops'),
('Sports', 'Sporting events, tournaments, and athletic activities'),
('Education', 'Workshops, seminars, and learning opportunities'),
('Entertainment', 'Shows, performances, and entertainment events'),
('Cultural', 'Cultural celebrations, festivals, and traditional events'),
('Health & Wellness', 'Fitness classes, wellness workshops, and health seminars'),
('Family', 'Family-friendly events and activities'),
('Professional Development', 'Career growth and skill development events');

-- Insert initial events
INSERT INTO Events (title, description, date, venue, price, category, capacity, organizerId, image_url) VALUES
('Tech Conference 2024', 
'Join us for the biggest tech conference of the year featuring the latest innovations in technology, AI, and software development.', 
'2024-06-15 09:00:00', 
'Convention Center, New York', 
299.99, 
'Technology', 
500, 
1,
'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'),

('Summer Music Festival', 
'Experience the best of summer music with top artists from around the world. Food, drinks, and amazing performances!', 
'2024-07-20 14:00:00', 
'Central Park, New York', 
149.99, 
'Music', 
1000, 
1,
'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'),

-- Additional events with images
('Basketball Championship Finals', 
'Watch the thrilling finale of the city basketball championship. Experience the excitement live!', 
'2024-07-30 19:00:00', 
'Sports Arena, New York', 
89.99, 
'Sports', 
2000, 
1,
'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80'),

('Data Science Workshop', 
'Learn the fundamentals of data science, machine learning, and AI in this hands-on workshop.', 
'2024-06-25 10:00:00', 
'Tech Hub, New York', 
199.99, 
'Education', 
100, 
1,
'https://images.unsplash.com/photo-1509475826633-fed577a2c71b?auto=format&fit=crop&w=800&q=80'),

('Stand-up Comedy Night', 
'Laugh out loud with the citys best comedians. Dinner and drinks available.', 
'2024-06-20 20:00:00', 
'Comedy Club, New York', 
59.99, 
'Entertainment', 
200, 
1,
'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=800&q=80'),

('International Food Festival', 
'Experience cuisines from over 30 countries. Live cooking demonstrations and cultural performances.', 
'2024-08-20 11:00:00', 
'City Square, New York', 
25.00, 
'Cultural', 
3000, 
1,
'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'),

('Yoga and Meditation Retreat', 
'A day of relaxation and mindfulness with expert instructors. Includes healthy lunch.', 
'2024-07-05 09:00:00', 
'Wellness Center, New York', 
149.99, 
'Health & Wellness', 
80, 
1,
'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80'),

('Kids Science Fair', 
'Fun and educational science experiments for children. Great family activity!', 
'2024-07-25 10:00:00', 
'Science Museum, New York', 
19.99, 
'Family', 
400, 
1,
'https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?auto=format&fit=crop&w=800&q=80'),

('Leadership Summit 2024', 
'Learn from successful business leaders and entrepreneurs. Networking opportunities included.', 
'2024-09-10 09:00:00', 
'Business Center, New York', 
299.99, 
'Professional Development', 
250, 
1,
'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80'),

('Classical Music Concert', 
'An evening of classical masterpieces performed by the city symphony orchestra.', 
'2024-10-05 19:30:00', 
'Concert Hall, New York', 
89.99, 
'Music', 
800, 
1,
'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=800&q=80'); 