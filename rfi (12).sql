-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 15, 2020 at 12:50 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rfi`
--

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `id_answer` int(11) NOT NULL,
  `id_company` int(11) NOT NULL,
  `id_variablepoint` int(11) NOT NULL,
  `answer` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`id_answer`, `id_company`, `id_variablepoint`, `answer`) VALUES
(1, 1, 2, 'ada'),
(2, 1, 4, '081999464355'),
(3, 1, 5, 'ada'),
(4, 1, 7, 'Penyedia Tower'),
(5, 1, 8, 'ada'),
(6, 1, 10, '35000000000'),
(7, 1, 11, 'disertakan'),
(8, 1, 14, 'disertakan'),
(9, 1, 17, 'disertakan'),
(10, 1, 20, '1300612389'),
(11, 1, 21, '085233263965'),
(12, 1, 22, 'wew@gmail.com'),
(13, 1, 23, 'memilih'),
(14, 1, 25, 'memilih'),
(15, 1, 27, 'memilih'),
(16, 1, 29, 'memilih'),
(17, 1, 31, 'memilih'),
(18, 1, 33, 'memilih'),
(19, 1, 35, 'memilih'),
(20, 1, 37, 'memilih'),
(21, 1, 39, 'memilih'),
(22, 1, 41, 'memilih'),
(23, 1, 43, '300'),
(24, 1, 44, 'disertakan'),
(25, 1, 47, 'Didukung sepenuhnya oleh Bank'),
(26, 1, 48, 'disertakan'),
(27, 1, 51, '4000000000'),
(28, 1, 52, 'disertakan'),
(29, 1, 55, '100'),
(30, 1, 56, 'disertakan'),
(31, 1, 59, 'Didukung sepenuhnya oleh Lender'),
(32, 1, 63, 'disertakan'),
(33, 1, 66, 'Didukung sepenuhnya oleh Pemegang Saham'),
(34, 1, 67, 'ada'),
(35, 1, 69, 'Telkom Sat'),
(36, 1, 70, 'ada'),
(37, 1, 72, 'Menyediakan Tower ke Australia'),
(38, 1, 73, 'ada'),
(39, 1, 75, 'ada'),
(40, 1, 77, 'ada'),
(41, 1, 79, 'ada'),
(42, 1, 81, 'ada'),
(43, 1, 83, 'ada'),
(44, 1, 85, 'ada'),
(45, 1, 87, 'ada'),
(46, 1, 89, '1000'),
(47, 1, 90, 'disertakan'),
(48, 1, 93, 'World Record bangun tower'),
(49, 1, 95, 'tidak_ada'),
(50, 1, 96, '-'),
(51, 1, 97, '50'),
(52, 1, 98, '5'),
(53, 1, 99, 'ada'),
(54, 1, 101, 'memiliki sertifikat CISCO'),
(55, 1, 102, 'ada'),
(56, 1, 104, 'dibagi sesuai kemampuan handle tower'),
(57, 1, 105, '3'),
(58, 1, 106, '7'),
(59, 1, 107, 'ada'),
(60, 1, 109, 'dapat menyesuaikan kebutuhan aksesoris'),
(61, 1, 110, 'ada'),
(62, 1, 112, 'Power menggunakan Solar Cell'),
(63, 1, 113, 'ada'),
(64, 1, 115, 'Sertifikat TKDN siap'),
(65, 1, 116, 'ada'),
(66, 1, 118, 'terdapat 3 gudang'),
(67, 1, 119, 'ada'),
(68, 1, 121, 'Terdapat logistik di pelabuhan'),
(69, 1, 122, 'ada'),
(70, 1, 124, 'Siap untuk Special Delivery'),
(71, 1, 125, 'ada'),
(72, 1, 127, 'terdapat RF Support Tools'),
(73, 1, 128, 'ada'),
(74, 1, 130, 'Menggunakan Enterprise Architect'),
(75, 1, 131, 'ada'),
(76, 1, 133, 'Peta Lengkap berberntuk digital'),
(77, 2, 2, 'ada'),
(78, 2, 4, '031563563256'),
(79, 2, 5, 'ada'),
(80, 2, 7, 'Penyedia Power dan Tower'),
(81, 2, 8, 'ada'),
(82, 2, 10, '35000000000'),
(83, 2, 11, 'disertakan'),
(84, 2, 14, 'disertakan'),
(85, 2, 17, 'disertakan'),
(86, 2, 20, '1300612389'),
(87, 2, 21, '081999464355'),
(88, 2, 22, 'ikeh@gmail.com'),
(89, 2, 23, 'memilih'),
(90, 2, 25, 'memilih'),
(91, 2, 27, 'memilih'),
(92, 2, 29, 'memilih'),
(93, 2, 31, 'memilih'),
(94, 2, 33, 'memilih'),
(95, 2, 35, 'memilih'),
(96, 2, 37, 'memilih'),
(97, 2, 39, 'memilih'),
(98, 2, 41, 'memilih'),
(99, 2, 43, '300'),
(100, 2, 46, 'tidak_ada'),
(101, 2, 47, 'Didukung sepenuhnya oleh Bank'),
(102, 2, 50, 'tidak_ada'),
(103, 2, 51, '4000000000'),
(104, 2, 52, 'disertakan'),
(105, 2, 55, '100'),
(106, 2, 56, 'disertakan'),
(107, 2, 59, 'Didukung sepenuhnya oleh Lender'),
(108, 2, 63, 'disertakan'),
(109, 2, 66, 'Didukung sepenuhnya oleh Pemegang Saham'),
(110, 2, 67, 'ada'),
(111, 2, 69, 'Telkom Sat'),
(112, 2, 70, 'ada'),
(113, 2, 72, 'Menyediakan Tower ke Australia'),
(114, 2, 73, 'ada'),
(115, 2, 75, 'ada'),
(116, 2, 77, 'ada'),
(117, 2, 79, 'ada'),
(118, 2, 81, 'ada'),
(119, 2, 83, 'ada'),
(120, 2, 85, 'ada'),
(121, 2, 87, 'ada'),
(122, 2, 89, '1000'),
(123, 2, 90, 'disertakan'),
(124, 2, 93, 'World Record bangun tower'),
(125, 2, 95, 'tidak_ada'),
(126, 2, 96, '-'),
(127, 2, 97, '50'),
(128, 2, 98, '5'),
(129, 2, 99, 'ada'),
(130, 2, 101, 'memiliki sertifikat CISCO'),
(131, 2, 102, 'ada'),
(132, 2, 104, 'dibagi sesuai kemampuan handle tower'),
(133, 2, 105, '3'),
(134, 2, 106, '7'),
(135, 2, 107, 'ada'),
(136, 2, 109, 'dapat menyesuaikan kebutuhan aksesoris'),
(137, 2, 110, 'ada'),
(138, 2, 112, 'Power menggunakan Solar Cell'),
(139, 2, 113, 'ada'),
(140, 2, 115, 'Sertifikat TKDN siap'),
(141, 2, 116, 'ada'),
(142, 2, 118, 'terdapat 3 gudang'),
(143, 2, 119, 'ada'),
(144, 2, 121, 'Terdapat logistik di pelabuhan'),
(145, 2, 122, 'ada'),
(146, 2, 124, 'Siap untuk Special Delivery'),
(147, 2, 125, 'ada'),
(148, 2, 127, 'terdapat RF Support Tools'),
(149, 2, 128, 'ada'),
(150, 2, 130, 'Menggunakan Enterprise Architect'),
(151, 2, 131, 'ada'),
(152, 2, 133, 'Peta Lengkap berberntuk digital');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id_company` int(11) NOT NULL,
  `nama_perusahaan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id_company`, `nama_perusahaan`) VALUES
