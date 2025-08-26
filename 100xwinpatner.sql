-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 25, 2025 at 12:29 PM
-- Server version: 8.0.36
-- PHP Version: 8.3.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `100xwinpatner`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `balance` int NOT NULL,
  `password` varchar(255) NOT NULL,
  `shere_wallet` int NOT NULL DEFAULT '0',
  `leve` int NOT NULL DEFAULT '0',
  `setelment_date` date DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `telegramId` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `traffic_source` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `balance`, `password`, `shere_wallet`, `leve`, `setelment_date`, `code`, `otp`, `created_at`, `fname`, `lname`, `telegramId`, `country`, `traffic_source`) VALUES
(1, 'suraj@example.com', 0, '$2b$10$XXKMWy/A7Tkabff0XUEo4OemHvVlTqSOH7pgWKgTWwY/wvdhfGguS', 0, 0, NULL, NULL, NULL, '2025-08-18 08:57:10', NULL, NULL, NULL, NULL, NULL),
(2, 'suraj1@example.com', 0, '$2b$10$mUhT8h8aEmiFEr8nrYpaduTq0JeTRa56rCme223HjZYLY/xVj2ZCm', 0, 0, NULL, NULL, NULL, '2025-08-18 09:01:07', NULL, NULL, NULL, NULL, NULL),
(3, 'suraj12@example.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, NULL, NULL, '2025-08-18 09:10:21', NULL, NULL, NULL, NULL, NULL),
(4, 'suraj123@example.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, NULL, NULL, '2025-08-18 09:33:53', NULL, NULL, NULL, NULL, NULL),
(5, 'er.rjsurya2657114@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, NULL, NULL, '2025-08-18 09:40:34', NULL, NULL, NULL, NULL, NULL),
(6, 'er.rjsurya@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 2, '2025-08-15', '2259366695', NULL, '2025-08-18 10:08:15', NULL, NULL, NULL, NULL, NULL),
(7, 'kundan9871062254@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '5966954350', '332352', '2025-08-19 07:22:55', NULL, NULL, NULL, NULL, NULL),
(9, 'saqlainjin@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '7768835194', NULL, '2025-08-19 07:26:20', NULL, NULL, NULL, NULL, NULL),
(12, 'tect@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '7653332167', NULL, '2025-08-19 07:30:29', NULL, NULL, NULL, NULL, NULL),
(14, 'its2002kundan@gmail.com', 0, 'c33367701511b4f6020ec61ded352059', 0, 0, NULL, '1695855519', NULL, '2025-08-19 07:31:06', NULL, NULL, NULL, NULL, NULL),
(15, 'testuser@example.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '6455113161', NULL, '2025-08-19 09:57:30', NULL, NULL, NULL, NULL, NULL),
(16, 'qwertyu@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '2860416625', NULL, '2025-08-19 10:07:21', NULL, NULL, NULL, NULL, NULL),
(17, 'anoop@gmail.com', 0, 'b7a2c3b25c9441b0a38d0a874ace268b', 0, 0, NULL, '2950269989', NULL, '2025-08-19 10:12:24', NULL, NULL, NULL, NULL, NULL),
(18, 'mnbvcxz@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '9391452902', NULL, '2025-08-19 10:22:45', NULL, NULL, NULL, NULL, NULL),
(19, 'kundan98710362254@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '9124983687', NULL, '2025-08-19 10:35:31', NULL, NULL, NULL, NULL, NULL),
(20, 'kundan934871062254@gmail.com', 0, '75f34b5502bec3c609734fdf4d37fa5c', 0, 0, NULL, '4283333683', NULL, '2025-08-19 10:54:13', NULL, NULL, NULL, NULL, NULL),
(21, 'kundan9871062345254@gmail.com', 0, '827ccb0eea8a706c4c34a16891f84e7b', 0, 0, NULL, '7738263254', NULL, '2025-08-19 11:15:10', NULL, NULL, NULL, NULL, NULL),
(22, 'kundan987104567862254@gmail.com', 0, '25d55ad283aa400af464c76d713c07ad', 0, 0, NULL, '8437039764', NULL, '2025-08-19 11:22:41', NULL, NULL, NULL, NULL, NULL),
(23, 'saqlainjinnnnnn@gmail.com', 0, '25d55ad283aa400af464c76d713c07ad', 0, 0, NULL, '9326399216', NULL, '2025-08-19 11:26:50', NULL, NULL, NULL, NULL, NULL),
(24, 'surajbhai@gmail.com', 9000, '$2y$10$RXOjOvqRQRKk.VmjugDbKOBUtNuQB9722NQUPRpy.KLTSmGYC8yJS', -6625, 2, '2025-08-15', '1678302408', '918300', '2025-08-19 13:10:44', 'Suraj', 'Singh', '@suraj_telegram', 'India', 'Google Ads'),
(25, 'surajsingh@maxifysolution.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '4582647846', '144894', '2025-08-20 07:17:39', NULL, NULL, NULL, NULL, NULL),
(26, 'surajsingh11@maxifysolution.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '4639115794', NULL, '2025-08-20 11:27:05', NULL, NULL, NULL, NULL, NULL),
(27, 'surajsingh1@maxifysolution.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '9385748772', NULL, '2025-08-20 11:28:27', NULL, NULL, NULL, NULL, NULL),
(28, 'surajsingh12@maxifysolution.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '7282523658', NULL, '2025-08-20 11:31:23', NULL, NULL, NULL, NULL, NULL),
(29, 'surajsingh13@maxifysolution.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '3624263352', NULL, '2025-08-20 11:32:24', NULL, NULL, NULL, NULL, NULL),
(30, 'surya@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '9935380382', NULL, '2025-08-20 12:07:31', NULL, NULL, NULL, NULL, NULL),
(31, 'ram@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '1771278594', '170151', '2025-08-20 12:16:38', NULL, NULL, NULL, NULL, NULL),
(32, 'ram1@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '9834357370', NULL, '2025-08-20 12:19:34', NULL, NULL, NULL, NULL, NULL),
(33, 'ram00@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '4231473216', NULL, '2025-08-20 12:32:16', NULL, NULL, NULL, NULL, NULL),
(34, 'ram09@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '6210150288', NULL, '2025-08-20 12:34:43', NULL, NULL, NULL, NULL, NULL),
(35, 'ram6@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '2259842699', NULL, '2025-08-20 12:45:19', NULL, NULL, NULL, NULL, NULL),
(36, 'ram3@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '4570212121', NULL, '2025-08-20 12:47:55', NULL, NULL, NULL, NULL, NULL),
(37, 'ramy@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '1875344400', NULL, '2025-08-20 12:58:22', NULL, NULL, NULL, NULL, NULL),
(38, 'rame@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '3499325355', NULL, '2025-08-20 13:04:41', NULL, NULL, NULL, NULL, NULL),
(39, 'ramii@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '8538649652', NULL, '2025-08-20 13:05:46', NULL, NULL, NULL, NULL, NULL),
(40, 'ramew@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '8194130642', NULL, '2025-08-20 13:06:42', NULL, NULL, NULL, NULL, NULL),
(41, 'ramee@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '7389442041', NULL, '2025-08-20 13:08:51', NULL, NULL, NULL, NULL, NULL),
(42, 'ram22@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '8290784534', NULL, '2025-08-20 13:19:18', NULL, NULL, NULL, NULL, NULL),
(43, 'rjsurya2@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '2103156487', NULL, '2025-08-21 04:45:09', NULL, NULL, NULL, NULL, NULL),
(44, 'surya1@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '3633298710', '744301', '2025-08-21 05:15:34', NULL, NULL, NULL, NULL, NULL),
(45, 'surya12@mail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '4816207995', NULL, '2025-08-21 05:59:26', NULL, NULL, NULL, NULL, NULL),
(46, 'surya21@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '6957609561', NULL, '2025-08-21 06:05:40', NULL, NULL, NULL, NULL, NULL),
(47, 'surya51@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '3616616474', NULL, '2025-08-21 06:08:23', NULL, NULL, NULL, NULL, NULL),
(48, 'surajsingh21@maxifysolution.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '7150037443', NULL, '2025-08-21 06:21:29', NULL, NULL, NULL, NULL, NULL),
(49, 'surya1ee@gmail.com', 0, 'e10adc3949ba59abbe56e057f20f883e', 0, 0, NULL, '2467333853', NULL, '2025-08-21 06:23:05', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_withdrowal`
--

CREATE TABLE `user_withdrowal` (
  `id` int NOT NULL,
  `userId` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `amount` int NOT NULL DEFAULT '0',
  `usdt_address` varchar(255) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `user_withdrowal`
--

INSERT INTO `user_withdrowal` (`id`, `userId`, `email`, `amount`, `usdt_address`, `status`, `date`) VALUES
(1, 24, 'surajbhai@gmail.com', 1000, 'heyutgrhrufngfnkjfnk', 0, '2025-08-20 11:22:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_withdrowal`
--
ALTER TABLE `user_withdrowal`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `user_withdrowal`
--
ALTER TABLE `user_withdrowal`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
