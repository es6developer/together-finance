CREATE DATABASE IF NOT EXISTS together_finance
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE together_finance;

CREATE TABLE IF NOT EXISTS waitlist (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  relationship_type ENUM('dating', 'engaged', 'married', 'family', 'other') NOT NULL,
  biggest_challenge ENUM(
    'tracking_shared_expenses',
    'saving_for_goals',
    'budgeting',
    'financial_transparency',
    'splitting_bills',
    'managing_debt',
    'other'
  ) NOT NULL,
  beta_tester_interest ENUM('yes', 'no') NOT NULL DEFAULT 'no',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_relationship (relationship_type),
  INDEX idx_challenge (biggest_challenge),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS page_visits (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(128) NOT NULL,
  page VARCHAR(255) NOT NULL DEFAULT '/',
  visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_session (session_id),
  INDEX idx_visited (visited_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO admin_users (username, password_hash)
VALUES ('admin', '$2b$12$LJ3m4ys3Lk0TSwHnbfOMiOXPm1Qlq5Gz8VzB1dG5e5a5b5c5d5e5f5g')
ON DUPLICATE KEY UPDATE username = username;
