-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.22-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for pemilihan
CREATE DATABASE IF NOT EXISTS `pemilihan` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `pemilihan`;

-- Dumping structure for table pemilihan.adminauth
CREATE TABLE IF NOT EXISTS `adminauth` (
  `token` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table pemilihan.adminauth: ~1 rows (approximately)
/*!40000 ALTER TABLE `adminauth` DISABLE KEYS */;
INSERT INTO `adminauth` (`token`) VALUES
	('xvcnlvndfsogjsoadjaxxzs');
/*!40000 ALTER TABLE `adminauth` ENABLE KEYS */;

-- Dumping structure for table pemilihan.data_mahasiswa
CREATE TABLE IF NOT EXISTS `data_mahasiswa` (
  `KTA` tinytext NOT NULL DEFAULT '1',
  `Nama` text DEFAULT NULL,
  `Profile` text DEFAULT NULL,
  `tLahir` date DEFAULT NULL,
  `Password` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  PRIMARY KEY (`KTA`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table pemilihan.data_mahasiswa: ~5 rows (approximately)
/*!40000 ALTER TABLE `data_mahasiswa` DISABLE KEYS */;
INSERT INTO `data_mahasiswa` (`KTA`, `Nama`, `Profile`, `tLahir`, `Password`, `email`) VALUES
	('M-1125', 'Mahendra Pramudita Jati', NULL, '2007-08-20', 'mobilkeren', 'dustinekcwx@gmail.com'),
	('M-2125', 'Matias Jordan Aditama', NULL, '2007-12-20', 'jordankambing', 'satetahuroti@gmail.com'),
	('M-3321', 'Marlon Galon', NULL, '2002-07-20', 'switchcase', 'budi01geming223@gmail.com'),
	('M-4425', 'Andre Saputra', NULL, '2005-12-14', 'whiletruedo', 'dustinekcwx@gmail.com'),
	('M-8540', 'Reza Auditore', NULL, '2000-03-24', 'pojok23', 'dustinekcwx@gmail.com');
/*!40000 ALTER TABLE `data_mahasiswa` ENABLE KEYS */;

-- Dumping structure for table pemilihan.user
CREATE TABLE IF NOT EXISTS `user` (
  `KTA` text NOT NULL DEFAULT '1',
  `PhotoUrl` text DEFAULT NULL,
  `Voted` int(11) DEFAULT 0,
  `VotedWho` int(11) DEFAULT 1,
  `Mengapa` text DEFAULT NULL,
  PRIMARY KEY (`KTA`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table pemilihan.user: ~5 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
