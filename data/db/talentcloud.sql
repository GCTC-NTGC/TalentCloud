CREATE DATABASE  IF NOT EXISTS `talentcloud` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `talentcloud`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: talentcloud
-- ------------------------------------------------------
-- Server version	5.6.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `application_micro_reference`
--

DROP TABLE IF EXISTS `application_micro_reference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application_micro_reference` (
  `application_micro_reference_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_poster_application_id` int(10) unsigned zerofill NOT NULL,
  `criteria_id` int(10) unsigned zerofill NOT NULL,
  `micro_reference_id` int(10) unsigned zerofill NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`application_micro_reference_id`),
  KEY `fk_application_micro_reference_application_id_idx` (`job_poster_application_id`),
  KEY `fk_application_micro_reference_criteria_id_idx` (`criteria_id`),
  KEY `fk_application_micro_reference_micro_reference_id_idx` (`micro_reference_id`),
  CONSTRAINT `fk_application_micro_reference_application_id` FOREIGN KEY (`job_poster_application_id`) REFERENCES `job_poster_application` (`job_poster_application_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_application_micro_reference_criteria_id` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`criteria_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_application_micro_reference_micro_reference_id` FOREIGN KEY (`micro_reference_id`) REFERENCES `micro_reference` (`micro_reference_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_micro_reference`
--

LOCK TABLES `application_micro_reference` WRITE;
/*!40000 ALTER TABLE `application_micro_reference` DISABLE KEYS */;
INSERT INTO `application_micro_reference` VALUES (0000000001,0000000003,0000000009,0000000001,1),(0000000002,0000000003,0000000011,0000000002,1),(0000000003,0000000005,0000000013,0000000003,1),(0000000004,0000000005,0000000014,0000000004,1),(0000000005,0000000005,0000000015,0000000005,1),(0000000006,0000000005,0000000016,0000000006,1),(0000000007,0000000005,0000000017,0000000007,1),(0000000008,0000000005,0000000018,0000000008,1),(0000000009,0000000005,0000000019,0000000009,1),(0000000010,0000000005,0000000020,0000000010,1),(0000000011,0000000004,0000000039,0000000011,1),(0000000012,0000000004,0000000037,0000000012,1),(0000000013,0000000004,0000000038,0000000013,1),(0000000014,0000000004,0000000040,0000000014,1),(0000000015,0000000004,0000000041,0000000015,1),(0000000016,0000000004,0000000042,0000000016,1),(0000000017,0000000004,0000000049,0000000017,1),(0000000018,0000000004,0000000051,0000000018,1),(0000000019,0000000004,0000000050,0000000019,1),(0000000020,0000000007,0000000037,0000000020,1),(0000000021,0000000007,0000000038,0000000021,1),(0000000022,0000000007,0000000039,0000000022,1),(0000000023,0000000007,0000000040,0000000023,1),(0000000024,0000000007,0000000041,0000000024,1),(0000000025,0000000007,0000000042,0000000025,1),(0000000026,0000000007,0000000049,0000000026,1),(0000000027,0000000007,0000000050,0000000027,1),(0000000028,0000000007,0000000051,0000000028,1),(0000000029,0000000009,0000000013,0000000029,1),(0000000030,0000000009,0000000013,0000000030,1),(0000000031,0000000009,0000000014,0000000031,1),(0000000032,0000000009,0000000015,0000000032,1),(0000000033,0000000009,0000000016,0000000033,1),(0000000034,0000000009,0000000018,0000000034,1),(0000000035,0000000009,0000000020,0000000035,1),(0000000036,0000000009,0000000017,0000000036,1),(0000000037,0000000009,0000000019,0000000037,1),(0000000038,0000000010,0000000009,0000000038,1),(0000000039,0000000010,0000000011,0000000039,1),(0000000040,0000000013,0000000037,0000000040,1),(0000000041,0000000013,0000000038,0000000041,1),(0000000042,0000000013,0000000040,0000000042,1),(0000000043,0000000013,0000000039,0000000043,1),(0000000044,0000000013,0000000041,0000000044,1),(0000000045,0000000013,0000000042,0000000045,1),(0000000046,0000000013,0000000049,0000000046,1),(0000000047,0000000013,0000000050,0000000047,1),(0000000048,0000000013,0000000051,0000000048,1),(0000000049,0000000015,0000000016,0000000049,1),(0000000050,0000000015,0000000013,0000000050,0),(0000000051,0000000015,0000000015,0000000051,1),(0000000052,0000000015,0000000014,0000000052,1),(0000000053,0000000015,0000000018,0000000053,1),(0000000054,0000000015,0000000019,0000000054,1),(0000000055,0000000015,0000000017,0000000055,1),(0000000056,0000000015,0000000020,0000000056,1),(0000000057,0000000015,0000000029,0000000057,1),(0000000058,0000000015,0000000030,0000000058,1),(0000000059,0000000015,0000000032,0000000059,1),(0000000060,0000000015,0000000031,0000000060,1),(0000000061,0000000015,0000000014,0000000061,1),(0000000062,0000000015,0000000015,0000000062,1),(0000000063,0000000012,0000000020,0000000063,1),(0000000064,0000000012,0000000018,0000000064,1),(0000000065,0000000012,0000000014,0000000065,1),(0000000066,0000000012,0000000017,0000000066,1),(0000000067,0000000012,0000000015,0000000067,1),(0000000068,0000000012,0000000016,0000000068,1),(0000000069,0000000012,0000000013,0000000069,0),(0000000070,0000000012,0000000013,0000000070,0),(0000000071,0000000012,0000000014,0000000071,1),(0000000072,0000000012,0000000015,0000000072,1),(0000000073,0000000012,0000000016,0000000073,1),(0000000074,0000000012,0000000017,0000000074,1),(0000000075,0000000012,0000000018,0000000075,1),(0000000076,0000000012,0000000019,0000000076,1),(0000000077,0000000012,0000000020,0000000077,1),(0000000078,0000000012,0000000019,0000000078,1),(0000000079,0000000017,0000000037,0000000079,1),(0000000080,0000000017,0000000040,0000000080,1),(0000000081,0000000017,0000000038,0000000081,1),(0000000082,0000000017,0000000039,0000000082,1),(0000000083,0000000017,0000000041,0000000083,1),(0000000084,0000000017,0000000042,0000000084,1),(0000000085,0000000017,0000000049,0000000085,1),(0000000086,0000000017,0000000051,0000000086,1),(0000000087,0000000017,0000000050,0000000087,1),(0000000088,0000000015,0000000015,0000000088,1),(0000000089,0000000015,0000000013,0000000089,1),(0000000090,0000000015,0000000014,0000000090,1),(0000000091,0000000015,0000000015,0000000091,1),(0000000092,0000000015,0000000016,0000000092,1),(0000000093,0000000015,0000000018,0000000093,1),(0000000094,0000000015,0000000017,0000000094,1),(0000000095,0000000015,0000000020,0000000095,1),(0000000096,0000000015,0000000019,0000000096,1),(0000000097,0000000018,0000000013,0000000097,1),(0000000098,0000000018,0000000015,0000000098,1),(0000000099,0000000018,0000000016,0000000099,1),(0000000100,0000000018,0000000014,0000000100,1),(0000000101,0000000018,0000000017,0000000101,1),(0000000102,0000000018,0000000018,0000000102,1),(0000000103,0000000018,0000000019,0000000103,1),(0000000104,0000000018,0000000020,0000000104,1),(0000000105,0000000018,0000000029,0000000105,1),(0000000106,0000000018,0000000030,0000000106,1),(0000000107,0000000018,0000000031,0000000107,1),(0000000108,0000000018,0000000032,0000000108,1);
/*!40000 ALTER TABLE `application_micro_reference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application_status`
--

DROP TABLE IF EXISTS `application_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application_status` (
  `application_status_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `application_status` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`application_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_status`
--

LOCK TABLES `application_status` WRITE;
/*!40000 ALTER TABLE `application_status` DISABLE KEYS */;
INSERT INTO `application_status` VALUES (0000000001,'Draft'),(0000000002,'Submitted'),(0000000003,'Requires Action'),(0000000004,'Under Review'),(0000000005,'Rejected');
/*!40000 ALTER TABLE `application_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application_status_details`
--

DROP TABLE IF EXISTS `application_status_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application_status_details` (
  `application_status_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `application_status_id` int(10) unsigned zerofill NOT NULL,
  `application_status_locale_id` int(10) unsigned zerofill NOT NULL,
  `application_status` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`application_status_details_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_status_details`
--

LOCK TABLES `application_status_details` WRITE;
/*!40000 ALTER TABLE `application_status_details` DISABLE KEYS */;
INSERT INTO `application_status_details` VALUES (0000000001,0000000001,0000000001,'Draft'),(0000000002,0000000001,0000000002,'Provisoire'),(0000000003,0000000002,0000000001,'Submitted'),(0000000004,0000000002,0000000002,'Soumis'),(0000000005,0000000003,0000000001,'Requires Action'),(0000000006,0000000003,0000000002,'Nécessite une action'),(0000000007,0000000004,0000000001,'Under Review'),(0000000008,0000000004,0000000002,'À l\'étude'),(0000000009,0000000005,0000000001,'Rejected'),(0000000010,0000000005,0000000002,'Rejeté');
/*!40000 ALTER TABLE `application_status_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application_work_sample`
--

DROP TABLE IF EXISTS `application_work_sample`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application_work_sample` (
  `application_work_sample_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_poster_application_id` int(10) unsigned zerofill NOT NULL,
  `criteria_id` int(10) unsigned zerofill NOT NULL,
  `work_sample_id` int(10) unsigned zerofill NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`application_work_sample_id`),
  KEY `fk_application_work_sample_application_id_idx` (`job_poster_application_id`),
  KEY `fk_application_work_sample_criteria_id_idx` (`criteria_id`),
  KEY `fk_application_work_sample_id_idx` (`work_sample_id`),
  CONSTRAINT `fk_application_work_sample_application_id` FOREIGN KEY (`job_poster_application_id`) REFERENCES `job_poster_application` (`job_poster_application_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_application_work_sample_criteria_id` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`criteria_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_application_work_sample_id` FOREIGN KEY (`work_sample_id`) REFERENCES `work_sample` (`work_sample_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_work_sample`
--

LOCK TABLES `application_work_sample` WRITE;
/*!40000 ALTER TABLE `application_work_sample` DISABLE KEYS */;
INSERT INTO `application_work_sample` VALUES (0000000001,0000000003,0000000009,0000000001,1),(0000000002,0000000003,0000000009,0000000002,1),(0000000003,0000000003,0000000011,0000000003,1),(0000000004,0000000005,0000000013,0000000004,1),(0000000005,0000000005,0000000017,0000000005,1),(0000000006,0000000005,0000000015,0000000006,1),(0000000007,0000000005,0000000014,0000000007,1),(0000000008,0000000005,0000000016,0000000008,1),(0000000009,0000000005,0000000018,0000000009,1),(0000000010,0000000005,0000000019,0000000010,1),(0000000011,0000000005,0000000020,0000000011,1),(0000000012,0000000004,0000000038,0000000012,1),(0000000013,0000000004,0000000037,0000000013,1),(0000000014,0000000004,0000000039,0000000014,1),(0000000015,0000000004,0000000040,0000000015,1),(0000000016,0000000004,0000000041,0000000016,1),(0000000017,0000000004,0000000042,0000000017,1),(0000000018,0000000004,0000000049,0000000018,1),(0000000019,0000000004,0000000050,0000000019,1),(0000000020,0000000004,0000000051,0000000020,1),(0000000021,0000000007,0000000038,0000000021,1),(0000000022,0000000007,0000000040,0000000022,1),(0000000023,0000000007,0000000037,0000000023,1),(0000000024,0000000007,0000000039,0000000024,1),(0000000025,0000000007,0000000042,0000000025,1),(0000000026,0000000007,0000000041,0000000026,1),(0000000027,0000000007,0000000049,0000000027,1),(0000000028,0000000007,0000000050,0000000028,1),(0000000029,0000000007,0000000051,0000000029,1),(0000000030,0000000009,0000000013,0000000030,1),(0000000031,0000000009,0000000014,0000000031,1),(0000000032,0000000009,0000000015,0000000032,1),(0000000033,0000000009,0000000016,0000000033,1),(0000000034,0000000009,0000000017,0000000034,1),(0000000035,0000000009,0000000018,0000000035,1),(0000000036,0000000009,0000000019,0000000036,1),(0000000037,0000000009,0000000020,0000000037,1),(0000000038,0000000010,0000000009,0000000038,1),(0000000039,0000000010,0000000011,0000000039,1),(0000000040,0000000013,0000000037,0000000040,1),(0000000041,0000000013,0000000038,0000000041,1),(0000000042,0000000013,0000000039,0000000042,1),(0000000043,0000000013,0000000040,0000000043,1),(0000000044,0000000013,0000000041,0000000044,1),(0000000045,0000000013,0000000042,0000000045,1),(0000000046,0000000013,0000000049,0000000046,1),(0000000047,0000000013,0000000050,0000000047,1),(0000000048,0000000013,0000000051,0000000048,1),(0000000049,0000000015,0000000014,0000000049,1),(0000000050,0000000015,0000000013,0000000050,1),(0000000051,0000000015,0000000015,0000000051,1),(0000000052,0000000015,0000000018,0000000052,1),(0000000053,0000000015,0000000016,0000000053,1),(0000000054,0000000015,0000000017,0000000054,1),(0000000055,0000000015,0000000019,0000000055,1),(0000000056,0000000015,0000000020,0000000056,1),(0000000057,0000000015,0000000030,0000000057,1),(0000000058,0000000015,0000000029,0000000058,1),(0000000059,0000000015,0000000031,0000000059,1),(0000000060,0000000015,0000000032,0000000060,1),(0000000061,0000000012,0000000013,0000000061,1),(0000000062,0000000012,0000000020,0000000062,1),(0000000063,0000000012,0000000014,0000000063,1),(0000000064,0000000012,0000000017,0000000064,1),(0000000065,0000000012,0000000018,0000000065,1),(0000000066,0000000012,0000000019,0000000066,1),(0000000067,0000000012,0000000015,0000000067,1),(0000000068,0000000012,0000000016,0000000068,1),(0000000069,0000000012,0000000013,0000000069,1),(0000000070,0000000012,0000000014,0000000070,1),(0000000071,0000000012,0000000015,0000000071,1),(0000000072,0000000012,0000000016,0000000072,1),(0000000073,0000000012,0000000017,0000000073,1),(0000000074,0000000012,0000000018,0000000074,1),(0000000075,0000000012,0000000019,0000000075,1),(0000000076,0000000012,0000000020,0000000076,1),(0000000077,0000000017,0000000037,0000000077,1),(0000000078,0000000017,0000000038,0000000078,1),(0000000079,0000000017,0000000039,0000000079,1),(0000000080,0000000017,0000000041,0000000080,1),(0000000081,0000000017,0000000042,0000000081,1),(0000000082,0000000017,0000000040,0000000082,1),(0000000083,0000000017,0000000050,0000000083,1),(0000000084,0000000017,0000000049,0000000084,1),(0000000085,0000000017,0000000051,0000000085,1),(0000000086,0000000015,0000000013,0000000086,1),(0000000087,0000000015,0000000014,0000000087,1),(0000000088,0000000015,0000000015,0000000088,1),(0000000089,0000000015,0000000016,0000000089,1),(0000000090,0000000015,0000000017,0000000090,1),(0000000091,0000000015,0000000018,0000000091,1),(0000000092,0000000015,0000000020,0000000092,1),(0000000093,0000000015,0000000019,0000000093,1),(0000000094,0000000018,0000000013,0000000094,1),(0000000095,0000000018,0000000014,0000000095,1),(0000000096,0000000018,0000000015,0000000096,1),(0000000097,0000000018,0000000017,0000000097,1),(0000000098,0000000018,0000000016,0000000098,1),(0000000099,0000000018,0000000018,0000000099,1),(0000000100,0000000018,0000000019,0000000100,1),(0000000101,0000000018,0000000020,0000000101,1),(0000000102,0000000018,0000000030,0000000102,1),(0000000103,0000000018,0000000029,0000000103,1),(0000000104,0000000018,0000000032,0000000104,1),(0000000105,0000000018,0000000031,0000000105,1);
/*!40000 ALTER TABLE `application_work_sample` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_content`
--

DROP TABLE IF EXISTS `base_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_content` (
  `base_content_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `base_content_type_id` int(10) unsigned zerofill NOT NULL,
  `base_content_key` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `base_content_value` longtext COLLATE utf8_unicode_ci NOT NULL,
  `base_content_locale_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`base_content_id`)
) ENGINE=InnoDB AUTO_INCREMENT=750 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_content`
--

LOCK TABLES `base_content` WRITE;
/*!40000 ALTER TABLE `base_content` DISABLE KEYS */;
INSERT INTO `base_content` VALUES (0000000001,0000000001,'title','Talent Cloud',0000000001),(0000000002,0000000001,'title','Nuage de talents',0000000002),(0000000004,0000000001,'helpLearn','Help / Learn',0000000001),(0000000005,0000000001,'helpLearn','Aide / Apprenez',0000000002),(0000000006,0000000001,'languageSelect','Français',0000000001),(0000000007,0000000001,'languageSelect','English',0000000002),(0000000008,0000000001,'loginLink','Login',0000000001),(0000000009,0000000001,'loginLink','S\'identifier',0000000002),(0000000010,0000000001,'logoutLink','Logout',0000000001),(0000000011,0000000001,'logoutLink','Se déconnecter',0000000002),(0000000012,0000000001,'registerLink','Register',0000000001),(0000000013,0000000001,'registerLink','Enregistrer',0000000002),(0000000014,0000000001,'applyNow','Apply Now',0000000001),(0000000015,0000000001,'applyNow','Appliquer maintenant',0000000002),(0000000016,0000000001,'searchPlaceholder','search',0000000001),(0000000017,0000000001,'searchPlaceholder','chercher',0000000002),(0000000018,0000000001,'homeLink','Home',0000000001),(0000000019,0000000001,'homeLink','Accueil',0000000002),(0000000020,0000000001,'profileLink','My Profile',0000000001),(0000000021,0000000001,'profileLink','Mon profil',0000000002),(0000000022,0000000001,'jobPostersLink','My Job Posters',0000000001),(0000000023,0000000001,'jobPostersLink','Mes offres d\'emploi',0000000002),(0000000024,0000000001,'teamsLink','My Teams',0000000001),(0000000025,0000000001,'teamsLink','Mes équipes',0000000002),(0000000026,0000000001,'jobNumber','Job Number',0000000001),(0000000027,0000000001,'jobNumber','Numéro d\'emploi',0000000002),(0000000028,0000000001,'jobTitle','Job Title',0000000001),(0000000029,0000000001,'jobTitle','Profession',0000000002),(0000000030,0000000001,'jobLocation','Job Location',0000000001),(0000000031,0000000001,'jobLocation','Lieu de travail',0000000002),(0000000032,0000000001,'jobCity','City',0000000001),(0000000033,0000000001,'jobCity','Ville',0000000002),(0000000034,0000000001,'jobProvince','Province',0000000001),(0000000035,0000000001,'jobProvince','Province',0000000002),(0000000036,0000000001,'jobApplicantsSoFar','applicants so far',0000000001),(0000000037,0000000001,'jobApplicantsSoFar','demandeurs jusqu\'à présent',0000000002),(0000000038,0000000001,'jobTimeToClose','until close',0000000001),(0000000039,0000000001,'jobTimeToClose','jusqu\'à la fermeture',0000000002),(0000000040,0000000001,'jobUnitsToCloseHours','hours',0000000001),(0000000041,0000000001,'jobUnitsToCloseHours','heures',0000000002),(0000000042,0000000001,'jobUnitsToCloseDays','days',0000000001),(0000000043,0000000001,'jobUnitsToCloseDays','journées',0000000002),(0000000044,0000000001,'jobUnitsToCloseMonths','months',0000000001),(0000000045,0000000001,'jobUnitsToCloseMonths','mois',0000000002),(0000000046,0000000001,'jobUntilClose','until close',0000000001),(0000000047,0000000001,'jobUntilClose','jusqu\'à la fermeture',0000000002),(0000000048,0000000001,'jobTerm','term',0000000001),(0000000049,0000000001,'jobTerm','terme',0000000002),(0000000050,0000000001,'viewButton','View',0000000001),(0000000051,0000000001,'viewButton','Vue',0000000002),(0000000052,0000000001,'jobSalaryRange','Salary range:',0000000001),(0000000053,0000000001,'jobSalaryRange','Offre d\'emploi :',0000000002),(0000000054,0000000001,'submitApplication','Submit Application',0000000001),(0000000055,0000000001,'submitApplication','Présenter une demande',0000000002),(0000000056,0000000001,'step1','About',0000000001),(0000000057,0000000001,'step1','Sur',0000000002),(0000000058,0000000001,'step2','Leadership',0000000001),(0000000059,0000000001,'step2','Direction',0000000002),(0000000060,0000000001,'step3','Other',0000000001),(0000000061,0000000001,'step3','Autre',0000000002),(0000000062,0000000001,'review','Review',0000000001),(0000000063,0000000001,'review','La revue',0000000002),(0000000064,0000000001,'goToStep2','Go to Step 2',0000000001),(0000000065,0000000001,'goToStep2','Aller à l\'étape 2',0000000002),(0000000066,0000000001,'goToStep1','Go to Step 1',0000000001),(0000000067,0000000001,'goToStep1','Aller à l\'étape 1',0000000002),(0000000068,0000000001,'goToStep3','Go to Step 3',0000000001),(0000000069,0000000001,'goToStep3','Aller à l\'étape 3',0000000002),(0000000070,0000000001,'goToReview','Go to Review',0000000001),(0000000071,0000000001,'goToReview','Aller à la revue',0000000002),(0000000072,0000000001,'createJobPosterWindowTitle','Create Job Poster',0000000001),(0000000073,0000000001,'createJobPosterWindowTitle','Créer une affiche d\'emploi',0000000002),(0000000074,0000000001,'createProfileWindowTitle','Create/Edit Profile',0000000001),(0000000075,0000000001,'createProfileWindowTitle','Créer / Modifier un profil',0000000002),(0000000076,0000000001,'requiredField','Required',0000000001),(0000000077,0000000001,'requiredField','Champs obligatoires',0000000002),(0000000078,0000000001,'submit','Submit',0000000001),(0000000079,0000000001,'submit','Soumettre',0000000002),(0000000080,0000000001,'createJobPosterSubmitInstructions','Submit to publish new job poster.',0000000001),(0000000081,0000000001,'createJobPosterSubmitInstructions','Soumettre pour publier une nouvelle affiche d\'emploi.',0000000002),(0000000082,0000000001,'generalInformation','General Information',0000000001),(0000000083,0000000001,'generalInformation','Informations générales',0000000002),(0000000084,0000000001,'aboutMe','About Me',0000000001),(0000000085,0000000001,'aboutMe','À propos de moi',0000000002),(0000000086,0000000001,'generalInformation','General Information',0000000001),(0000000087,0000000001,'generalInformation','Informations générales',0000000002),(0000000088,0000000001,'aboutMe','About Me',0000000001),(0000000089,0000000001,'aboutMe','À propos de moi',0000000002),(0000000090,0000000001,'aLittleBitAboutMe','A little bit about me',0000000001),(0000000091,0000000001,'aLittleBitAboutMe','Un peu à propos de moi',0000000002),(0000000092,0000000001,'whatImMostProudOfInCareer','What I\'m most proud of in my career',0000000001),(0000000093,0000000001,'whatImMostProudOfInCareer','Ce dont je suis le plus fier dans ma carrière',0000000002),(0000000094,0000000001,'position','Position',0000000001),(0000000095,0000000001,'position','Position',0000000002),(0000000096,0000000001,'department','Department',0000000001),(0000000097,0000000001,'department','Département',0000000002),(0000000098,0000000001,'branch','Branch',0000000001),(0000000099,0000000001,'branch','Branche',0000000002),(0000000100,0000000001,'division','Division',0000000001),(0000000101,0000000001,'division','Division',0000000002),(0000000102,0000000001,'leadershipStyle','Leadership Style',0000000001),(0000000103,0000000001,'leadershipStyle','Style de leadership',0000000002),(0000000104,0000000001,'myLeadershipStyle','My Leadership Style',0000000001),(0000000105,0000000001,'myLeadershipStyle','Mon style de leadership',0000000002),(0000000106,0000000001,'myApproachToEmployee','My approach to employee learning and development',0000000001),(0000000107,0000000001,'myApproachToEmployee','Mon approche de l\'apprentissage et du développement des employés',0000000002),(0000000108,0000000001,'myExpectationsOfEmployees','My expectations of employees',0000000001),(0000000109,0000000001,'myExpectationsOfEmployees','Mes attentes envers les employés',0000000002),(0000000110,0000000001,'myApproachToDecisionMaking','My approach to decision-making',0000000001),(0000000111,0000000001,'myApproachToDecisionMaking','Mon approche de la prise de décision',0000000002),(0000000112,0000000001,'workExperience','Work Experience',0000000001),(0000000113,0000000001,'workExperience','L\'expérience professionnelle',0000000002),(0000000114,0000000001,'education','Education',0000000001),(0000000115,0000000001,'education','Éducation',0000000002),(0000000116,0000000001,'howOftenDoYouReview','How often do you review your team\'s work before it is shared?',0000000001),(0000000117,0000000001,'howOftenDoYouReview','À quelle fréquence examinez-vous le travail de votre équipe avant de le partager?',0000000002),(0000000118,0000000001,'howOftenDoYouStayLate','How often do you get in early or stay late to get some extra work done?',0000000001),(0000000119,0000000001,'howOftenDoYouStayLate','À quelle fréquence arrivez-vous tôt ou tardez-vous à faire du travail supplémentaire?',0000000002),(0000000120,0000000001,'almostNever','Almost never',0000000001),(0000000121,0000000001,'almostNever','Presque jamais',0000000002),(0000000122,0000000001,'rarely','Rarely',0000000001),(0000000123,0000000001,'rarely','Rarement',0000000002),(0000000124,0000000001,'sometimes','Sometimes',0000000001),(0000000125,0000000001,'sometimes','Parfois',0000000002),(0000000126,0000000001,'usually','Usually',0000000001),(0000000127,0000000001,'usually','Habituellement',0000000002),(0000000128,0000000001,'almostAlways','Almost always',0000000001),(0000000129,0000000001,'almostAlways','Presque toujours',0000000002),(0000000130,0000000001,'name','Name',0000000001),(0000000131,0000000001,'name','Nom',0000000002),(0000000132,0000000001,'at','at',0000000001),(0000000133,0000000001,'at','à',0000000002),(0000000134,0000000001,'howOftenDoYouEngage','How often do you engage your team before responding to management?',0000000001),(0000000135,0000000001,'howOftenDoYouEngage','À quelle fréquence engagez-vous votre équipe avant de répondre à la direction?',0000000002),(0000000136,0000000001,'howOftenDoYouApproveDevelopment','How often do you approve development opportunities for your employees?',0000000001),(0000000137,0000000001,'howOftenDoYouApproveDevelopment','À quelle fréquence approuvez-vous les opportunités de développement pour vos employés?',0000000002),(0000000138,0000000001,'browseLink','Browse Jobs',0000000001),(0000000139,0000000001,'browseLink','Parcourir les travaux',0000000002),(0000000140,0000000001,'gctc','GC Talent Cloud',0000000001),(0000000141,0000000001,'gctc','Nuage de talents du GC',0000000002),(0000000142,0000000001,'canadaLink','Visit Canada.ca',0000000001),(0000000143,0000000001,'canadaLink','Visiter Canada.ca',0000000002),(0000000144,0000000001,'canadaLinkHref','https://www.canada.ca/en.html',0000000001),(0000000145,0000000001,'canadaLinkHref','https://www.canada.ca/fr.html',0000000002),(0000000146,0000000001,'taglineMain','People want meaningful work.',0000000001),(0000000147,0000000001,'taglineMain','Les gens veulent un travail valorisant.',0000000002),(0000000148,0000000001,'taglineSecondary','The jobs are not real (for now). The platform is experimental.',0000000001),(0000000149,0000000001,'taglineSecondary','Les emplois ne sont pas reels (pour l\'instant). La plateforme est expérimentale.',0000000002),(0000000150,0000000001,'taglineTertiary','Help us build a new hiring model for the Government of Canada.',0000000001),(0000000151,0000000001,'taglineTertiary','Aidez-nous à élaborer un nouveau modèle d\'embauche pour le gouvernement du Canada.',0000000002),(0000000152,0000000001,'howItWorksHeading','How It Works',0000000001),(0000000153,0000000001,'howItWorksHeading','Comment fonctionne-t- il?',0000000002),(0000000154,0000000001,'howItWorksLead','GC Talent Cloud connects you to teams and projects where you can use your unique skills to make a difference in the lives of Canadians.',0000000001),(0000000155,0000000001,'howItWorksLead','Le Nuage des talents du GC vous relie à des équipes et à des projets vous permettant d\'utiliser\nvos compétences uniques pour faire une différence dans la vie des Canadiens.',0000000002),(0000000156,0000000001,'logoSrc','/images/talent-cloud-logo_full.png',0000000001),(0000000157,0000000001,'logoSrc','/images/talent-cloud-logo_FR.png',0000000002),(0000000158,0000000001,'logoAlt','GC Talent Cloud graphic',0000000001),(0000000159,0000000001,'logoAlt','Graphique de Nuage de talents du GC',0000000002),(0000000160,0000000001,'browseTitle','Browse Jobs',0000000001),(0000000161,0000000001,'browseTitle','Parcourir les travaux',0000000002),(0000000162,0000000001,'ownYourStory','Own Your Story',0000000001),(0000000163,0000000001,'ownYourStory','Assumez votre histoire',0000000002),(0000000164,0000000001,'ownYourStoryText','Everyone is unique. Participate in a job selection process that lets you tell your story your way.',0000000001),(0000000165,0000000001,'ownYourStoryText','Chacun est unique. Participez à un processus de sélection d\'emploi qui vous permet de\nraconter votre histoire à votre façon.',0000000002),(0000000166,0000000001,'getFound','Get Found',0000000001),(0000000167,0000000001,'getFound','Sortez du lot',0000000002),(0000000168,0000000001,'getFoundText','Learn about the work environment and teams that are part of the jobs you’re interested in. Showcase your unique skills and experiences for hiring managers across the country.',0000000001),(0000000169,0000000001,'getFoundText','Renseignez-vous sur les équipes et le milieu de travail qui font partie des emplois qui\nvous intéressent. Présentez vos compétences et expériences uniques aux gestionnaires\nd’embauche partout au pays.',0000000002),(0000000170,0000000001,'contribute','Contribute',0000000001),(0000000171,0000000001,'contribute','Contribuez',0000000002),(0000000172,0000000001,'contributeText','Find meaningful work that has an impact on Canadians... and be part of the effort to design a new platform for project-based work in Government.\n',0000000001),(0000000173,0000000001,'contributeText','Trouvez un travail significatif qui a une incidence sur les Canadiens et participez à la\nconception d\'une nouvelle plateforme pour le travail axé sur les projets du\ngouvernement.',0000000002),(0000000174,0000000001,'howItWorksLeadOut','We want GC Talent Cloud to be a drive engine that allows more Canadians to have a chance to work in Government. We want diverse talent to bring new ideas that will shape programs and services across Canada.',0000000001),(0000000175,0000000001,'howItWorksLeadOut','Nous voulons voir le Nuage de talents GC devenir un moteur qui offre la chance de travailler au\ngouvernement à un plus grand nombre de Canadiens. Nous voulons des talents diversifiés qui\napportent des idées neuves et façonneront les programmes et services partout au Canada.',0000000002),(0000000176,0000000001,'howItWorksLast','Interested in chatting about a potential partnership?',0000000001),(0000000177,0000000001,'howItWorksLast','Vous voulez discuter d\'un éventuel partenariat? Communiquez avec nous!',0000000002),(0000000178,0000000001,'contactUs','Contact Us!',0000000001),(0000000179,0000000001,'contactUs','Contactez-nous!',0000000002),(0000000180,0000000001,'transcript','Transcript',0000000001),(0000000181,0000000001,'transcript','Transcription',0000000002),(0000000182,0000000001,'ourTeam','Our Team',0000000001),(0000000183,0000000001,'ourTeam','Notre équipe',0000000002),(0000000184,0000000001,'ourTeamText','We are a small but growing team of public servants passionate about the future of talent in Canada. Learn more about us and make your own contribution to GC Talent Cloud by joining us on one of these channels.',0000000001),(0000000185,0000000001,'ourTeamText','Nous formons une petite équipe en pleine croissance de fonctionnaires qui se passionnent pour\nl\'avenir du talent au Canada. Apprenez-en davantage à notre sujet et apportez votre propre\ncontribution au Nuage de talents du GC en vous joignant à nous sur l’un de ces canaux.',0000000002),(0000000186,0000000001,'announcement','This site is under construction. The jobs are not in fact real at the moment.',0000000001),(0000000187,0000000001,'announcement','Ce site est en construction. Les emplois ne sont pas réels en ce moment.',0000000002),(0000000188,0000000001,'readMore','Read More',0000000001),(0000000189,0000000001,'readMore','En Savoir Plus',0000000002),(0000000190,0000000001,'createJobApplicationWindowTitle','My Job Application',0000000001),(0000000191,0000000001,'createJobApplicationWindowTitle','Ma Demande d\'Emploi',0000000002),(0000000192,0000000001,'createJobApplicationJobTitleLabel','for the position of',0000000001),(0000000193,0000000001,'createJobApplicationJobTitleLabel','pour le position de',0000000002),(0000000194,0000000001,'createJobApplicationConfirmationPositionLabel','You have applied to the position of:',0000000001),(0000000195,0000000001,'createJobApplicationConfirmationPositionLabel','Vous avez postulé à la position de:',0000000002),(0000000196,0000000001,'jobApplicationConfirmationTrackingReminder','Track the application from your Dashboard.',0000000001),(0000000197,0000000001,'jobApplicationConfirmationTrackingReminder','Suivez l\'application sur votre Dashboard.',0000000002),(0000000198,0000000001,'continueToDashboard','Continue to Dashboard',0000000001),(0000000199,0000000001,'continueToDashboard','Continuez au Dashboard',0000000002),(0000000200,0000000001,'adminPortal','Admin Portal',0000000001),(0000000201,0000000001,'adminPortal','Portail d\'administration',0000000002),(0000000202,0000000001,'applicantPortal','Applicant Portal',0000000001),(0000000203,0000000001,'applicantPortal','Portail demandeur',0000000002),(0000000204,0000000001,'dashBoardLink','Dashboard',0000000001),(0000000205,0000000001,'dashBoardLink','Tableau de bord',0000000002),(0000000206,0000000001,'yourApplicationsTitle','Your Applications',0000000001),(0000000207,0000000001,'yourApplicationsTitle','Vos applications',0000000002),(0000000208,0000000001,'adminTagline','Changing government through it\'s people',0000000001),(0000000209,0000000001,'adminTagline','Changer le gouvernement à travers ses gens',0000000002),(0000000210,0000000001,'adminAboutMe','About Me',0000000001),(0000000211,0000000001,'adminAboutMe','À propos de moi',0000000002),(0000000212,0000000001,'adminProfilePositionLabel','Position',0000000001),(0000000213,0000000001,'adminProfilePositionLabel','Position',0000000002),(0000000214,0000000001,'adminProfileDepartmentLabel','Department',0000000001),(0000000215,0000000001,'adminProfileDepartmentLabel','Département',0000000002),(0000000216,0000000001,'adminProfileBranchLabel','Branch',0000000001),(0000000217,0000000001,'adminProfileBranchLabel','Branche',0000000002),(0000000218,0000000001,'teamCulture','Team Culture',0000000001),(0000000219,0000000001,'teamCulture','Culture d\'Équippe',0000000002),(0000000220,0000000001,'teamSize','Team size:',0000000001),(0000000221,0000000001,'teamSize','Taille d\'équippe :',0000000002),(0000000222,0000000001,'gcDirectoryLink','Meet the team in',0000000001),(0000000223,0000000001,'gcDirectoryLink','Rencontrez l\'équippe à',0000000002),(0000000224,0000000001,'teamSizePrompt','What is the size of the team?',0000000001),(0000000225,0000000001,'teamSizePrompt','Combien de personnes dans l\'équipe?',0000000002),(0000000226,0000000001,'gcDirectoryLinkPrompt','Link to the team in GC Directory',0000000001),(0000000227,0000000001,'gcDirectoryLinkPrompt','Lien à l\'équippe en GC Directory',0000000002),(0000000228,0000000001,'teamNarrativePrompt','Tell us what makes your team unique. What are your team\'s vision, values, and expectations?',0000000001),(0000000229,0000000001,'teamNarrativePrompt','Dites-nous ce qui rend votre équipe unique. Quelles sont la vision, les valeurs et les attentes de votre équipe?',0000000002),(0000000230,0000000001,'workEnvironment','Work Environment',0000000001),(0000000231,0000000001,'workEnvironment','Environnement de Travail',0000000002),(0000000232,0000000001,'remoteLocationAllowed','Remote location allowed',0000000001),(0000000233,0000000001,'remoteLocationAllowed','Emplacement distant autorisé',0000000002),(0000000234,0000000001,'teleworkAllowed','Telework allowed',0000000001),(0000000235,0000000001,'teleworkAllowed','Télétravail autorisé',0000000002),(0000000236,0000000001,'flexHoursAllowed','Flexible hours allowed',0000000001),(0000000237,0000000001,'flexHoursAllowed','Heures flexibles autorisé',0000000002),(0000000238,0000000001,'yes','Yes',0000000001),(0000000239,0000000001,'yes','Oui',0000000002),(0000000240,0000000001,'no','No',0000000001),(0000000241,0000000001,'no','Non',0000000002),(0000000242,0000000001,'physicalEnvironment','Physical Environment',0000000001),(0000000243,0000000001,'physicalEnvironment','Environment Physique',0000000002),(0000000244,0000000001,'jobReferenceId','Reference ID',0000000001),(0000000245,0000000001,'jobReferenceId','ID de référence',0000000002),(0000000246,0000000001,'openEndedQuestions','Open Ended Questions',0000000001),(0000000247,0000000001,'openEndedQuestions','Questions ouverts',0000000002),(0000000248,0000000001,'skipNavText','Skip to main content',0000000001),(0000000249,0000000001,'skipNavText','Passer au contenu principal',0000000002),(0000000250,0000000001,'profileBasicInfoEditTitle','Edit your basic info',0000000001),(0000000251,0000000001,'profileBasicInfoEditTitle','Modifier vos informations de base',0000000002),(0000000252,0000000001,'updateProfilePhotoTitle','Change Display Picture',0000000001),(0000000253,0000000001,'updateProfilePhotoTitle','Modifier l\'image affichée',0000000002),(0000000254,0000000001,'updateProfilePhotoDraggableAreaLabel','Drag New Photo',0000000001),(0000000255,0000000001,'updateProfilePhotoDraggableAreaLabel','Glisser-déposez une photo',0000000002),(0000000256,0000000001,'updateProfilePhotoDraggableAreaErrorSize','File Larger Than 2MB',0000000001),(0000000257,0000000001,'updateProfilePhotoDraggableAreaErrorSize','Fichier de plus de 2MB',0000000002),(0000000258,0000000001,'updateProfilePhotoDraggableAreaErrorType','Please Use .JPG, .JPEG, or .PNG.',0000000001),(0000000259,0000000001,'updateProfilePhotoDraggableAreaErrorType','Veuillez utiliser .JPG, .JPEG ou .PNG.',0000000002),(0000000260,0000000001,'updateProfileOrCopy','or',0000000001),(0000000261,0000000001,'updateProfileOrCopy','ou',0000000002),(0000000262,0000000001,'updateProfileChoosePhotoButtonLabelSpan','Choose File...',0000000001),(0000000263,0000000001,'updateProfileChoosePhotoButtonLabelSpan','Choisir un fichier...',0000000002),(0000000264,0000000001,'updateProfileChoosePhotoButton','User Profile Photo',0000000001),(0000000265,0000000001,'updateProfileChoosePhotoButton','Photo du profil de l\'utilisateur',0000000002),(0000000266,0000000001,'updateProfileChooseAltPhotoButtonLabelSpan','Choose Another File...',0000000001),(0000000267,0000000001,'updateProfileChooseAltPhotoButtonLabelSpan','Choisissez un autre fichier...',0000000002),(0000000268,0000000001,'updateProfileChooseAltPhotoButton','User Profile Photo',0000000001),(0000000269,0000000001,'updateProfileChooseAltPhotoButton','Photo du profil de l\'utilisateur',0000000002),(0000000270,0000000001,'updateProfilePhotoCancelButton','Remove Photo',0000000001),(0000000271,0000000001,'updateProfilePhotoCancelButton','Retirer la photo',0000000002),(0000000272,0000000001,'updateProfileApplicantProfileFormNameLabelSpan','First Name:',0000000001),(0000000273,0000000001,'updateProfileApplicantProfileFormNameLabelSpan','Prénom:',0000000002),(0000000274,0000000001,'profileEditName','profileEditFirstName',0000000001),(0000000275,0000000001,'profileEditName','profilModifierLePrénom',0000000002),(0000000276,0000000001,'updateProfileApplicantProfileFormLastNameLabelSpan','Last Name:',0000000001),(0000000277,0000000001,'updateProfileApplicantProfileFormLastNameLabelSpan','Nom de famille:',0000000002),(0000000278,0000000001,'profileEditLastName','profileEditLastName',0000000001),(0000000279,0000000001,'profileEditLastName','profilModifierLeNomDeFamille',0000000002),(0000000280,0000000001,'updateProfileApplicantProfileFormTaglineLabelSpan','Tagline',0000000001),(0000000281,0000000001,'updateProfileApplicantProfileFormTaglineLabelSpan','Slogan',0000000002),(0000000282,0000000001,'profileEditTagline','profileEditTagline',0000000001),(0000000283,0000000001,'profileEditTagline','profileModifierLeSlogan',0000000002),(0000000284,0000000001,'updateProfileApplicantProfileFormTwitterLabelSpan','Twitter Handle:',0000000001),(0000000285,0000000001,'updateProfileApplicantProfileFormTwitterLabelSpan','Nom d\'utilisateur de Twitter',0000000002),(0000000286,0000000001,'profileEditTwitter','profileEditTwitter',0000000001),(0000000287,0000000001,'profileEditTwitter','profilModifierTwitter',0000000002),(0000000288,0000000001,'updateProfileApplicantProfileFormLinkedinLabelSpan','LinkedIn Profile Address:',0000000001),(0000000289,0000000001,'updateProfileApplicantProfileFormLinkedinLabelSpan','Adresse du profil LinkedIn:',0000000002),(0000000290,0000000001,'profileEditLinkedin','profileEditLinkedin',0000000001),(0000000291,0000000001,'profileEditLinkedin','profilModifierLinkedin',0000000002),(0000000292,0000000001,'profileBasicInfoEditCancel','Cancel',0000000001),(0000000293,0000000001,'profileBasicInfoEditCancel','Annuler',0000000002),(0000000294,0000000001,'profileBasicInfoEditSave','Save',0000000001),(0000000295,0000000001,'profileBasicInfoEditSave','Enregistrer',0000000002),(0000000296,0000000001,'profilePicUploadBtn','Save',0000000001),(0000000297,0000000001,'profilePicUploadBtn','Enregistrer',0000000002),(0000000298,0000000001,'loginFormTitle','Login to TalentCloud',0000000001),(0000000299,0000000001,'loginFormTitle','Connectez-vous à TalentCloud',0000000002),(0000000300,0000000001,'loginModalCopySpan','Welcome to TalentCloud! ',0000000001),(0000000301,0000000001,'loginModalCopySpan','Bienvenue à TalentCloud! ',0000000002),(0000000302,0000000001,'switchToRegister','Don\'t have an account? Click here to register.',0000000001),(0000000303,0000000001,'switchToRegister','Vous n\'avez pas de compte? Cliquez ici pour vous inscrire.',0000000002),(0000000304,0000000001,'loginModalEmailLabelSpan','Your Email:',0000000001),(0000000305,0000000001,'loginModalEmailLabelSpan','Votre email:',0000000002),(0000000306,0000000001,'login_email','login_email',0000000001),(0000000307,0000000001,'login_email','connecter_avec_email',0000000002),(0000000308,0000000001,'loginModalPasswordLabelSpan','Your Password:',0000000001),(0000000309,0000000001,'loginModalPasswordLabelSpan','Votre mot de passe:',0000000002),(0000000310,0000000001,'login_password','login_password',0000000001),(0000000311,0000000001,'login_password','mot_de_passe',0000000002),(0000000312,0000000001,'loginFormCancelBtn','Cancel',0000000001),(0000000313,0000000001,'loginFormCancelBtn','Annuler',0000000002),(0000000314,0000000001,'loginFormLoginBtn','Login',0000000001),(0000000315,0000000001,'loginFormLoginBtn','S\'identifier',0000000002),(0000000316,0000000001,'registerFormTitle','Register for TalentCloud',0000000001),(0000000317,0000000001,'registerFormTitle','Inscrivez-vous à TalentCloud',0000000002),(0000000318,0000000001,'profileAboutMeEditTitle','Edit Your \"About Me\" Information',0000000001),(0000000319,0000000001,'profileAboutMeEditTitle','Modifier vos informations \"À propos de moi\"',0000000002),(0000000320,0000000001,'updateAboutTextareaLabelSpan','About Me:',0000000001),(0000000321,0000000001,'updateAboutTextareaLabelSpan','À propos de moi:',0000000002),(0000000322,0000000001,'profileEditAboutMe','profileEditAboutMe',0000000001),(0000000323,0000000001,'profileEditAboutMe','profilModifierÀProposDeMoi',0000000002),(0000000324,0000000001,'profileAboutMeEditCancel','Cancel',0000000001),(0000000325,0000000001,'profileAboutMeEditCancel','Annuler',0000000002),(0000000326,0000000001,'profileAboutMeEditSave','Save',0000000001),(0000000327,0000000001,'profileAboutMeEditSave','Enregistrer',0000000002),(0000000328,0000000001,'managerProfile_review_option0','I <strong>almost never</strong> review my team\'s work before it is shared.',0000000001),(0000000329,0000000001,'managerProfile_review_option0','Je ne revois <strong>presque jamais</strong> le travail de mon équipe avant qu\'il ne soit partagé.',0000000002),(0000000330,0000000001,'managerProfile_review_option1','I <strong>rarely</strong> review my team\'s work before it is shared',0000000001),(0000000331,0000000001,'managerProfile_review_option1','Je revois <strong>rarement</strong> le travail de mon équipe avant qu\'elle ne soit partagée.',0000000002),(0000000332,0000000001,'managerProfile_review_option2','I <strong>sometimes</strong> review my team\'s work before it is shared.',0000000001),(0000000333,0000000001,'managerProfile_review_option2','Je révise <strong>parfois</strong> le travail de mon équipe avant de le partager.',0000000002),(0000000334,0000000001,'managerProfile_review_option3','I <strong>usually</strong> review my team\'s work before it is shared.',0000000001),(0000000335,0000000001,'managerProfile_review_option3','J\'examine <strong>habituellement</strong> le travail de mon équipe avant de le partager',0000000002),(0000000336,0000000001,'managerProfile_review_option4','I <strong>almost always</strong> review my team\'s work before it is shared.',0000000001),(0000000337,0000000001,'managerProfile_review_option4','Je revois <strong>presque toujours</strong> le travail de votre équipe avant de le partager.',0000000002),(0000000338,0000000001,'managerProfile_stayLate_option0','I <strong>almost</strong> never get in early or stay late to get some extra work done.',0000000001),(0000000339,0000000001,'managerProfile_stayLate_option0','Je ne prends <strong>presque jamais</strong> l\'avance ou je ne reste pas en retard pour faire du travail supplémentaire.',0000000002),(0000000340,0000000001,'managerProfile_stayLate_option1','I <strong>rarely</strong> get in early or stay late to get some extra work done.',0000000001),(0000000341,0000000001,'managerProfile_stayLate_option1','J\'arrive <strong>rarement</strong> tôt ou reste en retard pour faire un peu plus de travail.',0000000002),(0000000342,0000000001,'managerProfile_stayLate_option2','I <strong>sometimes</strong> get in early or stay late to get some extra work done.',0000000001),(0000000343,0000000001,'managerProfile_stayLate_option2','<strong>Parfois</strong> j\'arrive tôt ou reste en retard pour faire du travail supplémentaire.',0000000002),(0000000344,0000000001,'managerProfile_stayLate_option3','I <strong>usually</strong> get in early or stay late to get some extra work done.',0000000001),(0000000345,0000000001,'managerProfile_stayLate_option3','<strong>Habituellement</strong>, j\'arrive tôt ou je reste tard pour faire un peu plus de travail.\n',0000000002),(0000000346,0000000001,'managerProfile_stayLate_option4','I <strong>almost always</strong> get in early or stay late to get some extra work done.',0000000001),(0000000347,0000000001,'managerProfile_stayLate_option4','J\'arrive <strong>presque toujours</strong> tôt ou je reste tard pour avoir du travail supplémentaire.\n',0000000002),(0000000348,0000000001,'managerProfile_engagement_option0','I <strong>almost never</strong> engage my team before responding to management.',0000000001),(0000000349,0000000001,'managerProfile_engagement_option0','Je n\'engage <strong>presque jamais</strong> mon équipe avant de répondre à la direction.',0000000002),(0000000350,0000000001,'managerProfile_engagement_option1','I <strong>rarely</strong> engage my team before responding to management.',0000000001),(0000000351,0000000001,'managerProfile_engagement_option1','J\'engage <strong>rarement</strong> mon équipe avant de répondre à la direction.',0000000002),(0000000352,0000000001,'managerProfile_engagement_option2','I <strong>sometimes</strong> engage my team before responding to management.',0000000001),(0000000353,0000000001,'managerProfile_engagement_option2','J\'engage <strong>parfois</strong> mon équipe avant de répondre à la direction.',0000000002),(0000000354,0000000001,'managerProfile_engagement_option4','I <strong>usually</strong> engage my team before responding to management.',0000000001),(0000000355,0000000001,'managerProfile_engagement_option4','J\'engage <strong>habituellement</strong> mon équipe avant de répondre à la direction.',0000000002),(0000000356,0000000001,'managerProfile_engagement_option4','I <strong>almost always</strong> engage my team before responding to management.',0000000001),(0000000357,0000000001,'managerProfile_engagement_option4','J\'engage <strong>presque toujours</strong> mon équipe avant de répondre à la direction.',0000000002),(0000000358,0000000001,'managerProfile_developmentOpportunities_option0','I <strong>almost never</strong> approve development opportunities for my employees.\n',0000000001),(0000000359,0000000001,'managerProfile_developmentOpportunities_option0','Je n\'approuve <strong>presque jamais</strong> les opportunités de développement pour mes employés.',0000000002),(0000000360,0000000001,'managerProfile_developmentOpportunities_option1','I <strong>rarely</strong> approve development opportunities for my employees.',0000000001),(0000000361,0000000001,'managerProfile_developmentOpportunities_option1','J\'approuve <strong>rarement</strong> les opportunités de développement pour mes employés.',0000000002),(0000000362,0000000001,'managerProfile_developmentOpportunities_option2','I <strong>sometimes</strong> approve development opportunities for my employees.',0000000001),(0000000363,0000000001,'managerProfile_developmentOpportunities_option2','J\'approuve <strong>parfois</strong> des opportunités de développement pour mes employés.\n',0000000002),(0000000364,0000000001,'managerProfile_developmentOpportunities_option3','I <strong>usually</strong> approve development opportunities for my employees.',0000000001),(0000000365,0000000001,'managerProfile_developmentOpportunities_option3','J\'approuve <strong>habituellement</strong> les opportunités de développement pour mes employés.',0000000002),(0000000366,0000000001,'managerProfile_developmentOpportunities_option4','I <strong>almost always</strong> approve development opportunities for my employees.',0000000001),(0000000367,0000000001,'managerProfile_developmentOpportunities_option4','J\'approuve <strong>presque toujours</strong> les opportunités de développement pour mes employés.',0000000002),(0000000368,0000000001,'managerProfile_engagement_option3','I <strong>usually</strong> engage my team before responding to management.',0000000001),(0000000369,0000000001,'managerProfile_engagement_option3','J\'engage <strong>habituellement</strong> mon équipe avant de répondre à la direction.',0000000002),(0000000370,0000000001,'managerProfile_engagement_option4','I <strong>almost always</strong> engage my team before responding to management.',0000000001),(0000000371,0000000001,'managerProfile_engagement_option4','J\'engage <strong>presque toujours</strong> mon équipe avant de répondre à la direction.',0000000002),(0000000372,0000000001,'managerProfile_acceptLowValueWorkRequests_option0','I <strong>almost never</strong> refuse low value work requests from management.',0000000001),(0000000373,0000000001,'managerProfile_acceptLowValueWorkRequests_option0','Je ne refuse <strong>presque jamais</strong> les demandes de travail de faible valeur de la direction.',0000000002),(0000000374,0000000001,'managerProfile_acceptLowValueWorkRequests_option1','I <strong>rarely</strong> refuse low value work requests from management.',0000000001),(0000000375,0000000001,'managerProfile_acceptLowValueWorkRequests_option1','Je refuse <strong>rarement</strong> les demandes de travail de faible valeur de la direction.',0000000002),(0000000376,0000000001,'managerProfile_acceptLowValueWorkRequests_option2','I <strong>sometimes</strong> refuse low value work requests from management.',0000000001),(0000000377,0000000001,'managerProfile_acceptLowValueWorkRequests_option2','Je refuse <strong>parfois</strong> des demandes de travail de faible valeur de la part de la direction.',0000000002),(0000000378,0000000001,'managerProfile_acceptLowValueWorkRequests_option3','I <strong>usually</strong> refuse low value work requests from management.',0000000001),(0000000379,0000000001,'managerProfile_acceptLowValueWorkRequests_option3','Je refuse <strong>habituellement</strong> les demandes de travail de faible valeur de la direction.',0000000002),(0000000380,0000000001,'managerProfile_acceptLowValueWorkRequests_option4','I almost <strong>always</strong> refuse low value work requests from management.',0000000001),(0000000381,0000000001,'managerProfile_acceptLowValueWorkRequests_option4','Je refuse <strong>presque toujours</strong> les demandes de travail de faible valeur de la direction.',0000000002),(0000000382,0000000001,'managerDecisions_tipWhatis','<strong>What is this?</strong>',0000000001),(0000000383,0000000001,'managerDecisions_tipWhatis','<strong>Qu\'est-ce que c\'est?</strong>',0000000002),(0000000384,0000000001,'managerDecisions_tipSummary','Managers are asked to rate themselves on these four criterias to let applicants better understand their managing style using the following choices: <br/> Almost never, Rarely, Sometimes, Usually, Almost Always',0000000001),(0000000385,0000000001,'managerDecisions_tipSummary','Les gestionnaires sont invités à se noter sur ces quatre critères pour permettre aux candidats de mieux comprendre leur style de gestion en utilisant les choix suivants: <br/> Presque jamais, Rarement, Parfois, Habituellement, Presque toujours',0000000002),(0000000386,0000000001,'accommodationTextStart','Please advise',0000000001),(0000000387,0000000001,'accommodationTextStart','S\'il vous plaît donnez votre avis',0000000002),(0000000388,0000000001,'accommodationTextEnd','of any accomodations you may require during the selection.',0000000001),(0000000389,0000000001,'accommodationTextEnd','de tous les logements dont vous pourriez avoir besoin pendant la sélection.',0000000002),(0000000390,0000000001,'jobPosterKeyTasksLabel','Key Tasks',0000000001),(0000000391,0000000001,'jobPosterKeyTasksLabel','Tâches clés',0000000002),(0000000392,0000000001,'jobPosterCoreCompetenciesLabel','Essential Criteria',0000000001),(0000000393,0000000001,'jobPosterCoreCompetenciesLabel','Critères essentiels',0000000002),(0000000394,0000000001,'jobPosterDevelopingCompetenciesLabel','Asset Criteria',0000000001),(0000000395,0000000001,'jobPosterDevelopingCompetenciesLabel','Critères d\'actifs',0000000002),(0000000396,0000000001,'jobPosterHiringManagerLabel','Your Manager',0000000001),(0000000397,0000000001,'jobPosterHiringManagerLabel','Votre gestionnaire',0000000002),(0000000398,0000000001,'jobPosterClearanceLevelLabel','Security clearance level:',0000000001),(0000000399,0000000001,'jobPosterClearanceLevelLabel','Niveau d\'autorisation de sécurité :',0000000002),(0000000400,0000000001,'jobPosterStartDateLabel','Target start date:',0000000001),(0000000401,0000000001,'jobPosterStartDateLabel','Niveau d\'autorisation de sécurité :',0000000002),(0000000402,0000000001,'jobPosterJobLevelLabel','Classification:',0000000001),(0000000403,0000000001,'jobPosterJobLevelLabel','Classification :',0000000002),(0000000404,0000000001,'jobPosterLanguageLabel','Language:',0000000001),(0000000405,0000000001,'jobPosterLanguageLabel','Langage :',0000000002),(0000000406,0000000001,'jobPosterTermLabel','Duration:',0000000001),(0000000407,0000000001,'jobPosterTermLabel','Duration :',0000000002),(0000000408,0000000001,'jobPosterTeamNarrativeText_label','About the team:',0000000001),(0000000409,0000000001,'jobPosterTeamNarrativeText_label','À propos de l\'équipe :',0000000002),(0000000410,0000000001,'jobPosterOperatingContext_label','Our operating context:',0000000001),(0000000411,0000000001,'jobPosterOperatingContext_label','Notre contexte d\'exploitation :',0000000002),(0000000412,0000000001,'jobPosterWhatWeValue_label','What we value:',0000000001),(0000000413,0000000001,'jobPosterWhatWeValue_label','Ce que nous apprécions :',0000000002),(0000000414,0000000001,'jobPosterHowWeWork_label','How we work:',0000000001),(0000000415,0000000001,'jobPosterHowWeWork_label','Comment nous travaillons :',0000000002),(0000000416,0000000001,'navigationHomeLink','Home',0000000001),(0000000417,0000000001,'navigationHomeLink','Accueil',0000000002),(0000000418,0000000001,'navigationBrowseLink','Browse Jobs',0000000001),(0000000419,0000000001,'navigationBrowseLink','Parcourir les emplois',0000000002),(0000000420,0000000001,'navigationDashboardLink','My Applications',0000000001),(0000000421,0000000001,'navigationDashboardLink','Mes applications',0000000002),(0000000422,0000000001,'navigationProfileLink','My Profile',0000000001),(0000000423,0000000001,'navigationProfileLink','Mon Profil',0000000002),(0000000424,0000000001,'navigationRegisterLink','Register',0000000001),(0000000425,0000000001,'navigationRegisterLink','Inscription',0000000002),(0000000426,0000000001,'navigationLoginLink','Login',0000000001),(0000000427,0000000001,'navigationLoginLink','Ouverture de session',0000000002),(0000000428,0000000001,'navigationLogoutLink','Logout',0000000001),(0000000429,0000000001,'navigationLogoutLink','Se Déconnecter',0000000002),(0000000430,0000000001,'navigationPosterLink','Create Job Poster',0000000001),(0000000431,0000000001,'navigationPosterLink','Créer une affiche d\'emploi',0000000002),(0000000432,0000000001,'browseHeroTitle','Browse Jobs',0000000001),(0000000433,0000000001,'browseHeroTitle','Parcourir les travaux',0000000002),(0000000434,0000000001,'dashboardHeroTitle','My Applications',0000000001),(0000000435,0000000001,'dashboardHeroTitle','Mes demandes',0000000002),(0000000436,0000000001,'profileHeroTitle','My Profile',0000000001),(0000000437,0000000001,'profileHeroTitle','Mon profil',0000000002),(0000000438,0000000001,'applicationHeroTitle','My Job Application',0000000001),(0000000439,0000000001,'applicationHeroTitle','Ma demande d’emploi',0000000002),(0000000440,0000000001,'managerProfileHeroTitle','Manager Profile',0000000001),(0000000441,0000000001,'managerProfileHeroTitle','Profil du gestionnaire',0000000002),(0000000442,0000000001,'posterHeroTitle','My Job Posters',0000000001),(0000000443,0000000001,'posterHeroTitle','Mes affiches',0000000002),(0000000444,0000000001,'faqHeroTitle','FAQs &amp; Information',0000000001),(0000000445,0000000001,'faqHeroTitle','FAQ et informations',0000000002),(0000000446,0000000001,'save','Save',0000000001),(0000000447,0000000001,'save','Enregistrer',0000000002),(0000000448,0000000001,'cancel','Cancel',0000000001),(0000000449,0000000001,'cancel','Annuler',0000000002),(0000000450,0000000001,'editYour','Edit your',0000000001),(0000000451,0000000001,'editYour','Modifiez votre',0000000002),(0000000452,0000000001,'jobPosterSubnavLabel','About This Job:',0000000001),(0000000453,0000000001,'jobPosterSubnavLabel','À propos de ce travail :',0000000002),(0000000454,0000000001,'jobPosterSubnavItemBasics','Basic Information',0000000001),(0000000455,0000000001,'jobPosterSubnavItemBasics','Informations de base',0000000002),(0000000456,0000000001,'jobPosterSubnavItemImpact','Impact',0000000001),(0000000457,0000000001,'jobPosterSubnavItemImpact','Impact',0000000002),(0000000458,0000000001,'jobPosterSubnavItemWork','Your Work',0000000001),(0000000459,0000000001,'jobPosterSubnavItemWork','Votre travail',0000000002),(0000000460,0000000001,'jobPosterSubnavItemCriteria','Criteria',0000000001),(0000000461,0000000001,'jobPosterSubnavItemCriteria','Critères',0000000002),(0000000462,0000000001,'jobPosterSubnavItemCulture','Culture',0000000001),(0000000463,0000000001,'jobPosterSubnavItemCulture','Culture',0000000002),(0000000464,0000000001,'jobPosterSubnavItemKnow','Need to Know',0000000001),(0000000465,0000000001,'jobPosterSubnavItemKnow','Dois savoir',0000000002),(0000000466,0000000001,'jobPosterSubnavItemApply','Apply for this Job',0000000001),(0000000467,0000000001,'jobPosterSubnavItemApply','Postuler pour ce poste',0000000002),(0000000468,0000000001,'jobPosterContentTitleBasics','Basic Information',0000000001),(0000000469,0000000001,'jobPosterContentTitleBasics','Informations de base',0000000002),(0000000470,0000000001,'jobPosterContentTitleImpact','Impact',0000000001),(0000000471,0000000001,'jobPosterContentTitleImpact','Impact',0000000002),(0000000472,0000000001,'jobPosterContentTitleWork','Your Work',0000000001),(0000000473,0000000001,'jobPosterContentTitleWork','Votre travail',0000000002),(0000000474,0000000001,'jobPosterContentTitleCriteria','Criteria',0000000001),(0000000475,0000000001,'jobPosterContentTitleCriteria','Critères',0000000002),(0000000476,0000000001,'jobPosterContentTitleCulture','Culture',0000000001),(0000000477,0000000001,'jobPosterContentTitleCulture','Culture',0000000002),(0000000478,0000000001,'jobPosterContentTitleKnow','Need to Know',0000000001),(0000000479,0000000001,'jobPosterContentTitleKnow','Dois savoir',0000000002),(0000000480,0000000001,'jobPosterContentTitleApply','Apply for this Job',0000000001),(0000000481,0000000001,'jobPosterContentTitleApply','Postuler pour ce poste',0000000002),(0000000482,0000000001,'jobPosterCoreCompetenciesLabel','Need to Have',0000000001),(0000000483,0000000001,'jobPosterCoreCompetenciesLabel','Besoin d\'avoir',0000000002),(0000000484,0000000001,'jobPosterDevelopingCompetenciesLabel','Nice to Have',0000000001),(0000000485,0000000001,'jobPosterDevelopingCompetenciesLabel','Agréable d\'avoir',0000000002),(0000000486,0000000001,'years','Years',0000000001),(0000000487,0000000001,'years','Années',0000000002),(0000000488,0000000001,'status','Status',0000000001),(0000000489,0000000001,'status','Status (FR)',0000000002),(0000000490,0000000001,'applicationPositionLabel','for the position of',0000000001),(0000000491,0000000001,'applicationPositionLabel','pour le poste de',0000000002),(0000000492,0000000001,'essentialCriteria','Essential Criteria',0000000001),(0000000493,0000000001,'essentialCriteria','Essential Criteria (FR)',0000000002),(0000000494,0000000001,'assetCriteria','Asset Criteria',0000000001),(0000000495,0000000001,'assetCriteria','Asset Criteria (FR)',0000000002),(0000000496,0000000001,'microReference','Micro-Reference',0000000001),(0000000497,0000000001,'microReference','Micro-Reference (FR)',0000000002),(0000000498,0000000001,'skillSample','Skill Sample',0000000001),(0000000499,0000000001,'skillSample','Skill Sample (FR)',0000000002),(0000000500,0000000001,'editApplication','Edit Application',0000000001),(0000000501,0000000001,'editApplication','Edit Application (FR)',0000000002),(0000000502,0000000001,'applicationPreviewProfilePhotoTitle','My profile photo.',0000000001),(0000000503,0000000001,'applicationPreviewProfilePhotoTitle','Mon photo profile.',0000000002),(0000000504,0000000001,'applicationPreviewProfileAlert','Remember that hiring managers can view your full profile when you submit an application. By filling out your profile you increase your chances of getting hired.',0000000001),(0000000505,0000000001,'applicationPreviewProfileAlert','(TRANSLATION NEEDED) Remember that hiring managers can view your full profile when you submit an application. By filling out your profile you increase your chances of getting hired.',0000000002),(0000000506,0000000001,'applicationPreviewDeclarationStoryTitle','Experience &amp; Knowledge',0000000001),(0000000507,0000000001,'applicationPreviewDeclarationStoryTitle','(TRANSLATION NEEDED) Experience &amp; Knowledge',0000000002),(0000000508,0000000001,'applicationPreviewReferenceMissing','No reference was provided.',0000000001),(0000000509,0000000001,'applicationPreviewReferenceMissing','(TRANSLATION NEEDED) No reference was provided.',0000000002),(0000000510,0000000001,'applicationPreviewSkillSampleStoryLabel','Contribution',0000000001),(0000000511,0000000001,'applicationPreviewSkillSampleStoryLabel','(TRANSLATION NEEDED) Contribution',0000000002),(0000000512,0000000001,'applicationPreviewSkillSampleLink','View Evidence',0000000001),(0000000513,0000000001,'applicationPreviewSkillSampleLink','(TRANSLATION NEEDED)View Evidence',0000000002),(0000000514,0000000001,'applicationPreviewSkillSampleMissing','No skill sample provided.',0000000001),(0000000515,0000000001,'applicationPreviewSkillSampleMissing','(TRANSLATION NEEDED) No skill sample provided.',0000000002),(0000000516,0000000001,'jobPosterTeamNarrativeText_label','Things to Know',0000000001),(0000000517,0000000001,'jobPosterTeamNarrativeText_label','À savoir',0000000002),(0000000518,0000000001,'jobPosterBackButtonText','Back to Job Poster',0000000001),(0000000519,0000000001,'jobPosterBackButtonText','Retour à l\'affiche de l\'emploi',0000000002),(0000000520,0000000001,'accommodationTextStart','Please advise',0000000001),(0000000521,0000000001,'accommodationTextStart','S\'il vous plaît donnez votre avis',0000000002),(0000000522,0000000001,'termsAndConditions','Terms and Conditions',0000000001),(0000000523,0000000001,'termsAndConditions','Modalités',0000000002),(0000000524,0000000001,'privacy','Privacy',0000000001),(0000000525,0000000001,'privacy','Protection des renseignements personnels',0000000002),(0000000526,0000000001,'canadaLink','Visit Canada.ca',0000000001),(0000000527,0000000001,'canadaLink','Visitez Canada.ca',0000000002),(0000000528,0000000001,'submitFeedbackText','Submit Feedback',0000000001),(0000000529,0000000001,'submitFeedbackText','Soumettre des commentaires',0000000002),(0000000530,0000000001,'faqHeroTitle','FAQs & Information',0000000001),(0000000531,0000000001,'faqHeroTitle','Foire aux questions et renseignements',0000000002),(0000000532,0000000001,'faqSubNavLabelCredentialing','Credentialing',0000000001),(0000000533,0000000001,'faqSubNavLabelCredentialing','Délivrance de titres et certificats',0000000002),(0000000534,0000000001,'faqSubnavWhatLevelIsMySkill','What level is my skill?',0000000001),(0000000535,0000000001,'faqSubnavWhatLevelIsMySkill','Quel est le niveau de ma compétence?',0000000002),(0000000536,0000000001,'faqSubnavWhyProvideAReference','Why provide a reference?',0000000001),(0000000537,0000000001,'faqSubnavWhyProvideAReference','Pourquoi dois-je fournir une référence?',0000000002),(0000000538,0000000001,'faqSubnavWhyShareMyWork','Why share my work?',0000000001),(0000000539,0000000001,'faqSubnavWhyShareMyWork','Pourquoi dois-je présenter mon travail?',0000000002),(0000000540,0000000001,'faqSectionTitleWhatLevelIsMySkill','What level is my skill?',0000000001),(0000000541,0000000001,'faqSectionTitleWhatLevelIsMySkill','Quel est le niveau de ma compétence?',0000000002),(0000000542,0000000001,'faqTextTitleBasic','Basic',0000000001),(0000000543,0000000001,'faqTextTitleBasic','Débutant',0000000002),(0000000544,0000000001,'faqTextCopyBasic','You demonstrate basic familiarity of the subject matter area.  Supervision and assistance is needed.',0000000001),(0000000545,0000000001,'faqTextCopyBasic','Tu as une connaissance de base du domaine spécialisé. Tu as besoin de supervision et d’aide.',0000000002),(0000000546,0000000001,'faqTextTitleIntermediate','Intermediate',0000000001),(0000000547,0000000001,'faqTextTitleIntermediate','Intermédiaire',0000000002),(0000000548,0000000001,'faqTextCopyIntermediate','You demonstrate working proficiency in the subject matter area. Minimal assistance and/or supervision is needed. ',0000000001),(0000000549,0000000001,'faqTextCopyIntermediate','Tu démontres une certaine maîtrise du domaine spécialisé. Tu as besoin d’une aide ou d’une supervision minimes.',0000000002),(0000000550,0000000001,'faqTextTitleAdvanced','Advanced',0000000001),(0000000551,0000000001,'faqTextTitleAdvanced','Avancé',0000000002),(0000000552,0000000001,'faqTextCopyAdvanced','You demonstrate in-depth proficiency sufficient to assist, consult or lead others in the subject matter area. ',0000000001),(0000000553,0000000001,'faqTextCopyAdvanced','Tu démontres une maîtrise approfondie du domaine spécialisé suffisante pour te permettre d’aider, de consulter ou de diriger d’autres personnes.',0000000002),(0000000554,0000000001,'faqTextTitleExpert','Expert',0000000001),(0000000555,0000000001,'faqTextTitleExpert','Expert',0000000002),(0000000556,0000000001,'faqTextCopyExpert','You demonstrate broad, in-depth proficiency sufficient to be broadly recognized as an authority in the subject matter area.',0000000001),(0000000557,0000000001,'faqTextCopyExpert','Tu démontres une maîtrise étendue et approfondie qui te vaut le titre de sommité dans le domaine spécialisé.',0000000002),(0000000558,0000000001,'faqSectionTitleWhyProvideAReference','Why provide a reference?',0000000001),(0000000559,0000000001,'faqSectionTitleWhyProvideAReference','Pourquoi dois-je fournir une référence?',0000000002),(0000000560,0000000001,'faqTextCopyCredentialingReferenceParagraph1','With a micro-reference, someone with first-hand knowledge of your skill vouches for your experience using the skill and the level to which you can apply it.',0000000001),(0000000561,0000000001,'faqTextCopyCredentialingReferenceParagraph1','Une micro-référence est une personne ayant une connaissance directe de votre compétence, qui atteste de votre expérience d’exécuter la compétence et du niveau auquel vous pouvez l’appliquer.',0000000002),(0000000562,0000000001,'faqTextCopyCredentialingReferenceParagraph2','The result? A credible trusted record of your skill that you can share with prospective employers time and time again.',0000000001),(0000000563,0000000001,'faqTextCopyCredentialingReferenceParagraph2','Le résultat? Un enregistrement crédible de votre compétence auquel les employeurs prospectifs peuvent toujours faire confiance.',0000000002),(0000000564,0000000001,'faqSectionTitleWhyShareMyWork','Why share my work?',0000000001),(0000000565,0000000001,'faqSectionTitleWhyShareMyWork','Pourquoi dois-je présenter mon travail.',0000000002),(0000000566,0000000001,'faqTextCopyCredentialingEvidenceParagraph1','By attaching a sample of your work that applies the skill, you are in control of what best demonstrates your expertise to prospective employers.',0000000001),(0000000567,0000000001,'faqTextCopyCredentialingEvidenceParagraph1','En fournissant un exemple du travail auquel s’applique votre compétence, vous pouvez faire une meilleure démonstration de votre expertise aux employeurs prospectifs.',0000000002),(0000000568,0000000001,'faqTextCopyCredentialingEvidenceParagraph2','The result? A personalized real-time record of your applied skills that showcases the breadth and depth of your abilities.',0000000001),(0000000569,0000000001,'faqTextCopyCredentialingEvidenceParagraph2','Le résultat? Un enregistrement personnel en temps réel de l’application de vos compétences, qui démontre la portée et le niveau de vos capacités.',0000000002),(0000000570,0000000001,'jobPosterTeamNarrativeText_label','Things to Know',0000000001),(0000000571,0000000001,'jobPosterTeamNarrativeText_label','Ce qu’il faut savoir',0000000002),(0000000572,0000000001,'jobPosterApplyButton','Apply Now',0000000001),(0000000573,0000000001,'jobPosterApplyButton','Postuler dès maintenant',0000000002),(0000000574,0000000001,'job-poster__apply-content','Please advise Talent Cloud at talent.cloud-nuage.de.talents@tbs-sct.gc.ca of any\naccomodations you may require during the application process.',0000000001),(0000000575,0000000001,'job-poster__apply-content','Veuillez informer l’équipe du nuage de talents de toute mesure d’adaptation dont vous pourriez\navez besoin au cours du processus en écrivant à talent.cloud-nuage.de.talents@tbs-sct.gc.ca.',0000000002),(0000000576,0000000001,'applicationHeroTitle','My Job Application',0000000001),(0000000577,0000000001,'applicationHeroTitle','Ma demande d’emploi',0000000002),(0000000578,0000000001,'jobApplicationPositionLabel','for the position of:',0000000001),(0000000579,0000000001,'jobApplicationPositionLabel','pour le poste de :',0000000002),(0000000580,0000000001,'applicationPreviewEssentialMenuTitle','Essential Criteria',0000000001),(0000000581,0000000001,'applicationPreviewEssentialMenuTitle','Qualifications essentielles',0000000002),(0000000582,0000000001,'applicationPreviewProfileAlert','Remember that hiring managers can view your full profile when you submit an application. By filling out your profile you increase your chances of getting hired.',0000000001),(0000000583,0000000001,'applicationPreviewProfileAlert','Sachez que lorsque vous soumettez une demande d’emploi, les gestionnaires d’embauche peuvent visualiser votre profil. En remplissant les champs dans votre profil, vous augmentez vos probabilités d’embauche.',0000000002),(0000000584,0000000001,'application-preview__alert-copy','This is my attestation that everything I say is true.',0000000001),(0000000585,0000000001,'application-preview__alert-copy','La présente est mon attestation que tout ce que je dis est vérité.',0000000002),(0000000586,0000000001,'applicationAttestationError','Please attest to the information you are providing.',0000000001),(0000000587,0000000001,'applicationAttestationError','Veuillez attester des renseignements que vous fournissez.',0000000002),(0000000588,0000000001,'application-preview__completion-warning','Please complete all steps in your application before submitting.',0000000001),(0000000589,0000000001,'application-preview__completion-warning','Veuillez achever toutes les étapes dans votre demande avant de la soumettre.',0000000002),(0000000590,0000000001,'createJobApplicationConfirmationTrackingReminder','Track the application from your Dashboard.',0000000001),(0000000591,0000000001,'createJobApplicationConfirmationTrackingReminder','Suivez le statut de votre demande à partir de votre Tableau de bord.',0000000002),(0000000592,0000000001,'createJobApplicationConfirmationContinueButton','Continue to Dashboard',0000000001),(0000000593,0000000001,'createJobApplicationConfirmationContinueButton','Continuez jusqu’au Tableau de bord',0000000002),(0000000594,0000000001,'createJobApplicationConfirmationPositionLabel','You have applied to the position of:',0000000001),(0000000595,0000000001,'createJobApplicationConfirmationPositionLabel','Vous avez posé votre candidature pour le poste de:',0000000002),(0000000596,0000000001,'applicant-evidence-preview__reference-status-label','Status',0000000001),(0000000597,0000000001,'applicant-evidence-preview__reference-status-label','État',0000000002),(0000000598,0000000001,'applicant-evidence-preview__evidence-copy-label','Contribution',0000000001),(0000000599,0000000001,'applicant-evidence-preview__evidence-copy-label','Contribution',0000000002),(0000000600,0000000001,'applicant-evidence-preview__evidence-link','View Evidence',0000000001),(0000000601,0000000001,'applicant-evidence-preview__evidence-link','Consulter les documents à l’appui',0000000002),(0000000602,0000000001,'applicationPreviewEditApplicationButton','Edit Application',0000000001),(0000000603,0000000001,'applicationPreviewEditApplicationButton','Modifier la demande',0000000002),(0000000604,0000000001,'jobApplicationPositionLabel','For the position of:',0000000001),(0000000605,0000000001,'jobApplicationPositionLabel','pour le poste de:',0000000002),(0000000606,0000000001,'applicant-evidence__skill-declaration-title','My Skill Declaration (Required)',0000000001),(0000000607,0000000001,'applicant-evidence__skill-declaration-title','Mon niveau de compétence (requis)',0000000002),(0000000608,0000000001,'applicant-evidence__expertise-radiogroup-title','My Level of Expertise',0000000001),(0000000609,0000000001,'applicant-evidence__expertise-radiogroup-title','Mon niveau d’expertise',0000000002),(0000000610,0000000001,'applicantionProgressInformationAssessment','This criteria will be assessed during the interview process.',0000000001),(0000000611,0000000001,'applicantionProgressInformationAssessment','Ces critères seront évalués pendant le processus d’entrevue.',0000000002),(0000000612,0000000001,'applicant-evidence__experience-radiogroup-title','My Years of Experience',0000000001),(0000000613,0000000001,'applicant-evidence__experience-radiogroup-title','Mes années d’expérience',0000000002),(0000000614,0000000001,'applicant-evidence__experience-and-knowledge__form-title','My Experience and Knowledge',0000000001),(0000000615,0000000001,'applicant-evidence__experience-and-knowledge__form-title','Mon expérience et mes connaissances',0000000002),(0000000616,0000000001,'applicant-evidence-done','Done!',0000000001),(0000000617,0000000001,'applicant-evidence-done','Tu as terminé!',0000000002),(0000000618,0000000001,'applicant-evidence__completion-message','This is all you need to apply. You can strengthen your claim by providing more information about your skill below.',0000000001),(0000000619,0000000001,'applicant-evidence__completion-message','Tu as entré tous les renseignements nécessaires pour postuler l’emploi. Tu peux maintenant renforcer ta demande d’emploi en fournissant plus de renseignements sur tes compétences ci-dessous.',0000000002),(0000000622,0000000001,'applicant-evidence__micro-reference-title','Micro-reference (Optional)',0000000001),(0000000623,0000000001,'applicant-evidence__micro-reference-title','Référence rapide (facultatif)',0000000002),(0000000624,0000000001,'applicant-evidence__appoint-reference-label','Appoint one reference that can vouch for you.',0000000001),(0000000625,0000000001,'applicant-evidence__appoint-reference-label','Nomme une personne-ressource qui peut recommander ta candidature.',0000000002),(0000000626,0000000001,'applicant-evidence__reference-name','Reference\'s Name:',0000000001),(0000000627,0000000001,'applicant-evidence__reference-name','Nom de la personne-ressource:',0000000002),(0000000628,0000000001,'applicant-evidence__reference-email','Reference\'s Email:',0000000001),(0000000629,0000000001,'applicant-evidence__reference-email','Courriel de la personne-ressource:',0000000002),(0000000630,0000000001,'applicant-evidence__reference-relationship','Your Relationship to this Reference:',0000000001),(0000000631,0000000001,'applicant-evidence__reference-relationship','Ta relation de travail avec cette personne :',0000000002),(0000000632,0000000001,'applicant-evidence__observed-from','Observed From:',0000000001),(0000000633,0000000001,'applicant-evidence__observed-from','Date de début de ta relation de travail avec cette personne:',0000000002),(0000000634,0000000001,'applicant-evidence__observed-to','Observed To:',0000000001),(0000000635,0000000001,'applicant-evidence__observed-to','Date de fin de votre relation de travail avec cette personne:',0000000002),(0000000636,0000000001,'applicant-evidence__your-experience-at-the-time','Your Experience Level at the Time:',0000000001),(0000000637,0000000001,'applicant-evidence__your-experience-at-the-time','Ton niveau d’expérience durant cette période:',0000000002),(0000000638,0000000001,'applicant-evidence__tell-us-what-you-did','Tell Us What You Did:',0000000001),(0000000639,0000000001,'applicant-evidence__tell-us-what-you-did','Tes fonctions durant cette période:',0000000002),(0000000640,0000000001,'applicant-evidence__reference-story','Provide a sentence or two about the role you played and what you\'re asking this micro-reference to validate.',0000000001),(0000000641,0000000001,'applicant-evidence__reference-story','En une phrase ou deux, décris le rôle que tu as joué et ce que tu demandes à cette personne-ressource de valider.',0000000002),(0000000642,0000000001,'applicant-evidence__sample-of-my-skill','Sample of my Skill (Optional)',0000000001),(0000000643,0000000001,'applicant-evidence__sample-of-my-skill','Exemple de ma compétence (facultatif)',0000000002),(0000000644,0000000001,'applicant-evidence__attach-work-sample','Attach an example of your work that you\'re proud of.',0000000001),(0000000645,0000000001,'applicant-evidence__attach-work-sample','Joins un échantillon de ton travail dont tu es fier à titre d’exemple.',0000000002),(0000000646,0000000001,'applicant-evidence__project-document-name','Project/Document Name:',0000000001),(0000000647,0000000001,'applicant-evidence__project-document-name','Titre du projet ou du document:',0000000002),(0000000648,0000000001,'applicant-evidence__type-of-file','Type of File:',0000000001),(0000000649,0000000001,'applicant-evidence__type-of-file','Type de fichier:',0000000002),(0000000650,0000000001,'applicant-evidence__date-created','Date Created:',0000000001),(0000000651,0000000001,'applicant-evidence__date-created','Date de création:',0000000002),(0000000652,0000000001,'applicant-evidence__link-to-evidence','Link to Evidence:',0000000001),(0000000653,0000000001,'applicant-evidence__link-to-evidence','Lien vers l’échantillon:',0000000002),(0000000654,0000000001,'applicant-evidence__story','Story:',0000000001),(0000000655,0000000001,'applicant-evidence__story','Description:',0000000002),(0000000656,0000000001,'applicant-evidence__tell-us-about-evidence','Tell us about this piece of evidence and your role in creating it.',0000000001),(0000000657,0000000001,'applicant-evidence__tell-us-about-evidence','Décris le projet ou le document ainsi que ton rôle dans sa réalisation.',0000000002),(0000000658,0000000001,'applicant-evidence__save-and-return','Save and return',0000000001),(0000000659,0000000001,'applicant-evidence__save-and-return','Enregistrer et retourner à la page d’accueil',0000000002),(0000000660,0000000001,'applicant-evidence__save-and-continue','Save and continue',0000000001),(0000000661,0000000001,'applicant-evidence__save-and-continue','Enregistrer et continuer ',0000000002),(0000000662,0000000001,'applicant-evidence__save-and-preview','Save and Preview',0000000001),(0000000663,0000000001,'applicant-evidence__save-and-preview','Enregistrer et voir l’aperçu',0000000002),(0000000664,0000000001,'applicationProgressMyInformation','My Information',0000000001),(0000000665,0000000001,'applicationProgressMyInformation','Mes renseignements',0000000002),(0000000666,0000000001,'applicationProgressEssentialCriteria','Essential Criteria',0000000001),(0000000667,0000000001,'applicationProgressEssentialCriteria','Qualifications essentielles',0000000002),(0000000668,0000000001,'applicationProgressNonEssentialCriteria','Non-essential Criteria',0000000001),(0000000669,0000000001,'applicationProgressNonEssentialCriteria','Qualifications non essentielles',0000000002),(0000000670,0000000001,'applicationProgressReviewMyApplication','Review My Application',0000000001),(0000000671,0000000001,'applicationProgressReviewMyApplication','Examiner ma demande',0000000002),(0000000672,0000000001,'jobPosterNocLabel','NOC',0000000001),(0000000673,0000000001,'jobPosterNocLabel','NOC',0000000002),(0000000674,0000000001,'jobPosterTimeRemaining','days until close',0000000001),(0000000675,0000000001,'jobPosterTimeRemaining','jours jusqu’à la date de clôture',0000000002),(0000000676,0000000001,'jobPosterApplicants','applicants so far',0000000001),(0000000677,0000000001,'jobPosterApplicants','candidats jusqu’à présent',0000000002),(0000000678,0000000001,'jobPosterIdLabel','Reference ID',0000000001),(0000000679,0000000001,'jobPosterIdLabel','Numéro de référence',0000000002),(0000000680,0000000001,'jobPosterSubnavLabel','About This Job:',0000000001),(0000000681,0000000001,'jobPosterSubnavLabel','À propos de l’emploi:',0000000002),(0000000682,0000000001,'jobPosterContentTitleBasics','Basic Information',0000000001),(0000000683,0000000001,'jobPosterContentTitleBasics','Renseignements généraux',0000000002),(0000000684,0000000001,'jobPosterSubnavItemBasics','Basic Information',0000000001),(0000000685,0000000001,'jobPosterSubnavItemBasics','Renseignements généraux',0000000002),(0000000686,0000000001,'jobPosterSubnavItemImpact','Impact',0000000001),(0000000687,0000000001,'jobPosterSubnavItemImpact','Contribution',0000000002),(0000000688,0000000001,'jobPosterSubnavItemWork','Your Work',0000000001),(0000000689,0000000001,'jobPosterSubnavItemWork','Travail',0000000002),(0000000690,0000000001,'jobPosterSubnavItemCriteria','Criteria',0000000001),(0000000691,0000000001,'jobPosterSubnavItemCriteria','Critères',0000000002),(0000000692,0000000001,'jobPosterSubnavItemCulture','Culture',0000000001),(0000000693,0000000001,'jobPosterSubnavItemCulture','Culture',0000000002),(0000000694,0000000001,'jobPosterSubnavItemApply','Apply for this Job',0000000001),(0000000695,0000000001,'jobPosterSubnavItemApply','Postuler cet emploi',0000000002),(0000000696,0000000001,'jobPosterSubnavItemApply','Apply for this Job',0000000001),(0000000697,0000000001,'jobPosterSubnavItemApply','Postuler cet emploi',0000000002),(0000000698,0000000001,'jobPosterSalaryRangeLabel','Salary range:',0000000001),(0000000699,0000000001,'jobPosterSalaryRangeLabel','Échelle salariale:',0000000002),(0000000700,0000000001,'jobPosterLanguageLabel','Language',0000000001),(0000000701,0000000001,'jobPosterLanguageLabel','Langue',0000000002),(0000000702,0000000001,'jobPosterTermLabel','Duration',0000000001),(0000000703,0000000001,'jobPosterTermLabel','Durée',0000000002),(0000000704,0000000001,'jobPosterTermValue','month',0000000001),(0000000705,0000000001,'jobPosterTermValue','mois',0000000002),(0000000706,0000000001,'jobPosterStartDateLabel','Target start date:',0000000001),(0000000707,0000000001,'jobPosterStartDateLabel','Date cible de début d’emploi:',0000000002),(0000000708,0000000001,'jobPosterClearanceLevelLabel','Security clearance level:',0000000001),(0000000709,0000000001,'jobPosterClearanceLevelLabel','Niveau d’autorisation de sécurité:',0000000002),(0000000710,0000000001,'jobPosterJobLevelLabel','Classification',0000000001),(0000000711,0000000001,'jobPosterJobLevelLabel','Classification',0000000002),(0000000712,0000000001,'jobPosterContentTitleImpact','Impact',0000000001),(0000000713,0000000001,'jobPosterContentTitleImpact','Contribution',0000000002),(0000000714,0000000001,'jobPosterContentTitleWork','Your Work',0000000001),(0000000715,0000000001,'jobPosterContentTitleWork','Travail',0000000002),(0000000716,0000000001,'jobPosterContentTitleCriteria','Criteria',0000000001),(0000000717,0000000001,'jobPosterContentTitleCriteria','Critères',0000000002),(0000000718,0000000001,'jobPosterCoreCompetenciesLabel','Need to Have',0000000001),(0000000719,0000000001,'jobPosterCoreCompetenciesLabel','Qualifications essentielles',0000000002),(0000000720,0000000001,'jobPosterDevelopingCompetenciesLabel','Nice to Have',0000000001),(0000000721,0000000001,'jobPosterDevelopingCompetenciesLabel','Qualifications constituant un atout',0000000002),(0000000722,0000000001,'jobPosterContentTitleCulture','Culture',0000000001),(0000000723,0000000001,'jobPosterContentTitleCulture','Culture',0000000002),(0000000724,0000000001,'jobPosterHiringManagerLabel','Your Manager',0000000001),(0000000725,0000000001,'jobPosterHiringManagerLabel','Gestionnaire',0000000002),(0000000726,0000000001,'jobPosterWorkEnvironmentLabel','Work Environment',0000000001),(0000000727,0000000001,'jobPosterWorkEnvironmentLabel','\"Environnement de travail',0000000002),(0000000728,0000000001,'jobPosterRemoteWork_label','Remote location allowed',0000000001),(0000000729,0000000001,'jobPosterRemoteWork_label','Possibilité de travail depuis une région éloignée',0000000002),(0000000730,0000000001,'jobPosterTelework_label','Telework allowed',0000000001),(0000000731,0000000001,'jobPosterTelework_label','Possibilité de télétravail',0000000002),(0000000732,0000000001,'jobPosterFlexHours_label','Flexible hours allowed',0000000001),(0000000733,0000000001,'jobPosterFlexHours_label','Possibilité d’horaire flexible',0000000002),(0000000734,0000000001,'jobPosterTeamCultureLabel','Team Culture',0000000001),(0000000735,0000000001,'jobPosterTeamCultureLabel','Culture d’équipe',0000000002),(0000000736,0000000001,'jobPosterTeamSize_label','Team size',0000000001),(0000000737,0000000001,'jobPosterTeamSize_label','Taille de l’équipe ',0000000002),(0000000738,0000000001,'jobPosterGcDirLink_label','Meet the team in',0000000001),(0000000739,0000000001,'jobPosterGcDirLink_label','Rencontre l’équipe dans',0000000002),(0000000740,0000000001,'jobPosterOperatingContext_label','Our operating context',0000000001),(0000000741,0000000001,'jobPosterOperatingContext_label','Notre contexte opérationnel:',0000000002),(0000000742,0000000001,'jobPosterWhatWeValue_label','What we value',0000000001),(0000000743,0000000001,'jobPosterWhatWeValue_label','Nos valeurs:',0000000002),(0000000744,0000000001,'jobPosterHowWeWork_label','How we work',0000000001),(0000000745,0000000001,'jobPosterHowWeWork_label','Notre mode de fonctionnement:',0000000002),(0000000746,0000000001,'jobPosterContentTitleApply','Apply for this Job',0000000001),(0000000747,0000000001,'jobPosterContentTitleApply','Postuler cet emploi',0000000002),(0000000748,0000000001,'jobPosterLoginButton','Login and Apply',0000000001),(0000000749,0000000001,'jobPosterLoginButton','Ouvrir une session et postuler',0000000002);
/*!40000 ALTER TABLE `base_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_content_type`
--

DROP TABLE IF EXISTS `base_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_content_type` (
  `base_content_type_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `base_content_type_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`base_content_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_content_type`
--

LOCK TABLES `base_content_type` WRITE;
/*!40000 ALTER TABLE `base_content_type` DISABLE KEYS */;
INSERT INTO `base_content_type` VALUES (0000000001,'label'),(0000000002,'image'),(0000000003,'html');
/*!40000 ALTER TABLE `base_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `branch` (
  `branch_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `branch_common_name` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (0000000003,'Chief Information Officer Branch');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch_details`
--

DROP TABLE IF EXISTS `branch_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `branch_details` (
  `branch_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `branch_id` int(10) unsigned zerofill NOT NULL,
  `branch_details_locale_id` int(10) unsigned zerofill NOT NULL,
  `branch_details_name` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`branch_details_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch_details`
--

LOCK TABLES `branch_details` WRITE;
/*!40000 ALTER TABLE `branch_details` DISABLE KEYS */;
INSERT INTO `branch_details` VALUES (0000000001,0000000003,0000000001,'Chief Information Officer Branch'),(0000000002,0000000003,0000000002,'Direction du dirigeant principal de l\'information');
/*!40000 ALTER TABLE `branch_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city` (
  `city_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `city_gps_coords` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city_common_name` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (0000000001,'','Ottawa'),(0000000002,'','Montreal');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city_details`
--

DROP TABLE IF EXISTS `city_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city_details` (
  `city_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `city_details_city_id` int(10) NOT NULL,
  `city_details_locale_id` int(10) unsigned zerofill NOT NULL,
  `city_details_name` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`city_details_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city_details`
--

LOCK TABLES `city_details` WRITE;
/*!40000 ALTER TABLE `city_details` DISABLE KEYS */;
INSERT INTO `city_details` VALUES (0000000001,1,0000000001,'Ottawa'),(0000000002,1,0000000002,'Ottawa');
/*!40000 ALTER TABLE `city_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `criteria`
--

DROP TABLE IF EXISTS `criteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `criteria` (
  `criteria_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `criteria_type_id` int(10) unsigned zerofill NOT NULL,
  `criteria_name` text NOT NULL,
  `criteria_description` text,
  `locale_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`criteria_id`,`criteria_type_id`),
  KEY `fk_criteria_criteria_type_id_idx` (`criteria_type_id`),
  KEY `fk_criteria_locale_id_idx` (`locale_id`),
  KEY `fk_criteria_job_poster_idx` (`job_poster_id`),
  CONSTRAINT `fk_criteria_criteria_type_id` FOREIGN KEY (`criteria_type_id`) REFERENCES `criteria_type` (`criteria_type_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_criteria_job_poster` FOREIGN KEY (`job_poster_id`) REFERENCES `job_poster` (`job_poster_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_criteria_locale_id` FOREIGN KEY (`locale_id`) REFERENCES `locale` (`locale_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criteria`
--

LOCK TABLES `criteria` WRITE;
/*!40000 ALTER TABLE `criteria` DISABLE KEYS */;
INSERT INTO `criteria` VALUES (0000000009,0000000001,'werwer',NULL,0000000001,0000000004),(0000000010,0000000001,'werwer',NULL,0000000002,0000000004),(0000000011,0000000002,'werwer',NULL,0000000001,0000000004),(0000000012,0000000002,'werwer',NULL,0000000002,0000000004),(0000000013,0000000001,'A secondary school diploma or acceptable alternatives.',NULL,0000000001,0000000006),(0000000014,0000000001,'Intermediate ability to use MS Office Suite',NULL,0000000001,0000000006),(0000000015,0000000001,'Strong Interpersonal skills',NULL,0000000001,0000000006),(0000000016,0000000001,'Strong organizational skills',NULL,0000000001,0000000006),(0000000017,0000000001,'Ability to work under pressure',NULL,0000000001,0000000006),(0000000018,0000000001,'Reliable',NULL,0000000001,0000000006),(0000000019,0000000001,'Service-oriented',NULL,0000000001,0000000006),(0000000020,0000000001,'Details-oriented in delivery of work',NULL,0000000001,0000000006),(0000000021,0000000001,'Un diplôme d’études secondaires ou les alternatives acceptables',NULL,0000000002,0000000006),(0000000022,0000000001,'Capacité de niveau intermédiaire d’utiliser MS Office Suite',NULL,0000000002,0000000006),(0000000023,0000000001,'Beaucoup d’entregent',NULL,0000000002,0000000006),(0000000024,0000000001,'Compétences organisationnelles solides',NULL,0000000002,0000000006),(0000000025,0000000001,'Capacité de travailler sous pression',NULL,0000000002,0000000006),(0000000026,0000000001,'Fiable',NULL,0000000002,0000000006),(0000000027,0000000001,'Axé sur les services',NULL,0000000002,0000000006),(0000000028,0000000001,'Axé sur les détails dans l’exécution des travaux',NULL,0000000002,0000000006),(0000000029,0000000002,'Ability to learn new technologies –(e.g., WebEX, government travel system)',NULL,0000000001,0000000006),(0000000030,0000000002,'Ability to use social media (e.g., Twitter) to promote events',NULL,0000000001,0000000006),(0000000031,0000000002,'Ability to deal with ambiguity',NULL,0000000001,0000000006),(0000000032,0000000002,'Ability to converse in French',NULL,0000000001,0000000006),(0000000033,0000000002,'Capacité de apprendre de nouvelles technologies – (par exemple, WEBEX, système de voyage du gouvernement)',NULL,0000000002,0000000006),(0000000034,0000000002,'Capacité d’utiliser les médias sociaux (par exemple, Twitter) afin de promouvoir des événements',NULL,0000000002,0000000006),(0000000035,0000000002,'Capacité de composer avec l’ambiguïté',NULL,0000000002,0000000006),(0000000036,0000000002,'Capacité de converser en français',NULL,0000000002,0000000006),(0000000037,0000000001,'Post-secondary degree with specialization in economics, sociology or statistics.',NULL,0000000001,0000000007),(0000000038,0000000001,'Intermediate writing skills',NULL,0000000001,0000000007),(0000000039,0000000001,'Intermediate analytical skills',NULL,0000000001,0000000007),(0000000040,0000000001,'Basic policy analysis skills',NULL,0000000001,0000000007),(0000000041,0000000001,'Basic social media skills',NULL,0000000001,0000000007),(0000000042,0000000001,'Good Strong interpersonal skills',NULL,0000000001,0000000007),(0000000043,0000000001,'Un grade postsecondaire avec spécialisation en économie, en sociologie ou en statistique',NULL,0000000002,0000000007),(0000000044,0000000001,'Compétences de niveau intermédiaire en matière de rédaction',NULL,0000000002,0000000007),(0000000045,0000000001,'Compétences de niveau intermédiaire en matière d’analyse',NULL,0000000002,0000000007),(0000000046,0000000001,'Compétences de base en matière d’analyse des politiques',NULL,0000000002,0000000007),(0000000047,0000000001,'Compétences de base en médias sociaux',NULL,0000000002,0000000007),(0000000048,0000000001,'Beaucoup d’entregent',NULL,0000000002,0000000007),(0000000049,0000000002,'Basic ability to use Photoshop',NULL,0000000001,0000000007),(0000000050,0000000002,'Ability to learn new tools (e.g. social media, presentation tools)',NULL,0000000001,0000000007),(0000000051,0000000002,'Ability to converse in French',NULL,0000000001,0000000007),(0000000052,0000000002,'Capacité de base d’utiliser Photoshop',NULL,0000000002,0000000007),(0000000053,0000000002,'Capacité d’apprendre de nouveaux outils (par exemple, les médias sociaux, présentation des',NULL,0000000002,0000000007),(0000000054,0000000002,'outils)',NULL,0000000002,0000000007),(0000000055,0000000002,'Capacités de conversation en français',NULL,0000000002,0000000007);
/*!40000 ALTER TABLE `criteria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `criteria_type`
--

DROP TABLE IF EXISTS `criteria_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `criteria_type` (
  `criteria_type_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `criteria_type` varchar(45) NOT NULL,
  `criteria_type_description` varchar(140) DEFAULT NULL,
  PRIMARY KEY (`criteria_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criteria_type`
--

LOCK TABLES `criteria_type` WRITE;
/*!40000 ALTER TABLE `criteria_type` DISABLE KEYS */;
INSERT INTO `criteria_type` VALUES (0000000001,'essential','Essential criteria are required for this job.'),(0000000002,'asset','Asset criteria are optional for this job.');
/*!40000 ALTER TABLE `criteria_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `db_version`
--

DROP TABLE IF EXISTS `db_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `db_version` (
  `version` varchar(10) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `db_version`
--

LOCK TABLES `db_version` WRITE;
/*!40000 ALTER TABLE `db_version` DISABLE KEYS */;
INSERT INTO `db_version` VALUES ('11.0.0'),('12.0.0'),('13.0.0'),('15.0.0'),('16.0.0'),('17.0.0'),('18.0.0'),('19.0.0'),('20.0.0');
/*!40000 ALTER TABLE `db_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department` (
  `department_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `department_common_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `department_province_id` int(10) unsigned zerofill NOT NULL,
  `department_city_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (0000000001,'Treasury Board of Canada Secretariat',0000000009,0000000001),(0000000002,'Natural Resources Canada',0000000009,0000000001),(0000000003,'Transport Canada',0000000009,0000000001),(0000000004,'Environment and Climate Change Canada',0000000009,0000000001),(0000000005,'Employment and Social Development Canada',0000000009,0000000001);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department_details`
--

DROP TABLE IF EXISTS `department_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department_details` (
  `department_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `department_id` int(10) unsigned zerofill NOT NULL,
  `department_details_locale_id` int(10) unsigned zerofill NOT NULL,
  `department_details_name` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`department_details_id`),
  KEY `fk_department_details_department_id_idx` (`department_id`),
  CONSTRAINT `fk_department_details_department_id` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department_details`
--

LOCK TABLES `department_details` WRITE;
/*!40000 ALTER TABLE `department_details` DISABLE KEYS */;
INSERT INTO `department_details` VALUES (0000000001,0000000001,0000000001,'Treasury Board of Canada Secretariat'),(0000000002,0000000001,0000000002,'Secrétariat du Conseil du Trésor du Canada'),(0000000003,0000000002,0000000001,'Natural Resources Canada'),(0000000004,0000000002,0000000002,'Ressources naturelles Canada'),(0000000005,0000000003,0000000001,'Transport Canada'),(0000000006,0000000003,0000000002,'Transports Canada'),(0000000007,0000000004,0000000001,'Environment and Climate Change Canada'),(0000000008,0000000004,0000000002,'Environnement et Changement climatique Canada'),(0000000009,0000000005,0000000001,'Employment and Social Development Canada'),(0000000010,0000000005,0000000002,'Emploi et Développement social Canada');
/*!40000 ALTER TABLE `department_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `division`
--

DROP TABLE IF EXISTS `division`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `division` (
  `division_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `division_common_name` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`division_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `division`
--

LOCK TABLES `division` WRITE;
/*!40000 ALTER TABLE `division` DISABLE KEYS */;
INSERT INTO `division` VALUES (0000000001,'Office of the Chief Information Officer');
/*!40000 ALTER TABLE `division` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `division_details`
--

DROP TABLE IF EXISTS `division_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `division_details` (
  `division_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `division_id` int(10) unsigned zerofill NOT NULL,
  `division_locale_id` int(10) unsigned zerofill NOT NULL,
  `division_name` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`division_details_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `division_details`
--

LOCK TABLES `division_details` WRITE;
/*!40000 ALTER TABLE `division_details` DISABLE KEYS */;
INSERT INTO `division_details` VALUES (0000000001,0000000001,0000000001,'Office of the Chief Information Officer'),(0000000002,0000000001,0000000002,'Bureau du dirigeant principal de l\'information');
/*!40000 ALTER TABLE `division_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experience_level`
--

DROP TABLE IF EXISTS `experience_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `experience_level` (
  `experience_level_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `experience_level_common` varchar(65) NOT NULL,
  PRIMARY KEY (`experience_level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience_level`
--

LOCK TABLES `experience_level` WRITE;
/*!40000 ALTER TABLE `experience_level` DISABLE KEYS */;
INSERT INTO `experience_level` VALUES (0000000001,'1 or Less years'),(0000000002,'2 - 3 years'),(0000000003,'4 - 5 years'),(0000000004,'6 - 7 years'),(0000000005,'8 or More years');
/*!40000 ALTER TABLE `experience_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experience_level_details`
--

DROP TABLE IF EXISTS `experience_level_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `experience_level_details` (
  `experience_level_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `experience_level_details_locale_id` int(10) unsigned zerofill NOT NULL,
  `experience_level_id` int(10) unsigned zerofill NOT NULL,
  `experience_level_details_name` varchar(65) NOT NULL,
  PRIMARY KEY (`experience_level_details_id`),
  KEY `fk_experience_level_id_idx` (`experience_level_id`),
  CONSTRAINT `fk_experience_level_details_experience_level_id` FOREIGN KEY (`experience_level_id`) REFERENCES `experience_level` (`experience_level_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience_level_details`
--

LOCK TABLES `experience_level_details` WRITE;
/*!40000 ALTER TABLE `experience_level_details` DISABLE KEYS */;
INSERT INTO `experience_level_details` VALUES (0000000001,0000000001,0000000001,'1 or Less'),(0000000002,0000000002,0000000001,'1 ou Moins'),(0000000003,0000000001,0000000002,'2 - 3'),(0000000004,0000000002,0000000002,'2 - 3'),(0000000005,0000000001,0000000003,'4 - 5'),(0000000006,0000000002,0000000003,'4 - 5'),(0000000007,0000000001,0000000004,'6 - 7'),(0000000008,0000000002,0000000004,'6 - 7'),(0000000009,0000000001,0000000005,'8 or More'),(0000000010,0000000002,0000000005,'8 ou Plus');
/*!40000 ALTER TABLE `experience_level_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_type`
--

DROP TABLE IF EXISTS `file_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file_type` (
  `file_type_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `file_type` varchar(45) NOT NULL,
  PRIMARY KEY (`file_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_type`
--

LOCK TABLES `file_type` WRITE;
/*!40000 ALTER TABLE `file_type` DISABLE KEYS */;
INSERT INTO `file_type` VALUES (0000000001,'word document'),(0000000002,'powerpoint presentation'),(0000000003,'video'),(0000000004,'article publication'),(0000000005,'other');
/*!40000 ALTER TABLE `file_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_type_details`
--

DROP TABLE IF EXISTS `file_type_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file_type_details` (
  `file_type_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `file_type_id` int(10) unsigned zerofill NOT NULL,
  `locale_id` int(10) unsigned zerofill NOT NULL,
  `file_type_details_name` varchar(45) NOT NULL,
  PRIMARY KEY (`file_type_details_id`),
  KEY `fk_file_type_details_file_type_id_idx` (`file_type_id`),
  KEY `fk_file_type_details_locale_id_idx` (`locale_id`),
  CONSTRAINT `fk_file_type_details_file_type_id` FOREIGN KEY (`file_type_id`) REFERENCES `file_type` (`file_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_file_type_details_locale_id` FOREIGN KEY (`locale_id`) REFERENCES `locale` (`locale_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_type_details`
--

LOCK TABLES `file_type_details` WRITE;
/*!40000 ALTER TABLE `file_type_details` DISABLE KEYS */;
INSERT INTO `file_type_details` VALUES (0000000001,0000000001,0000000001,'Word Document'),(0000000002,0000000001,0000000002,'Document Word'),(0000000003,0000000002,0000000001,'PowerPoint Presentation'),(0000000004,0000000002,0000000002,'Présentation PowerPoint'),(0000000005,0000000003,0000000001,'Video'),(0000000006,0000000003,0000000002,'Vidéo'),(0000000007,0000000004,0000000001,'Article Publication'),(0000000008,0000000004,0000000002,'Publication d\'Article'),(0000000009,0000000005,0000000001,'Other'),(0000000010,0000000005,0000000002,'Autre');
/*!40000 ALTER TABLE `file_type_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_application_answer`
--

DROP TABLE IF EXISTS `job_application_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_application_answer` (
  `job_poster_question_id` int(10) unsigned zerofill NOT NULL,
  `job_application_id` int(10) unsigned zerofill NOT NULL,
  `answer` longtext COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`job_poster_question_id`,`job_application_id`),
  KEY `fk__job_application_answer__job_application_idx` (`job_application_id`),
  CONSTRAINT `fk__job_application_answer__job_application` FOREIGN KEY (`job_application_id`) REFERENCES `job_poster_application` (`job_poster_application_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk__job_application_answer__job_poster_question` FOREIGN KEY (`job_poster_question_id`) REFERENCES `job_poster_question` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_application_answer`
--

LOCK TABLES `job_application_answer` WRITE;
/*!40000 ALTER TABLE `job_application_answer` DISABLE KEYS */;
INSERT INTO `job_application_answer` VALUES (0000000009,0000000003,''),(0000000009,0000000012,''),(0000000009,0000000015,''),(0000000009,0000000016,''),(0000000009,0000000018,'ggkjg'),(0000000010,0000000003,''),(0000000011,0000000005,'I\'ve worked on administrative projects before, and I believe my experience in the private sector would translate well to the public service.'),(0000000011,0000000008,'dsfsdfsdfsdf'),(0000000011,0000000009,''),(0000000011,0000000012,''),(0000000011,0000000015,''),(0000000011,0000000016,''),(0000000011,0000000018,'kgkgk'),(0000000013,0000000004,''),(0000000013,0000000006,''),(0000000013,0000000007,''),(0000000013,0000000011,''),(0000000013,0000000013,''),(0000000013,0000000017,''),(0000000014,0000000004,''),(0000000014,0000000006,''),(0000000014,0000000007,''),(0000000014,0000000011,''),(0000000014,0000000013,''),(0000000014,0000000017,'');
/*!40000 ALTER TABLE `job_application_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_level`
--

DROP TABLE IF EXISTS `job_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_level` (
  `job_level_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_level` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`job_level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_level`
--

LOCK TABLES `job_level` WRITE;
/*!40000 ALTER TABLE `job_level` DISABLE KEYS */;
INSERT INTO `job_level` VALUES (0000000001,'CS1'),(0000000002,'CS2'),(0000000003,'CS3');
/*!40000 ALTER TABLE `job_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_poster`
--

DROP TABLE IF EXISTS `job_poster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_poster` (
  `job_poster_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_term_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_term_qty` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_job_min_level_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_job_max_level_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_open_date_time` datetime NOT NULL,
  `job_poster_close_date_time` datetime NOT NULL,
  `job_poster_start_date` datetime NOT NULL,
  `job_poster_department_id` int(10) NOT NULL,
  `job_poster_province_id` int(10) NOT NULL,
  `job_poster_remuneration_min` int(9) DEFAULT NULL,
  `job_poster_remuneration_max` int(9) DEFAULT NULL,
  `job_poster_noc` int(4) NOT NULL,
  `job_poster_classification` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_clearance_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_language_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`job_poster_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_poster`
--

LOCK TABLES `job_poster` WRITE;
/*!40000 ALTER TABLE `job_poster` DISABLE KEYS */;
INSERT INTO `job_poster` VALUES (0000000004,0000000002,'12',0000000001,0000000003,'2018-06-03 00:00:00','2018-05-29 00:00:00','2018-07-30 00:00:00',4,1,57430,61877,1234,'AS-02',0000000002,0000000001),(0000000006,0000000002,'12',0000000001,0000000003,'2018-06-24 00:00:00','2018-06-30 00:00:00','2018-07-01 00:00:00',1,9,57430,61877,1234,'AS-02',0000000001,0000000001),(0000000007,0000000002,'12',0000000001,0000000003,'2018-06-25 00:00:00','2018-07-27 00:00:00','2018-09-01 00:00:00',1,9,57426,65838,1234,'EC-02',0000000003,0000000001);
/*!40000 ALTER TABLE `job_poster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_poster_application`
--

DROP TABLE IF EXISTS `job_poster_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_poster_application` (
  `job_poster_application_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `application_job_poster_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_application_status_id` int(10) unsigned zerofill NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`job_poster_application_id`),
  KEY `fk__job_poster_application__job_poster_idx` (`application_job_poster_id`),
  KEY `fk__job_poster_application__application_status_idx` (`job_poster_application_status_id`),
  KEY `fk__job_poster_application__user_idx` (`user_id`),
  CONSTRAINT `fk__job_poster_application__application_status` FOREIGN KEY (`job_poster_application_status_id`) REFERENCES `application_status` (`application_status_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk__job_poster_application__job_poster` FOREIGN KEY (`application_job_poster_id`) REFERENCES `job_poster` (`job_poster_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk__job_poster_application__user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_poster_application`
--

LOCK TABLES `job_poster_application` WRITE;
/*!40000 ALTER TABLE `job_poster_application` DISABLE KEYS */;
INSERT INTO `job_poster_application` VALUES (0000000002,0000000004,0000000001,'2018-06-26 16:08:20',0000000008),(0000000003,0000000004,0000000001,'2018-06-26 16:08:49',0000000010),(0000000004,0000000007,0000000001,'2018-06-26 16:26:19',0000000010),(0000000005,0000000006,0000000001,'2018-06-26 16:28:08',0000000008),(0000000006,0000000007,0000000001,'2018-06-26 16:37:19',0000000006),(0000000007,0000000007,0000000001,'2018-06-26 16:38:43',0000000004),(0000000008,0000000006,0000000001,'2018-06-26 16:39:04',0000000006),(0000000009,0000000006,0000000001,'2018-06-26 16:43:55',0000000004),(0000000010,0000000004,0000000001,'2018-06-26 16:46:58',0000000005),(0000000011,0000000007,0000000001,'2018-06-26 16:50:03',0000000009),(0000000012,0000000006,0000000001,'2018-06-26 16:52:24',0000000011),(0000000013,0000000007,0000000001,'2018-06-26 16:59:10',0000000008),(0000000014,0000000007,0000000001,'2018-06-26 16:59:34',0000000012),(0000000015,0000000006,0000000001,'2018-06-26 17:00:19',0000000012),(0000000016,0000000006,0000000001,'2018-06-26 17:57:20',0000000013),(0000000017,0000000007,0000000001,'2018-06-26 18:12:41',0000000005),(0000000018,0000000006,0000000001,'2018-06-26 20:44:40',0000000014);
/*!40000 ALTER TABLE `job_poster_application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_poster_core_competency`
--

DROP TABLE IF EXISTS `job_poster_core_competency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_poster_core_competency` (
  `job_poster_core_competency_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_poster_id` int(10) unsigned zerofill NOT NULL,
  `locale_id` int(10) unsigned zerofill NOT NULL,
  `core_competency` longtext COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`job_poster_core_competency_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_poster_core_competency`
--

LOCK TABLES `job_poster_core_competency` WRITE;
/*!40000 ALTER TABLE `job_poster_core_competency` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_poster_core_competency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_poster_details`
--

DROP TABLE IF EXISTS `job_poster_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_poster_details` (
  `job_poster_details` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_poster_id` int(10) unsigned zerofill NOT NULL,
  `locale_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_desc_title` text COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_desc_content` text COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_city` text COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_title` text COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_impact` text COLLATE utf8_unicode_ci NOT NULL,
  `branch` text COLLATE utf8_unicode_ci,
  `division` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`job_poster_details`),
  KEY `fk__job_poster_details__job_poster_idx` (`job_poster_id`),
  KEY `fk__job_poster_details__locale_idx` (`locale_id`),
  CONSTRAINT `fk__job_poster_details__job_poster` FOREIGN KEY (`job_poster_id`) REFERENCES `job_poster` (`job_poster_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk__job_poster_details__locale` FOREIGN KEY (`locale_id`) REFERENCES `locale` (`locale_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_poster_details`
--

LOCK TABLES `job_poster_details` WRITE;
/*!40000 ALTER TABLE `job_poster_details` DISABLE KEYS */;
INSERT INTO `job_poster_details` VALUES (0000000007,0000000004,0000000001,'','','Ottawa','Administrative Project Officer','Our team is small, but we serve a large community of 20,000 people in Government working in information management/information technologies (IM/IT). Our team helps coordinate priorities and activities across this community, including the recruitment of new talent, which is critical to the IM/IT community’s ability to deliver services to Canadians. \n\nIn your role as our team’s Administrative Project Officer, you’ll be helping to recruit new talent into the IM/IT community in Government of Canada. You’ll be working with our team to help select and assess potential candidates (e.g., group interviews). You’ll also be coordinating logistics for assessments (including in the regions) and career fair events to help match assessed candidates with hiring managers from across the Government of Canada. This work will help ensure the IM/IT community has the talent it needs to support a wide range of Government priorities.','CIOB','Talent Cloud'),(0000000008,0000000004,0000000002,'','','Ottawa','Agent de projet administratif','Nous avons une petite équipe, mais nous desservons une grande collectivité de 20 000 personnes au gouvernement dans le domaine de la gestion de l’information et de la technologie de l’information (GI-TI). Notre équipe aide à coordonner les priorités et les activités au sein de cette collectivité, y compris le recrutement de nouveaux talents, qui est essentiel à la capacité de la GI-TI d’offrir des services aux Canadiens.\n\nDans votre rôle d’agent de projet administratif de notre équipe, vous aiderez à recruter de nouveaux talents dans la collectivité de la GI-TI au gouvernement du Canada. Vous serez en collaboration avec notre équipe pour aider à sélectionner et à évaluer les candidats potentiels (par exemple, entrevues de groupe). En outre, vous assurerez la coordination de la logistique aux fins d’évaluation (y compris dans les régions) et des activités de la foire de carrière pour faciliter le jumelage des candidats évalués avec les gestionnaires responsables de l’embauche de partout au gouvernement du Canada. Ce travail aidera à garantir que la GI-TI a le talent nécessaire pour soutenir un large éventail de priorités du gouvernement.','DDPI','Nuage de talents'),(0000000011,0000000006,0000000001,'','','Ottawa','Administrative Project Officer','Our team is small, but we serve a large community of 20,000 people in Government working in information management/information technologies (IM/IT). Our team helps coordinate priorities and activities across this community, including the recruitment of new talent, which is critical to the IM/IT community’s ability to deliver services to Canadians. \n\nIn your role as our team’s Administrative Project Officer, you’ll be helping to recruit new talent into the IM/IT community in Government of Canada. You’ll be working with our team to help select and assess potential candidates (e.g., group interviews). You’ll also be coordinating logistics for assessments (including in the regions) and career fair events to help match assessed candidates with hiring managers from across the Government of Canada. This work will help ensure the IM/IT community has the talent it needs to support a wide range of Government priorities.','CIOB','Talent Cloud'),(0000000012,0000000006,0000000002,'','','Ottawa','','Nous avons une petite équipe, mais nous desservons une grande collectivité de 20 000 personnes au gouvernement dans le domaine de la gestion de l’information et de la technologie de l’information (GI-TI). Notre équipe aide à coordonner les priorités et les activités au sein de cette collectivité, y compris le recrutement de nouveaux talents, qui est essentiel à la capacité de la GI-TI d’offrir des services aux Canadiens.\n\nDans votre rôle d’agent de projet administratif de notre équipe, vous aiderez à recruter de nouveaux talents dans la collectivité de la GI-TI au gouvernement du Canada. Vous serez en collaboration avec notre équipe pour aider à sélectionner et à évaluer les candidats potentiels (par exemple, entrevues de groupe). En outre, vous assurerez la coordination de la logistique aux fins d’évaluation (y compris dans les régions) et des activités de la foire de carrière pour faciliter le jumelage des candidats évalués avec les gestionnaires responsables de l’embauche de partout au gouvernement du Canada. Ce travail aidera à garantir que la GI-TI a le talent nécessaire pour soutenir un large éventail de priorités du gouvernement.','DDPI','Nuage de talents'),(0000000013,0000000007,0000000001,'','','Ottawa','Junior Policy Outreach Support','Our team supports attempts at experimentation across the Government of Canada. What do we mean by experimentation? It’s really about evidence, and making decisions that are supported by evidence. Too often we think all decisions we take are based on well supported, well-reasoned data, research and evidence. Unfortunately, because of complexity, timing, etc., this is getting more and more difficult to do, especially considering financial constraints, the need to be very responsive, and always putting as many people first as possible (with diverse and often conflicting priorities). So that’s what you’d be supporting. You won’t work directly with Canadians, but you’ll enable departments to experiment with various interventions to know what works.',' Information Management and Technology Directorate','Business Applications Portfolio Management'),(0000000014,0000000007,0000000002,'','','Ottawa','Agent subalterne de communication des politiques','Notre équipe appuie les tentatives d’expérimentation dans l’ensemble du gouvernement du Canada. Que voulons-nous dire par expérimentation? Il s’agit vraiment des éléments de preuve et de prendre des décisions qui sont étayées par des éléments de preuve. Trop souvent, nous croyons que toutes les décisions que nous prenons sont fondées sur des données, des recherches et des éléments de preuve bien étayés et bien réfléchis. Malheureusement, en raison de la complexité, de l’échéance, entre autres, c’est de plus en plus difficile de le faire, surtout compte tenu des contraintes financières, de la nécessité d’être très réceptif et de toujours mettre au premier plan autant de gens que possible (avec diverses priorités et souvent contradictoires). C’est cette valeur que vous appuierez. Vous ne travaillerez pas directement avec des Canadiens, mais vous permettrez aux ministères d’expérimenter diverses interventions pour savoir ce qui fonctionne.','Direction générale de la gestion d\'information et de la technologie',' Gestion du portefeuille d\'applications d\'entreprise');
/*!40000 ALTER TABLE `job_poster_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_poster_developing_competency`
--

DROP TABLE IF EXISTS `job_poster_developing_competency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_poster_developing_competency` (
  `job_poster_developing_competency_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_poster_id` int(10) unsigned zerofill NOT NULL,
  `locale_id` int(10) unsigned zerofill NOT NULL,
  `developing_competency` longtext COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`job_poster_developing_competency_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_poster_developing_competency`
--

LOCK TABLES `job_poster_developing_competency` WRITE;
/*!40000 ALTER TABLE `job_poster_developing_competency` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_poster_developing_competency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_poster_key_task`
--

DROP TABLE IF EXISTS `job_poster_key_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_poster_key_task` (
  `job_poster_key_task_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_poster_id` int(10) unsigned zerofill NOT NULL,
  `locale_id` int(10) unsigned zerofill NOT NULL,
  `task` longtext COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`job_poster_key_task_id`),
  KEY `fk__job_poster_key_task__job_poster_idx` (`job_poster_id`),
  KEY `fk__job_poster_key_task__locale_idx` (`locale_id`),
  CONSTRAINT `fk__job_poster_key_task__job_poster` FOREIGN KEY (`job_poster_id`) REFERENCES `job_poster` (`job_poster_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk__job_poster_key_task__locale` FOREIGN KEY (`locale_id`) REFERENCES `locale` (`locale_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_poster_key_task`
--

LOCK TABLES `job_poster_key_task` WRITE;
/*!40000 ALTER TABLE `job_poster_key_task` DISABLE KEYS */;
INSERT INTO `job_poster_key_task` VALUES (0000000021,0000000004,0000000001,'Event coordination (e.g., career matching job fairs) between candidates and departmental hiring managers'),(0000000022,0000000004,0000000002,'Coordination des activités (par exemple, salons et foires à l’emploi et placement) entre les candidats et les gestionnaires d’embauche du Ministère.'),(0000000023,0000000004,0000000001,'Career Fairs logistics (e.g., University recruitment campaigns, including preparing promotional materials as handouts (e.g., 1-pagers, stickers, etc.), audio-visual equipment rental (including loading content and testing technical solutions), banners, travel arrangements (e.g., across Canada).'),(0000000024,0000000004,0000000002,'Logistique relative aux salons à l’emploi (par exemple, les campagnes de recrutement dans les universités), y compris la préparation du matériel publicitaire sous forme de documents (par exemple, document d’une seule page, autocollants, etc.), location du matériel audiovisuel (y compris le chargement du contenu et l’essai des solutions techniques), des bannières, des préparatifs de voyage (par exemple, partout au Canada).'),(0000000025,0000000004,0000000001,'Team meeting coordination – boardroom bookings, calendar invites, distribution list creation, outreach to participants.'),(0000000026,0000000004,0000000002,'Coordination des réunions d’équipe – réservations des salles de conférence, invitation par calendrier, création de la liste de distribution, sensibilisation des participants.'),(0000000033,0000000006,0000000001,'Event coordination (e.g., career matching job fairs) between candidates and departmental hiring managers'),(0000000034,0000000006,0000000001,'Career Fairs logistics (e.g., University recruitment campaigns, including preparing promotional materials as handouts (e.g., 1-pagers, stickers, etc.), audio-visual equipment rental (including loading content and testing technical solutions), banners, travel arrangements (e.g., across Canada).'),(0000000035,0000000006,0000000001,'Team meeting coordination – boardroom bookings, calendar invites, distribution list creation, outreach to participants.'),(0000000036,0000000006,0000000001,'Coordination of assessments for candidates (e.g., booking rooms, ensuring supplies and equipment is available and tested in advance, advising candidates, etc.)'),(0000000037,0000000006,0000000001,'Proofing documents (e.g., promotional materials, ensuring translation and QA review) and other general administrative/clerical work, as required, to support the Recruitment team and broader Community Management Office (CMO).'),(0000000038,0000000006,0000000002,'Coordination des activités (par exemple, salons et foires à l’emploi et placement) entre les candidats et les gestionnaires d’embauche du Ministère.'),(0000000039,0000000006,0000000002,'Logistique relative aux salons à l’emploi (par exemple, les campagnes de recrutement dans les universités), y compris la préparation du matériel publicitaire sous forme de documents (par exemple, document d’une seule page, autocollants, etc.), location du matériel audiovisuel (y compris le chargement du contenu et l’essai des solutions techniques), des bannières, des préparatifs de voyage (par exemple, partout au Canada).'),(0000000040,0000000006,0000000002,'Coordination des réunions d’équipe – réservations des salles de conférence, invitation par calendrier, création de la liste de distribution, sensibilisation des participants.'),(0000000041,0000000006,0000000002,'Coordination des évaluations des candidats (par exemple, la réservation des salles, s’assurer que les fournitures et l’équipement sont disponibles et mis à l’essai à l’avance, informer les candidats, etc.)'),(0000000042,0000000006,0000000002,'Relecture des documents (par exemple, matériel publicitaire, s’assurer de la traduction et de l’examen de l’assurance de la qualité) et d’autres travaux généraux d’administration ou de bureau, au besoin, pour appuyer l’équipe de recrutement et le bureau général de gestion des collectivités.'),(0000000043,0000000007,0000000001,'Your primary role would be to build our outreach strategy (under the guidance of senior analysts and team manager), and be our friendly face showcasing what we do. This will involve having a solid policy understanding of experimentation and its role in Government, as well as policy approaches for application to Government work.'),(0000000044,0000000007,0000000001,'Your secondary role would be to help us with email, social media and forums, interacting with departments and answering policy questions related to experimentation. We get a lot of questions from all kinds of parts of many different departments and agencies, and we need to respond to them all.'),(0000000045,0000000007,0000000002,'Your secondary role would be to help us with email, social media and forums, interacting with departments and answering policy questions related to experimentation. We get a lot of questions from all kinds of parts of many different departments and agencies, and we need to respond to them all.'),(0000000046,0000000007,0000000002,'Votre rôle secondaire serait de nous aider avec les courriels, les médias sociaux et les forums, d’interagir avec les ministères et de répondre à des questions de politique liées à l’expérimentation. Nous recevons beaucoup de questions de toutes sortes de la part de nombreux ministères et organismes différents et nous devons répondre à toutes ces questions.');
/*!40000 ALTER TABLE `job_poster_key_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_poster_question`
--

DROP TABLE IF EXISTS `job_poster_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_poster_question` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_poster_id` int(10) unsigned zerofill NOT NULL,
  `locale_id` int(10) unsigned zerofill NOT NULL,
  `question` text COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `fk__job_poster_question__job_poster_idx` (`job_poster_id`),
  KEY `fk__job_poster_question__locale_idx` (`locale_id`),
  CONSTRAINT `fk__job_poster_question__job_poster` FOREIGN KEY (`job_poster_id`) REFERENCES `job_poster` (`job_poster_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk__job_poster_question__locale` FOREIGN KEY (`locale_id`) REFERENCES `locale` (`locale_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_poster_question`
--

LOCK TABLES `job_poster_question` WRITE;
/*!40000 ALTER TABLE `job_poster_question` DISABLE KEYS */;
INSERT INTO `job_poster_question` VALUES (0000000009,0000000006,0000000001,'Why are you interested in this job?','We want to know why you are interested in this job instead of other similar ones. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.'),(0000000010,0000000006,0000000002,'Pourquoi êtes-vous intéressé par ce travail?','Nous voulons savoir pourquoi vous êtes intéressé par ce travail au lieu d\'autres similaires. Cette information servira à éclairer la décision de choisir entre des candidats pleinement qualifiés à la fin du processus de sélection.'),(0000000011,0000000006,0000000001,'Why are you the right person for this job?','Tell us what makes you unique. Why should you stand out from other candidates. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.'),(0000000012,0000000006,0000000002,'Pourquoi êtes-vous la meilleure personne pour ce travail?','Dites-nous pourquoi vous êtes unique. Pourquoi devriez-vous vous démarquer des autres candidats? Cette information servira à éclairer la décision de choisir entre des candidats pleinement qualifiés à la fin du processus de sélection.'),(0000000013,0000000007,0000000001,'Why are you interested in this job?','We want to know why you are interested in this job instead of other similar ones. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.'),(0000000014,0000000007,0000000001,'Why are you the right person for this job?','Tell us what makes you unique. Why should you stand out from other candidates. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.'),(0000000015,0000000007,0000000002,'Pourquoi êtes-vous intéressé par ce travail?','Nous voulons savoir pourquoi vous êtes intéressé par ce travail au lieu d\'autres similaires. Cette information servira à éclairer la décision de choisir entre des candidats pleinement qualifiés à la fin du processus de sélection.'),(0000000016,0000000007,0000000002,'Pourquoi êtes-vous la meilleure personne pour ce travail?','Dites-nous pourquoi vous êtes unique. Pourquoi devriez-vous vous démarquer des autres candidats? Cette information servira à éclairer la décision de choisir entre des candidats pleinement qualifiés à la fin du processus de sélection.');
/*!40000 ALTER TABLE `job_poster_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_poster_to_manager_user_id`
--

DROP TABLE IF EXISTS `job_poster_to_manager_user_id`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_poster_to_manager_user_id` (
  `job_poster_id` int(10) unsigned zerofill NOT NULL,
  `user_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`job_poster_id`,`user_id`),
  KEY `fk_job_poster_to_manager_user_id_user_id_idx` (`user_id`),
  CONSTRAINT `fk_job_poster_to_manager_user_id_job_poster_id` FOREIGN KEY (`job_poster_id`) REFERENCES `job_poster` (`job_poster_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_job_poster_to_manager_user_id_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_poster_to_manager_user_id`
--

LOCK TABLES `job_poster_to_manager_user_id` WRITE;
/*!40000 ALTER TABLE `job_poster_to_manager_user_id` DISABLE KEYS */;
INSERT INTO `job_poster_to_manager_user_id` VALUES (0000000004,0000000007),(0000000006,0000000007),(0000000007,0000000009);
/*!40000 ALTER TABLE `job_poster_to_manager_user_id` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_poster_v1`
--

DROP TABLE IF EXISTS `job_poster_v1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_poster_v1` (
  `job_poster_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_number` int(10) unsigned zerofill NOT NULL,
  `job_poster_title` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_description` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `job_term_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_term_qty` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_job_min_level_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_job_max_level_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_start_date` datetime NOT NULL,
  `job_poster_end_date` datetime NOT NULL,
  `job_poster_close_date_time` datetime NOT NULL,
  `job_poster_department_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_location_province_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_location_city_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`job_poster_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_poster_v1`
--

LOCK TABLES `job_poster_v1` WRITE;
/*!40000 ALTER TABLE `job_poster_v1` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_poster_v1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_seeker_profile`
--

DROP TABLE IF EXISTS `job_seeker_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_seeker_profile` (
  `job_seeker_profile_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_seeker_profile_link` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `job_seeker_profile_tagline` longtext COLLATE utf8_unicode_ci,
  `job_seeker_profile_twitter_link` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `job_seeker_profile_linkedin_link` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`job_seeker_profile_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_seeker_profile`
--

LOCK TABLES `job_seeker_profile` WRITE;
/*!40000 ALTER TABLE `job_seeker_profile` DISABLE KEYS */;
INSERT INTO `job_seeker_profile` VALUES (0000000003,NULL,NULL,NULL,NULL,'2018-06-26 15:23:39'),(0000000004,NULL,NULL,NULL,NULL,'2018-06-26 15:28:50'),(0000000005,NULL,NULL,NULL,NULL,'2018-06-26 15:34:51'),(0000000006,NULL,NULL,NULL,NULL,'2018-06-26 15:35:35'),(0000000007,NULL,NULL,NULL,NULL,'2018-06-26 15:36:23'),(0000000008,'','A software engineer with a passion for clean, readable code','','','2018-06-26 15:37:36'),(0000000009,'','A software engineer with a passion for clean, readable code','','','2018-06-26 15:44:17'),(0000000010,NULL,NULL,NULL,NULL,'2018-06-26 15:55:02'),(0000000011,NULL,NULL,NULL,NULL,'2018-06-26 16:03:37'),(0000000012,'','Sample Tagline','@joshdrink','joshdrink','2018-06-26 16:35:42'),(0000000013,'','\"It was like that when I got here\"','@Oprah','grantbarnes','2018-06-26 16:38:11'),(0000000014,'','\"It was like that when I got here\"','@Oprah','grantbarnes','2018-06-26 16:38:16'),(0000000015,'','\"It was like that when I got here\"','@Oprah','grantbarnes','2018-06-26 16:38:18'),(0000000016,'','\"It was like that when I got here\"','@Oprah','grantbarnes','2018-06-26 16:38:21'),(0000000017,'','\"It was like that when I got here\"','@Oprah','grantbarnes','2018-06-26 16:38:27'),(0000000018,'','\"It was like that when I got here\"','@Oprah','grantbarnes','2018-06-26 16:38:29'),(0000000019,'','\"It was like that when I got here\"','@Oprah','grantbarnes','2018-06-26 16:38:48'),(0000000020,NULL,NULL,NULL,NULL,'2018-06-26 16:52:16'),(0000000021,'','','','','2018-06-26 16:52:17'),(0000000022,'','My super tagline','@JerboE','jerryescandon','2018-06-26 16:53:38'),(0000000023,'','My super tagline','@JerboE','jerryescandon','2018-06-26 16:53:55'),(0000000024,NULL,NULL,NULL,NULL,'2018-06-26 16:57:14'),(0000000025,'','','','','2018-06-26 17:47:10'),(0000000026,NULL,NULL,NULL,NULL,'2018-06-26 17:56:48'),(0000000027,'','Scientist, Programmer and Policy Wonk','@grayobyrne','gray-o-byrne-14025715/','2018-06-26 18:24:26'),(0000000028,'','Scientist, Programmer and Policy Wonk','@grayobyrne','gray-o-byrne-14025715/','2018-06-26 18:33:01'),(0000000029,'','Scientist, Programmer and Policy Wonk','@grayobyrne','gray-o-byrne-14025715/','2018-06-26 18:34:03'),(0000000030,'','Scientist, Programmer and Policy Wonk','@grayobyrne','gray-o-byrne-14025715/','2018-06-26 18:39:26'),(0000000031,'','Scientist, Programmer and Policy Wonk','@grayobyrne','gray-o-byrne-14025715/','2018-06-26 18:41:19'),(0000000032,'','Scientist, Programmer and Policy Wonk','@grayobyrne','gray-o-byrne-14025715/','2018-06-26 18:41:30'),(0000000033,'','Scientist, Programmer and Policy Wonk','@grayobyrne','gray-o-byrne-14025715/','2018-06-26 18:41:34'),(0000000034,'','Scientist, Programmer and Policy Wonk','@grayobyrne','gray-o-byrne-14025715/','2018-06-26 18:42:43'),(0000000035,'','Scientist, Programmer and Policy Wonk','@grayobyrne','gray-o-byrne-14025715/','2018-06-26 18:45:59'),(0000000036,NULL,NULL,NULL,NULL,'2018-06-26 20:09:45');
/*!40000 ALTER TABLE `job_seeker_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_seeker_profile_answer`
--

DROP TABLE IF EXISTS `job_seeker_profile_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_seeker_profile_answer` (
  `job_seeker_profile_id` int(10) unsigned zerofill NOT NULL,
  `job_seeker_profile_question_id` int(10) unsigned zerofill NOT NULL,
  `answer` text,
  PRIMARY KEY (`job_seeker_profile_id`,`job_seeker_profile_question_id`),
  KEY `fk_job_seeker_profile_question_id_idx` (`job_seeker_profile_question_id`),
  CONSTRAINT `fk_job_seeker_profile_answer_question_id` FOREIGN KEY (`job_seeker_profile_question_id`) REFERENCES `job_seeker_profile_question` (`job_seeker_profile_question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_job_seeker_profile_id` FOREIGN KEY (`job_seeker_profile_id`) REFERENCES `job_seeker_profile` (`job_seeker_profile_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_seeker_profile_answer`
--

LOCK TABLES `job_seeker_profile_answer` WRITE;
/*!40000 ALTER TABLE `job_seeker_profile_answer` DISABLE KEYS */;
INSERT INTO `job_seeker_profile_answer` VALUES (0000000008,0000000001,''),(0000000008,0000000002,''),(0000000008,0000000003,''),(0000000008,0000000004,''),(0000000008,0000000005,''),(0000000008,0000000006,''),(0000000009,0000000001,''),(0000000009,0000000002,''),(0000000009,0000000003,''),(0000000009,0000000004,''),(0000000009,0000000005,''),(0000000009,0000000006,''),(0000000012,0000000001,''),(0000000012,0000000002,''),(0000000012,0000000003,''),(0000000012,0000000004,''),(0000000012,0000000005,''),(0000000012,0000000006,''),(0000000013,0000000001,''),(0000000013,0000000002,''),(0000000013,0000000003,''),(0000000013,0000000004,''),(0000000013,0000000005,''),(0000000013,0000000006,''),(0000000014,0000000001,'sdfsdfdfsd'),(0000000014,0000000002,''),(0000000014,0000000003,''),(0000000014,0000000004,''),(0000000014,0000000005,''),(0000000014,0000000006,''),(0000000015,0000000001,'sdfsdfdfsd'),(0000000015,0000000002,'sdfsdfsdf'),(0000000015,0000000003,''),(0000000015,0000000004,''),(0000000015,0000000005,''),(0000000015,0000000006,''),(0000000016,0000000001,'sdfsdfdfsd'),(0000000016,0000000002,'sdfsdfsdf'),(0000000016,0000000003,'sdfsdfsdfsdfsdf'),(0000000016,0000000004,''),(0000000016,0000000005,''),(0000000016,0000000006,''),(0000000017,0000000001,'sdfsdfdfsd'),(0000000017,0000000002,'sdfsdfsdf'),(0000000017,0000000003,'sdfsdfsdfsdfsdf'),(0000000017,0000000004,''),(0000000017,0000000005,'sdfsdfsdfsdf'),(0000000017,0000000006,''),(0000000018,0000000001,'sdfsdfdfsd'),(0000000018,0000000002,'sdfsdfsdf'),(0000000018,0000000003,'sdfsdfsdfsdfsdf'),(0000000018,0000000004,''),(0000000018,0000000005,'sdfsdfsdfsdf'),(0000000018,0000000006,'sdfsdfsdfsdf'),(0000000019,0000000001,'sdfsdfdfsd'),(0000000019,0000000002,'sdfsdfsdf'),(0000000019,0000000003,'sdfsdfsdfsdfsdf'),(0000000019,0000000004,''),(0000000019,0000000005,'sdfsdfsdfsdf'),(0000000019,0000000006,'sdfsdfsdfsdf'),(0000000021,0000000001,''),(0000000021,0000000002,''),(0000000021,0000000003,''),(0000000021,0000000004,''),(0000000021,0000000005,''),(0000000021,0000000006,''),(0000000022,0000000001,''),(0000000022,0000000002,''),(0000000022,0000000003,''),(0000000022,0000000004,''),(0000000022,0000000005,''),(0000000022,0000000006,''),(0000000023,0000000001,''),(0000000023,0000000002,''),(0000000023,0000000003,''),(0000000023,0000000004,''),(0000000023,0000000005,''),(0000000023,0000000006,''),(0000000025,0000000001,''),(0000000025,0000000002,''),(0000000025,0000000003,''),(0000000025,0000000004,''),(0000000025,0000000005,''),(0000000025,0000000006,''),(0000000027,0000000001,''),(0000000027,0000000002,''),(0000000027,0000000003,''),(0000000027,0000000004,''),(0000000027,0000000005,''),(0000000027,0000000006,''),(0000000028,0000000001,'I began my professional career as a \"scientist who could program computers\", but rapidly got pulled into a web development role. From there, through my side-of-the-desk work, I built the skills I needed to move to the departmental innovation hub when it was created. From there I moved with the team into a central agency to tackle some sticky whole of government problems around staffing and HR.'),(0000000028,0000000002,''),(0000000028,0000000003,''),(0000000028,0000000004,''),(0000000028,0000000005,''),(0000000028,0000000006,''),(0000000029,0000000001,'I began my professional career as a \"scientist who could program computers\", but rapidly got pulled into a web development role. From there, through my side-of-the-desk work, I built the skills I needed to move to the departmental innovation hub when it was created. From there I moved with the team into a central agency to tackle some sticky whole of government problems around staffing and HR.'),(0000000029,0000000002,'I really like learning on the job from people who inspire me. There\'s room for more traditional classroom experiences, but I can only enjoy them in small doses.'),(0000000029,0000000003,''),(0000000029,0000000004,''),(0000000029,0000000005,''),(0000000029,0000000006,''),(0000000030,0000000001,'I began my professional career as a \"scientist who could program computers\", but rapidly got pulled into a web development role. From there, through my side-of-the-desk work, I built the skills I needed to move to the departmental innovation hub when it was created. From there I moved with the team into a central agency to tackle some sticky whole of government problems around staffing and HR.'),(0000000030,0000000002,'I really like learning on the job from people who inspire me. There\'s room for more traditional classroom experiences, but I can only enjoy them in small doses.'),(0000000030,0000000003,'I\'m a team player and bring everyone up around me. Some very kind teammates have thanked me in the past for my energetic and positive outlook. In general though, I tend to try and fill in gaps that I see and make sure everyone is getting along.'),(0000000030,0000000004,''),(0000000030,0000000005,''),(0000000030,0000000006,''),(0000000031,0000000001,'I began my professional career as a \"scientist who could program computers\", but rapidly got pulled into a web development role. From there, through my side-of-the-desk work, I built the skills I needed to move to the departmental innovation hub when it was created. From there I moved with the team into a central agency to tackle some sticky whole of government problems around staffing and HR.'),(0000000031,0000000002,'I really like learning on the job from people who inspire me. There\'s room for more traditional classroom experiences, but I can only enjoy them in small doses.'),(0000000031,0000000003,'I\'m a team player and bring everyone up around me. Some very kind teammates have thanked me in the past for my energetic and positive outlook. In general though, I tend to try and fill in gaps that I see and make sure everyone is getting along.'),(0000000031,0000000004,'I like to have some clear instruction and lots of guidance while learning something new. I tend to pick things up quick though, so I rapidly become quite independent.'),(0000000031,0000000005,''),(0000000031,0000000006,''),(0000000032,0000000001,'I began my professional career as a \"scientist who could program computers\", but rapidly got pulled into a web development role. From there, through my side-of-the-desk work, I built the skills I needed to move to the departmental innovation hub when it was created. From there I moved with the team into a central agency to tackle some sticky whole of government problems around staffing and HR.'),(0000000032,0000000002,''),(0000000032,0000000003,'I\'m a team player and bring everyone up around me. Some very kind teammates have thanked me in the past for my energetic and positive outlook. In general though, I tend to try and fill in gaps that I see and make sure everyone is getting along.'),(0000000032,0000000004,'I like to have some clear instruction and lots of guidance while learning something new. I tend to pick things up quick though, so I rapidly become quite independent.'),(0000000032,0000000005,''),(0000000032,0000000006,''),(0000000033,0000000001,'I began my professional career as a \"scientist who could program computers\", but rapidly got pulled into a web development role. From there, through my side-of-the-desk work, I built the skills I needed to move to the departmental innovation hub when it was created. From there I moved with the team into a central agency to tackle some sticky whole of government problems around staffing and HR.'),(0000000033,0000000002,''),(0000000033,0000000003,'I\'m a team player and bring everyone up around me. Some very kind teammates have thanked me in the past for my energetic and positive outlook. In general though, I tend to try and fill in gaps that I see and make sure everyone is getting along.'),(0000000033,0000000004,'I like to have some clear instruction and lots of guidance while learning something new. I tend to pick things up quick though, so I rapidly become quite independent.'),(0000000033,0000000005,'I really like learning on the job from people who inspire me. There\'s room for more traditional classroom experiences, but I can only enjoy them in small doses.'),(0000000033,0000000006,''),(0000000034,0000000001,'I began my professional career as a \"scientist who could program computers\", but rapidly got pulled into a web development role. From there, through my side-of-the-desk work, I built the skills I needed to move to the departmental innovation hub when it was created. From there I moved with the team into a central agency to tackle some sticky whole of government problems around staffing and HR.'),(0000000034,0000000002,''),(0000000034,0000000003,'I\'m a team player and bring everyone up around me. Some very kind teammates have thanked me in the past for my energetic and positive outlook. In general though, I tend to try and fill in gaps that I see and make sure everyone is getting along.'),(0000000034,0000000004,'I like to have some clear instruction and lots of guidance while learning something new. I tend to pick things up quick though, so I rapidly become quite independent.'),(0000000034,0000000005,'I really like learning on the job from people who inspire me. There\'s room for more traditional classroom experiences, but I can only enjoy them in small doses.'),(0000000034,0000000006,'I\'m pretty good about fitting in wherever I\'m needed, but I do appreciate having lots of folks nearby for the stimulus that comes when interacting with colleagues.'),(0000000035,0000000001,'I began my professional career as a \"scientist who could program computers\", but rapidly got pulled into a web development role. From there, through my side-of-the-desk work, I built the skills I needed to move to the departmental innovation hub when it was created. From there I moved with the team into a central agency to tackle some sticky whole of government problems around staffing and HR.'),(0000000035,0000000002,'I chose physics for university because I thought it would be a challenge. It was. Since then been learning completely new disciplines by essentially taking jobs that I was (at the time) under qualified for. This has been, overall, a much more fun way to learn though it can be rather uncomfortable at times.'),(0000000035,0000000003,'I\'m a team player and bring everyone up around me. Some very kind teammates have thanked me in the past for my energetic and positive outlook. In general though, I tend to try and fill in gaps that I see and make sure everyone is getting along.'),(0000000035,0000000004,'I like to have some clear instruction and lots of guidance while learning something new. I tend to pick things up quick though, so I rapidly become quite independent.'),(0000000035,0000000005,'I really like learning on the job from people who inspire me. There\'s room for more traditional classroom experiences, but I can only enjoy them in small doses.'),(0000000035,0000000006,'I\'m pretty good about fitting in wherever I\'m needed, but I do appreciate having lots of folks nearby for the stimulus that comes when interacting with colleagues.');
/*!40000 ALTER TABLE `job_seeker_profile_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_seeker_profile_question`
--

DROP TABLE IF EXISTS `job_seeker_profile_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_seeker_profile_question` (
  `job_seeker_profile_question_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `common_name` varchar(60) NOT NULL,
  PRIMARY KEY (`job_seeker_profile_question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_seeker_profile_question`
--

LOCK TABLES `job_seeker_profile_question` WRITE;
/*!40000 ALTER TABLE `job_seeker_profile_question` DISABLE KEYS */;
INSERT INTO `job_seeker_profile_question` VALUES (0000000001,'My career journey so far'),(0000000002,'My learning journey so far'),(0000000003,'What I bring to a team'),(0000000004,'I work best when'),(0000000005,'I learn best when'),(0000000006,'Types of teams I work well on');
/*!40000 ALTER TABLE `job_seeker_profile_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_seeker_profile_question_details`
--

DROP TABLE IF EXISTS `job_seeker_profile_question_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_seeker_profile_question_details` (
  `job_seeker_profile_question_id` int(10) unsigned zerofill NOT NULL,
  `locale_id` int(10) unsigned zerofill NOT NULL,
  `question` varchar(60) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`job_seeker_profile_question_id`,`locale_id`),
  KEY `fk_locale_id_idx` (`locale_id`),
  CONSTRAINT `fk_job_seeker_profile_question_id` FOREIGN KEY (`job_seeker_profile_question_id`) REFERENCES `job_seeker_profile_question` (`job_seeker_profile_question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_locale_id` FOREIGN KEY (`locale_id`) REFERENCES `locale` (`locale_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_seeker_profile_question_details`
--

LOCK TABLES `job_seeker_profile_question_details` WRITE;
/*!40000 ALTER TABLE `job_seeker_profile_question_details` DISABLE KEYS */;
INSERT INTO `job_seeker_profile_question_details` VALUES (0000000001,0000000001,'My career journey so far...','This is your chance to share the unique story of how you got to where you are now… and where you want to go from here.'),(0000000001,0000000002,'My career journey so far... (TRANSLATION NEEDED)','(TRANSLATION NEEDED) This is your chance to share the unique story of how you got to where you are now… and where you want to go from here.'),(0000000002,0000000001,'My learning journey so far...','Learning never stops, and it comes to all of us in different ways. Whether it comes from formal education or life lessons, knowledge passed on from elders or things you’ve picked up along the way, here’s your chance to share a bit about this side of who you are.'),(0000000002,0000000002,'My learning journey so far... (TRANSLATION NEEDED)','(TRANSLATION NEEDED) Learning never stops, and it comes to all of us in different ways. Whether it comes from formal education or life lessons, knowledge passed on from elders or things you’ve picked up along the way, here’s your chance to share a bit about this side of who you are.'),(0000000003,0000000001,'What I bring to a team...','People take note of the rock star and forget they are nothing without the band. Help potential teams and managers see what unique skills, attributes and knowledge you bring to help a team do great work.'),(0000000003,0000000002,'What I bring to a team... (TRANSLATION NEEDED)','(TRANSLATION NEEDED) People take note of the rock star and forget they are nothing without the band. Help potential teams and managers see what unique skills, attributes and knowledge you bring to help a team do great work.'),(0000000004,0000000001,'I work best when...','Introvert? Extrovert? Bit of both? Do you like tight deadlines or do you prefer to have time to process ideas? Do you work well independently or are team products more your thing? Here’s your chance to let a potential manager know what will let you give the team your best.'),(0000000004,0000000002,'I work best when... (TRANSLATION NEEDED)','(TRANSLATION NEEDED) Introvert? Extrovert? Bit of both? Do you like tight deadlines or do you prefer to have time to process ideas? Do you work well independently or are team products more your thing? Here’s your chance to let a potential manager know what will let you give the team your best.'),(0000000005,0000000001,'I learn best when...','Do you absorb information best by reading? By doing? Or are you a visual learner? Do you pick things up quickly or do you like to develop deep expertise over time? Joining a new team means learning new things. Help a potential manager understand your learning style so you can get up to speed and contributing quickly.'),(0000000005,0000000002,'I learn best when... (TRANSLATION NEEDED)','(TRANSLATION NEEDED) Do you absorb information best by reading? By doing? Or are you a visual learner? Do you pick things up quickly or do you like to develop deep expertise over time? Joining a new team means learning new things. Help a potential manager understand your learning style so you can get up to speed and contributing quickly.'),(0000000006,0000000001,'Types of teams I work well on...','Do you absorb information best by reading? By doing? Or are you a visual learner? Do you pick things up quickly or do you like to develop deep expertise over time? Joining a new team means learning new things. Help a potential manager understand your learning style so you can get up to speed and contributing quickly.'),(0000000006,0000000002,'Types of teams I work well on... (TRANSLATION NEEDED)','(TRANSLATION NEEDED) Do you work best when you collaborate on projects or when you have a role where you can do your own thing? Do you prefer having a routine or do you thrive on teams where every day is something different? Are you highly adaptable to different work styles or do you have a preference for particular ways of working? Here’s your chance to let managers learn about the type of team(s) you work well on and the role(s) you prefer to play.');
/*!40000 ALTER TABLE `job_seeker_profile_question_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_term`
--

DROP TABLE IF EXISTS `job_term`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_term` (
  `job_term_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_term_common_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`job_term_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_term`
--

LOCK TABLES `job_term` WRITE;
/*!40000 ALTER TABLE `job_term` DISABLE KEYS */;
INSERT INTO `job_term` VALUES (0000000001,'week'),(0000000002,'month'),(0000000003,'year'),(0000000004,'permanent');
/*!40000 ALTER TABLE `job_term` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_term_details`
--

DROP TABLE IF EXISTS `job_term_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_term_details` (
  `job_term_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_term_id` int(10) unsigned zerofill NOT NULL,
  `job_term` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `job_term_locale_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`job_term_details_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_term_details`
--

LOCK TABLES `job_term_details` WRITE;
/*!40000 ALTER TABLE `job_term_details` DISABLE KEYS */;
INSERT INTO `job_term_details` VALUES (0000000001,0000000001,'week',0000000001),(0000000002,0000000001,'semaine',0000000002),(0000000003,0000000002,'month',0000000001),(0000000004,0000000002,'mois',0000000002),(0000000005,0000000003,'year',0000000001),(0000000006,0000000003,'an',0000000002),(0000000007,0000000004,'permanent',0000000001),(0000000008,0000000004,'permanent',0000000002);
/*!40000 ALTER TABLE `job_term_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language_requirement`
--

DROP TABLE IF EXISTS `language_requirement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `language_requirement` (
  `language_requirement_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `language_requirement_common_name` varchar(65) NOT NULL,
  PRIMARY KEY (`language_requirement_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language_requirement`
--

LOCK TABLES `language_requirement` WRITE;
/*!40000 ALTER TABLE `language_requirement` DISABLE KEYS */;
INSERT INTO `language_requirement` VALUES (0000000001,'English essential'),(0000000002,'French essential'),(0000000003,'Bilingual');
/*!40000 ALTER TABLE `language_requirement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language_requirement_details`
--

DROP TABLE IF EXISTS `language_requirement_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `language_requirement_details` (
  `language_requirement_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `language_requirement_details_locale_id` int(10) unsigned zerofill NOT NULL,
  `language_requirement_id` int(10) unsigned zerofill NOT NULL,
  `language_requirement_details_name` varchar(65) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`language_requirement_details_id`),
  KEY `fk_language_requirement_id_idx` (`language_requirement_id`),
  CONSTRAINT `fk_language_requirement_details_language_requirement_id` FOREIGN KEY (`language_requirement_id`) REFERENCES `language_requirement` (`language_requirement_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language_requirement_details`
--

LOCK TABLES `language_requirement_details` WRITE;
/*!40000 ALTER TABLE `language_requirement_details` DISABLE KEYS */;
INSERT INTO `language_requirement_details` VALUES (0000000001,0000000001,0000000001,'English essential'),(0000000002,0000000002,0000000001,'Anglais essentiel'),(0000000003,0000000001,0000000002,'French essential'),(0000000004,0000000002,0000000002,'Français essentiel'),(0000000005,0000000001,0000000003,'Bilingual'),(0000000006,0000000002,0000000003,'Bilingue');
/*!40000 ALTER TABLE `language_requirement_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locale`
--

DROP TABLE IF EXISTS `locale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locale` (
  `locale_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `locale_iso` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`locale_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locale`
--

LOCK TABLES `locale` WRITE;
/*!40000 ALTER TABLE `locale` DISABLE KEYS */;
INSERT INTO `locale` VALUES (0000000001,'en_CA'),(0000000002,'fr_CA');
/*!40000 ALTER TABLE `locale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager_profile_to_team_culture`
--

DROP TABLE IF EXISTS `manager_profile_to_team_culture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manager_profile_to_team_culture` (
  `user_manager_profile_id` int(10) unsigned zerofill NOT NULL,
  `team_culture_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`user_manager_profile_id`),
  KEY `fk__manager_profile_to_team_culture__team_culture_idx` (`team_culture_id`),
  CONSTRAINT `fk__manager_profile_to_team_culture__manager_profile` FOREIGN KEY (`user_manager_profile_id`) REFERENCES `user_manager_profile` (`user_manager_profile_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk__manager_profile_to_team_culture__team_culture` FOREIGN KEY (`team_culture_id`) REFERENCES `team_culture` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager_profile_to_team_culture`
--

LOCK TABLES `manager_profile_to_team_culture` WRITE;
/*!40000 ALTER TABLE `manager_profile_to_team_culture` DISABLE KEYS */;
INSERT INTO `manager_profile_to_team_culture` VALUES (0000000005,0000000004),(0000000006,0000000004),(0000000007,0000000004),(0000000008,0000000004),(0000000009,0000000004),(0000000010,0000000004),(0000000012,0000000004),(0000000013,0000000004),(0000000014,0000000004),(0000000016,0000000005),(0000000017,0000000005),(0000000018,0000000005);
/*!40000 ALTER TABLE `manager_profile_to_team_culture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager_profile_to_work_environment`
--

DROP TABLE IF EXISTS `manager_profile_to_work_environment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manager_profile_to_work_environment` (
  `user_manager_profile_id` int(10) unsigned zerofill NOT NULL,
  `work_environment_id` int(10) NOT NULL,
  PRIMARY KEY (`user_manager_profile_id`),
  CONSTRAINT `fk_manager_profile_to_work_environment_manager_profile_id` FOREIGN KEY (`user_manager_profile_id`) REFERENCES `user_manager_profile` (`user_manager_profile_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager_profile_to_work_environment`
--

LOCK TABLES `manager_profile_to_work_environment` WRITE;
/*!40000 ALTER TABLE `manager_profile_to_work_environment` DISABLE KEYS */;
INSERT INTO `manager_profile_to_work_environment` VALUES (0000000005,3),(0000000006,3),(0000000007,3),(0000000008,3),(0000000009,3),(0000000010,3),(0000000011,4),(0000000012,3),(0000000013,3),(0000000014,3),(0000000015,4),(0000000016,4),(0000000017,4),(0000000018,4);
/*!40000 ALTER TABLE `manager_profile_to_work_environment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `micro_reference`
--

DROP TABLE IF EXISTS `micro_reference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `micro_reference` (
  `micro_reference_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `micro_reference_name` varchar(45) DEFAULT NULL,
  `micro_reference_email` varchar(45) DEFAULT NULL,
  `micro_reference_relationship_id` int(10) unsigned zerofill DEFAULT NULL,
  `micro_reference_observed_from_date` date DEFAULT NULL,
  `micro_reference_observed_until_date` date DEFAULT NULL,
  `micro_reference_experience_level_id` int(10) unsigned zerofill DEFAULT NULL,
  `micro_reference_story` text,
  PRIMARY KEY (`micro_reference_id`),
  KEY `fk_micro_reference_relationship_id_idx` (`micro_reference_relationship_id`),
  KEY `fk_micro_reference_experience_level_id_idx` (`micro_reference_experience_level_id`),
  CONSTRAINT `fk_micro_reference_experience_level_id` FOREIGN KEY (`micro_reference_experience_level_id`) REFERENCES `experience_level` (`experience_level_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_micro_reference_relationship_id` FOREIGN KEY (`micro_reference_relationship_id`) REFERENCES `relationship` (`relationship_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `micro_reference`
--

LOCK TABLES `micro_reference` WRITE;
/*!40000 ALTER TABLE `micro_reference` DISABLE KEYS */;
INSERT INTO `micro_reference` VALUES (0000000001,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000002,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000003,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000004,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000005,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000006,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000007,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000008,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000009,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000010,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000011,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000012,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000013,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000014,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000015,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000016,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000017,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000018,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000019,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000020,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000021,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000022,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000023,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000024,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000025,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000026,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000027,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000028,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000029,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000030,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000031,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000032,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000033,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000034,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000035,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000036,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000037,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000038,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000039,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000040,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000041,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000042,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000043,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000044,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000045,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000046,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000047,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000048,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000049,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000050,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000051,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000052,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000053,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000054,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000055,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000056,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000057,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000058,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000059,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000060,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000061,'Manager Name','manager.name@servicecanada.gc.ca',0000000003,'2013-03-30','2013-10-31',0000000004,'Developed and maintained a MS Excel spreadsheet to track client phone numbers and addresses.'),(0000000062,'Manager Name','manager.name@servicecanada.gc.ca',0000000003,'2013-03-25','2018-03-01',0000000004,'2013/03-2013/10 - Contacted Canadian Pensioners to confirm their addresses who had their T4A mail returned to Service Canada.\n2016/10 -2018/03 - Received phone calls from Employment Insurance clients and answered inquiries about audit letter received.'),(0000000063,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000064,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000065,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000066,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000067,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000068,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000069,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000070,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000071,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000072,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000073,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000074,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000075,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000076,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000077,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000078,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000079,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000080,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000081,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000082,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000083,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000084,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000085,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000086,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000087,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000088,'Manager Name','manager.name@servicecanada.gc.ca',0000000003,'2013-03-25','2018-03-01',0000000004,'2013/03-2013/10 - Contacted Canadian Pensioners to confirm their addresses who had their T4A mail returned to Service Canada.\n2016/10 -2018/03 - Received phone calls from Employment Insurance clients and answered inquiries about audit letter received.'),(0000000089,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000090,'Manager Name','manager.name@servicecanada.gc.ca',0000000003,'2013-03-30','2013-10-31',0000000004,'Developed and maintained a MS Excel spreadsheet to track client phone numbers and addresses.'),(0000000091,'Manager Name','manager.name@servicecanada.gc.ca',0000000003,'2013-03-25','2018-03-01',0000000004,'2013/03-2013/10 - Contacted Canadian Pensioners to confirm their addresses who had their T4A mail returned to Service Canada.\n2016/10 -2018/03 - Received phone calls from Employment Insurance clients and answered inquiries about audit letter received.'),(0000000092,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000093,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000094,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000095,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000096,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000097,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000098,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000099,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000100,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000101,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000102,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000103,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000104,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000105,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000106,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000107,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000108,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `micro_reference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_pic`
--

DROP TABLE IF EXISTS `profile_pic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile_pic` (
  `user_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `image` longblob NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_profile_pic_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_pic`
--

LOCK TABLES `profile_pic` WRITE;
/*!40000 ALTER TABLE `profile_pic` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile_pic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `province`
--

DROP TABLE IF EXISTS `province`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `province` (
  `province_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `province_common_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`province_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `province`
--

LOCK TABLES `province` WRITE;
/*!40000 ALTER TABLE `province` DISABLE KEYS */;
INSERT INTO `province` VALUES (0000000001,'Alberta'),(0000000002,'British Columbia'),(0000000003,'Manitoba'),(0000000004,'Newfoundland and Labrador'),(0000000005,'New Brunswick'),(0000000006,'Nova Scotia'),(0000000007,'Nunavut'),(0000000008,'North West Territories'),(0000000009,'Ontario'),(0000000010,'Prince Edward Island'),(0000000011,'Quebec'),(0000000012,'Saskatchewan'),(0000000013,'Yukon');
/*!40000 ALTER TABLE `province` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `province_details`
--

DROP TABLE IF EXISTS `province_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `province_details` (
  `province_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `province_details_province_id` int(10) unsigned zerofill NOT NULL,
  `province_details_locale_id` int(10) unsigned zerofill NOT NULL,
  `province_details_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`province_details_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `province_details`
--

LOCK TABLES `province_details` WRITE;
/*!40000 ALTER TABLE `province_details` DISABLE KEYS */;
INSERT INTO `province_details` VALUES (0000000001,0000000001,0000000001,'Alberta'),(0000000002,0000000001,0000000002,'Alberta'),(0000000003,0000000002,0000000001,'British Columbia'),(0000000004,0000000002,0000000002,'Colombie-Britannique'),(0000000005,0000000003,0000000001,'Manitoba'),(0000000006,0000000003,0000000002,'Manitoba'),(0000000007,0000000004,0000000001,'New Brunswick'),(0000000008,0000000004,0000000002,'Nouveau-Brunswick'),(0000000009,0000000005,0000000001,'Newfoundland and Labrador'),(0000000010,0000000005,0000000002,'Terre-Neuve-et-Labrador'),(0000000011,0000000006,0000000001,'Nova Scotia'),(0000000012,0000000006,0000000002,'Nouvelle-Écosse'),(0000000013,0000000007,0000000001,'Northwest Territories'),(0000000014,0000000007,0000000002,'Territoires du Nord-Ouest'),(0000000015,0000000008,0000000001,'Nunavut'),(0000000016,0000000008,0000000002,'Nunavut'),(0000000017,0000000009,0000000001,'Ontario'),(0000000018,0000000009,0000000002,'Ontario'),(0000000019,0000000010,0000000001,'Prince Edward Island'),(0000000020,0000000010,0000000002,'Île-du-Prince-Édouard'),(0000000021,0000000011,0000000001,'Quebec'),(0000000022,0000000011,0000000002,'Québec'),(0000000023,0000000012,0000000001,'Saskatchewan'),(0000000024,0000000012,0000000002,'Saskatchewan'),(0000000025,0000000013,0000000001,'Yukon'),(0000000026,0000000013,0000000002,'Yukon');
/*!40000 ALTER TABLE `province_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationship`
--

DROP TABLE IF EXISTS `relationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relationship` (
  `relationship_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `relationship_name` varchar(45) NOT NULL,
  PRIMARY KEY (`relationship_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationship`
--

LOCK TABLES `relationship` WRITE;
/*!40000 ALTER TABLE `relationship` DISABLE KEYS */;
INSERT INTO `relationship` VALUES (0000000001,'superior'),(0000000002,'coworker'),(0000000003,'subordinate');
/*!40000 ALTER TABLE `relationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationship_details`
--

DROP TABLE IF EXISTS `relationship_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relationship_details` (
  `relationship_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `relationship_id` int(10) unsigned zerofill NOT NULL,
  `locale_id` int(10) unsigned zerofill NOT NULL,
  `relationship_details_name` varchar(45) NOT NULL,
  PRIMARY KEY (`relationship_details_id`),
  KEY `fk_relationship_details_relationship_id_idx` (`relationship_id`),
  KEY `fk_relationship_locale_id_idx` (`locale_id`),
  CONSTRAINT `fk_relationship_details_relationship_id` FOREIGN KEY (`relationship_id`) REFERENCES `relationship` (`relationship_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_relationship_locale_id` FOREIGN KEY (`locale_id`) REFERENCES `locale` (`locale_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationship_details`
--

LOCK TABLES `relationship_details` WRITE;
/*!40000 ALTER TABLE `relationship_details` DISABLE KEYS */;
INSERT INTO `relationship_details` VALUES (0000000001,0000000001,0000000001,'Superior'),(0000000002,0000000001,0000000002,'Supérieur'),(0000000003,0000000002,0000000001,'Coworker'),(0000000004,0000000002,0000000002,'Collaborateur'),(0000000005,0000000003,0000000001,'Subordinate'),(0000000006,0000000003,0000000002,'Subalterne');
/*!40000 ALTER TABLE `relationship_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `security_clearance`
--

DROP TABLE IF EXISTS `security_clearance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `security_clearance` (
  `security_clearance_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `security_clearance_common_name` varchar(65) NOT NULL,
  PRIMARY KEY (`security_clearance_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `security_clearance`
--

LOCK TABLES `security_clearance` WRITE;
/*!40000 ALTER TABLE `security_clearance` DISABLE KEYS */;
INSERT INTO `security_clearance` VALUES (0000000001,'Reliability'),(0000000002,'Secret'),(0000000003,'Top Secret');
/*!40000 ALTER TABLE `security_clearance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `security_clearance_details`
--

DROP TABLE IF EXISTS `security_clearance_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `security_clearance_details` (
  `security_clearance_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `security_clearance_details_locale_id` int(10) unsigned zerofill NOT NULL,
  `security_clearance_id` int(10) unsigned zerofill NOT NULL,
  `security_clearance_details_name` varchar(65) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`security_clearance_details_id`),
  KEY `fk_security_clearance_id_idx` (`security_clearance_id`),
  CONSTRAINT `fk_security_clearance_details_security_clearance_id` FOREIGN KEY (`security_clearance_id`) REFERENCES `security_clearance` (`security_clearance_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `security_clearance_details`
--

LOCK TABLES `security_clearance_details` WRITE;
/*!40000 ALTER TABLE `security_clearance_details` DISABLE KEYS */;
INSERT INTO `security_clearance_details` VALUES (0000000001,0000000001,0000000001,'Reliability'),(0000000002,0000000002,0000000001,'Fiabilité'),(0000000003,0000000001,0000000002,'Secret'),(0000000004,0000000002,0000000002,'Secret'),(0000000005,0000000001,0000000003,'Top Secret'),(0000000006,0000000002,0000000003,'Très secret');
/*!40000 ALTER TABLE `security_clearance_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill_declaration`
--

DROP TABLE IF EXISTS `skill_declaration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skill_declaration` (
  `skill_declaration_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `criteria_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_application_id` int(10) unsigned zerofill NOT NULL,
  `experience_level_id` int(10) unsigned zerofill DEFAULT NULL,
  `skill_level_id` int(10) unsigned zerofill DEFAULT NULL,
  `description` mediumtext,
  `is_active` tinyint(4) NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`skill_declaration_id`),
  KEY `fk_experience_level_id_idx` (`experience_level_id`),
  KEY `fk_skill_level_id_idx` (`skill_level_id`),
  KEY `fk_skill_declaration_criteria_id_idx` (`criteria_id`),
  KEY `fk_skill_declaration_application_id_idx` (`job_poster_application_id`),
  CONSTRAINT `fk_skill_declaration_application_id` FOREIGN KEY (`job_poster_application_id`) REFERENCES `job_poster_application` (`job_poster_application_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_skill_declaration_criteria_id` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`criteria_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_skill_declaration_experience_level_id` FOREIGN KEY (`experience_level_id`) REFERENCES `experience_level` (`experience_level_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_skill_declaration_skill_level_id` FOREIGN KEY (`skill_level_id`) REFERENCES `skill_level` (`skill_level_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill_declaration`
--

LOCK TABLES `skill_declaration` WRITE;
/*!40000 ALTER TABLE `skill_declaration` DISABLE KEYS */;
INSERT INTO `skill_declaration` VALUES (0000000012,0000000009,0000000003,0000000002,0000000001,'dsfsdfsd',1,'2018-06-26 16:20:34'),(0000000013,0000000009,0000000003,0000000002,0000000001,'dsfsdfsd',1,'2018-06-26 16:21:36'),(0000000014,0000000011,0000000003,0000000002,0000000001,'nklklknnk',1,'2018-06-26 16:21:46'),(0000000015,0000000011,0000000003,0000000002,0000000001,'nklklknnk',1,'2018-06-26 16:21:53'),(0000000016,0000000013,0000000005,0000000002,0000000002,'asdf',1,'2018-06-26 16:29:47'),(0000000017,0000000014,0000000005,NULL,NULL,NULL,1,'2018-06-26 16:29:47'),(0000000018,0000000015,0000000005,NULL,NULL,NULL,1,'2018-06-26 16:29:47'),(0000000019,0000000016,0000000005,NULL,NULL,NULL,1,'2018-06-26 16:29:47'),(0000000020,0000000017,0000000005,NULL,NULL,NULL,1,'2018-06-26 16:29:48'),(0000000021,0000000020,0000000005,NULL,NULL,NULL,1,'2018-06-26 16:29:48'),(0000000022,0000000018,0000000005,NULL,NULL,NULL,1,'2018-06-26 16:29:48'),(0000000023,0000000019,0000000005,NULL,NULL,NULL,1,'2018-06-26 16:29:48'),(0000000024,0000000037,0000000004,NULL,NULL,NULL,1,'2018-06-26 16:30:16'),(0000000025,0000000039,0000000004,NULL,NULL,NULL,1,'2018-06-26 16:30:16'),(0000000026,0000000040,0000000004,NULL,NULL,NULL,1,'2018-06-26 16:30:16'),(0000000027,0000000038,0000000004,NULL,NULL,NULL,1,'2018-06-26 16:30:16'),(0000000028,0000000041,0000000004,NULL,NULL,NULL,1,'2018-06-26 16:30:16'),(0000000029,0000000042,0000000004,NULL,NULL,NULL,1,'2018-06-26 16:30:16'),(0000000030,0000000049,0000000004,NULL,NULL,NULL,1,'2018-06-26 16:30:20'),(0000000031,0000000051,0000000004,NULL,NULL,NULL,1,'2018-06-26 16:30:20'),(0000000032,0000000050,0000000004,NULL,NULL,NULL,1,'2018-06-26 16:30:20'),(0000000033,0000000037,0000000007,NULL,NULL,NULL,1,'2018-06-26 16:39:19'),(0000000034,0000000038,0000000007,NULL,NULL,NULL,1,'2018-06-26 16:39:19'),(0000000035,0000000039,0000000007,NULL,NULL,NULL,1,'2018-06-26 16:39:19'),(0000000036,0000000040,0000000007,NULL,NULL,NULL,1,'2018-06-26 16:39:19'),(0000000037,0000000042,0000000007,NULL,NULL,NULL,1,'2018-06-26 16:39:20'),(0000000038,0000000041,0000000007,NULL,NULL,NULL,1,'2018-06-26 16:39:20'),(0000000039,0000000049,0000000007,NULL,NULL,NULL,1,'2018-06-26 16:39:30'),(0000000040,0000000050,0000000007,NULL,NULL,NULL,1,'2018-06-26 16:39:30'),(0000000041,0000000051,0000000007,NULL,NULL,NULL,1,'2018-06-26 16:39:30'),(0000000042,0000000013,0000000009,0000000002,0000000002,'stuff',1,'2018-06-26 16:44:48'),(0000000043,0000000013,0000000009,0000000002,0000000002,'stuff',1,'2018-06-26 16:45:12'),(0000000044,0000000014,0000000009,NULL,NULL,NULL,1,'2018-06-26 16:45:12'),(0000000045,0000000015,0000000009,NULL,NULL,NULL,1,'2018-06-26 16:45:12'),(0000000046,0000000017,0000000009,NULL,NULL,NULL,1,'2018-06-26 16:45:12'),(0000000047,0000000016,0000000009,NULL,NULL,NULL,1,'2018-06-26 16:45:12'),(0000000048,0000000019,0000000009,NULL,NULL,NULL,1,'2018-06-26 16:45:12'),(0000000049,0000000018,0000000009,NULL,NULL,NULL,1,'2018-06-26 16:45:12'),(0000000050,0000000020,0000000009,NULL,NULL,NULL,1,'2018-06-26 16:45:12'),(0000000051,0000000009,0000000010,NULL,NULL,NULL,1,'2018-06-26 16:48:29'),(0000000052,0000000011,0000000010,NULL,NULL,NULL,1,'2018-06-26 16:48:36'),(0000000053,0000000013,0000000012,0000000001,0000000001,'I went to school boy',1,'2018-06-26 16:56:06'),(0000000054,0000000014,0000000012,0000000001,0000000001,'helo?\n',1,'2018-06-26 16:56:52'),(0000000055,0000000037,0000000013,0000000001,0000000001,'one',1,'2018-06-26 16:59:53'),(0000000056,0000000038,0000000013,0000000002,0000000002,'Two',1,'2018-06-26 16:59:53'),(0000000057,0000000039,0000000013,0000000003,0000000003,'Three',1,'2018-06-26 16:59:53'),(0000000058,0000000040,0000000013,0000000004,0000000004,'Four',1,'2018-06-26 16:59:53'),(0000000059,0000000041,0000000013,0000000005,0000000004,'Five',1,'2018-06-26 16:59:53'),(0000000060,0000000042,0000000013,0000000005,0000000004,'Six',1,'2018-06-26 16:59:53'),(0000000061,0000000049,0000000013,NULL,NULL,NULL,1,'2018-06-26 17:00:00'),(0000000062,0000000050,0000000013,NULL,NULL,NULL,1,'2018-06-26 17:00:00'),(0000000063,0000000051,0000000013,NULL,NULL,NULL,1,'2018-06-26 17:00:00'),(0000000064,0000000013,0000000015,NULL,NULL,NULL,1,'2018-06-26 17:21:36'),(0000000065,0000000014,0000000015,NULL,NULL,NULL,1,'2018-06-26 17:21:37'),(0000000066,0000000017,0000000015,NULL,NULL,NULL,1,'2018-06-26 17:21:37'),(0000000067,0000000018,0000000015,NULL,NULL,NULL,1,'2018-06-26 17:21:38'),(0000000068,0000000015,0000000015,NULL,NULL,NULL,1,'2018-06-26 17:21:38'),(0000000069,0000000016,0000000015,NULL,NULL,NULL,1,'2018-06-26 17:21:38'),(0000000070,0000000020,0000000015,NULL,NULL,NULL,1,'2018-06-26 17:21:38'),(0000000071,0000000019,0000000015,NULL,NULL,NULL,1,'2018-06-26 17:21:38'),(0000000072,0000000029,0000000015,NULL,NULL,NULL,1,'2018-06-26 17:21:47'),(0000000073,0000000030,0000000015,NULL,NULL,NULL,1,'2018-06-26 17:21:48'),(0000000074,0000000031,0000000015,NULL,NULL,NULL,1,'2018-06-26 17:21:48'),(0000000075,0000000032,0000000015,NULL,NULL,NULL,1,'2018-06-26 17:21:48'),(0000000076,0000000013,0000000015,0000000002,0000000002,'I graduated from the Northern Alberta Institute of Technology on April 2015 with a diploma from the Digital Media and IT specializing in Rich Media and Web Development and Design.',1,'2018-06-26 17:25:42'),(0000000077,0000000014,0000000015,0000000005,0000000003,'I had formal education on using MS Office Suite in high school during the 2000\'s.\nUsed MS Office Suite for secondary school essays and interactive presentations.\nUsed MS Office Suite in a professional setting to compose letters to clients and develop spreadsheets while working in public service.',1,'2018-06-26 17:36:29'),(0000000078,0000000015,0000000015,0000000005,0000000002,'I was working for Starbucks as a Barista for four years in which I had practiced my interpersonal skills everyday interacting with customers on the other side of the counter and colleagues behind the counter.\nAfter leaving Starbucks, I began my journey with public service in which I interacted with Canadian citizens on the phone for five years.',1,'2018-06-26 17:50:25'),(0000000079,0000000013,0000000016,0000000003,0000000002,'gfh',1,'2018-06-26 18:01:20'),(0000000080,0000000013,0000000012,0000000001,0000000001,'I went to school boy',1,'2018-06-26 18:10:59'),(0000000081,0000000014,0000000012,0000000001,0000000001,'helo?\n',1,'2018-06-26 18:11:00'),(0000000082,0000000020,0000000012,NULL,NULL,NULL,1,'2018-06-26 18:11:00'),(0000000083,0000000017,0000000012,NULL,NULL,NULL,1,'2018-06-26 18:11:00'),(0000000084,0000000015,0000000012,NULL,NULL,NULL,1,'2018-06-26 18:11:00'),(0000000085,0000000018,0000000012,NULL,NULL,NULL,1,'2018-06-26 18:11:01'),(0000000086,0000000014,0000000012,0000000001,0000000001,'helo?\n',1,'2018-06-26 18:11:01'),(0000000087,0000000016,0000000012,NULL,NULL,NULL,1,'2018-06-26 18:11:01'),(0000000088,0000000013,0000000012,0000000001,0000000001,'I went to school boy',1,'2018-06-26 18:11:02'),(0000000089,0000000019,0000000012,NULL,NULL,NULL,1,'2018-06-26 18:11:02'),(0000000090,0000000015,0000000012,NULL,NULL,NULL,1,'2018-06-26 18:11:02'),(0000000091,0000000016,0000000012,NULL,NULL,NULL,1,'2018-06-26 18:11:02'),(0000000092,0000000017,0000000012,NULL,NULL,NULL,1,'2018-06-26 18:11:02'),(0000000093,0000000018,0000000012,NULL,NULL,NULL,1,'2018-06-26 18:11:02'),(0000000094,0000000019,0000000012,NULL,NULL,NULL,1,'2018-06-26 18:11:02'),(0000000095,0000000020,0000000012,NULL,NULL,NULL,1,'2018-06-26 18:11:02'),(0000000096,0000000013,0000000012,0000000001,0000000001,NULL,1,'2018-06-26 18:12:54'),(0000000097,0000000014,0000000012,0000000001,0000000001,NULL,1,'2018-06-26 18:13:00'),(0000000098,0000000037,0000000017,NULL,NULL,NULL,1,'2018-06-26 18:14:26'),(0000000099,0000000038,0000000017,NULL,NULL,NULL,1,'2018-06-26 18:14:26'),(0000000100,0000000039,0000000017,NULL,NULL,NULL,1,'2018-06-26 18:14:27'),(0000000101,0000000040,0000000017,NULL,NULL,NULL,1,'2018-06-26 18:14:27'),(0000000102,0000000041,0000000017,NULL,NULL,NULL,1,'2018-06-26 18:14:27'),(0000000103,0000000042,0000000017,NULL,NULL,NULL,1,'2018-06-26 18:14:27'),(0000000104,0000000049,0000000017,NULL,NULL,NULL,1,'2018-06-26 18:14:42'),(0000000105,0000000050,0000000017,NULL,NULL,NULL,1,'2018-06-26 18:14:43'),(0000000106,0000000051,0000000017,NULL,NULL,NULL,1,'2018-06-26 18:14:43'),(0000000107,0000000037,0000000007,0000000003,0000000002,' ',1,'2018-06-26 19:04:14'),(0000000108,0000000016,0000000015,0000000003,0000000002,'As a public servant, I had experience handling thousands of client files on a given day, I usually organize then according to urgency and status.',1,'2018-06-26 20:16:13'),(0000000109,0000000038,0000000007,0000000001,0000000002,'ùhello',1,'2018-06-26 20:16:42'),(0000000110,0000000017,0000000015,0000000003,0000000002,'While working for Starbucks as a Barista, I work under pressure every day during rushes. I am also under pressure by the manager to keep sales up on food items.\nAs a public servant, I am constantly working under pressure to complete client files to meet the projected quota.',1,'2018-06-26 20:18:42'),(0000000111,0000000018,0000000015,0000000004,0000000002,'I am very accustomed to working with minimal supervision, as I establish high standards on my work and on others that I am leading.',1,'2018-06-26 20:19:51'),(0000000112,0000000019,0000000015,0000000004,0000000002,'While working for Starbucks, I strive to deliver legendary customer service every day to every single person that steps in.\nAs a public servant, I always deliver prompt client service to Canadians that meet their expectations.',1,'2018-06-26 20:32:40'),(0000000113,0000000020,0000000015,0000000003,0000000002,'As a public servant, I am very detail oriented with client benefit calculations, and reviewing client file history to deliver accurate payments to clients.',1,'2018-06-26 20:40:04'),(0000000114,0000000013,0000000015,0000000002,0000000002,'I graduated from the Northern Alberta Institute of Technology on April 2015 with a diploma from the Digital Media and IT specializing in Rich Media and Web Development and Design.',1,'2018-06-26 20:40:07'),(0000000115,0000000014,0000000015,0000000005,0000000003,'I had formal education on using MS Office Suite in high school during the 2000\'s.\nUsed MS Office Suite for secondary school essays and interactive presentations.\nUsed MS Office Suite in a professional setting to compose letters to clients and develop spreadsheets while working in public service.',1,'2018-06-26 20:40:07'),(0000000116,0000000015,0000000015,0000000005,0000000002,'I was working for Starbucks as a Barista for four years in which I had practiced my interpersonal skills everyday interacting with customers on the other side of the counter and colleagues behind the counter.\nAfter leaving Starbucks, I began my journey with public service in which I interacted with Canadian citizens on the phone for five years.',1,'2018-06-26 20:40:07'),(0000000117,0000000016,0000000015,0000000003,0000000002,'As a public servant, I had experience handling thousands of client files on a given day, I usually organize then according to urgency and status.',1,'2018-06-26 20:40:08'),(0000000118,0000000017,0000000015,0000000003,0000000002,'While working for Starbucks as a Barista, I work under pressure every day during rushes. I am also under pressure by the manager to keep sales up on food items.\nAs a public servant, I am constantly working under pressure to complete client files to meet the projected quota.',1,'2018-06-26 20:40:08'),(0000000119,0000000018,0000000015,0000000004,0000000002,'I am very accustomed to working with minimal supervision, as I establish high standards on my work and on others that I am leading.',1,'2018-06-26 20:40:08'),(0000000120,0000000019,0000000015,0000000004,0000000002,'While working for Starbucks, I strive to deliver legendary customer service every day to every single person that steps in.\nAs a public servant, I always deliver prompt client service to Canadians that meet their expectations.',1,'2018-06-26 20:40:08'),(0000000121,0000000020,0000000015,0000000003,0000000002,'As a public servant, I am very detail oriented with client benefit calculations, and reviewing client file history to deliver accurate payments to clients.',1,'2018-06-26 20:40:08'),(0000000122,0000000015,0000000018,0000000005,0000000003,'kuhkuhkhu',1,'2018-06-26 20:55:47'),(0000000123,0000000013,0000000018,0000000004,0000000002,'hftt',1,'2018-06-26 20:56:19'),(0000000124,0000000014,0000000018,0000000005,0000000003,'jfjg',1,'2018-06-26 20:56:45'),(0000000125,0000000016,0000000018,0000000003,0000000002,'kjhkughog',1,'2018-06-26 20:57:03'),(0000000126,0000000016,0000000018,0000000003,0000000002,'kjhkughog',1,'2018-06-26 20:57:14'),(0000000127,0000000016,0000000018,0000000003,0000000002,'kjhkughog',1,'2018-06-26 20:57:28'),(0000000128,0000000017,0000000018,0000000005,0000000004,'gkgt',1,'2018-06-26 20:57:47'),(0000000129,0000000018,0000000018,0000000003,0000000003,NULL,1,'2018-06-26 20:57:57'),(0000000130,0000000018,0000000018,0000000003,0000000003,'uyifgifg',1,'2018-06-26 20:58:01'),(0000000131,0000000019,0000000018,0000000001,0000000001,'kjhkjhk',1,'2018-06-26 20:58:10'),(0000000132,0000000020,0000000018,0000000002,0000000002,'hgjhg',1,'2018-06-26 20:58:25'),(0000000133,0000000014,0000000018,0000000005,0000000003,'jfjg',1,'2018-06-26 20:58:39'),(0000000134,0000000013,0000000018,0000000004,0000000002,'hftt',1,'2018-06-26 20:58:39'),(0000000135,0000000015,0000000018,0000000005,0000000003,'kuhkuhkhu',1,'2018-06-26 20:58:39'),(0000000136,0000000016,0000000018,0000000003,0000000002,'kjhkughog',1,'2018-06-26 20:58:39'),(0000000137,0000000017,0000000018,0000000005,0000000004,'gkgt',1,'2018-06-26 20:58:39'),(0000000138,0000000019,0000000018,0000000001,0000000001,'kjhkjhk',1,'2018-06-26 20:58:39'),(0000000139,0000000018,0000000018,0000000003,0000000003,'uyifgifg',1,'2018-06-26 20:58:39'),(0000000140,0000000020,0000000018,0000000002,0000000002,'hgjhg',1,'2018-06-26 20:58:40'),(0000000141,0000000029,0000000018,0000000005,0000000004,'jghhgk',1,'2018-06-26 21:00:21'),(0000000142,0000000029,0000000018,0000000005,0000000004,'jghhgk',1,'2018-06-26 21:00:50'),(0000000143,0000000030,0000000018,NULL,NULL,NULL,1,'2018-06-26 21:00:50'),(0000000144,0000000031,0000000018,NULL,NULL,NULL,1,'2018-06-26 21:00:51'),(0000000145,0000000032,0000000018,NULL,NULL,NULL,1,'2018-06-26 21:00:51');
/*!40000 ALTER TABLE `skill_declaration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill_details`
--

DROP TABLE IF EXISTS `skill_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skill_details` (
  `skill_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `skill_id` int(10) unsigned zerofill NOT NULL,
  `skill_details_locale_id` int(10) unsigned zerofill NOT NULL,
  `skill_details_name` varchar(65) NOT NULL,
  PRIMARY KEY (`skill_details_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill_details`
--

LOCK TABLES `skill_details` WRITE;
/*!40000 ALTER TABLE `skill_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `skill_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill_level`
--

DROP TABLE IF EXISTS `skill_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skill_level` (
  `skill_level_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `skill_level_common_name` varchar(65) NOT NULL,
  PRIMARY KEY (`skill_level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill_level`
--

LOCK TABLES `skill_level` WRITE;
/*!40000 ALTER TABLE `skill_level` DISABLE KEYS */;
INSERT INTO `skill_level` VALUES (0000000001,'Beginner'),(0000000002,'Intermediate'),(0000000003,'Expert'),(0000000004,'Master');
/*!40000 ALTER TABLE `skill_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill_level_details`
--

DROP TABLE IF EXISTS `skill_level_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skill_level_details` (
  `skill_level_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `skill_level_id` int(10) unsigned zerofill NOT NULL,
  `skill_level_details_locale_id` int(10) unsigned zerofill NOT NULL,
  `skill_level_details_name` varchar(65) NOT NULL,
  PRIMARY KEY (`skill_level_details_id`),
  KEY `fk_skill_level_id_idx` (`skill_level_id`),
  CONSTRAINT `fk_skill_level_details_skill_level_id` FOREIGN KEY (`skill_level_id`) REFERENCES `skill_level` (`skill_level_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill_level_details`
--

LOCK TABLES `skill_level_details` WRITE;
/*!40000 ALTER TABLE `skill_level_details` DISABLE KEYS */;
INSERT INTO `skill_level_details` VALUES (0000000001,0000000001,0000000001,'Beginner'),(0000000002,0000000001,0000000002,'Débutant'),(0000000003,0000000002,0000000001,'Intermediate'),(0000000004,0000000002,0000000002,'Intermédiaire'),(0000000005,0000000003,0000000001,'Expert'),(0000000006,0000000003,0000000002,'Expert'),(0000000007,0000000004,0000000001,'Master'),(0000000008,0000000004,0000000002,'Maître');
/*!40000 ALTER TABLE `skill_level_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_culture`
--

DROP TABLE IF EXISTS `team_culture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_culture` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `team_size` int(10) NOT NULL,
  `gc_directory_url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_culture`
--

LOCK TABLES `team_culture` WRITE;
/*!40000 ALTER TABLE `team_culture` DISABLE KEYS */;
INSERT INTO `team_culture` VALUES (0000000004,12,'https://gccollab.ca/groups/profile/19750/talent-cloud-nuage-de-talent'),(0000000005,12,'https://gccollab.ca/groups/profile/19750/talent-cloud-nuage-de-talent');
/*!40000 ALTER TABLE `team_culture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_culture_details`
--

DROP TABLE IF EXISTS `team_culture_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_culture_details` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `team_culture_id` int(10) unsigned zerofill NOT NULL,
  `locale_id` int(10) unsigned zerofill NOT NULL,
  `narrative_text` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `operating_context` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `what_we_value` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `how_we_work` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_culture_details`
--

LOCK TABLES `team_culture_details` WRITE;
/*!40000 ALTER TABLE `team_culture_details` DISABLE KEYS */;
INSERT INTO `team_culture_details` VALUES (0000000007,0000000004,0000000001,'Our office space has been converted to Workplace 2.0 (open concept, subject to regular distractions). We have access to basic tools like MS Office Suite, basic government social media tools (GCTools suite of products), and a modern-looking office environment in the NCR, close to restaurants, shopping, gyms and parks.','We are a small team aiming to serve a very large client base (IM/IT functional community is over 20,000 people). Our work takes place in a fast-paced environment, where we support digital transformation and other Government-wide priorities such as the recruitment of women in IT. We have regular interactions with many other government departments in supporting departmental Chief Information Officers (CIOs) and their IM/IT workforces. We also have regular interactions with strategic partners such as the Office of the Chief Human Resources Officer (for HR management) and the Public Service Commission (for staffing and recruitment). ','Professionalism - to maintain the Treasury Board Secretariat image and reputation\nInnovative mindset - to experiment and innovate\nEagerness to learn - to accommodate the shift towards digital transformation\nWorking well with others – we are dependent on the community and others to get things done','Because we support the Government of Canada’s CIO and departmental CIOs, we work on delivering value and helping to foster a new culture. We are part of shaping the “future of digital” in the government while dealing with the current realities (e.g., seen as bureaucratic, slow in adopting technology). The use of new technologies on our team (to the extent possible) is encouraged – e.g., social media to advertise initiatives. The team is made up of professionals and experts in HR processes that must also understand the needs of technology-based clients (IM/IT practitioners).'),(0000000008,0000000004,0000000002,'Notre bureau a été converti à un Milieu de travail 2.0 (concept ouvert, soumis aux distractions régulières). Nous avons accès à des outils de base comme MS Office Suite, les outils de base des médias sociaux du gouvernement (série de produits OutilsGC), et à un environnement de bureau modernisé dans la RCN, près de restaurants, magasins, gymnases et parcs.','Nous sommes une petite équipe visant à desservir une très grande clientèle (collectivité fonctionnelle GI-TI de plus de 20 000 personnes). Notre travail se déroule à un rythme rapide, et nous sommes favorables à la transformation numérique et aux autres priorités du gouvernement telles que le recrutement des femmes en GI. Nous avons des interactions régulières avec de nombreux autres ministères du gouvernement afin de soutenir les dirigeants principaux de l’information (DPI) et leurs effectifs en matière de GI-TI. Par ailleurs, nous avons des interactions régulières avec des partenaires stratégiques, tels que le Bureau du dirigeant principal des ressources humaines (pour la gestion des RH) et la Commission de la fonction publique (aux fins de dotation et de recrutement).','Professionnalisme – pour maintenir l’image et la réputation du Secrétariat du Conseil du Trésor\nÉtat d’esprit novateur – pour expérimenter et innover\nDésir d’apprendre – pour s’adapter au changement vers la transformation numérique\nBien travailler avec les autres – nous comptons beaucoup sur la collectivité et d’autres intervenants pour faire bouger les choses','Puisque nous appuyons les DPI du gouvernement du Canada et les DPI du Ministère, nous nous concentrons sur l’optimisation des ressources et la promotion d’une nouvelle culture. Nous contribuons au façonnage de « l’avenir du numérique » au sein du gouvernement tout en traitant des réalités actuelles (par exemple, perçue comme bureaucratique, lent à adopter la technologie). L’utilisation des nouvelles technologies au sein de notre équipe (dans la mesure du possible) est encouragée – par exemple, les médias sociaux pour faire de la publicité des initiatives. L’équipe est composée de professionnels et de spécialistes des processus de RH qui doivent également comprendre les besoins des clients en matière de technologie de l’information (GI-TI).'),(0000000009,0000000005,0000000001,'We work pretty hard and get pretty intense. We really like digital, and always use all kinds of new tools that the team comes up with. We live in a 2.0 workplace (so you have a standing desk, but not closed door offices). And we care about mobility principles, meaning we really like Wi-Fi and working from coffee shops when work permits.','The direction in our team changes fairly often, but not our north star – we have one main priority at a time, and as soon we accomplish one task, we come up with many others. We all like each other, and we really care about what we do. Our wider management likes this file, and is supportive of what we’re trying to accomplish.','We value hard work, having fun, doing good work, and bettering the public service one small act at a time. We also really believe in the unique role of the public service in the world, and making the name associated with really good things again.','See above – not much more to add aside from that. To succeed with our team, you’d likely need to know your own limits, use technology for good but not be addicted to it, and want to work as part of a small team working on something important but constantly evolving.'),(0000000010,0000000005,0000000002,'Nous travaillons très fort et de façon très intense. Nous aimons vraiment le numérique et utilisons toujours toutes sortes de nouveaux outils que l’équipe invente. Nous vivons dans un Milieu de travail 2.0 (vous avez donc un bureau permanent, mais pas de bureaux à portes fermées). Et nous nous soucions des principes relatifs à la mobilité, ce qui signifie que nous aimons vraiment le Wi-Fi et travailler à partir de cafés lorsque le travail le permet.','La direction de notre équipe subit des changements assez souvent, mais pas notre étoile du Nord – nous avons une priorité principale à la fois, et dès que nous accomplissons une tâche, nous arrivons avec de nombreuses autres personnes, nous réalisons bien d’autres travaux. Nous nous aimons tous et nous nous soucions vraiment de ce que nous faisons. Notre gestion globale aime ce dossier et appuie ce que nous essayons d’accomplir.','Nous apprécions le travail acharné, le bon travail et l’amélioration de la fonction publique un petit geste à la fois. De plus, nous croyons vraiment au rôle unique de la fonction publique dans le monde et à rendre le nom associé à de très bonnes choses encore une fois.','Voir ci-dessus – pas beaucoup de choses à ajouter à part cela. Pour réussir au sein de notre équipe, il faudra sans doute connaître vos propres limites, utiliser la technologie pour une bonne raison, mais sans en être accro et travailler dans le cadre d’une petite équipe de travail sur quelque chose d’important, mais en constante évolution.');
/*!40000 ALTER TABLE `team_culture_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `email` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_confirmed` tinyint(1) DEFAULT '0',
  `user_role_id` int(10) unsigned zerofill NOT NULL,
  `open_id` int(10) NOT NULL,
  PRIMARY KEY (`user_id`,`open_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `open_id_UNIQUE` (`open_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (0000000004,'obyrne.gray@gmail.com','Gray O\'Byrne',1,0000000001,517),(0000000005,'Rosita.Kwok@tbs-sct.gc.ca','Rosita Kwok',1,0000000001,1748),(0000000006,'grant.d.barnes@gmail.com','Grant Barnes',1,0000000001,11959),(0000000007,'obyrnegray@gmail.com','Gray O\'Byrne',1,0000000003,8655),(0000000008,'tristan.o.rourke@gmail.com','Morgan O\'Rourke',1,0000000001,15544),(0000000009,'talent.cloud-nuage.de.talents@tbs-sct.gc.ca','Lauren Hunter',1,0000000003,8644),(0000000010,'imjoshdrink@gmail.com','Josh Beveridge',1,0000000001,3619),(0000000011,'jerryescandon@gmail.com','Gerardo Escandon',1,0000000001,5732),(0000000012,'queenie.fung@servicecanada.gc.ca','Queenie Fung',1,0000000001,7862),(0000000013,'valerie.thomas@tbs-sct.gc.ca','Valerie Thomas',1,0000000001,729),(0000000014,'bruce.lonergan@canada.ca','Bruce Lonergan',1,0000000001,3347);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_job_seeker_profiles`
--

DROP TABLE IF EXISTS `user_job_seeker_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_job_seeker_profiles` (
  `user_id` int(10) unsigned zerofill NOT NULL,
  `job_seeker_profile_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`user_id`,`job_seeker_profile_id`),
  KEY `fk_user_job_seeker_profiles_profile_id_idx` (`job_seeker_profile_id`),
  CONSTRAINT `fk_user_job_seeker_profiles_profile_id` FOREIGN KEY (`job_seeker_profile_id`) REFERENCES `job_seeker_profile` (`job_seeker_profile_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_user_job_seeker_profiles_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_job_seeker_profiles`
--

LOCK TABLES `user_job_seeker_profiles` WRITE;
/*!40000 ALTER TABLE `user_job_seeker_profiles` DISABLE KEYS */;
INSERT INTO `user_job_seeker_profiles` VALUES (0000000004,0000000003),(0000000005,0000000004),(0000000006,0000000005),(0000000007,0000000006),(0000000008,0000000007),(0000000008,0000000008),(0000000008,0000000009),(0000000009,0000000010),(0000000010,0000000011),(0000000010,0000000012),(0000000006,0000000013),(0000000006,0000000014),(0000000006,0000000015),(0000000006,0000000016),(0000000006,0000000017),(0000000006,0000000018),(0000000006,0000000019),(0000000011,0000000020),(0000000005,0000000021),(0000000011,0000000022),(0000000011,0000000023),(0000000012,0000000024),(0000000004,0000000025),(0000000013,0000000026),(0000000004,0000000027),(0000000004,0000000028),(0000000004,0000000029),(0000000004,0000000030),(0000000004,0000000031),(0000000004,0000000032),(0000000004,0000000033),(0000000004,0000000034),(0000000004,0000000035),(0000000014,0000000036);
/*!40000 ALTER TABLE `user_job_seeker_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_manager_profile`
--

DROP TABLE IF EXISTS `user_manager_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_manager_profile` (
  `user_manager_profile_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `user_manager_profile_department_id` int(10) DEFAULT NULL,
  `user_manager_profile_twitter` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_linkedin` varchar(260) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`user_manager_profile_id`),
  KEY `fk__user_manager_profile__user_idx` (`user_id`),
  CONSTRAINT `fk__user_manager_profile__user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_manager_profile`
--

LOCK TABLES `user_manager_profile` WRITE;
/*!40000 ALTER TABLE `user_manager_profile` DISABLE KEYS */;
INSERT INTO `user_manager_profile` VALUES (0000000003,NULL,NULL,NULL,0000000007),(0000000004,1,'@talentcloud','http://www.linkedin.com/in/grantbarnes',0000000007),(0000000005,1,'@talentcloud','http://www.linkedin.com/in/grantbarnes',0000000007),(0000000006,1,'@talentcloud','http://www.linkedin.com/in/grantbarnes',0000000007),(0000000007,1,'@talentcloud','http://www.linkedin.com/in/grantbarnes',0000000007),(0000000008,1,'@talentcloud','http://www.linkedin.com/in/grantbarnes',0000000007),(0000000009,1,'@talentcloud','http://www.linkedin.com/in/grantbarnes',0000000007),(0000000010,1,'@talentcloud','http://www.linkedin.com/in/grantbarnes',0000000007),(0000000011,1,'','',0000000009),(0000000012,1,'@talentcloud','http://www.linkedin.com/in/grantbarnes',0000000007),(0000000013,1,'@talentcloud','http://www.linkedin.com/in/grantbarnes',0000000007),(0000000014,1,'@talentcloud','http://www.linkedin.com/in/grantbarnes',0000000007),(0000000015,1,'@TalentCloud','http://www.linkedin.com/in/grantbarnes',0000000009),(0000000016,1,'@TalentCloud','http://www.linkedin.com/in/grantbarnes',0000000009),(0000000017,1,'@TalentCloud','http://www.linkedin.com/in/grantbarnes',0000000009),(0000000018,1,'@TalentCloud','http://www.linkedin.com/in/grantbarnes',0000000009);
/*!40000 ALTER TABLE `user_manager_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_manager_profile_details`
--

DROP TABLE IF EXISTS `user_manager_profile_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_manager_profile_details` (
  `user_manager_profile_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `locale_id` int(10) NOT NULL,
  `user_manager_profile_details_aboutme` mediumtext COLLATE utf8_unicode_ci,
  `user_manager_profile_details_proud` mediumtext COLLATE utf8_unicode_ci,
  `user_manager_profile_details_branch` text COLLATE utf8_unicode_ci,
  `user_manager_profile_details_division` text COLLATE utf8_unicode_ci,
  `user_manager_profile_details_position` text COLLATE utf8_unicode_ci,
  `user_manager_profile_details_lead_style` mediumtext COLLATE utf8_unicode_ci,
  `user_manager_profile_details_emp_learn` mediumtext COLLATE utf8_unicode_ci,
  `user_manager_profile_details_expectations` mediumtext COLLATE utf8_unicode_ci,
  `user_manager_profile_id` int(10) unsigned zerofill NOT NULL,
  `user_manager_profile_review_options` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_staylate` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_engage` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_devops` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_lvwRequests` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_work_experience` mediumtext COLLATE utf8_unicode_ci,
  `user_manager_profile_education` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`user_manager_profile_details_id`),
  KEY `fk_user_manager_profile_details_manager_profile_id_idx` (`user_manager_profile_id`),
  CONSTRAINT `fk_user_manager_profile_details_manager_profile_id` FOREIGN KEY (`user_manager_profile_id`) REFERENCES `user_manager_profile` (`user_manager_profile_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_manager_profile_details`
--

LOCK TABLES `user_manager_profile_details` WRITE;
/*!40000 ALTER TABLE `user_manager_profile_details` DISABLE KEYS */;
INSERT INTO `user_manager_profile_details` VALUES (0000000004,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0000000003,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000005,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0000000003,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0000000006,1,'I\'m a hiring manager','Highlights','CIOB','Talent Cloud','Hiring Manager','','','',0000000004,'option0','option0','option0','option0','option0','',''),(0000000007,2,'I\'m a hiring manager FR','Highlights FR','DDPI','Nuage de talents','Gestionnaire de hiring','','','',0000000004,'option0','option0','option0','option0','option0','',''),(0000000008,1,'I\'m a hiring manager','Highlights','CIOB','Talent Cloud','Hiring Manager','Leadership style','Employee learning and development','Expectations',0000000005,'option3','option3','option4','option3','option2','',''),(0000000009,2,'I\'m a hiring manager FR','Highlights FR','DDPI','Nuage de talents','Gestionnaire de hiring','Leadership style FR','Employee learning and development FR','Expectations FR',0000000005,'option3','option3','option4','option3','option2','',''),(0000000010,1,'I\'m a hiring manager','Highlights','CIOB','Talent Cloud','Hiring Manager','Leadership style','Employee learning and development','Expectations',0000000006,'option3','option3','option4','option3','option2','5 years','University'),(0000000011,2,'I\'m a hiring manager FR','Highlights FR','DDPI','Nuage de talents','Gestionnaire de hiring','Leadership style FR','Employee learning and development FR','Expectations FR',0000000006,'option3','option3','option4','option3','option2','5 years FR','University FR'),(0000000012,1,'I\'m a hiring manager','Highlights','CIOB','Talent Cloud','Hiring Manager','Leadership style','Employee learning and development','Expectations',0000000007,'option3','option3','option4','option3','option2','5 years','University'),(0000000013,2,'I\'m a hiring manager FR','Highlights FR','DDPI','Nuage de talents','Gestionnaire de hiring','Leadership style FR','Employee learning and development FR','Expectations FR',0000000007,'option3','option3','option4','option3','option2','5 years FR','University FR'),(0000000014,1,'I\'m a hiring manager','Highlights','CIOB','Talent Cloud','Hiring Manager','Leadership style','Employee learning and development','Expectations',0000000008,'option3','option3','option4','option3','option2','5 years','University'),(0000000015,2,'I\'m a hiring manager FR','Highlights FR','DDPI','Nuage de talents','Gestionnaire de hiring','Leadership style FR','Employee learning and development FR','Expectations FR',0000000008,'option3','option3','option4','option3','option2','5 years FR','University FR'),(0000000016,1,'I\'m a hiring manager','Highlights','CIOB','Talent Cloud','Hiring Manager','Leadership style','Employee learning and development','Expectations',0000000009,'option3','option3','option4','option3','option2','5 years','University'),(0000000017,2,'I\'m a hiring manager FR','Highlights FR','DDPI','Nuage de talents','Gestionnaire de hiring','Leadership style FR','Employee learning and development FR','Expectations FR',0000000009,'option3','option3','option4','option3','option2','5 years FR','University FR'),(0000000018,1,'I\'m a hiring manager','Highlights','CIOB','Talent Cloud','Hiring Manager','Leadership style','Employee learning and development','Expectations',0000000010,'option3','option3','option4','option3','option2','5 years','University'),(0000000019,2,'I\'m a hiring manager FR','Highlights FR','DDPI','Nuage de talents','Gestionnaire de hiring','Leadership style FR','Employee learning and development FR','Expectations FR',0000000010,'option3','option3','option4','option3','option2','5 years FR','University FR'),(0000000020,1,'','','CIOB','Talent Cloud','Product Owner','','','',0000000011,'option0','option0','option0','option0','option0','',''),(0000000021,2,'','','CIOB','Nuage de talents','Proprietaire du produit','','','',0000000011,'option0','option0','option0','option0','option0','',''),(0000000022,1,'I\'m a hiring manager at Talent Cloud','Highlights','CIOB','Talent Cloud','Hiring Manager','Leadership style','Employee learning and development','Expectations',0000000012,'option3','option3','option4','option3','option2','5 years','University'),(0000000023,2,'I\'m a hiring manager at Talent Cloud FR','Highlights FR','DDPI','Nuage de talents','Gestionnaire de hiring','Leadership style FR','Employee learning and development FR','Expectations FR',0000000012,'option3','option3','option4','option3','option2','5 years FR','University FR'),(0000000024,1,'I\'m a hiring manager at Talent Cloud','Highlights','CIOB','Talent Cloud','Hiring Manager','Leadership style','Employee learning and development','Expectations',0000000013,'option3','option3','option4','option3','option2','5 years','University'),(0000000025,2,'I\'m a hiring manager at Talent Cloud FR','Highlights FR','DDPI','Nuage de talents','Gestionnaire de hiring','Leadership style FR','Employee learning and development FR','Expectations FR',0000000013,'option3','option3','option4','option3','option2','5 years FR','University FR'),(0000000026,1,'I\'m a hiring manager at Talent Cloud','Highlights','CIOB','Talent Cloud','Hiring Manager','Leadership style','Employee learning and development','Expectations',0000000014,'option3','option3','option4','option3','option2','5 years','University'),(0000000027,2,'I\'m a hiring manager at Talent Cloud FR','Highlights FR','DDPI','Nuage de talents','Gestionnaire de hiring','Leadership style FR','Employee learning and development FR','Expectations FR',0000000014,'option3','option3','option4','option3','option2','5 years FR','University FR'),(0000000028,1,'I\'m a hiring manager at Talent Cloud','Highlights','CIOB','Talent Cloud','Product Owner','','','',0000000015,'option0','option0','option0','option0','option0','',''),(0000000029,2,'I\'m a hiring manager at Talent Cloud FR','Highlights FR','CIOB','Nuage de talents','Proprietaire du produit','','','',0000000015,'option0','option0','option0','option0','option0','',''),(0000000030,1,'I\'m a hiring manager at Talent Cloud','Highlights','CIOB','Talent Cloud','Product Owner','Leadership style','Approach','Expectations',0000000016,'option2','option3','option4','option3','option2','',''),(0000000031,2,'I\'m a hiring manager at Talent Cloud FR','Highlights FR','CIOB','Nuage de talents','Proprietaire du produit','Leadership style FR','Approach FR','Expectations FR',0000000016,'option2','option3','option4','option3','option2','',''),(0000000032,1,'I\'m a hiring manager at Talent Cloud','Highlights','CIOB','Talent Cloud','Product Owner','Leadership style','Approach','Expectations',0000000017,'option2','option3','option4','option3','option2','Experience','Education'),(0000000033,2,'I\'m a hiring manager at Talent Cloud FR','Highlights FR','CIOB','Nuage de talents','Proprietaire du produit','Leadership style FR','Approach FR','Expectations FR',0000000017,'option2','option3','option4','option3','option2','Experience FR','Education FR'),(0000000034,1,'I\'m a hiring manager at Talent Cloud','Highlights','CIOB','Talent Cloud','Product Owner','Leadership style','Approach','Expectations',0000000018,'option2','option3','option4','option3','option2','Experience','Education'),(0000000035,2,'I\'m a hiring manager at Talent Cloud FR','Highlights FR','CIOB','Nuage de talents','Proprietaire du produit','Leadership style FR','Approach FR','Expectations FR',0000000018,'option2','option3','option4','option3','option2','Experience FR','Education FR');
/*!40000 ALTER TABLE `user_manager_profile_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `user_role_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `user_role` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (0000000001,'jobseeker'),(0000000002,'manager'),(0000000003,'administrator');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_token`
--

DROP TABLE IF EXISTS `user_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_token` (
  `user_token_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned zerofill NOT NULL,
  `access_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `expires_in` int(5) NOT NULL,
  `token_type` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `scope` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_token`
--

LOCK TABLES `user_token` WRITE;
/*!40000 ALTER TABLE `user_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_environment`
--

DROP TABLE IF EXISTS `work_environment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `work_environment` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `remote_allowed` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `telework_allowed` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `flexible_allowed` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_environment`
--

LOCK TABLES `work_environment` WRITE;
/*!40000 ALTER TABLE `work_environment` DISABLE KEYS */;
INSERT INTO `work_environment` VALUES (0000000003,'option1','option3','option2'),(0000000004,'option0','option3','option2');
/*!40000 ALTER TABLE `work_environment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_sample`
--

DROP TABLE IF EXISTS `work_sample`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `work_sample` (
  `work_sample_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `work_sample_name` text,
  `work_sample_date_created` date DEFAULT NULL,
  `file_type_id` int(10) unsigned zerofill DEFAULT NULL,
  `work_sample_url` text,
  `work_sample_story` text,
  PRIMARY KEY (`work_sample_id`),
  KEY `fk_work_sample_file_type_id_idx` (`file_type_id`),
  CONSTRAINT `fk_work_sample_file_type_id` FOREIGN KEY (`file_type_id`) REFERENCES `file_type` (`file_type_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_sample`
--

LOCK TABLES `work_sample` WRITE;
/*!40000 ALTER TABLE `work_sample` DISABLE KEYS */;
INSERT INTO `work_sample` VALUES (0000000001,'sdfsdf','2018-07-26',0000000002,'http://google.com','sdfsdfd'),(0000000002,'sdfsdf','2018-07-26',0000000002,'http://google.com','sdfsdfd'),(0000000003,NULL,NULL,NULL,NULL,NULL),(0000000004,NULL,NULL,NULL,NULL,NULL),(0000000005,NULL,NULL,NULL,NULL,NULL),(0000000006,NULL,NULL,NULL,NULL,NULL),(0000000007,NULL,NULL,NULL,NULL,NULL),(0000000008,NULL,NULL,NULL,NULL,NULL),(0000000009,NULL,NULL,NULL,NULL,NULL),(0000000010,NULL,NULL,NULL,NULL,NULL),(0000000011,NULL,NULL,NULL,NULL,NULL),(0000000012,NULL,NULL,NULL,NULL,NULL),(0000000013,NULL,NULL,NULL,NULL,NULL),(0000000014,NULL,NULL,NULL,NULL,NULL),(0000000015,NULL,NULL,NULL,NULL,NULL),(0000000016,NULL,NULL,NULL,NULL,NULL),(0000000017,NULL,NULL,NULL,NULL,NULL),(0000000018,NULL,NULL,NULL,NULL,NULL),(0000000019,NULL,NULL,NULL,NULL,NULL),(0000000020,NULL,NULL,NULL,NULL,NULL),(0000000021,NULL,NULL,NULL,NULL,NULL),(0000000022,NULL,NULL,NULL,NULL,NULL),(0000000023,NULL,NULL,NULL,NULL,NULL),(0000000024,NULL,NULL,NULL,NULL,NULL),(0000000025,NULL,NULL,NULL,NULL,NULL),(0000000026,NULL,NULL,NULL,NULL,NULL),(0000000027,NULL,NULL,NULL,NULL,NULL),(0000000028,NULL,NULL,NULL,NULL,NULL),(0000000029,NULL,NULL,NULL,NULL,NULL),(0000000030,NULL,NULL,NULL,NULL,NULL),(0000000031,NULL,NULL,NULL,NULL,NULL),(0000000032,NULL,NULL,NULL,NULL,NULL),(0000000033,NULL,NULL,NULL,NULL,NULL),(0000000034,NULL,NULL,NULL,NULL,NULL),(0000000035,NULL,NULL,NULL,NULL,NULL),(0000000036,NULL,NULL,NULL,NULL,NULL),(0000000037,NULL,NULL,NULL,NULL,NULL),(0000000038,NULL,NULL,NULL,NULL,NULL),(0000000039,NULL,NULL,NULL,NULL,NULL),(0000000040,NULL,NULL,NULL,NULL,NULL),(0000000041,NULL,NULL,NULL,NULL,NULL),(0000000042,NULL,NULL,NULL,NULL,NULL),(0000000043,NULL,NULL,NULL,NULL,NULL),(0000000044,NULL,NULL,NULL,NULL,NULL),(0000000045,NULL,NULL,NULL,NULL,NULL),(0000000046,NULL,NULL,NULL,NULL,NULL),(0000000047,NULL,NULL,NULL,NULL,NULL),(0000000048,NULL,NULL,NULL,NULL,NULL),(0000000049,NULL,NULL,NULL,NULL,NULL),(0000000050,NULL,NULL,NULL,NULL,NULL),(0000000051,NULL,NULL,NULL,NULL,NULL),(0000000052,NULL,NULL,NULL,NULL,NULL),(0000000053,NULL,NULL,NULL,NULL,NULL),(0000000054,NULL,NULL,NULL,NULL,NULL),(0000000055,NULL,NULL,NULL,NULL,NULL),(0000000056,NULL,NULL,NULL,NULL,NULL),(0000000057,NULL,NULL,NULL,NULL,NULL),(0000000058,NULL,NULL,NULL,NULL,NULL),(0000000059,NULL,NULL,NULL,NULL,NULL),(0000000060,NULL,NULL,NULL,NULL,NULL),(0000000061,NULL,NULL,NULL,NULL,NULL),(0000000062,NULL,NULL,NULL,NULL,NULL),(0000000063,NULL,NULL,NULL,NULL,NULL),(0000000064,NULL,NULL,NULL,NULL,NULL),(0000000065,NULL,NULL,NULL,NULL,NULL),(0000000066,NULL,NULL,NULL,NULL,NULL),(0000000067,NULL,NULL,NULL,NULL,NULL),(0000000068,NULL,NULL,NULL,NULL,NULL),(0000000069,NULL,NULL,NULL,NULL,NULL),(0000000070,NULL,NULL,NULL,NULL,NULL),(0000000071,NULL,NULL,NULL,NULL,NULL),(0000000072,NULL,NULL,NULL,NULL,NULL),(0000000073,NULL,NULL,NULL,NULL,NULL),(0000000074,NULL,NULL,NULL,NULL,NULL),(0000000075,NULL,NULL,NULL,NULL,NULL),(0000000076,NULL,NULL,NULL,NULL,NULL),(0000000077,NULL,NULL,NULL,NULL,NULL),(0000000078,NULL,NULL,NULL,NULL,NULL),(0000000079,NULL,NULL,NULL,NULL,NULL),(0000000080,NULL,NULL,NULL,NULL,NULL),(0000000081,NULL,NULL,NULL,NULL,NULL),(0000000082,NULL,NULL,NULL,NULL,NULL),(0000000083,NULL,NULL,NULL,NULL,NULL),(0000000084,NULL,NULL,NULL,NULL,NULL),(0000000085,NULL,NULL,NULL,NULL,NULL),(0000000086,NULL,NULL,NULL,NULL,NULL),(0000000087,NULL,NULL,NULL,NULL,NULL),(0000000088,NULL,NULL,NULL,NULL,NULL),(0000000089,NULL,NULL,NULL,NULL,NULL),(0000000090,NULL,NULL,NULL,NULL,NULL),(0000000091,NULL,NULL,NULL,NULL,NULL),(0000000092,NULL,NULL,NULL,NULL,NULL),(0000000093,NULL,NULL,NULL,NULL,NULL),(0000000094,NULL,NULL,NULL,NULL,NULL),(0000000095,NULL,NULL,NULL,NULL,NULL),(0000000096,NULL,NULL,NULL,NULL,NULL),(0000000097,NULL,NULL,NULL,NULL,NULL),(0000000098,NULL,NULL,NULL,NULL,NULL),(0000000099,NULL,NULL,NULL,NULL,NULL),(0000000100,NULL,NULL,NULL,NULL,NULL),(0000000101,NULL,NULL,NULL,NULL,NULL),(0000000102,NULL,NULL,NULL,NULL,NULL),(0000000103,NULL,NULL,NULL,NULL,NULL),(0000000104,NULL,NULL,NULL,NULL,NULL),(0000000105,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `work_sample` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workplace_photo`
--

DROP TABLE IF EXISTS `workplace_photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workplace_photo` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `image` longblob NOT NULL,
  `mime_type` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workplace_photo`
--

LOCK TABLES `workplace_photo` WRITE;
/*!40000 ALTER TABLE `workplace_photo` DISABLE KEYS */;
/*!40000 ALTER TABLE `workplace_photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workplace_photo_caption`
--

DROP TABLE IF EXISTS `workplace_photo_caption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workplace_photo_caption` (
  `work_environment_id` int(10) unsigned zerofill NOT NULL,
  `photo_name` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  `workplace_photo_id` int(10) unsigned zerofill DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`work_environment_id`,`photo_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workplace_photo_caption`
--

LOCK TABLES `workplace_photo_caption` WRITE;
/*!40000 ALTER TABLE `workplace_photo_caption` DISABLE KEYS */;
INSERT INTO `workplace_photo_caption` VALUES (0000000003,'workplace_photo_1',0000000007,'1'),(0000000003,'workplace_photo_2',0000000009,'2'),(0000000003,'workplace_photo_3',0000000008,'3'),(0000000004,'workplace_photo_1',0000000011,'1'),(0000000004,'workplace_photo_2',0000000010,'2'),(0000000004,'workplace_photo_3',0000000012,'3');
/*!40000 ALTER TABLE `workplace_photo_caption` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-27 13:07:04
