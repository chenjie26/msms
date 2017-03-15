-- MySQL dump 10.13  Distrib 5.7.9, for osx10.9 (x86_64)
--
-- Host: 127.0.0.1    Database: shama
-- ------------------------------------------------------
-- Server version	5.7.13

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
-- Table structure for table `actives`
--

DROP TABLE IF EXISTS `actives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `status` int(11) NOT NULL,
  `message` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actives`
--

LOCK TABLES `actives` WRITE;
/*!40000 ALTER TABLE `actives` DISABLE KEYS */;
INSERT INTO `actives` VALUES (1,'春季活动－2017－1','<p>这是一个很<strong>好</strong>的活动！</p>\n\n<p>图片欣赏：</p>\n\n<p><img alt=\"\" src=\"http://api.shama.com/uploads/46193.jpg\" style=\"height:386px; width:313px\" /></p>\n\n<p><img alt=\"\" src=\"http://api.shama.com/uploads/2017-01-08.1483853794.366599446.jpg\" style=\"height:386px; width:313px\" /></p>\n\n<p>&nbsp;</p>\n','2017-01-07 04:50:19','2017-01-08 05:40:57',NULL,0,'这个活动截止15日结束－1'),(2,'1','<p>3</p>\n','2017-01-08 05:51:52','2017-01-08 05:51:52',NULL,0,'2'),(3,'活动标题','<p><img alt=\"\" src=\"http://api.shama.com/uploads/2017-01-08.1483854903.266633920.jpg\" style=\"height:560px; width:560px\" /></p>\n','2017-01-08 05:55:15','2017-01-08 05:55:15',NULL,0,'本次活动xx'),(4,'huodon','<p>这是一个很<strong>好</strong>的活动！</p>\n\n<p>图片欣赏：</p>\n\n<p><img alt=\"\" src=\"http://api.shama.com/uploads/46193.jpg\" style=\"height:386px; width:313px\" /></p>\n\n<p><img alt=\"\" src=\"http://api.shama.com/uploads/2017-01-08.1483853794.366599446.jpg\" style=\"height:386px; width:313px\" /></p>\n\n<p>&nbsp;</p>\n','2017-01-08 06:03:12','2017-01-08 06:03:12',NULL,0,'这个活动截止15日结束－1'),(5,'hsj','<p>we</p>\n','2017-01-08 06:04:18','2017-01-08 06:04:18',NULL,0,'we'),(6,'1','<p>123</p>\n','2017-01-08 06:07:43','2017-01-08 06:07:43',NULL,0,'12'),(7,'123','<p>123</p>\n','2017-01-08 06:09:16','2017-01-08 06:09:16',NULL,0,'123');
/*!40000 ALTER TABLE `actives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baseinfos`
--

DROP TABLE IF EXISTS `baseinfos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baseinfos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `value` varchar(2000) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key_UNIQUE` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baseinfos`
--

LOCK TABLES `baseinfos` WRITE;
/*!40000 ALTER TABLE `baseinfos` DISABLE KEYS */;
INSERT INTO `baseinfos` VALUES (1,'about','公司简介','<p>公司简介内容1</p>\n',NULL,'2017-01-08 08:42:38',NULL),(3,'contact','联系我们','<p>联系我们</p>\n','2017-01-01 12:00:42','2017-01-08 08:44:36',NULL);
/*!40000 ALTER TABLE `baseinfos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedbacks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `status` int(11) DEFAULT '0' COMMENT '0 未处理 1 已处理',
  `member_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
INSERT INTO `feedbacks` VALUES (2,'abc@qq.com','hi gi iwidw kwkdwl  dwjjs lwldlw ','2017-01-08 07:03:30','2017-01-08 07:52:07',NULL,0,0);
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `houses`
--

DROP TABLE IF EXISTS `houses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `houses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pic` varchar(45) DEFAULT NULL,
  `en_name` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `light_point` varchar(500) DEFAULT NULL,
  `bathroom` varchar(500) DEFAULT NULL,
  `bathtub` varchar(500) DEFAULT NULL,
  `bed` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `_index` int(11) NOT NULL DEFAULT '100',
  `pics` varchar(2000) NOT NULL,
  `link` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `houses`
--

LOCK TABLES `houses` WRITE;
/*!40000 ALTER TABLE `houses` DISABLE KEYS */;
INSERT INTO `houses` VALUES (4,'abc.jpg','140平米三房','tree bedromm 140 rqm','宽敞的客厅，和餐厅与区，一个主卧，一个次卧，一个书房。','日式卫浴设备','主卧配置浴缸','大床，双人床，沙发床','2017-01-08 08:55:39','2017-01-08 10:08:17',NULL,100,'<p><img alt=\"\" src=\"http://api.shama.com/uploads/2017-01-08.1483869880.965983121.jpg\" style=\"height:386px; width:313px\" /></p>\n','http://shama.com?house_id=15'),(6,'1.jpg','four room ','4室2厅','暂无','暂无','暂无','暂无','2017-01-08 15:26:29','2017-01-08 15:26:29',NULL,100,'<p>暂无</p>\n','http://shama.com/?house_id=10'),(7,'abc.jpg','abc','efg','ee','ff','gg','hh','2017-01-08 15:27:05','2017-01-08 15:27:05',NULL,100,'','');
/*!40000 ALTER TABLE `houses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_actives`
--

DROP TABLE IF EXISTS `member_actives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member_actives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `active_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index2` (`member_id`,`active_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_actives`
--

LOCK TABLES `member_actives` WRITE;
/*!40000 ALTER TABLE `member_actives` DISABLE KEYS */;
INSERT INTO `member_actives` VALUES (1,1,1,'2017-01-01 12:35:51','2017-01-01 12:35:51',NULL),(4,2,1,'2017-01-01 12:37:52','2017-01-07 05:01:00',NULL);
/*!40000 ALTER TABLE `member_actives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `phone_code` varchar(45) DEFAULT NULL,
  `sex` int(11) DEFAULT '0' COMMENT '0 男 1 女',
  `house_id` varchar(45) DEFAULT NULL,
  `room_id` varchar(45) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `token` varchar(45) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `card_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (6,'tommy','tommy@qq.com','adc03d89f7772052d6692f83630a54ce','13298983984','9829',0,'12','123','1987-02-10 00:00:00','2017-01-01 13:59:24','80bb681ed02a11e682a0a8667f2c3139','2017-01-03 17:05:12','2017-01-01 05:08:49','2017-01-03 17:05:12','5261763728291'),(11,'tommy1','tomnattle@qq.com','zz123456','13278737875','2718',0,'15','11','2015-01-10 00:00:00',NULL,NULL,'2017-01-04 13:22:03','2017-01-04 13:22:03',NULL,'H2KJ92KD-032KD');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2017_01_03_160019_add_colum_members',2),(4,'2017_01_04_142131_create_order_detail',3),(5,'2017_01_04_142813_add_column_price_order_detail',4),(6,'2017_01_05_151614_add_column_content_service_details',5),(7,'2017_01_05_153534_add_column_price_orders',6),(8,'2017_01_07_044124_add_column_status_actives',7),(9,'2017_01_08_042238_add_table_resource',8),(10,'2017_01_08_071423_add_column_member_id_feedback',9),(11,'2017_01_08_084929_add_column_index_pic_baseinfos',10),(12,'2017_01_08_085135_alter_column_index_pic_baseinfos',11),(13,'2017_01_08_085456_add_column_index_pic_baseinfos',12),(14,'2017_01_08_085728_del_column_index_pic_baseinfos',13),(15,'2017_01_08_100517_del_column_line_house',14),(16,'2017_01_08_100522_del_column_link_house',14),(17,'2017_01_08_140233_add_column_service_id_service_detail',15),(18,'2017_01_08_145206_add_table_news_type',16),(19,'2017_01_08_150300_alter_table_news_type',17),(20,'2017_01_08_150829_alter_table_news',18);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` enum('news','notice','yuohui','cuxiao') DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (4,NULL,'购物中心大型优惠活动','<p>地点：上海市宝山区</p>\n','2017-01-08 15:20:58','2017-01-08 15:20:58',NULL,1),(5,NULL,'关于放假的最新通知','<p>通知内容：</p>\n','2017-01-08 15:21:54','2017-01-08 15:21:54',NULL,2),(6,NULL,'购物优惠多多','<p>好消息</p>\n','2017-01-08 15:22:43','2017-01-08 15:25:15',NULL,1),(7,NULL,'关于公积金的最新政策出台','<p><strong>关于公积金的最新政策出台</strong></p>\n','2017-01-08 15:23:26','2017-01-08 15:23:26',NULL,3),(8,NULL,'最新优惠大酬宾','','2017-01-08 15:24:13','2017-01-08 15:24:13',NULL,1);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_types`
--

DROP TABLE IF EXISTS `news_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `service_id` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_types`
--

LOCK TABLES `news_types` WRITE;
/*!40000 ALTER TABLE `news_types` DISABLE KEYS */;
INSERT INTO `news_types` VALUES (1,'abcd','周边优惠','2017-01-08 15:04:13','2017-01-08 15:04:13',NULL),(2,'abcd','通知','2017-01-08 15:04:30','2017-01-08 15:04:30',NULL),(3,'abcd','城中热事','2017-01-08 15:04:41','2017-01-08 15:04:41',NULL);
/*!40000 ALTER TABLE `news_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_details` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `service_detail_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `price` double(11,2) NOT NULL,
  `content` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,2,1,'2017-01-04 14:35:53','2017-01-05 15:18:00',15.00,'1桶瓶装水');
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `user_id` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL COMMENT '0未处理 1通过 2取消 ',
  `message` varchar(500) DEFAULT NULL COMMENT '备注',
  `uuid` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `price` double(11,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,'订单','11',1,'备注信息','jsi02-123kw21--2ke2','2016-12-30 00:00:00','2017-01-05 16:54:42',NULL,15.00),(3,'订单','11',0,'备注信息','jsi02-123kw21--2ke3','2016-12-30 00:00:00','2017-01-05 16:52:39',NULL,15.00);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resources`
--

DROP TABLE IF EXISTS `resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resources` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `filename` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resources`
--

LOCK TABLES `resources` WRITE;
/*!40000 ALTER TABLE `resources` DISABLE KEYS */;
INSERT INTO `resources` VALUES (1,'jwu20d-2131jdl-21132',1,'562.jpg','2017-01-08 04:39:53','2017-01-08 04:40:20'),(2,'56a3ca28d56411e6bde6a8667f2c3139',10,'2017-01-08.1483853760.823587456.jpg','2017-01-08 05:36:00','2017-01-08 05:36:00'),(3,'6aa5cc06d56411e6819ea8667f2c3139',10,'2017-01-08.1483853794.366599446.jpg','2017-01-08 05:36:34','2017-01-08 05:36:34'),(4,'daae70ecd56511e6a70ba8667f2c3139',10,'2017-01-08.1483854411.827122254.jpg','2017-01-08 05:46:51','2017-01-08 05:46:51'),(5,'ff9aaa46d56611e69c63a8667f2c3139',10,'2017-01-08.1483854903.266633920.jpg','2017-01-08 05:55:03','2017-01-08 05:55:03'),(6,'20661096d58811e6b4a5a8667f2c3139',10,'2017-01-08.1483869131.669612801.jpg','2017-01-08 09:52:11','2017-01-08 09:52:11'),(7,'5e6ff798d58911e68e85a8667f2c3139',10,'2017-01-08.1483869665.258351025.jpg','2017-01-08 10:01:05','2017-01-08 10:01:05'),(8,'df02f9bed58911e68740a8667f2c3139',10,'2017-01-08.1483869880.965983121.jpg','2017-01-08 10:04:41','2017-01-08 10:04:41');
/*!40000 ALTER TABLE `resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_details`
--

DROP TABLE IF EXISTS `service_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) NOT NULL DEFAULT ' ',
  `desc` varchar(45) DEFAULT NULL,
  `price` decimal(11,0) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `service_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_details`
--

LOCK TABLES `service_details` WRITE;
/*!40000 ALTER TABLE `service_details` DISABLE KEYS */;
INSERT INTO `service_details` VALUES (2,'pure water','','如果是购买的则不填写电话',16,'2017-01-01 11:50:44','2017-01-08 14:34:38',NULL,1),(3,'床维修','3','4',2,'2017-01-08 14:32:23','2017-01-08 14:33:25',NULL,2),(4,'洗衣服','13892837843','洗衣服',50,'2017-01-08 14:35:43','2017-01-08 14:35:43',NULL,3),(6,'照顾宝宝','','',300,'2017-01-08 14:39:04','2017-01-08 14:39:04',NULL,5),(7,'水龙头维修','1387273674','无信息',0,'2017-01-08 14:40:45','2017-01-08 14:40:45',NULL,2),(8,'pure water bigger','','',129,'2017-01-08 14:41:33','2017-01-08 14:41:33',NULL,1),(9,'pure water 500ml','','',100,'2017-01-08 14:43:33','2017-01-08 14:43:33',NULL,1),(10,'电视维修','1388888888','',0,'2017-01-08 14:44:40','2017-01-08 14:47:15',NULL,2);
/*!40000 ALTER TABLE `service_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `en_name` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'bottle of water','桶装水',NULL,NULL,'2017-01-01 11:46:53'),(2,'Maintenance Service','客房维修','2017-01-01 11:47:06',NULL,'2017-01-08 13:04:55'),(3,'Laundry & dry cleaning service','洗衣机干洗','2017-01-01 11:47:29',NULL,'2017-01-08 13:05:41'),(4,'Bed service','床品','2017-01-08 13:06:10',NULL,'2017-01-08 13:06:10'),(5,'babysitting','婴儿照看','2017-01-08 13:06:42',NULL,'2017-01-08 13:06:42');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  `token` varchar(45) CHARACTER SET utf8 DEFAULT ' ',
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'tommy','651775257@qq.com','adc03d89f7772052d6692f83630a54ce','82f6e86ad49411e69fdfa8667f2c3139',NULL,'2017-01-07 04:48:19',NULL,'2017-01-06 20:48:19');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'shama'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-20 23:30:17