(1, 'PT. Surya Energi Indotama'),
(2, 'Pasifik Satelit Nusantara'),
(3, 'PT. Berca');

-- --------------------------------------------------------

--
-- Table structure for table `hasil_hitung`
--

CREATE TABLE `hasil_hitung` (
  `id_hasil_hitung` int(11) NOT NULL,
  `id_company` int(11) NOT NULL,
  `id_parameter_question` int(11) NOT NULL,
  `hasil_hitung` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `parameter_question`
--

CREATE TABLE `parameter_question` (
  `id_parameter_question` int(11) NOT NULL,
  `parameter_question` varchar(255) NOT NULL,
  `bobot` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `parameter_question`
--

INSERT INTO `parameter_question` (`id_parameter_question`, `parameter_question`, `bobot`) VALUES
(1, 'Administrasi', 10),
(2, 'Peminatan Tower Power', 30),
(3, 'Financial Capability', 40),
(4, 'Pengalaman', 40),
(5, 'Team Availability', 30),
(6, 'Stock Material dan Logistik', 20),
(7, 'Peralatan yang Digunakan', 10);

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id_question` int(11) NOT NULL,
  `id_parameter_question` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `type_question` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id_question`, `id_parameter_question`, `question`, `type_question`) VALUES
(2, 1, 'Apakah ada Nomer Induk Berusaha (NIB)/ Surat Izin Usaha Perdagangan (SIUP) ?', 'radio'),
(3, 1, 'Nomer NIB / SIUP', 'input_only'),
(4, 1, 'Apakah ada Kegiatan Usaha?', 'radio'),
(5, 1, 'Jenis Kegiatan Usaha?', 'radio'),
(6, 1, 'Apakah ada Nilai Modal/Kekayaan Bersih? ', 'radio'),
(7, 1, 'Nilai Modal/Kekayaan Bersih (angka saja)', 'input_only'),
(8, 1, 'Surat Izin Usaha Jasa Konstruksi (SIUJK) Bidang Mekanikal Elektrikal', 'radio'),
(9, 1, 'Surat Izin Usaha Jasa Penunjang Tenaga Listrik', 'radio'),
(10, 1, 'Surat Izin Usaha Bidang Penyewaan Pembangkit Listrik\r\n', 'radio'),
(11, 1, 'PIC', 'input_only'),
(12, 1, 'No Telp', 'input_only'),
(13, 1, 'Email', 'input_only'),
(14, 2, 'Tower', 'radio'),
(15, 2, 'Power', 'radio'),
(16, 2, 'Tower dan Power', 'radio'),
(17, 2, 'Sumatera', 'radio'),
(18, 2, 'Kalimantan', 'radio'),
(19, 2, 'Nusa Tenggara', 'radio'),
(20, 2, 'Sulawesi', 'radio'),
(21, 2, 'Maluku', 'radio'),
(22, 2, 'Papua', 'radio'),
(23, 2, 'Papua Barat', 'radio'),
(24, 2, 'Jumlah Site yang diminati ? (angka saja)', 'input_only'),
(25, 3, 'Dukungan Bank/Jaminan Garansi Bank ?', 'radio'),
(26, 3, 'Keterangan Dukungan Bank', 'input_only'),
(27, 3, 'Apakah memiliki plafon?', 'radio'),
(28, 3, 'Jumlah plafon yang dimiliki (angka saja)', 'input_only'),
(29, 3, 'Laporan keuangan 1 tahun yang teraudit (2018)', 'radio'),
(30, 3, 'Presentase Keuangan untuk proyek BAKTI (angka saja)', 'input_only'),
(31, 3, 'Surat Dukungan Pendanaan dari Lender (Lettero Intent) ', 'radio'),
(32, 3, 'Keterangan Surat Dukungan dari Lender', 'input_only'),
(33, 3, 'Surat Dukungan Pendanaan dari Pemegang Saham', 'radio'),
(34, 3, 'Keterangan Surat Dukungan Pendanaan dari Pemegang Saham', 'input_only'),
(35, 3, 'Proyek lain selain di BAKTI ?', 'radio'),
(36, 3, 'Keterangan Proyek Lain', 'input_only'),
(37, 4, 'Lingkup Pengalaman Sejenis', 'radio'),
(38, 4, 'Keterangan Lingkup Pengalaman', 'input_only'),
(39, 4, 'Sumatera', 'radio'),
(40, 4, 'Kalimantan', 'radio'),
(41, 4, 'Nusa Tenggara', 'radio'),
(42, 4, 'Sulawesi', 'radio'),
(43, 4, 'Maluku', 'radio'),
(44, 4, 'Papua', 'radio'),
(45, 4, 'Papua Barat', 'radio'),
(46, 4, 'Kemampuan Membangun dalam 1 tahun ', 'radio'),
(47, 4, 'Jumlah kemampuan membangun dalam 1 tahun (angka saja)', 'input_only'),
(48, 4, 'Bukti Achievement Proyek Serupa', 'radio'),
(49, 4, 'Keterangan Bukti Achievement', 'input_only'),
(50, 4, 'Kendala yang dihadapi', 'radio'),
(51, 4, 'Keterangan Kendala', 'input_only'),
(52, 5, 'Jumlah Tim (angka saja)', 'input_only'),
(53, 5, 'Jumlah Personil dalam Tim (angka saja)', 'input_only'),
(54, 5, 'Memiliki Sertifikasi bagi Tim/Personel di biang masing-masing', 'radio'),
(55, 5, 'Keterangan Sertifikasi', 'input_only'),
(56, 5, 'Klasifikasi Tim (Delivery, CME, Instalasi, RF Survey dan Site)', 'radio'),
(57, 5, 'Keterangan Klasifikasi Tim', 'input_only'),
(58, 5, 'Kecepatan Mobilisasi Tim (angka saja)', 'input_only'),
(59, 5, 'Kecepatan Ramp-up Tim (angka saja)', 'input_only'),
(60, 6, 'Tower dan Aksesoris', 'radio'),
(61, 6, 'Keterangan Tower dan Aksesoris', 'input_only'),
(62, 6, 'Power Sistem, Batery dan Aksesoris', 'radio'),
(63, 6, 'Keterangan Power Sistem', 'input_only'),
(64, 6, 'Sertifikat TKDN', 'radio'),
(65, 6, 'Keterangan Sertifikat TKDN', 'input_only'),
(66, 6, 'Ketersediaan Gudang', 'radio'),
(67, 6, 'Keterangan Ketersediaan Gudang', 'input_only'),
(68, 6, 'Dukungan Logistik', 'radio'),
(69, 6, 'Keterangan Dukungan Logistik', 'input_only'),
(70, 6, 'Special Delivery', 'radio'),
(71, 6, 'Keterangan Special Delivery', 'input_only'),
(72, 7, 'RF Support Tools', 'radio'),
(73, 7, 'Keterangan RF Support Tools', 'input_only'),
(74, 7, 'Planning Tools', 'radio'),
(75, 7, 'Keterangan Planning Tools', 'input_only'),
(76, 7, 'Peta', 'radio'),
(77, 7, 'Keterangan Peta', 'input_only');

-- --------------------------------------------------------

--
-- Table structure for table `variablepoint`
--

CREATE TABLE `variablepoint` (
  `id_variablepoint` int(11) NOT NULL,
  `id_question` int(11) NOT NULL,
  `variable` varchar(255) NOT NULL,
  `point` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `variablepoint`
--

INSERT INTO `variablepoint` (`id_variablepoint`, `id_question`, `variable`, `point`) VALUES
(2, 2, 'ada', 3),
(3, 2, 'tidak_ada', 0),
(4, 3, 'input', 0),
(5, 4, 'ada', 2),
(6, 4, 'tidak_ada', 0),
(7, 5, 'input', 0),
(8, 6, 'ada', 2),
(9, 6, 'tidak_ada', 0),
(10, 7, 'input', 0),
(11, 8, 'disertakan', 1),
(12, 8, 'ada', 0.5),
(13, 8, 'tidak_ada', 0),
(14, 9, 'disertakan', 1),
(15, 9, 'ada', 0.5),
(16, 9, 'tidak_ada', 0),
(17, 10, 'disertakan', 1),
(18, 10, 'ada', 0.5),
(19, 10, 'tidak_ada', 0),
(20, 11, 'input', 0),
(21, 12, 'input', 0),
(22, 13, 'input', 0),
(23, 14, 'memilih', 0.5),
(24, 14, 'tidak_memilih', 0),
(25, 15, 'memilih', 0.5),
(26, 15, 'tidak_memilih', 0),
(27, 16, 'memilih', 0.5),
(28, 16, 'tidak_memilih', 0),
(29, 17, 'memilih', 0.5),
(30, 17, 'tidak_memilih', 0),
(31, 18, 'memilih', 0.5),
(32, 18, 'tidak_memilih', 0),
(33, 19, 'memilh', 0.5),
(34, 19, 'tidak_memilih', 0),
(35, 20, 'memilih', 0.5),
(36, 20, 'tidak_memilih', 0),
(37, 21, 'memilih', 0.5),
(38, 21, 'tidak_memilih', 0),
(39, 22, 'memilih', 0.5),
(40, 22, 'tidak_memilih', 0),
(41, 23, 'memilih', 0.5),
(42, 23, 'tidak_memilih', 0),
(43, 24, 'input', 0),
(44, 25, 'disertakan', 4),
(45, 25, 'ada', 1),
(46, 25, 'tidak_ada', 0),
(47, 26, 'input', 0),
(48, 27, 'disertakan', 3),
(49, 27, 'ada', 1),
(50, 27, 'tidak_ada', 0),
(51, 28, 'input', 0),
(52, 29, 'disertakan', 3),
(53, 29, 'ada', 1),
(54, 29, 'tidak_ada', 0),
(55, 30, 'input', 0),
(56, 31, 'disertakan', 2),
(57, 31, 'ada', 1),
(58, 31, 'tidak_ada', 0),
(59, 32, 'input', 0),
(63, 33, 'disertakan', 2),
(64, 33, 'ada', 1),
(65, 33, 'tidak_ada', 0),
(66, 34, 'input', 0),
(67, 35, 'ada', 2),
(68, 35, 'tidak_ada', 0),
(69, 36, 'input', 0),
(70, 37, 'ada', 4),
(71, 37, 'tidak_ada', 0),
(72, 38, 'input', 0),
(73, 39, 'ada', 1),
(74, 39, 'tidak_ada', 0),
(75, 40, 'ada', 1),
(76, 40, 'tidak_ada', 0),
(77, 41, 'ada', 1),
(78, 41, 'tidak_ada', 0),
(79, 42, 'ada', 1),
(80, 42, 'tidak_ada', 0),
(81, 43, 'ada', 1),
(82, 43, 'tidak_ada', 0),
(83, 44, 'ada', 1),
(84, 44, 'tidak_ada', 0),
(85, 45, 'ada', 1),
(86, 45, 'tidak_ada', 0),
(87, 46, 'ada', 4),
(88, 46, 'tidak_ada', 0),
(89, 47, 'input', 0),
(90, 48, 'disertakan', 3),
(91, 48, 'ada', 1),
(92, 48, 'tidak_ada', 0),
(93, 49, 'input', 0),
(94, 50, 'ada', 1),
(95, 50, 'tidak_ada', 2),
(96, 51, 'input', 0),
(97, 52, 'input', 0),
(98, 53, 'input', 0),
(99, 54, 'ada', 2),
(100, 54, 'tidak_ada', 0),
(101, 55, 'input', 0),
(102, 56, 'ada', 2),
(103, 56, 'tidak_ada', 0),
(104, 57, 'input', 0),
(105, 58, 'input', 0),
(106, 59, 'input', 0),
(107, 60, 'ada', 3),
(108, 60, 'tidak_ada', 1),
(109, 61, 'input', 0),
(110, 62, 'ada', 3),
(111, 62, 'tidak_ada', 1),
(112, 63, 'input', 0),
(113, 64, 'ada', 2),
(114, 64, 'tidak_ada', 1),
(115, 65, 'input', 0),
(116, 66, 'ada', 2),
(117, 66, 'tidak_ada', 1),
(118, 67, 'input', 0),
(119, 68, 'ada', 2),
(120, 68, 'tidak_ada', 1),
(121, 69, 'input', 0),
(122, 70, 'ada', 3),
(123, 70, 'tidak_ada', 1),
(124, 71, 'input', 0),
(125, 72, 'ada', 4),
(126, 72, 'tidak_ada', 1),
(127, 73, 'input', 0),
(128, 74, 'ada', 4),
(129, 74, 'tidak_ada', 1),
(130, 75, 'input', 0),
(131, 76, 'ada', 2),
(132, 76, 'tidak_ada', 1),
(133, 77, 'input', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`id_answer`),
  ADD KEY `id_company` (`id_company`),
  ADD KEY `id_variablepoint` (`id_variablepoint`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id_company`);

--
-- Indexes for table `hasil_hitung`
--
ALTER TABLE `hasil_hitung`
  ADD PRIMARY KEY (`id_hasil_hitung`),
  ADD KEY `id_company` (`id_company`),
  ADD KEY `id_parameter_question` (`id_parameter_question`);

--
-- Indexes for table `parameter_question`
--
ALTER TABLE `parameter_question`
  ADD PRIMARY KEY (`id_parameter_question`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id_question`),
  ADD KEY `type` (`id_parameter_question`);

--
-- Indexes for table `variablepoint`
--
ALTER TABLE `variablepoint`
  ADD PRIMARY KEY (`id_variablepoint`),
  ADD KEY `id_question` (`id_question`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
  MODIFY `id_answer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id_company` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hasil_hitung`
--
ALTER TABLE `hasil_hitung`
  MODIFY `id_hasil_hitung` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `parameter_question`
--
ALTER TABLE `parameter_question`
  MODIFY `id_parameter_question` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id_question` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `variablepoint`
--
ALTER TABLE `variablepoint`
  MODIFY `id_variablepoint` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`id_company`) REFERENCES `company` (`id_company`),
  ADD CONSTRAINT `answer_ibfk_2` FOREIGN KEY (`id_variablepoint`) REFERENCES `variablepoint` (`id_variablepoint`);

--
-- Constraints for table `hasil_hitung`
--
ALTER TABLE `hasil_hitung`
  ADD CONSTRAINT `hasil_hitung_ibfk_1` FOREIGN KEY (`id_company`) REFERENCES `company` (`id_company`),
  ADD CONSTRAINT `hasil_hitung_ibfk_2` FOREIGN KEY (`id_parameter_question`) REFERENCES `parameter_question` (`id_parameter_question`);

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`id_parameter_question`) REFERENCES `parameter_question` (`id_parameter_question`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `variablepoint`
--
ALTER TABLE `variablepoint`
  ADD CONSTRAINT `variablepoint_ibfk_1` FOREIGN KEY (`id_question`) REFERENCES `question` (`id_question`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
