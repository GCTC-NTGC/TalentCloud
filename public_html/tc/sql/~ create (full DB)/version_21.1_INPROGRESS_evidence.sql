CREATE DATABASE  IF NOT EXISTS `talentcloud` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `talentcloud`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: talentcloud
-- ------------------------------------------------------
-- Server version	5.6.37-log

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
-- Table structure for table `application_asset_skill_declaration`
--

DROP TABLE IF EXISTS `application_asset_skill_declaration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application_asset_skill_declaration` (
  `application_asset_skill_declaration_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_poster_application_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_developing_competency_id` int(10) unsigned zerofill NOT NULL,
  `skill_declaration_id` int(10) unsigned zerofill NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`application_asset_skill_declaration_id`),
  KEY `fk_evidence_id_idx` (`skill_declaration_id`),
  CONSTRAINT `fk_asset_skill_declaration_id0` FOREIGN KEY (`skill_declaration_id`) REFERENCES `skill_declaration` (`skill_declaration_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_asset_skill_declaration`
--

LOCK TABLES `application_asset_skill_declaration` WRITE;
/*!40000 ALTER TABLE `application_asset_skill_declaration` DISABLE KEYS */;
INSERT INTO `application_asset_skill_declaration` VALUES (0000000001,0000000002,0000000002,0000000010,0,'2018-04-27 00:36:29'),(0000000002,0000000002,0000000003,0000000011,0,'2018-04-27 00:36:29'),(0000000003,0000000002,0000000001,0000000018,0,'2018-04-27 00:38:37'),(0000000004,0000000002,0000000002,0000000019,0,'2018-04-27 00:38:37'),(0000000005,0000000002,0000000003,0000000020,0,'2018-04-27 00:38:37'),(0000000006,0000000002,0000000001,0000000024,0,'2018-04-27 00:39:10'),(0000000007,0000000002,0000000002,0000000025,0,'2018-04-27 00:39:11'),(0000000008,0000000002,0000000003,0000000026,0,'2018-04-27 00:39:11'),(0000000009,0000000002,0000000001,0000000033,0,'2018-04-27 00:39:35'),(0000000010,0000000002,0000000002,0000000034,1,'2018-04-27 00:39:35'),(0000000011,0000000002,0000000003,0000000035,1,'2018-04-27 00:39:35'),(0000000012,0000000002,0000000001,0000000042,0,'2018-04-27 00:46:09'),(0000000013,0000000002,0000000001,0000000049,0,'2018-04-27 00:52:07'),(0000000014,0000000002,0000000001,0000000056,1,'2018-04-27 00:52:22');
/*!40000 ALTER TABLE `application_asset_skill_declaration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application_essential_skill_declaration`
--

DROP TABLE IF EXISTS `application_essential_skill_declaration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application_essential_skill_declaration` (
  `application_essential_skill_declaration_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `skill_declaration_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_application_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_core_competency_id` int(10) unsigned zerofill NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`application_essential_skill_declaration_id`),
  KEY `fk_evidence_id_idx` (`skill_declaration_id`),
  CONSTRAINT `fk_essential_skill_declaration_id` FOREIGN KEY (`skill_declaration_id`) REFERENCES `skill_declaration` (`skill_declaration_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_essential_skill_declaration`
--

LOCK TABLES `application_essential_skill_declaration` WRITE;
/*!40000 ALTER TABLE `application_essential_skill_declaration` DISABLE KEYS */;
INSERT INTO `application_essential_skill_declaration` VALUES (0000000001,0000000001,0000000002,0000000001,0,'2018-04-27 00:31:03'),(0000000002,0000000002,0000000002,0000000001,0,'2018-04-27 00:31:27'),(0000000003,0000000003,0000000002,0000000002,0,'2018-04-27 00:31:27'),(0000000004,0000000004,0000000002,0000000003,0,'2018-04-27 00:31:27'),(0000000005,0000000005,0000000002,0000000001,0,'2018-04-27 00:31:54'),(0000000006,0000000006,0000000002,0000000002,0,'2018-04-27 00:31:54'),(0000000007,0000000007,0000000002,0000000003,0,'2018-04-27 00:31:54'),(0000000008,0000000008,0000000002,0000000001,0,'2018-04-27 00:36:14'),(0000000009,0000000009,0000000002,0000000003,0,'2018-04-27 00:36:14'),(0000000010,0000000012,0000000002,0000000001,0,'2018-04-27 00:37:53'),(0000000011,0000000013,0000000002,0000000002,0,'2018-04-27 00:37:53'),(0000000012,0000000014,0000000002,0000000003,0,'2018-04-27 00:37:53'),(0000000013,0000000015,0000000002,0000000001,0,'2018-04-27 00:38:02'),(0000000014,0000000016,0000000002,0000000002,0,'2018-04-27 00:38:02'),(0000000015,0000000017,0000000002,0000000003,0,'2018-04-27 00:38:02'),(0000000016,0000000021,0000000002,0000000001,0,'2018-04-27 00:38:49'),(0000000017,0000000022,0000000002,0000000002,0,'2018-04-27 00:38:49'),(0000000018,0000000023,0000000002,0000000003,0,'2018-04-27 00:38:49'),(0000000019,0000000027,0000000002,0000000001,0,'2018-04-27 00:39:12'),(0000000020,0000000028,0000000002,0000000002,0,'2018-04-27 00:39:12'),(0000000021,0000000029,0000000002,0000000003,0,'2018-04-27 00:39:12'),(0000000022,0000000030,0000000002,0000000001,0,'2018-04-27 00:39:21'),(0000000023,0000000031,0000000002,0000000002,0,'2018-04-27 00:39:21'),(0000000024,0000000032,0000000002,0000000003,0,'2018-04-27 00:39:21'),(0000000025,0000000036,0000000002,0000000001,0,'2018-04-27 00:42:54'),(0000000026,0000000037,0000000002,0000000002,0,'2018-04-27 00:42:54'),(0000000027,0000000038,0000000002,0000000003,0,'2018-04-27 00:42:54'),(0000000028,0000000039,0000000002,0000000001,0,'2018-04-27 00:46:06'),(0000000029,0000000040,0000000002,0000000002,0,'2018-04-27 00:46:06'),(0000000030,0000000041,0000000002,0000000003,0,'2018-04-27 00:46:06'),(0000000031,0000000043,0000000002,0000000001,0,'2018-04-27 00:46:46'),(0000000032,0000000044,0000000002,0000000002,0,'2018-04-27 00:46:46'),(0000000033,0000000045,0000000002,0000000003,0,'2018-04-27 00:46:46'),(0000000034,0000000046,0000000002,0000000001,0,'2018-04-27 00:51:59'),(0000000035,0000000047,0000000002,0000000002,0,'2018-04-27 00:51:59'),(0000000036,0000000048,0000000002,0000000003,0,'2018-04-27 00:51:59'),(0000000037,0000000050,0000000002,0000000001,0,'2018-04-27 00:52:08'),(0000000038,0000000051,0000000002,0000000002,0,'2018-04-27 00:52:08'),(0000000039,0000000052,0000000002,0000000003,0,'2018-04-27 00:52:08'),(0000000040,0000000053,0000000002,0000000001,1,'2018-04-27 00:52:17'),(0000000041,0000000054,0000000002,0000000002,1,'2018-04-27 00:52:17'),(0000000042,0000000055,0000000002,0000000003,1,'2018-04-27 00:52:17');
/*!40000 ALTER TABLE `application_essential_skill_declaration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application_evidence`
--

DROP TABLE IF EXISTS `application_evidence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application_evidence` (
  `job_poster_application_id` int(10) unsigned zerofill NOT NULL,
  `evidence_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`job_poster_application_id`,`evidence_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_evidence`
--

LOCK TABLES `application_evidence` WRITE;
/*!40000 ALTER TABLE `application_evidence` DISABLE KEYS */;
/*!40000 ALTER TABLE `application_evidence` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=386 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_content`
--

LOCK TABLES `base_content` WRITE;
/*!40000 ALTER TABLE `base_content` DISABLE KEYS */;
INSERT INTO `base_content` VALUES (0000000001,0000000001,'title','Talent Cloud',0000000001),(0000000002,0000000001,'title','Nuage de talents',0000000002),(0000000004,0000000001,'helpLearn','Help / Learn',0000000001),(0000000005,0000000001,'helpLearn','Aide / Apprenez',0000000002),(0000000006,0000000001,'languageSelect','Français',0000000001),(0000000007,0000000001,'languageSelect','English',0000000002),(0000000008,0000000001,'loginLink','Login',0000000001),(0000000009,0000000001,'loginLink','S\'identifier',0000000002),(0000000010,0000000001,'logoutLink','Logout',0000000001),(0000000011,0000000001,'logoutLink','Se déconnecter',0000000002),(0000000012,0000000001,'registerLink','Register',0000000001),(0000000013,0000000001,'registerLink','Enregistrer',0000000002),(0000000014,0000000001,'applyNow','Apply Now',0000000001),(0000000015,0000000001,'applyNow','Appliquer maintenant',0000000002),(0000000016,0000000001,'searchPlaceholder','search',0000000001),(0000000017,0000000001,'searchPlaceholder','chercher',0000000002),(0000000018,0000000001,'homeLink','Home',0000000001),(0000000019,0000000001,'homeLink','Accueil',0000000002),(0000000020,0000000001,'profileLink','My Profile',0000000001),(0000000021,0000000001,'profileLink','Mon profil',0000000002),(0000000022,0000000001,'jobPostersLink','My Job Posters',0000000001),(0000000023,0000000001,'jobPostersLink','Mes offres d\'emploi',0000000002),(0000000024,0000000001,'teamsLink','My Teams',0000000001),(0000000025,0000000001,'teamsLink','Mes équipes',0000000002),(0000000026,0000000001,'jobNumber','Job Number',0000000001),(0000000027,0000000001,'jobNumber','Numéro d\'emploi',0000000002),(0000000028,0000000001,'jobTitle','Job Title',0000000001),(0000000029,0000000001,'jobTitle','Profession',0000000002),(0000000030,0000000001,'jobLocation','Job Location',0000000001),(0000000031,0000000001,'jobLocation','Lieu de travail',0000000002),(0000000032,0000000001,'jobCity','City',0000000001),(0000000033,0000000001,'jobCity','Ville',0000000002),(0000000034,0000000001,'jobProvince','Province',0000000001),(0000000035,0000000001,'jobProvince','Province',0000000002),(0000000036,0000000001,'jobApplicantsSoFar','applicants so far',0000000001),(0000000037,0000000001,'jobApplicantsSoFar','demandeurs jusqu\'à présent',0000000002),(0000000038,0000000001,'jobTimeToClose','until close',0000000001),(0000000039,0000000001,'jobTimeToClose','jusqu\'à la fermeture',0000000002),(0000000040,0000000001,'jobUnitsToCloseHours','hours',0000000001),(0000000041,0000000001,'jobUnitsToCloseHours','heures',0000000002),(0000000042,0000000001,'jobUnitsToCloseDays','days',0000000001),(0000000043,0000000001,'jobUnitsToCloseDays','journées',0000000002),(0000000044,0000000001,'jobUnitsToCloseMonths','months',0000000001),(0000000045,0000000001,'jobUnitsToCloseMonths','mois',0000000002),(0000000046,0000000001,'jobUntilClose','until close',0000000001),(0000000047,0000000001,'jobUntilClose','jusqu\'à la fermeture',0000000002),(0000000048,0000000001,'jobTerm','term',0000000001),(0000000049,0000000001,'jobTerm','terme',0000000002),(0000000050,0000000001,'viewButton','View',0000000001),(0000000051,0000000001,'viewButton','Vue',0000000002),(0000000052,0000000001,'jobSalaryRange','Job Salary Range',0000000001),(0000000053,0000000001,'jobSalaryRange','Offre d\'emploi',0000000002),(0000000054,0000000001,'submitApplication','Submit Application',0000000001),(0000000055,0000000001,'submitApplication','Présenter une demande',0000000002),(0000000056,0000000001,'step1','About',0000000001),(0000000057,0000000001,'step1','Sur',0000000002),(0000000058,0000000001,'step2','Leadership',0000000001),(0000000059,0000000001,'step2','Direction',0000000002),(0000000060,0000000001,'step3','Other',0000000001),(0000000061,0000000001,'step3','Autre',0000000002),(0000000062,0000000001,'review','Review',0000000001),(0000000063,0000000001,'review','La revue',0000000002),(0000000064,0000000001,'goToStep2','Go to Step 2',0000000001),(0000000065,0000000001,'goToStep2','Aller à l\'étape 2',0000000002),(0000000066,0000000001,'goToStep1','Go to Step 1',0000000001),(0000000067,0000000001,'goToStep1','Aller à l\'étape 1',0000000002),(0000000068,0000000001,'goToStep3','Go to Step 3',0000000001),(0000000069,0000000001,'goToStep3','Aller à l\'étape 3',0000000002),(0000000070,0000000001,'goToReview','Go to Review',0000000001),(0000000071,0000000001,'goToReview','Aller à la revue',0000000002),(0000000072,0000000001,'createJobPosterWindowTitle','Create Job Poster',0000000001),(0000000073,0000000001,'createJobPosterWindowTitle','Créer une affiche d\'emploi',0000000002),(0000000074,0000000001,'createProfileWindowTitle','Create/Edit Profile',0000000001),(0000000075,0000000001,'createProfileWindowTitle','Créer / Modifier un profil',0000000002),(0000000076,0000000001,'required','Required',0000000001),(0000000077,0000000001,'required','Champs obligatoires',0000000002),(0000000078,0000000001,'submit','Submit',0000000001),(0000000079,0000000001,'submit','Soumettre',0000000002),(0000000080,0000000001,'createJobPosterSubmitInstructions','Submit to publish new job poster.',0000000001),(0000000081,0000000001,'createJobPosterSubmitInstructions','Soumettre pour publier une nouvelle affiche d\'emploi.',0000000002),(0000000082,0000000001,'generalInformation','General Information',0000000001),(0000000083,0000000001,'generalInformation','Informations générales',0000000002),(0000000084,0000000001,'aboutMe','About Me',0000000001),(0000000085,0000000001,'aboutMe','À propos de moi',0000000002),(0000000086,0000000001,'generalInformation','General Information',0000000001),(0000000087,0000000001,'generalInformation','Informations générales',0000000002),(0000000088,0000000001,'aboutMe','About Me',0000000001),(0000000089,0000000001,'aboutMe','À propos de moi',0000000002),(0000000090,0000000001,'aLittleBitAboutMe','A little bit about me',0000000001),(0000000091,0000000001,'aLittleBitAboutMe','Un peu à propos de moi',0000000002),(0000000092,0000000001,'whatImMostProudOfInCareer','What I\'m most proud of in my career',0000000001),(0000000093,0000000001,'whatImMostProudOfInCareer','Ce dont je suis le plus fier dans ma carrière',0000000002),(0000000094,0000000001,'position','Position',0000000001),(0000000095,0000000001,'position','Position',0000000002),(0000000096,0000000001,'department','Department',0000000001),(0000000097,0000000001,'department','Département',0000000002),(0000000098,0000000001,'branch','Branch',0000000001),(0000000099,0000000001,'branch','Branche',0000000002),(0000000100,0000000001,'division','Division',0000000001),(0000000101,0000000001,'division','Division',0000000002),(0000000102,0000000001,'leadershipStyle','Leadership Style',0000000001),(0000000103,0000000001,'leadershipStyle','Style de leadership',0000000002),(0000000104,0000000001,'myLeadershipStyle','My Leadership Style',0000000001),(0000000105,0000000001,'myLeadershipStyle','Mon style de leadership',0000000002),(0000000106,0000000001,'myApproachToEmployee','My approach to employee learning and development',0000000001),(0000000107,0000000001,'myApproachToEmployee','Mon approche de l\'apprentissage et du développement des employés',0000000002),(0000000108,0000000001,'myExpectationsOfEmployees','My expectations of employees',0000000001),(0000000109,0000000001,'myExpectationsOfEmployees','Mes attentes envers les employés',0000000002),(0000000110,0000000001,'myApproachToDecisionMaking','My approach to decision-making',0000000001),(0000000111,0000000001,'myApproachToDecisionMaking','Mon approche de la prise de décision',0000000002),(0000000112,0000000001,'workExperience','Work Experience',0000000001),(0000000113,0000000001,'workExperience','L\'expérience professionnelle',0000000002),(0000000114,0000000001,'education','Education',0000000001),(0000000115,0000000001,'education','Éducation',0000000002),(0000000116,0000000001,'howOftenDoYouReview','How often do you review your team\'s work before it is shared?',0000000001),(0000000117,0000000001,'howOftenDoYouReview','À quelle fréquence examinez-vous le travail de votre équipe avant de le partager?',0000000002),(0000000118,0000000001,'howOftenDoYouStayLate','How often do you get in early or stay late to get some extra work done?',0000000001),(0000000119,0000000001,'howOftenDoYouStayLate','À quelle fréquence arrivez-vous tôt ou tardez-vous à faire du travail supplémentaire?',0000000002),(0000000120,0000000001,'almostNever','Almost never',0000000001),(0000000121,0000000001,'almostNever','Presque jamais',0000000002),(0000000122,0000000001,'rarely','Rarely',0000000001),(0000000123,0000000001,'rarely','Rarement',0000000002),(0000000124,0000000001,'sometimes','Sometimes',0000000001),(0000000125,0000000001,'sometimes','Parfois',0000000002),(0000000126,0000000001,'usually','Usually',0000000001),(0000000127,0000000001,'usually','Habituellement',0000000002),(0000000128,0000000001,'almostAlways','Almost always',0000000001),(0000000129,0000000001,'almostAlways','Presque toujours',0000000002),(0000000130,0000000001,'name','Name',0000000001),(0000000131,0000000001,'name','Nom',0000000002),(0000000132,0000000001,'at','at',0000000001),(0000000133,0000000001,'at','à',0000000002),(0000000134,0000000001,'howOftenDoYouEngage','How often do you engage your team before responding to management?',0000000001),(0000000135,0000000001,'howOftenDoYouEngage','À quelle fréquence engagez-vous votre équipe avant de répondre à la direction?',0000000002),(0000000136,0000000001,'howOftenDoYouApproveDevelopment','How often do you approve development opportunities for your employees?',0000000001),(0000000137,0000000001,'howOftenDoYouApproveDevelopment','À quelle fréquence approuvez-vous les opportunités de développement pour vos employés?',0000000002),(0000000138,0000000001,'browseLink','Browse Jobs',0000000001),(0000000139,0000000001,'browseLink','Parcourir les travaux',0000000002),(0000000140,0000000001,'gctc','GC Talent Cloud',0000000001),(0000000141,0000000001,'gctc','Nuage de talents du GC',0000000002),(0000000142,0000000001,'canadaLink','Visit Canada.ca',0000000001),(0000000143,0000000001,'canadaLink','Visiter Canada.ca',0000000002),(0000000144,0000000001,'canadaLinkHref','https://www.canada.ca/en.html',0000000001),(0000000145,0000000001,'canadaLinkHref','https://www.canada.ca/fr.html',0000000002),(0000000146,0000000001,'taglineMain','People want meaningful work.',0000000001),(0000000147,0000000001,'taglineMain','Les gens veulent un travail significatif.',0000000002),(0000000148,0000000001,'taglineSecondary','The jobs are real. The platform is experimental.',0000000001),(0000000149,0000000001,'taglineSecondary','Les emplois sont réels. La plateforme est expérimentale.',0000000002),(0000000150,0000000001,'taglineTertiary','Help us build a new hiring model for the Government of Canada.',0000000001),(0000000151,0000000001,'taglineTertiary','Aidez-nous à créer un nouveau modèle d\'embauche pour le gouvernement du Canada.',0000000002),(0000000152,0000000001,'howItWorksHeading','How It Works',0000000001),(0000000153,0000000001,'howItWorksHeading','Comment ça marche',0000000002),(0000000154,0000000001,'howItWorksLead','GC Talent Cloud connects you to teams and projects where you can use your unique skills to make a difference in the lives of Canadians.',0000000001),(0000000155,0000000001,'howItWorksLead','Nuage de talents GC vous met en relation avec des équipes et des projets où vous pouvez utiliser vos compétences uniques pour faire une différence dans la vie des Canadiens.',0000000002),(0000000156,0000000001,'logoSrc','/images/talent-cloud-logo_full.png',0000000001),(0000000157,0000000001,'logoSrc','/images/talent-cloud-logo_FR.png',0000000002),(0000000158,0000000001,'logoAlt','GC Talent Cloud graphic',0000000001),(0000000159,0000000001,'logoAlt','Graphique de Nuage de talents du GC',0000000002),(0000000160,0000000001,'browseTitle','Browse Jobs',0000000001),(0000000161,0000000001,'browseTitle','Parcourir les travaux',0000000002),(0000000162,0000000001,'ownYourStory','Own Your Story',0000000001),(0000000163,0000000001,'ownYourStory','Possédez votre histoire',0000000002),(0000000164,0000000001,'ownYourStoryText','Everyone is unique. Participate in a job selection process that lets you tell your story your way.',0000000001),(0000000165,0000000001,'ownYourStoryText','Tout le monde est unique. Participez à un processus de sélection d\'emploi qui vous permet de raconter votre histoire à votre façon.',0000000002),(0000000166,0000000001,'getFound','Get Found',0000000001),(0000000167,0000000001,'getFound','Trouvé',0000000002),(0000000168,0000000001,'getFoundText','Learn about the work environment and teams that are part of the jobs you’re interested in. Showcase your unique skills and experiences for hiring managers across the country.',0000000001),(0000000169,0000000001,'getFoundText','Renseignez-vous sur l\'environnement de travail et les équipes qui font partie des emplois qui vous intéressent. Présentez vos compétences et expériences uniques aux gestionnaires d\'embauche à travers le pays.',0000000002),(0000000170,0000000001,'contribute','Contribute',0000000001),(0000000171,0000000001,'contribute','Contribuer',0000000002),(0000000172,0000000001,'contributeText','Find meaningful work that has an impact on Canadians, and be part of the effort to design a better hiring process for Government jobs.',0000000001),(0000000173,0000000001,'contributeText','Trouver un travail significatif qui a un impact sur les Canadiens et faire partie de l\'effort visant à concevoir un meilleur processus d\'embauche pour les emplois du gouvernement.',0000000002),(0000000174,0000000001,'howItWorksLeadOut','We want GC Talent Cloud to be a drive engine that allows more Canadians to have a chance to work in Government. We want diverse talent to bring new ideas that will shape programs and services across Canada.',0000000001),(0000000175,0000000001,'howItWorksLeadOut','Nous voulons que Nuage de talents du GC soit un moteur qui permette à plus de Canadiens de travailler au gouvernement. Nous voulons que les talents divers apportent de nouvelles idées qui façonneront les programmes et les services partout au Canada.',0000000002),(0000000176,0000000001,'howItWorksLast','Interested in chatting about a potential partnership?',0000000001),(0000000177,0000000001,'howItWorksLast','Intéressé à discuter d\'un partenariat potentiel?',0000000002),(0000000178,0000000001,'contactUs','Contact Us!',0000000001),(0000000179,0000000001,'contactUs','Contactez-nous!',0000000002),(0000000180,0000000001,'transcript','Transcript',0000000001),(0000000181,0000000001,'transcript','Transcription',0000000002),(0000000182,0000000001,'ourTeam','Our Team',0000000001),(0000000183,0000000001,'ourTeam','Notre équipe',0000000002),(0000000184,0000000001,'ourTeamText','We are a small but growing team of public servants passionate about the future of talent in Canada. Learn more about us and make your own contribution to GC Talent Cloud by joining us on one of these channels.',0000000001),(0000000185,0000000001,'ourTeamText','Nous sommes une petite équipe grandissante de fonctionnaires passionnés par l\'avenir des talents au Canada. En savoir plus sur nous et apporter votre propre contribution à Nuage de talent du GC en nous rejoignant sur l\'un de ces canaux.',0000000002),(0000000186,0000000001,'announcement','This site is under construction. The jobs are not in fact real at the moment.',0000000001),(0000000187,0000000001,'announcement','Ce site est en construction. Les emplois ne sont pas réels en ce moment.',0000000002),(0000000188,0000000001,'readMore','Read More',0000000001),(0000000189,0000000001,'readMore','En Savoir Plus',0000000002),(0000000190,0000000001,'createJobApplicationWindowTitle','My Job Application',0000000001),(0000000191,0000000001,'createJobApplicationWindowTitle','Ma Demande d\'Emploi',0000000002),(0000000192,0000000001,'createJobApplicationJobTitleLabel','for the position of',0000000001),(0000000193,0000000001,'createJobApplicationJobTitleLabel','pour le position de',0000000002),(0000000194,0000000001,'createJobApplicationConfirmationPositionLabel','You have applied to the position of:',0000000001),(0000000195,0000000001,'createJobApplicationConfirmationPositionLabel','Vous avez postulé à la position de:',0000000002),(0000000196,0000000001,'jobApplicationConfirmationTrackingReminder','Track the application from your Dashboard.',0000000001),(0000000197,0000000001,'jobApplicationConfirmationTrackingReminder','Suivez l\'application sur votre Dashboard.',0000000002),(0000000198,0000000001,'continueToDashboard','Continue to Dashboard',0000000001),(0000000199,0000000001,'continueToDashboard','Continuez au Dashboard',0000000002),(0000000200,0000000001,'adminPortal','Admin Portal',0000000001),(0000000201,0000000001,'adminPortal','Portail d\'administration',0000000002),(0000000202,0000000001,'applicantPortal','Applicant Portal',0000000001),(0000000203,0000000001,'applicantPortal','Portail demandeur',0000000002),(0000000204,0000000001,'dashBoardLink','Dashboard',0000000001),(0000000205,0000000001,'dashBoardLink','Tableau de bord',0000000002),(0000000206,0000000001,'yourApplicationsTitle','Your Applications',0000000001),(0000000207,0000000001,'yourApplicationsTitle','Vos applications',0000000002),(0000000208,0000000001,'adminTagline','Changing government through it\'s people',0000000001),(0000000209,0000000001,'adminTagline','Changer le gouvernement à travers ses gens',0000000002),(0000000210,0000000001,'adminAboutMe','About Me',0000000001),(0000000211,0000000001,'adminAboutMe','À propos de moi',0000000002),(0000000212,0000000001,'adminProfilePositionLabel','Position',0000000001),(0000000213,0000000001,'adminProfilePositionLabel','Position',0000000002),(0000000214,0000000001,'adminProfileDepartmentLabel','Department',0000000001),(0000000215,0000000001,'adminProfileDepartmentLabel','Département',0000000002),(0000000216,0000000001,'adminProfileBranchLabel','Branch',0000000001),(0000000217,0000000001,'adminProfileBranchLabel','Branche',0000000002),(0000000218,0000000001,'teamCulture','Team Culture',0000000001),(0000000219,0000000001,'teamCulture','Culture d\'Équippe',0000000002),(0000000220,0000000001,'teamSize','Team size',0000000001),(0000000221,0000000001,'teamSize','Taille d\'équippe',0000000002),(0000000222,0000000001,'gcDirectoryLink','Meet the team in',0000000001),(0000000223,0000000001,'gcDirectoryLink','Rencontrez l\'équippe à',0000000002),(0000000224,0000000001,'teamSizePrompt','What is the size of the team?',0000000001),(0000000225,0000000001,'teamSizePrompt','Combien de personnes dans l\'équipe?',0000000002),(0000000226,0000000001,'gcDirectoryLinkPrompt','Link to the team in GC Directory',0000000001),(0000000227,0000000001,'gcDirectoryLinkPrompt','Lien à l\'équippe en GC Directory',0000000002),(0000000228,0000000001,'teamNarrativePrompt','Tell us what makes your team unique. What are your team\'s vision, values, and expectations?',0000000001),(0000000229,0000000001,'teamNarrativePrompt','Dites-nous ce qui rend votre équipe unique. Quelles sont la vision, les valeurs et les attentes de votre équipe?',0000000002),(0000000230,0000000001,'workEnvironment','Work Environment',0000000001),(0000000231,0000000001,'workEnvironment','Environnement de Travail',0000000002),(0000000232,0000000001,'remoteLocationAllowed','Remote location allowed',0000000001),(0000000233,0000000001,'remoteLocationAllowed','Emplacement distant autorisé',0000000002),(0000000234,0000000001,'teleworkAllowed','Telework allowed',0000000001),(0000000235,0000000001,'teleworkAllowed','Télétravail autorisé',0000000002),(0000000236,0000000001,'flexHoursAllowed','Flexible hours allowed',0000000001),(0000000237,0000000001,'flexHoursAllowed','Heures flexibles autorisé',0000000002),(0000000238,0000000001,'yes','Yes',0000000001),(0000000239,0000000001,'yes','Oui',0000000002),(0000000240,0000000001,'no','No',0000000001),(0000000241,0000000001,'no','Non',0000000002),(0000000242,0000000001,'physicalEnvironment','Physical Environment',0000000001),(0000000243,0000000001,'physicalEnvironment','Environment Physique',0000000002),(0000000244,0000000001,'jobReferenceId','Reference ID',0000000001),(0000000245,0000000001,'jobReferenceId','ID de référence',0000000002),(0000000246,0000000001,'openEndedQuestions','Open Ended Questions',0000000001),(0000000247,0000000001,'openEndedQuestions','Questions ouverts',0000000002),(0000000248,0000000001,'skipNavText','Skip to main content',0000000001),(0000000249,0000000001,'skipNavText','Passer au contenu principal',0000000002),(0000000250,0000000001,'profileBasicInfoEditTitle','Edit your basic info',0000000001),(0000000251,0000000001,'profileBasicInfoEditTitle','Modifier vos informations de base',0000000002),(0000000252,0000000001,'updateProfilePhotoTitle','Change Display Picture',0000000001),(0000000253,0000000001,'updateProfilePhotoTitle','Modifier l\'image affichée',0000000002),(0000000254,0000000001,'updateProfilePhotoDraggableAreaLabel','Drag New Photo',0000000001),(0000000255,0000000001,'updateProfilePhotoDraggableAreaLabel','Glisser-déposez une photo',0000000002),(0000000256,0000000001,'updateProfilePhotoDraggableAreaErrorSize','File Larger Than 2MB',0000000001),(0000000257,0000000001,'updateProfilePhotoDraggableAreaErrorSize','Fichier de plus de 2MB',0000000002),(0000000258,0000000001,'updateProfilePhotoDraggableAreaErrorType','Please Use .JPG, .JPEG, or .PNG.',0000000001),(0000000259,0000000001,'updateProfilePhotoDraggableAreaErrorType','Veuillez utiliser .JPG, .JPEG ou .PNG.',0000000002),(0000000260,0000000001,'updateProfileOrCopy','or',0000000001),(0000000261,0000000001,'updateProfileOrCopy','ou',0000000002),(0000000262,0000000001,'updateProfileChoosePhotoButtonLabelSpan','Choose File...',0000000001),(0000000263,0000000001,'updateProfileChoosePhotoButtonLabelSpan','Choisir un fichier...',0000000002),(0000000264,0000000001,'updateProfileChoosePhotoButton','User Profile Photo',0000000001),(0000000265,0000000001,'updateProfileChoosePhotoButton','Photo du profil de l\'utilisateur',0000000002),(0000000266,0000000001,'updateProfileChooseAltPhotoButtonLabelSpan','Choose Another File...',0000000001),(0000000267,0000000001,'updateProfileChooseAltPhotoButtonLabelSpan','Choisissez un autre fichier...',0000000002),(0000000268,0000000001,'updateProfileChooseAltPhotoButton','User Profile Photo',0000000001),(0000000269,0000000001,'updateProfileChooseAltPhotoButton','Photo du profil de l\'utilisateur',0000000002),(0000000270,0000000001,'updateProfilePhotoCancelButton','Remove Photo',0000000001),(0000000271,0000000001,'updateProfilePhotoCancelButton','Retirer la photo',0000000002),(0000000272,0000000001,'updateProfileApplicantProfileFormFirstNameLabelSpan','First Name:',0000000001),(0000000273,0000000001,'updateProfileApplicantProfileFormFirstNameLabelSpan','Prénom:',0000000002),(0000000274,0000000001,'profileEditFirstName','profileEditFirstName',0000000001),(0000000275,0000000001,'profileEditFirstName','profilModifierLePrénom',0000000002),(0000000276,0000000001,'updateProfileApplicantProfileFormLastNameLabelSpan','Last Name:',0000000001),(0000000277,0000000001,'updateProfileApplicantProfileFormLastNameLabelSpan','Nom de famille:',0000000002),(0000000278,0000000001,'profileEditLastName','profileEditLastName',0000000001),(0000000279,0000000001,'profileEditLastName','profilModifierLeNomDeFamille',0000000002),(0000000280,0000000001,'updateProfileApplicantProfileFormTaglineLabelSpan','Tagline',0000000001),(0000000281,0000000001,'updateProfileApplicantProfileFormTaglineLabelSpan','Slogan',0000000002),(0000000282,0000000001,'profileEditTagline','profileEditTagline',0000000001),(0000000283,0000000001,'profileEditTagline','profileModifierLeSlogan',0000000002),(0000000284,0000000001,'updateProfileApplicantProfileFormTwitterLabelSpan','Twitter Handle:',0000000001),(0000000285,0000000001,'updateProfileApplicantProfileFormTwitterLabelSpan','Nom d\'utilisateur de Twitter',0000000002),(0000000286,0000000001,'profileEditTwitter','profileEditTwitter',0000000001),(0000000287,0000000001,'profileEditTwitter','profilModifierTwitter',0000000002),(0000000288,0000000001,'updateProfileApplicantProfileFormLinkedinLabelSpan','LinkedIn Profile Address:',0000000001),(0000000289,0000000001,'updateProfileApplicantProfileFormLinkedinLabelSpan','Adresse du profil LinkedIn:',0000000002),(0000000290,0000000001,'profileEditLinkedin','profileEditLinkedin',0000000001),(0000000291,0000000001,'profileEditLinkedin','profilModifierLinkedin',0000000002),(0000000292,0000000001,'profileBasicInfoEditCancel','Cancel',0000000001),(0000000293,0000000001,'profileBasicInfoEditCancel','Annuler',0000000002),(0000000294,0000000001,'profileBasicInfoEditSave','Save',0000000001),(0000000295,0000000001,'profileBasicInfoEditSave','Enregistrer',0000000002),(0000000296,0000000001,'profilePicUploadBtn','Save',0000000001),(0000000297,0000000001,'profilePicUploadBtn','Enregistrer',0000000002),(0000000298,0000000001,'loginFormTitle','Login to TalentCloud',0000000001),(0000000299,0000000001,'loginFormTitle','Connectez-vous à TalentCloud',0000000002),(0000000300,0000000001,'loginModalCopySpan','Welcome to TalentCloud! ',0000000001),(0000000301,0000000001,'loginModalCopySpan','Bienvenue à TalentCloud! ',0000000002),(0000000302,0000000001,'switchToRegister','Don\'t have an account? Click here to register.',0000000001),(0000000303,0000000001,'switchToRegister','Vous n\'avez pas de compte? Cliquez ici pour vous inscrire.',0000000002),(0000000304,0000000001,'loginModalEmailLabelSpan','Your Email:',0000000001),(0000000305,0000000001,'loginModalEmailLabelSpan','Votre email:',0000000002),(0000000306,0000000001,'login_email','login_email',0000000001),(0000000307,0000000001,'login_email','connecter_avec_email',0000000002),(0000000308,0000000001,'loginModalPasswordLabelSpan','Your Password:',0000000001),(0000000309,0000000001,'loginModalPasswordLabelSpan','Votre mot de passe:',0000000002),(0000000310,0000000001,'login_password','login_password',0000000001),(0000000311,0000000001,'login_password','mot_de_passe',0000000002),(0000000312,0000000001,'loginFormCancelBtn','Cancel',0000000001),(0000000313,0000000001,'loginFormCancelBtn','Annuler',0000000002),(0000000314,0000000001,'loginFormLoginBtn','Login',0000000001),(0000000315,0000000001,'loginFormLoginBtn','S\'identifier',0000000002),(0000000316,0000000001,'registerFormTitle','Register for TalentCloud',0000000001),(0000000317,0000000001,'registerFormTitle','Inscrivez-vous à TalentCloud',0000000002),(0000000318,0000000001,'profileAboutMeEditTitle','Edit Your \"About Me\" Information',0000000001),(0000000319,0000000001,'profileAboutMeEditTitle','Modifier vos informations \"À propos de moi\"',0000000002),(0000000320,0000000001,'updateAboutTextareaLabelSpan','About Me:',0000000001),(0000000321,0000000001,'updateAboutTextareaLabelSpan','À propos de moi:',0000000002),(0000000322,0000000001,'profileEditAboutMe','profileEditAboutMe',0000000001),(0000000323,0000000001,'profileEditAboutMe','profilModifierÀProposDeMoi',0000000002),(0000000324,0000000001,'profileAboutMeEditCancel','Cancel',0000000001),(0000000325,0000000001,'profileAboutMeEditCancel','Annuler',0000000002),(0000000326,0000000001,'profileAboutMeEditSave','Save',0000000001),(0000000327,0000000001,'profileAboutMeEditSave','Enregistrer',0000000002),(0000000328,0000000001,'managerProfile_review_option0','I <strong>almost never</strong> review my team\'s work before it is shared.',0000000001),(0000000329,0000000001,'managerProfile_review_option0','Je ne revois <strong>presque jamais</strong> le travail de mon équipe avant qu\'il ne soit partagé.',0000000002),(0000000330,0000000001,'managerProfile_review_option1','I <strong>rarely</strong> review my team\'s work before it is shared',0000000001),(0000000331,0000000001,'managerProfile_review_option1','Je revois <strong>rarement</strong> le travail de mon équipe avant qu\'elle ne soit partagée.',0000000002),(0000000332,0000000001,'managerProfile_review_option2','I <strong>sometimes</strong> review my team\'s work before it is shared.',0000000001),(0000000333,0000000001,'managerProfile_review_option2','Je révise <strong>parfois</strong> le travail de mon équipe avant de le partager.',0000000002),(0000000334,0000000001,'managerProfile_review_option3','I <strong>usually</strong> review my team\'s work before it is shared.',0000000001),(0000000335,0000000001,'managerProfile_review_option3','J\'examine <strong>habituellement</strong> le travail de mon équipe avant de le partager',0000000002),(0000000336,0000000001,'managerProfile_review_option4','I <strong>almost always</strong> review my team\'s work before it is shared.',0000000001),(0000000337,0000000001,'managerProfile_review_option4','Je revois <strong>presque toujours</strong> le travail de votre équipe avant de le partager.',0000000002),(0000000338,0000000001,'managerProfile_stayLate_option0','I <strong>almost</strong> never get in early or stay late to get some extra work done.',0000000001),(0000000339,0000000001,'managerProfile_stayLate_option0','Je ne prends <strong>presque jamais</strong> l\'avance ou je ne reste pas en retard pour faire du travail supplémentaire.',0000000002),(0000000340,0000000001,'managerProfile_stayLate_option1','I <strong>rarely</strong> get in early or stay late to get some extra work done.',0000000001),(0000000341,0000000001,'managerProfile_stayLate_option1','J\'arrive <strong>rarement</strong> tôt ou reste en retard pour faire un peu plus de travail.',0000000002),(0000000342,0000000001,'managerProfile_stayLate_option2','I <strong>sometimes</strong> get in early or stay late to get some extra work done.',0000000001),(0000000343,0000000001,'managerProfile_stayLate_option2','<strong>Parfois</strong> j\'arrive tôt ou reste en retard pour faire du travail supplémentaire.',0000000002),(0000000344,0000000001,'managerProfile_stayLate_option3','I <strong>usually</strong> get in early or stay late to get some extra work done.',0000000001),(0000000345,0000000001,'managerProfile_stayLate_option3','<strong>Habituellement</strong>, j\'arrive tôt ou je reste tard pour faire un peu plus de travail.\n',0000000002),(0000000346,0000000001,'managerProfile_stayLate_option4','I <strong>almost always</strong> get in early or stay late to get some extra work done.',0000000001),(0000000347,0000000001,'managerProfile_stayLate_option4','J\'arrive <strong>presque toujours</strong> tôt ou je reste tard pour avoir du travail supplémentaire.\n',0000000002),(0000000348,0000000001,'managerProfile_engagement_option0','I <strong>almost never</strong> engage my team before responding to management.',0000000001),(0000000349,0000000001,'managerProfile_engagement_option0','Je n\'engage <strong>presque jamais</strong> mon équipe avant de répondre à la direction.',0000000002),(0000000350,0000000001,'managerProfile_engagement_option1','I <strong>rarely</strong> engage my team before responding to management.',0000000001),(0000000351,0000000001,'managerProfile_engagement_option1','J\'engage <strong>rarement</strong> mon équipe avant de répondre à la direction.',0000000002),(0000000352,0000000001,'managerProfile_engagement_option2','I <strong>sometimes</strong> engage my team before responding to management.',0000000001),(0000000353,0000000001,'managerProfile_engagement_option2','J\'engage <strong>parfois</strong> mon équipe avant de répondre à la direction.',0000000002),(0000000354,0000000001,'managerProfile_engagement_option4','I <strong>usually</strong> engage my team before responding to management.',0000000001),(0000000355,0000000001,'managerProfile_engagement_option4','J\'engage <strong>habituellement</strong> mon équipe avant de répondre à la direction.',0000000002),(0000000356,0000000001,'managerProfile_engagement_option4','I <strong>almost always</strong> engage my team before responding to management.',0000000001),(0000000357,0000000001,'managerProfile_engagement_option4','J\'engage <strong>presque toujours</strong> mon équipe avant de répondre à la direction.',0000000002),(0000000358,0000000001,'managerProfile_developmentOpportunities_option0','I <strong>almost never</strong> approve development opportunities for my employees.\n',0000000001),(0000000359,0000000001,'managerProfile_developmentOpportunities_option0','Je n\'approuve <strong>presque jamais</strong> les opportunités de développement pour mes employés.',0000000002),(0000000360,0000000001,'managerProfile_developmentOpportunities_option1','I <strong>rarely</strong> approve development opportunities for my employees.',0000000001),(0000000361,0000000001,'managerProfile_developmentOpportunities_option1','J\'approuve <strong>rarement</strong> les opportunités de développement pour mes employés.',0000000002),(0000000362,0000000001,'managerProfile_developmentOpportunities_option2','I <strong>sometimes</strong> approve development opportunities for my employees.',0000000001),(0000000363,0000000001,'managerProfile_developmentOpportunities_option2','J\'approuve <strong>parfois</strong> des opportunités de développement pour mes employés.\n',0000000002),(0000000364,0000000001,'managerProfile_developmentOpportunities_option3','I <strong>usually</strong> approve development opportunities for my employees.',0000000001),(0000000365,0000000001,'managerProfile_developmentOpportunities_option3','J\'approuve <strong>habituellement</strong> les opportunités de développement pour mes employés.',0000000002),(0000000366,0000000001,'managerProfile_developmentOpportunities_option4','I <strong>almost always</strong> approve development opportunities for my employees.',0000000001),(0000000367,0000000001,'managerProfile_developmentOpportunities_option4','J\'approuve <strong>presque toujours</strong> les opportunités de développement pour mes employés.',0000000002),(0000000368,0000000001,'managerProfile_engagement_option3','I <strong>usually</strong> engage my team before responding to management.',0000000001),(0000000369,0000000001,'managerProfile_engagement_option3','J\'engage <strong>habituellement</strong> mon équipe avant de répondre à la direction.',0000000002),(0000000370,0000000001,'managerProfile_engagement_option4','I <strong>almost always</strong> engage my team before responding to management.',0000000001),(0000000371,0000000001,'managerProfile_engagement_option4','J\'engage <strong>presque toujours</strong> mon équipe avant de répondre à la direction.',0000000002),(0000000372,0000000001,'managerProfile_acceptLowValueWorkRequests_option0','I <strong>almost never</strong> refuse low value work requests from management.',0000000001),(0000000373,0000000001,'managerProfile_acceptLowValueWorkRequests_option0','Je ne refuse <strong>presque jamais</strong> les demandes de travail de faible valeur de la direction.',0000000002),(0000000374,0000000001,'managerProfile_acceptLowValueWorkRequests_option1','I <strong>rarely</strong> refuse low value work requests from management.',0000000001),(0000000375,0000000001,'managerProfile_acceptLowValueWorkRequests_option1','Je refuse <strong>rarement</strong> les demandes de travail de faible valeur de la direction.',0000000002),(0000000376,0000000001,'managerProfile_acceptLowValueWorkRequests_option2','I <strong>sometimes</strong> refuse low value work requests from management.',0000000001),(0000000377,0000000001,'managerProfile_acceptLowValueWorkRequests_option2','Je refuse <strong>parfois</strong> des demandes de travail de faible valeur de la part de la direction.',0000000002),(0000000378,0000000001,'managerProfile_acceptLowValueWorkRequests_option3','I <strong>usually</strong> refuse low value work requests from management.',0000000001),(0000000379,0000000001,'managerProfile_acceptLowValueWorkRequests_option3','Je refuse <strong>habituellement</strong> les demandes de travail de faible valeur de la direction.',0000000002),(0000000380,0000000001,'managerProfile_acceptLowValueWorkRequests_option4','I almost <strong>always</strong> refuse low value work requests from management.',0000000001),(0000000381,0000000001,'managerProfile_acceptLowValueWorkRequests_option4','Je refuse <strong>presque toujours</strong> les demandes de travail de faible valeur de la direction.',0000000002),(0000000382,0000000001,'managerDecisions_tipWhatis','<strong>What is this?</strong>',0000000001),(0000000383,0000000001,'managerDecisions_tipWhatis','<strong>Qu\'est-ce que c\'est?</strong>',0000000002),(0000000384,0000000001,'managerDecisions_tipSummary','Managers are asked to rate themselves on these four criterias to let applicants better understand their managing style using the following choices: <br/> Almost never, Rarely, Sometimes, Usually, Almost Always',0000000001),(0000000385,0000000001,'managerDecisions_tipSummary','Les gestionnaires sont invités à se noter sur ces quatre critères pour permettre aux candidats de mieux comprendre leur style de gestion en utilisant les choix suivants: <br/> Presque jamais, Rarement, Parfois, Habituellement, Presque toujours',0000000002);
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
  `criteria_name` varchar(45) NOT NULL,
  `criteria_description` varchar(140) DEFAULT NULL,
  `locale_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`criteria_id`,`criteria_type_id`),
  KEY `fk_criteria_criteria_type_id_idx` (`criteria_type_id`),
  KEY `fk_criteria_locale_id_idx` (`locale_id`),
  KEY `fk_criteria_job_poster_idx` (`job_poster_id`),
  CONSTRAINT `fk_criteria_criteria_type_id` FOREIGN KEY (`criteria_type_id`) REFERENCES `criteria_type` (`criteria_type_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_criteria_job_poster` FOREIGN KEY (`job_poster_id`) REFERENCES `job_poster` (`job_poster_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_criteria_locale_id` FOREIGN KEY (`locale_id`) REFERENCES `locale` (`locale_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criteria`
--

LOCK TABLES `criteria` WRITE;
/*!40000 ALTER TABLE `criteria` DISABLE KEYS */;
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
  PRIMARY KEY (`department_details_id`)
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
-- Table structure for table `evidence`
--

DROP TABLE IF EXISTS `evidence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evidence` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned zerofill NOT NULL,
  `skill` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `experience_level_id` int(10) unsigned zerofill NOT NULL,
  `skill_level_id` int(10) unsigned zerofill NOT NULL,
  `description` longtext COLLATE utf8_unicode_ci,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evidence`
--

LOCK TABLES `evidence` WRITE;
/*!40000 ALTER TABLE `evidence` DISABLE KEYS */;
/*!40000 ALTER TABLE `evidence` ENABLE KEYS */;
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
-- Table structure for table `job_application_answer`
--

DROP TABLE IF EXISTS `job_application_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_application_answer` (
  `job_poster_question_id` int(10) unsigned zerofill NOT NULL,
  `job_application_id` int(10) unsigned zerofill NOT NULL,
  `answer` longtext COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`job_poster_question_id`,`job_application_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_application_answer`
--

LOCK TABLES `job_application_answer` WRITE;
/*!40000 ALTER TABLE `job_application_answer` DISABLE KEYS */;
INSERT INTO `job_application_answer` VALUES (0000000001,0000000001,'Lots of reasons.'),(0000000001,0000000002,'I\'m a good fit because I\'m skinny.'),(0000000002,0000000001,'Personal website, TalentCloud.'),(0000000002,0000000002,'Talent Cloud!');
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
  PRIMARY KEY (`job_poster_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_poster`
--

LOCK TABLES `job_poster` WRITE;
/*!40000 ALTER TABLE `job_poster` DISABLE KEYS */;
INSERT INTO `job_poster` VALUES (0000000001,0000000002,'12',0000000001,0000000003,'2018-04-01 00:00:00','2018-05-01 00:00:00','2018-06-01 00:00:00',1,9,100000,120000);
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
  `application_job_seeker_profile_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_application_status_id` int(10) unsigned zerofill NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`job_poster_application_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_poster_application`
--

LOCK TABLES `job_poster_application` WRITE;
/*!40000 ALTER TABLE `job_poster_application` DISABLE KEYS */;
INSERT INTO `job_poster_application` VALUES (0000000001,0000000001,0000000002,0000000001,'2018-04-25 14:07:23'),(0000000002,0000000001,0000000003,0000000001,'2018-04-26 19:58:40');
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
INSERT INTO `job_poster_core_competency` VALUES (0000000001,0000000001,0000000001,'HTML'),(0000000002,0000000001,0000000001,'Javascript'),(0000000003,0000000001,0000000001,'PHP'),(0000000004,0000000001,0000000002,'HTML'),(0000000005,0000000001,0000000002,'Javascript'),(0000000006,0000000001,0000000002,'PHP');
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
  `job_poster_desc_title` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_desc_content` longtext COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_city` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_title` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_impact` longtext COLLATE utf8_unicode_ci NOT NULL,
  `branch` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `division` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`job_poster_details`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_poster_details`
--

LOCK TABLES `job_poster_details` WRITE;
/*!40000 ALTER TABLE `job_poster_details` DISABLE KEYS */;
INSERT INTO `job_poster_details` VALUES (0000000001,0000000001,0000000001,'','','Toronto','Web Developper','Improving Hiring\nBetter Talent in Gov',NULL,NULL),(0000000002,0000000001,0000000002,'','','Toronto','Dev de Web','Meillure Hiring\nMeillureTalent en Gov',NULL,NULL);
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
INSERT INTO `job_poster_developing_competency` VALUES (0000000001,0000000001,0000000001,'CSS'),(0000000002,0000000001,0000000002,'CSS');
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
  PRIMARY KEY (`job_poster_key_task_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_poster_key_task`
--

LOCK TABLES `job_poster_key_task` WRITE;
/*!40000 ALTER TABLE `job_poster_key_task` DISABLE KEYS */;
INSERT INTO `job_poster_key_task` VALUES (0000000001,0000000001,0000000001,'Design'),(0000000002,0000000001,0000000001,'Implementation'),(0000000003,0000000001,0000000001,'Maintenence'),(0000000004,0000000001,0000000002,'Design'),(0000000005,0000000001,0000000002,'Implementation'),(0000000006,0000000001,0000000002,'Maintenance_fr');
/*!40000 ALTER TABLE `job_poster_key_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_poster_other_requirement`
--

DROP TABLE IF EXISTS `job_poster_other_requirement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_poster_other_requirement` (
  `job_poster_other_requirement_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_poster_id` int(10) unsigned zerofill NOT NULL,
  `locale_id` int(10) unsigned zerofill NOT NULL,
  `requirement` longtext COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`job_poster_other_requirement_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_poster_other_requirement`
--

LOCK TABLES `job_poster_other_requirement` WRITE;
/*!40000 ALTER TABLE `job_poster_other_requirement` DISABLE KEYS */;
INSERT INTO `job_poster_other_requirement` VALUES (0000000001,0000000001,0000000001,'Remote working'),(0000000002,0000000001,0000000001,'Gumption!'),(0000000003,0000000001,0000000002,'Travail a distance'),(0000000004,0000000001,0000000002,'Enthousiasme!');
/*!40000 ALTER TABLE `job_poster_other_requirement` ENABLE KEYS */;
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
  `question` longtext COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_poster_question`
--

LOCK TABLES `job_poster_question` WRITE;
/*!40000 ALTER TABLE `job_poster_question` DISABLE KEYS */;
INSERT INTO `job_poster_question` VALUES (0000000001,0000000001,0000000001,'Why are you a good fit?'),(0000000002,0000000001,0000000001,'What relevant projects have you worked on before?'),(0000000003,0000000001,0000000002,'Vous etes un bon candidate pourquoi?'),(0000000004,0000000001,0000000002,'Vous avez travaille sur quelles projets relevents?');
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
  PRIMARY KEY (`job_poster_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_poster_to_manager_user_id`
--

LOCK TABLES `job_poster_to_manager_user_id` WRITE;
/*!40000 ALTER TABLE `job_poster_to_manager_user_id` DISABLE KEYS */;
INSERT INTO `job_poster_to_manager_user_id` VALUES (0000000001,0000000001);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_seeker_profile`
--

LOCK TABLES `job_seeker_profile` WRITE;
/*!40000 ALTER TABLE `job_seeker_profile` DISABLE KEYS */;
INSERT INTO `job_seeker_profile` VALUES (0000000001,'','My first test account!','','','2018-04-03 20:33:56'),(0000000002,'','My first test account!','','','2018-04-03 20:34:18'),(0000000003,'','','','','2018-04-26 19:58:32');
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
INSERT INTO `job_seeker_profile_answer` VALUES (0000000003,0000000001,''),(0000000003,0000000002,''),(0000000003,0000000003,''),(0000000003,0000000004,''),(0000000003,0000000005,''),(0000000003,0000000006,''),(0000000007,0000000001,'I worked for xtreme labs, then smart finance, then Talent Cloud.'),(0000000016,0000000001,'asdf'),(0000000016,0000000002,'asdfasdf'),(0000000016,0000000003,'I bring it all to the team'),(0000000016,0000000004,'asdffasg'),(0000000016,0000000005,''),(0000000016,0000000006,''),(0000000017,0000000001,'asdf'),(0000000017,0000000002,'asdfasdf'),(0000000017,0000000003,'I bring it all to the team'),(0000000017,0000000004,'asdffasg'),(0000000017,0000000005,''),(0000000017,0000000006,'Lots of teams'),(0000000018,0000000001,'My journey has been long.'),(0000000018,0000000002,''),(0000000018,0000000003,''),(0000000018,0000000004,''),(0000000018,0000000005,''),(0000000018,0000000006,''),(0000000019,0000000001,'My journey has been long.'),(0000000019,0000000002,'Never stops'),(0000000019,0000000003,''),(0000000019,0000000004,''),(0000000019,0000000005,''),(0000000019,0000000006,''),(0000000020,0000000001,'My journey has been long.'),(0000000020,0000000002,'Never stops'),(0000000020,0000000003,''),(0000000020,0000000004,'I\'m pumped!'),(0000000020,0000000005,''),(0000000020,0000000006,''),(0000000021,0000000001,'My journey has been long.'),(0000000021,0000000002,'Never stops'),(0000000021,0000000003,''),(0000000021,0000000004,'I\'m pumped!'),(0000000021,0000000005,''),(0000000021,0000000006,''),(0000000022,0000000001,''),(0000000022,0000000002,''),(0000000022,0000000003,''),(0000000022,0000000004,''),(0000000022,0000000005,''),(0000000022,0000000006,'');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
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
  `team_culture_id` int(10) NOT NULL,
  PRIMARY KEY (`user_manager_profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager_profile_to_team_culture`
--

LOCK TABLES `manager_profile_to_team_culture` WRITE;
/*!40000 ALTER TABLE `manager_profile_to_team_culture` DISABLE KEYS */;
INSERT INTO `manager_profile_to_team_culture` VALUES (0000000001,1);
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
  PRIMARY KEY (`user_manager_profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager_profile_to_work_environment`
--

LOCK TABLES `manager_profile_to_work_environment` WRITE;
/*!40000 ALTER TABLE `manager_profile_to_work_environment` DISABLE KEYS */;
INSERT INTO `manager_profile_to_work_environment` VALUES (0000000001,1);
/*!40000 ALTER TABLE `manager_profile_to_work_environment` ENABLE KEYS */;
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
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
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
  `experience_level_id` int(10) unsigned zerofill NOT NULL,
  `skill_level_id` int(10) unsigned zerofill NOT NULL,
  `description` mediumtext NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`skill_declaration_id`),
  KEY `fk_experience_level_id_idx` (`experience_level_id`),
  KEY `fk_skill_level_id_idx` (`skill_level_id`),
  KEY `fk_skill_declaration_criteria_id_idx` (`criteria_id`),
  KEY `fk_skill_declaration_application_id_idx` (`job_poster_application_id`),
  CONSTRAINT `fk_skill_declaration_application_id` FOREIGN KEY (`job_poster_application_id`) REFERENCES `job_poster_application` (`job_poster_application_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_skill_declaration_criteria_id` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`criteria_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_skill_declaration_experience_level_id` FOREIGN KEY (`experience_level_id`) REFERENCES `experience_level` (`experience_level_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_skill_declaration_skill_level_id` FOREIGN KEY (`skill_level_id`) REFERENCES `skill_level` (`skill_level_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill_declaration`
--

LOCK TABLES `skill_declaration` WRITE;
/*!40000 ALTER TABLE `skill_declaration` DISABLE KEYS */;
INSERT INTO `skill_declaration` VALUES (0000000001,0000000000,0000000000,0000000004,0000000002,'asfdasfd',0,'2018-04-27 00:31:03'),(0000000002,0000000000,0000000000,0000000004,0000000002,'asfdasfd',0,'2018-04-27 00:31:27'),(0000000003,0000000000,0000000000,0000000002,0000000002,'asdfasdfasfd',0,'2018-04-27 00:31:27'),(0000000004,0000000000,0000000000,0000000005,0000000003,'How do you od?',0,'2018-04-27 00:31:27'),(0000000005,0000000000,0000000000,0000000004,0000000002,'asfasdf',0,'2018-04-27 00:31:54'),(0000000006,0000000000,0000000000,0000000002,0000000004,'asdfasdfasfd',0,'2018-04-27 00:31:54'),(0000000007,0000000000,0000000000,0000000005,0000000003,'How do you od?',0,'2018-04-27 00:31:54'),(0000000008,0000000000,0000000000,0000000003,0000000002,'kjlkjhlkjh',0,'2018-04-27 00:36:14'),(0000000009,0000000000,0000000000,0000000005,0000000003,'How do you od?',0,'2018-04-27 00:36:14'),(0000000010,0000000000,0000000000,0000000003,0000000002,'ljklkjhlk',0,'2018-04-27 00:36:29'),(0000000011,0000000000,0000000000,0000000001,0000000003,'gfdjhgfjhg',0,'2018-04-27 00:36:29'),(0000000012,0000000000,0000000000,0000000003,0000000002,'kjlkjhlkjh',0,'2018-04-27 00:37:53'),(0000000013,0000000000,0000000000,0000000005,0000000003,'JS',0,'2018-04-27 00:37:53'),(0000000014,0000000000,0000000000,0000000005,0000000003,'How do you od?',0,'2018-04-27 00:37:53'),(0000000015,0000000000,0000000000,0000000003,0000000002,'kjlkjhlkjh',0,'2018-04-27 00:38:02'),(0000000016,0000000000,0000000000,0000000005,0000000003,'JS',0,'2018-04-27 00:38:02'),(0000000017,0000000000,0000000000,0000000005,0000000003,'How do you od?',0,'2018-04-27 00:38:02'),(0000000018,0000000000,0000000000,0000000002,0000000002,'How do you do?',0,'2018-04-27 00:38:37'),(0000000019,0000000000,0000000000,0000000003,0000000002,'JS Asset not Essential',0,'2018-04-27 00:38:37'),(0000000020,0000000000,0000000000,0000000004,0000000002,'PHP booyeah PARTAYYY',0,'2018-04-27 00:38:37'),(0000000021,0000000000,0000000000,0000000003,0000000002,'kjlkjhlkjh',0,'2018-04-27 00:38:49'),(0000000022,0000000000,0000000000,0000000005,0000000003,'JS',0,'2018-04-27 00:38:49'),(0000000023,0000000000,0000000000,0000000005,0000000003,'How do you od?',0,'2018-04-27 00:38:49'),(0000000024,0000000000,0000000000,0000000002,0000000002,'How do you do?',0,'2018-04-27 00:39:10'),(0000000025,0000000000,0000000000,0000000003,0000000002,'JS Asset not Essential',0,'2018-04-27 00:39:11'),(0000000026,0000000000,0000000000,0000000002,0000000003,'BOOY YEAH PARTAY',0,'2018-04-27 00:39:11'),(0000000027,0000000000,0000000000,0000000003,0000000002,'kjlkjhlkjh',0,'2018-04-27 00:39:12'),(0000000028,0000000000,0000000000,0000000005,0000000003,'JS',0,'2018-04-27 00:39:12'),(0000000029,0000000000,0000000000,0000000005,0000000003,'How do you od?',0,'2018-04-27 00:39:12'),(0000000030,0000000000,0000000000,0000000003,0000000002,'kjlkjhlkjh',0,'2018-04-27 00:39:21'),(0000000031,0000000000,0000000000,0000000005,0000000003,'JS',0,'2018-04-27 00:39:21'),(0000000032,0000000000,0000000000,0000000005,0000000003,'How do you od?',0,'2018-04-27 00:39:21'),(0000000033,0000000000,0000000000,0000000002,0000000002,'How do you do?',0,'2018-04-27 00:39:35'),(0000000034,0000000000,0000000000,0000000003,0000000002,'JS Asset not Essential',0,'2018-04-27 00:39:35'),(0000000035,0000000000,0000000000,0000000002,0000000002,'BOOY YAEH',0,'2018-04-27 00:39:35'),(0000000036,0000000000,0000000000,0000000003,0000000002,'kjlkjhlkjh',0,'2018-04-27 00:42:54'),(0000000037,0000000000,0000000000,0000000005,0000000003,'JS',0,'2018-04-27 00:42:54'),(0000000038,0000000000,0000000000,0000000005,0000000003,'How do you od?',0,'2018-04-27 00:42:54'),(0000000039,0000000000,0000000000,0000000003,0000000002,'kjlkjhlkjh',0,'2018-04-27 00:46:06'),(0000000040,0000000000,0000000000,0000000005,0000000003,'JS',0,'2018-04-27 00:46:06'),(0000000041,0000000000,0000000000,0000000005,0000000003,'How do you od?',0,'2018-04-27 00:46:06'),(0000000042,0000000000,0000000000,0000000002,0000000002,'How do you do?',0,'2018-04-27 00:46:09'),(0000000043,0000000000,0000000000,0000000003,0000000002,'kjlkjhlkjh',0,'2018-04-27 00:46:46'),(0000000044,0000000000,0000000000,0000000005,0000000003,'JS',0,'2018-04-27 00:46:46'),(0000000045,0000000000,0000000000,0000000005,0000000003,'How do you od?',0,'2018-04-27 00:46:46'),(0000000046,0000000000,0000000000,0000000003,0000000002,'kjlkjhlkjh',0,'2018-04-27 00:51:59'),(0000000047,0000000000,0000000000,0000000005,0000000003,'JS',0,'2018-04-27 00:51:59'),(0000000048,0000000000,0000000000,0000000005,0000000003,'How do you od?',0,'2018-04-27 00:51:59'),(0000000049,0000000000,0000000000,0000000003,0000000003,'CSS IS LIFE',0,'2018-04-27 00:52:07'),(0000000050,0000000000,0000000000,0000000003,0000000002,'kjlkjhlkjh',0,'2018-04-27 00:52:08'),(0000000051,0000000000,0000000000,0000000005,0000000003,'JS',0,'2018-04-27 00:52:08'),(0000000052,0000000000,0000000000,0000000005,0000000003,'How do you od?',0,'2018-04-27 00:52:08'),(0000000053,0000000000,0000000000,0000000003,0000000002,'kjlkjhlkjh',0,'2018-04-27 00:52:17'),(0000000054,0000000000,0000000000,0000000005,0000000003,'JS',0,'2018-04-27 00:52:17'),(0000000055,0000000000,0000000000,0000000005,0000000003,'How do you od?',0,'2018-04-27 00:52:17'),(0000000056,0000000000,0000000000,0000000003,0000000003,'CSS IS LIFE',0,'2018-04-27 00:52:22');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_culture`
--

LOCK TABLES `team_culture` WRITE;
/*!40000 ALTER TABLE `team_culture` DISABLE KEYS */;
INSERT INTO `team_culture` VALUES (0000000001,12,'https://gccollab.ca/groups/profile/19750/talent-cloud-nuage-de-talent');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_culture_details`
--

LOCK TABLES `team_culture_details` WRITE;
/*!40000 ALTER TABLE `team_culture_details` DISABLE KEYS */;
INSERT INTO `team_culture_details` VALUES (0000000001,0000000001,0000000001,'Unicorns!'),(0000000002,0000000001,0000000002,'Unicorns_fr!');
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
  `password` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastname` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_confirmed` tinyint(1) DEFAULT '0',
  `user_role_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (0000000001,'admin1@test.com','cc03e747a6afbbcbf8be7668acfebee5',NULL,NULL,1,0000000002),(0000000002,'test1@test.com','d41d8cd98f00b204e9800998ecf8427e','Ash','Ketchum',1,0000000001),(0000000003,'test7@test.com','d41d8cd98f00b204e9800998ecf8427e','Tristan','ORourke',1,0000000001);
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
  PRIMARY KEY (`user_id`,`job_seeker_profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_job_seeker_profiles`
--

LOCK TABLES `user_job_seeker_profiles` WRITE;
/*!40000 ALTER TABLE `user_job_seeker_profiles` DISABLE KEYS */;
INSERT INTO `user_job_seeker_profiles` VALUES (0000000002,0000000001),(0000000002,0000000002),(0000000003,0000000003);
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
  `user_manager_profile_position` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_twitter` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_linkedin` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` int(10) NOT NULL,
  PRIMARY KEY (`user_manager_profile_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_manager_profile`
--

LOCK TABLES `user_manager_profile` WRITE;
/*!40000 ALTER TABLE `user_manager_profile` DISABLE KEYS */;
INSERT INTO `user_manager_profile` VALUES (0000000001,NULL,'TalentCloud Project Manager','','',1);
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
  `user_manager_profile_details_branch` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_details_division` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_details_lead_style` mediumtext COLLATE utf8_unicode_ci,
  `user_manager_profile_details_emp_learn` mediumtext COLLATE utf8_unicode_ci,
  `user_manager_profile_details_expectations` mediumtext COLLATE utf8_unicode_ci,
  `user_manager_profile_id` int(10) NOT NULL,
  `user_manager_profile_review_options` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_staylate` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_engage` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_devops` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_lvwRequests` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_work_experience` mediumtext COLLATE utf8_unicode_ci,
  `user_manager_profile_education` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`user_manager_profile_details_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_manager_profile_details`
--

LOCK TABLES `user_manager_profile_details` WRITE;
/*!40000 ALTER TABLE `user_manager_profile_details` DISABLE KEYS */;
INSERT INTO `user_manager_profile_details` VALUES (0000000001,1,'I\'m a hiring manager.','Winning that office bet.',NULL,NULL,'Strong','Enthousiastic','High',1,'option4','option3','option2','option2','option1','Government\nTalentCloud','University');
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
-- Table structure for table `user_user_manager_profile`
--

DROP TABLE IF EXISTS `user_user_manager_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_user_manager_profile` (
  `user_id` int(10) NOT NULL,
  `user_manager_profile_id` int(10) NOT NULL,
  PRIMARY KEY (`user_id`,`user_manager_profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user_manager_profile`
--

LOCK TABLES `user_user_manager_profile` WRITE;
/*!40000 ALTER TABLE `user_user_manager_profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_user_manager_profile` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_environment`
--

LOCK TABLES `work_environment` WRITE;
/*!40000 ALTER TABLE `work_environment` DISABLE KEYS */;
INSERT INTO `work_environment` VALUES (0000000001,'option0','option4','option3');
/*!40000 ALTER TABLE `work_environment` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
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
  `description` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`work_environment_id`,`photo_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workplace_photo_caption`
--

LOCK TABLES `workplace_photo_caption` WRITE;
/*!40000 ALTER TABLE `workplace_photo_caption` DISABLE KEYS */;
INSERT INTO `workplace_photo_caption` VALUES (0000000001,'workplace_photo_1',0000000001,'Field after winter storm'),(0000000001,'workplace_photo_2',0000000002,'Bonfire on beach'),(0000000001,'workplace_photo_3',0000000003,'Grenoble');
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

-- Dump completed on 2018-05-02 11:52:03
