-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 12, 2017 at 11:45 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spreadreach22`
--

-- --------------------------------------------------------

--
-- Table structure for table `admindetails`
--

CREATE TABLE `admindetails` (
  `nodeid` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `organisationname` varchar(32) NOT NULL,
  `organisationtype` varchar(20) NOT NULL,
  `organisationlocation` varchar(32) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admindetails`
--

INSERT INTO `admindetails` (`nodeid`, `password`, `organisationname`, `organisationtype`, `organisationlocation`, `status`) VALUES
('n0001', 'apollo', 'apollo hospital', 'hospital', 'adayar', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `connections3030`
--

CREATE TABLE `connections3030` (
  `portno` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `connections8080`
--

CREATE TABLE `connections8080` (
  `portno` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `connections8080`
--

INSERT INTO `connections8080` (`portno`) VALUES
('5555');

-- --------------------------------------------------------

--
-- Table structure for table `connectionsn0001`
--

CREATE TABLE `connectionsn0001` (
  `portno` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `connectionsn0001`
--

INSERT INTO `connectionsn0001` (`portno`) VALUES
('1501');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `name` varchar(32) NOT NULL,
  `number` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`name`, `number`) VALUES
('anand', '+91 89390 80544'),
('jagan', '123456789'),
('arshad', '882821121');

-- --------------------------------------------------------

--
-- Table structure for table `lookuptable`
--

CREATE TABLE `lookuptable` (
  `query` varchar(20) NOT NULL,
  `sendto` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lookuptable`
--

INSERT INTO `lookuptable` (`query`, `sendto`) VALUES
('accident', 'hospital'),
('traffic', 'policestation'),
('traffic', 'policebooth'),
('snatch', 'policestation'),
('snatch', 'policepatrol');

-- --------------------------------------------------------

--
-- Table structure for table `queriesn0001`
--

CREATE TABLE `queriesn0001` (
  `queryno` varchar(20) DEFAULT NULL,
  `query` varchar(32) DEFAULT NULL,
  `alocation` varchar(32) DEFAULT NULL,
  `anoinjured` varchar(20) DEFAULT NULL,
  `atime` varchar(32) DEFAULT NULL,
  `avehicle` varchar(32) DEFAULT NULL,
  `slocation` varchar(32) DEFAULT NULL,
  `sinjured` varchar(20) DEFAULT NULL,
  `sno` varchar(20) DEFAULT NULL,
  `svehicle` varchar(32) DEFAULT NULL,
  `tlocation` varchar(32) DEFAULT NULL,
  `ttime` varchar(20) DEFAULT NULL,
  `tsignal` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `routertable`
--

CREATE TABLE `routertable` (
  `nodeid` varchar(32) NOT NULL,
  `destination` varchar(32) NOT NULL,
  `distance` varchar(32) NOT NULL,
  `port` varchar(4) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `routertable`
--

INSERT INTO `routertable` (`nodeid`, `destination`, `distance`, `port`, `name`) VALUES
('n111', 'policestation', '22', '3031', 'abc');

-- --------------------------------------------------------

--
-- Table structure for table `routertable8080`
--

CREATE TABLE `routertable8080` (
  `nodeid` varchar(32) NOT NULL,
  `destination` varchar(32) NOT NULL,
  `distance` varchar(32) NOT NULL,
  `port` varchar(4) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `routertable8080`
--

INSERT INTO `routertable8080` (`nodeid`, `destination`, `distance`, `port`, `name`) VALUES
('n8080', 'hospital', '4', '8080', 'apollo');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
