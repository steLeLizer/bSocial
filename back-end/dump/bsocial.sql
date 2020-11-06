-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 06, 2020 at 04:33 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bsocial`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `content`, `post_id`, `user_id`, `timestamp`) VALUES
(1, 'Test comment content', 6, 14, '2020-11-05 14:46:16'),
(3, 'Test content bla bla bla', 6, 14, '2020-11-05 16:06:14'),
(4, 'Test content bla bla bla2', 6, 14, '2020-11-05 16:07:05'),
(5, 'Test content bla bla bla3', 6, 13, '2020-11-05 16:08:12'),
(6, 'Test content bla bla bla5', 6, 14, '2020-11-05 16:10:20'),
(7, 'Test content bla bla bla6', 6, 13, '2020-11-05 16:10:43'),
(8, 'Test content bla bla bla', 6, 15, '2020-11-05 17:54:16'),
(9, 'Test content bla bla bla', 6, 13, '2020-11-05 17:56:26'),
(10, 'Test content bla bla bla', 6, 14, '2020-11-05 17:56:29'),
(11, 'Test content bla bla bla', 6, 15, '2020-11-05 17:56:32'),
(12, 'Test content bla bla bla', 6, 15, '2020-11-05 19:46:52'),
(13, 'Test content bla bla bla', 6, 13, '2020-11-05 19:47:01'),
(14, 'Test content bla bla bla', 6, 14, '2020-11-05 19:47:03'),
(15, 'Test content bla bla bla', 6, 15, '2020-11-05 19:55:35'),
(16, 'Test content bla bla bla', 6, 13, '2020-11-05 19:59:32'),
(17, 'Test content bla bla bla', 6, 14, '2020-11-05 19:59:35'),
(18, 'Test content bla bla bla', 7, 15, '2020-11-05 16:22:48'),
(19, 'Test content bla bla bla 38', 6, 13, '2020-11-05 22:39:38'),
(20, 'Test content bla bla bla 39', 6, 13, '2020-11-05 22:45:35'),
(21, 'Test content bla bla bla 40', 6, 13, '2020-11-05 22:47:15'),
(22, 'Test content bla bla bla 41', 6, 13, '2020-11-05 22:47:31'),
(23, 'Test content bla bla bla 43', 6, 13, '2020-11-05 23:28:43'),
(24, 'Test content bla bla bla 44', 6, 13, '2020-11-05 23:38:36'),
(25, 'Test content bla bla bla 45', 6, 13, '2020-11-05 23:39:33'),
(26, 'Test content bla bla bla 46', 6, 13, '2020-11-05 23:40:47'),
(27, 'Test content bla bla bla 47', 6, 13, '2020-11-06 00:45:52'),
(28, 'Test content bla bla bla 48', 6, 13, '2020-11-06 00:48:56'),
(29, 'Test content bla bla bla 49', 6, 13, '2020-11-06 00:59:32'),
(30, 'Test content bla bla bla 50', 6, 13, '2020-11-06 01:05:31'),
(31, 'Test content bla bla bla 51', 6, 13, '2020-11-06 01:07:58'),
(32, 'Test content bla bla bla 52', 6, 13, '2020-11-06 01:08:26'),
(33, 'Test content bla bla bla 53', 6, 13, '2020-11-06 01:09:42'),
(34, 'Test content bla bla bla 53', 6, 13, '2020-11-06 01:10:01'),
(35, 'Test content bla bla bla 54', 6, 13, '2020-11-06 01:11:30'),
(36, 'Test content bla bla bla 55', 6, 13, '2020-11-06 01:11:57'),
(37, 'Test content bla bla bla 56', 6, 13, '2020-11-06 01:12:48'),
(38, 'Test content bla bla bla 56', 6, 13, '2020-11-06 01:13:32'),
(39, 'Test content bla bla bla 57', 6, 14, '2020-11-06 01:14:27'),
(40, 'Test content bla bla bla 58', 6, 14, '2020-11-06 01:34:07'),
(41, 'Test content bla bla bla 59', 6, 14, '2020-11-06 01:34:24'),
(42, 'Test content bla bla bla 60', 6, 14, '2020-11-06 01:39:10'),
(43, 'Test content fhjghjlglghl', 6, 14, '2020-11-06 14:23:15');

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--

CREATE TABLE `follow` (
  `id` int(11) NOT NULL,
  `follower_user_id` int(11) NOT NULL,
  `followed_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `follow`
--

