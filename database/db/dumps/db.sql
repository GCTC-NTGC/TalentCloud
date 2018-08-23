CREATE DATABASE testdb;

\c testdb;

DROP DATABASE IF EXISTS talentcloud;

DROP ROLE IF EXISTS talentcloud;

CREATE ROLE talentcloud WITH CREATEDB CREATEROLE LOGIN PASSWORD 'talentcloud';

CREATE DATABASE talentcloud
 WITH ENCODING='UTF8'
 OWNER=talentcloud
 CONNECTION LIMIT=25;

GRANT ALL PRIVILEGES ON DATABASE * TO talentcloud;

\c talentcloud;

DROP DATABASE IF EXISTS testdb;

\c talentcloud talentcloud;

-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: talentcloud-db
-- Generation Time: Aug 01, 2018 at 07:41 PM
-- Server version: 5.6.41
-- PHP Version: 7.2.6

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
