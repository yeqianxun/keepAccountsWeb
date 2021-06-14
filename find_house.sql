-- MySQL dump 10.13  Distrib 5.7.22, for Win64 (x86_64)
--
-- Host: localhost    Database: find_house
-- ------------------------------------------------------
-- Server version	5.7.22-log

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
-- Table structure for table `carousel`
--

DROP TABLE IF EXISTS `carousel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carousel` (
  `carousel_id` int(11) NOT NULL AUTO_INCREMENT,
  `carousel_text` varchar(255) NOT NULL COMMENT '首页轮播文字',
  PRIMARY KEY (`carousel_id`),
  UNIQUE KEY `carousel_id` (`carousel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carousel`
--

LOCK TABLES `carousel` WRITE;
/*!40000 ALTER TABLE `carousel` DISABLE KEYS */;
INSERT INTO `carousel` VALUES (1,'新老客户独家特惠大返现，最高可得返现4200元（约$600）现金返现。'),(2,'邀请好友，赠送好友50优惠券，您可得300现金返现'),(3,'老客户推荐好友租房享受5折优惠');
/*!40000 ALTER TABLE `carousel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cities` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `cityname` varchar(255) NOT NULL COMMENT '城市名称',
  PRIMARY KEY (`cid`),
  UNIQUE KEY `cid` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'杭州'),(2,'武汉'),(3,'北京'),(4,'上海'),(5,'广州'),(6,'深圳');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cityregions`
--

DROP TABLE IF EXISTS `cityregions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cityregions` (
  `regionid` int(11) NOT NULL AUTO_INCREMENT,
  `region_name` varchar(255) NOT NULL COMMENT '城市区域名称',
  `city_cid` int(11) DEFAULT NULL,
  PRIMARY KEY (`regionid`),
  UNIQUE KEY `regionid` (`regionid`),
  KEY `city_cid` (`city_cid`),
  CONSTRAINT `cityregions_ibfk_1` FOREIGN KEY (`city_cid`) REFERENCES `cities` (`cid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cityregions`
--

LOCK TABLES `cityregions` WRITE;
/*!40000 ALTER TABLE `cityregions` DISABLE KEYS */;
INSERT INTO `cityregions` VALUES (1,'滨江区',1),(2,'西湖区',1),(3,'上城区',1),(4,'江干区',1),(5,'余杭区',1),(6,'萧山区',1),(7,'汉口区',2),(8,'武昌区',2),(9,'江汉区',2),(10,'蔡甸区',2),(11,'洪山区',2),(12,'江夏区',2),(13,'黄陂区',2),(14,'东城区',3),(15,'崇文区',3),(16,'海淀区',3),(17,'宣武区',3),(18,'西城区',3),(19,'朝阳区',3),(20,'黄浦区',4),(21,'徐汇区',4),(22,'长宁区',4),(23,'浦东新区',4),(24,'静安区',4),(25,'杨浦区',4),(26,'普陀区',4),(27,' 虹口区',4),(28,'越秀区',5),(29,'海珠区',5),(30,'荔湾区',5),(31,'天河区',5),(32,'白云区',5),(33,'黄埔区',5),(34,'南沙区',5),(35,'萝岗区',5),(36,'番禺区',5),(37,'花都区',5),(38,'宝安区',6),(39,'龙岗区',6),(40,'盐田区',6),(41,'罗湖区',6),(42,'福田区',6),(43,'南山区',6);
/*!40000 ALTER TABLE `cityregions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `houseimg`
--

DROP TABLE IF EXISTS `houseimg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `houseimg` (
  `imgid` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL COMMENT '房屋图片',
  `houseinfo_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`imgid`),
  UNIQUE KEY `imgid` (`imgid`),
  KEY `houseinfo_id` (`houseinfo_id`),
  CONSTRAINT `houseimg_ibfk_1` FOREIGN KEY (`houseinfo_id`) REFERENCES `houseinfo` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `houseimg`
--

LOCK TABLES `houseimg` WRITE;
/*!40000 ALTER TABLE `houseimg` DISABLE KEYS */;
/*!40000 ALTER TABLE `houseimg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `houseinfo`
--

DROP TABLE IF EXISTS `houseinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `houseinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `houseid` bigint(11) NOT NULL COMMENT '房屋id',
  `address` varchar(255) NOT NULL COMMENT '房屋住址',
  `label` varchar(255) DEFAULT NULL COMMENT '房屋标签',
  `houseimg` varchar(255) NOT NULL COMMENT '房屋图片',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_uid` bigint(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `houseid` (`houseid`),
  KEY `user_uid` (`user_uid`),
  CONSTRAINT `houseinfo_ibfk_1` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `houseinfo`
--

LOCK TABLES `houseinfo` WRITE;
/*!40000 ALTER TABLE `houseinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `houseinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `houselabel`
--

DROP TABLE IF EXISTS `houselabel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `houselabel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `labelid` bigint(11) NOT NULL COMMENT '房屋id',
  `labelname` varchar(255) NOT NULL COMMENT '标签名',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `labelid` (`labelid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `houselabel`
--

LOCK TABLES `houselabel` WRITE;
/*!40000 ALTER TABLE `houselabel` DISABLE KEYS */;
/*!40000 ALTER TABLE `houselabel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `housetag`
--

DROP TABLE IF EXISTS `housetag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `housetag` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `houseinfo_id` int(11) NOT NULL,
  `houselabel_id` int(11) NOT NULL,
  PRIMARY KEY (`houseinfo_id`,`houselabel_id`),
  KEY `houselabel_id` (`houselabel_id`),
  CONSTRAINT `housetag_ibfk_1` FOREIGN KEY (`houseinfo_id`) REFERENCES `houseinfo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `housetag_ibfk_2` FOREIGN KEY (`houselabel_id`) REFERENCES `houselabel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `housetag`
--

LOCK TABLES `housetag` WRITE;
/*!40000 ALTER TABLE `housetag` DISABLE KEYS */;
/*!40000 ALTER TABLE `housetag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `layout`
--

DROP TABLE IF EXISTS `layout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `layout` (
  `layoutid` int(11) NOT NULL AUTO_INCREMENT,
  `layout` varchar(255) NOT NULL COMMENT '户型',
  `houseinfo_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`layoutid`),
  UNIQUE KEY `layoutid` (`layoutid`),
  KEY `houseinfo_id` (`houseinfo_id`),
  CONSTRAINT `layout_ibfk_1` FOREIGN KEY (`houseinfo_id`) REFERENCES `houseinfo` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `layout`
--

LOCK TABLES `layout` WRITE;
/*!40000 ALTER TABLE `layout` DISABLE KEYS */;
INSERT INTO `layout` VALUES (1,'一居室',NULL),(2,'二居室',NULL),(3,'三居室',NULL),(4,'四居室及以上',NULL);
/*!40000 ALTER TABLE `layout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rentprice`
--

DROP TABLE IF EXISTS `rentprice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rentprice` (
  `priceid` int(11) NOT NULL AUTO_INCREMENT,
  `min` int(11) NOT NULL COMMENT '最小价格',
  `max` int(11) NOT NULL COMMENT '最大价格',
  `houseinfo_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`priceid`),
  UNIQUE KEY `priceid` (`priceid`),
  KEY `houseinfo_id` (`houseinfo_id`),
  CONSTRAINT `rentprice_ibfk_1` FOREIGN KEY (`houseinfo_id`) REFERENCES `houseinfo` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rentprice`
--

LOCK TABLES `rentprice` WRITE;
/*!40000 ALTER TABLE `rentprice` DISABLE KEYS */;
INSERT INTO `rentprice` VALUES (1,0,1500,NULL),(2,1500,2000,NULL),(3,2000,3000,NULL),(4,3500,5000,NULL),(5,5000,8000,NULL),(6,8000,10000,NULL);
/*!40000 ALTER TABLE `rentprice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `renttype`
--

DROP TABLE IF EXISTS `renttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `renttype` (
  `renttypeid` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL COMMENT '租房类型',
  `houseinfo_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`renttypeid`),
  UNIQUE KEY `renttypeid` (`renttypeid`),
  KEY `houseinfo_id` (`houseinfo_id`),
  CONSTRAINT `renttype_ibfk_1` FOREIGN KEY (`houseinfo_id`) REFERENCES `houseinfo` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `renttype`
--

LOCK TABLES `renttype` WRITE;
/*!40000 ALTER TABLE `renttype` DISABLE KEYS */;
INSERT INTO `renttype` VALUES (5,'整租',NULL),(6,'合租',NULL);
/*!40000 ALTER TABLE `renttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `square`
--

DROP TABLE IF EXISTS `square`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `square` (
  `squareid` int(11) NOT NULL AUTO_INCREMENT,
  `min` int(11) NOT NULL COMMENT '最小面积',
  `max` int(11) NOT NULL COMMENT '最大面积',
  `houseinfo_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`squareid`),
  UNIQUE KEY `squareid` (`squareid`),
  KEY `houseinfo_id` (`houseinfo_id`),
  CONSTRAINT `square_ibfk_1` FOREIGN KEY (`houseinfo_id`) REFERENCES `houseinfo` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `square`
--

LOCK TABLES `square` WRITE;
/*!40000 ALTER TABLE `square` DISABLE KEYS */;
INSERT INTO `square` VALUES (1,10,30,NULL),(2,30,50,NULL),(3,50,70,NULL),(4,70,100,NULL);
/*!40000 ALTER TABLE `square` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `uid` bigint(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '用户密码',
  `sex` varchar(255) DEFAULT NULL COMMENT '性别',
  `mobile` varchar(255) DEFAULT NULL COMMENT '手机号码',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `usertype` varchar(255) DEFAULT '0' COMMENT '用户类型',
  `active` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否正常状态',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','c4ca4238a0b923820dcc509a6f75849b',NULL,NULL,NULL,'0',0,'2021-05-29 08:56:35','2021-05-29 08:56:35');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-30 21:48:06