INSERT INTO `follow` (`id`, `follower_user_id`, `followed_user_id`) VALUES
(1, 14, 13),
(2, 15, 14);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `received_by` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `type` enum('follow','like','comment') DEFAULT NULL,
  `content` text,
  `link` text,
  `parameters` text,
  `seen` enum('yes','no') NOT NULL DEFAULT 'no',
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `created_by`, `received_by`, `post_id`, `type`, `content`, `link`, `parameters`, `seen`, `timestamp`) VALUES
(1, 14, 13, 6, 'comment', 'Test content bla bla bla 57', '/6/39', NULL, 'yes', '2020-11-06 01:14:27'),
(2, 14, 13, 6, 'comment', 'Test content bla bla bla 58', '/6/40', NULL, 'no', '2020-11-06 01:34:07'),
(3, 14, 13, 6, 'comment', 'Test content bla bla bla 59', '/6/41', NULL, 'no', '2020-11-06 01:34:24'),
(4, 14, 13, 6, 'comment', 'Test content bla bla bla 60', '/6/42', NULL, 'no', '2020-11-06 01:39:10'),
(5, 14, 13, 6, 'comment', 'Test content fhjghjlglghl', '/6/43', NULL, 'no', '2020-11-06 14:23:15');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `content`, `user_id`, `timestamp`) VALUES
(6, 'Test content user 13', 13, '2020-11-05 00:15:38'),
(7, 'Test content user 14', 14, '2020-11-05 16:21:48'),
(8, 'Test content user 15', 15, '2020-11-05 16:21:53'),
(9, 'Test content 2 user 13', 13, '2020-11-05 16:58:29'),
(10, 'Test content 2 user 14', 14, '2020-11-05 16:58:35'),
(11, 'Test content 2 user 15', 15, '2020-11-05 16:58:40'),
(12, 'Test content 3 user 13', 13, '2020-11-05 17:13:33'),
(13, 'Test content 3 user 14', 14, '2020-11-05 17:13:39'),
(14, 'Test content 3 user 15', 15, '2020-11-05 17:13:42'),
(15, 'Test content 4 user 13', 13, '2020-11-05 17:13:48'),
(16, 'Test content 4 user 14', 14, '2020-11-05 17:13:52'),
(17, 'Test content 4 user 15', 15, '2020-11-05 17:13:56'),
(18, 'Test content 5 user 13', 13, '2020-11-05 17:14:08'),
(19, 'Test content 5 user 14', 14, '2020-11-05 17:14:12'),
(20, 'Test content 5 user 15', 15, '2020-11-05 17:14:52'),
(21, 'Test content 6 user 13', 13, '2020-11-05 17:15:05'),
(22, 'Test content 6 user 14', 14, '2020-11-05 17:15:11'),
(23, 'Test content 6 user 15', 15, '2020-11-05 17:15:15'),
(24, 'Test content 7 user 13', 13, '2020-11-05 17:15:20'),
(25, 'Test content 7 user 14', 14, '2020-11-05 17:15:24'),
(26, 'Test content 7 user 15', 15, '2020-11-05 17:15:28'),
(27, 'Test content asddsgsdg user 14', 14, '2020-11-06 00:45:22'),
(28, 'Test content dfhsdfghfgh user 14', 14, '2020-11-06 01:38:47'),
(29, 'Test content dfhsdfghfgh user 14', 14, '2020-11-06 13:38:26'),
(30, 'Test content dfhsdfghfgh user 14', 14, '2020-11-06 13:46:47'),
(31, 'Test content dhghkj user 14', 14, '2020-11-06 14:07:25'),
(32, 'Test content fkgfghkfgkh user 14', 14, '2020-11-06 14:11:10'),
(33, 'Test content shshsdhfsdjsdj user 14', 14, '2020-11-06 14:11:59'),
(34, 'Test content ghghkghk user 14', 14, '2020-11-06 14:22:24');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `email`, `password`, `status`) VALUES
(13, 'Stefan', 'Djurovic', 'stefan.dj', 'stefan.dj@gmail.com', '$2b$10$jE1S2fubCDBBqBOx4BXsweq9d3koYqN7rPGtJyt.fl5ZK5GX/FBT.', 'active'),
(14, 'Nikola', 'Test', 'nikola.t', 'nikola.t@gmail.com', '$2b$10$jE1S2fubCDBBqBOx4BXsweq9d3koYqN7rPGtJyt.fl5ZK5GX/FBT.', 'active'),
(15, 'Marko', 'Test', 'marko.t', 'marko.t@gmail.com', '$2b$10$A0ckQOxU9VxtpWTWIo626O/k1dSUwrTYBf0SGMkm2mo54n5W76InS', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id2` (`user_id`),
  ADD KEY `fk_post_id` (`post_id`);

--
-- Indexes for table `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_follower_user_id` (`follower_user_id`),
  ADD KEY `fk_followed_user_id` (`followed_user_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_created_by` (`created_by`),
  ADD KEY `fk_received_by` (`received_by`),
  ADD KEY `fk_notif_post_id` (`post_id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_columns` (`username`,`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `follow`
--
ALTER TABLE `follow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `fk_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  ADD CONSTRAINT `fk_user_id2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `fk_followed_user_id` FOREIGN KEY (`followed_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `fk_follower_user_id` FOREIGN KEY (`follower_user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `fk_created_by` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `fk_notif_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  ADD CONSTRAINT `fk_received_by` FOREIGN KEY (`received_by`) REFERENCES `user` (`id`);

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
