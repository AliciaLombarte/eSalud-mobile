--
-- Table structure for table `DOCTORS`
--

DROP TABLE IF EXISTS `DOCTORS`;
CREATE TABLE `DOCTORS` (
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `IMAGES`
--

DROP TABLE IF EXISTS `IMAGES`;
CREATE TABLE `IMAGES` (
  `img_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `img` LONGBLOB NOT NULL,
  `file_name` varchar(45) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`img_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;


--
-- Table structure for table `PROTOCOLS`
--

DROP TABLE IF EXISTS `PROTOCOLS`;
CREATE TABLE `PROTOCOLS` (
  `protocolo` varchar(100) NOT NULL,
  `frecuencia` int(11) NOT NULL,
  PRIMARY KEY (`protocolo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `PROTOCOLS_AUX`
--

DROP TABLE IF EXISTS `PROTOCOLS_AUX`;
CREATE TABLE `PROTOCOLS_AUX` (
  `protocolo` varchar(50) DEFAULT NULL,
  `cuestionario` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `QUESTIONNAIRES`
--

DROP TABLE IF EXISTS `QUESTIONNAIRES`;
CREATE TABLE `QUESTIONNAIRES` (
  `nombre` varchar(100) NOT NULL,
  `preguntas` int(11) NOT NULL,
  PRIMARY KEY (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `PATIENT_RESULTS`
--

DROP TABLE IF EXISTS `PATIENT_RESULTS`;
CREATE TABLE `PATIENT_RESULTS` (
  `nombre` varbinary(50) NOT NULL,
  `cuestionario` varchar(50) DEFAULT NULL,
  `tipo_respuesta` varchar(50) DEFAULT NULL,
  `respuesta0` varchar(150) DEFAULT NULL,
  `respuesta1` varchar(150) DEFAULT NULL,
  `respuesta2` varchar(150) DEFAULT NULL,
  `respuesta3` varchar(150) DEFAULT NULL,
  `respuesta4` varchar(150) DEFAULT NULL,
  `respuesta5` varchar(150) DEFAULT NULL,
  `pregunta` varchar(200) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  KEY `FK_PATIENTRESULTS_QUESTIONNAIRES` (`cuestionario`),
  CONSTRAINT `FK_PATIENTRESULTS_QUESTIONNAIRES` FOREIGN KEY (`cuestionario`)
  REFERENCES `QUESTIONNAIRES` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




--
-- Table structure for table `PROTOCOLS_QUESTIONNAIRES`
--

DROP TABLE IF EXISTS `PROTOCOLS_QUESTIONNAIRES`;
CREATE TABLE `PROTOCOLS_QUESTIONNAIRES` (
  `protocol` varchar(100) NOT NULL,
  `questionnaire` varchar(100) NOT NULL,
  PRIMARY KEY (`protocol`, `questionnaire`),
  CONSTRAINT `FK__PROTOCOLS_QUESTIONNAIRES__PROTOCOLS__protocolo` FOREIGN KEY (`protocol`)
  REFERENCES `PROTOCOLS` (`protocolo`),
  CONSTRAINT `FK__PROTOCOLS_QUESTIONNAIRES__QUESTIONNAIRES__nombre` FOREIGN KEY (`questionnaire`)
  REFERENCES `QUESTIONNAIRES` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `QUESTIONS`
--

DROP TABLE IF EXISTS `QUESTIONS`;
CREATE TABLE `QUESTIONS` (
  `nombre` varchar(100) NOT NULL,
  `pregunta` varchar(100) NOT NULL,
  `tipo_respuesta` varchar(100) NOT NULL,
  `respuesta0` varchar(150) NOT NULL,
  `respuesta1` varchar(150) NOT NULL,
  `respuesta2` varchar(150) ,
  `respuesta3` varchar(150) ,
  `respuesta4` varchar(150) ,
  `respuesta5` varchar(150) ,
  PRIMARY KEY (`nombre`,`pregunta`),
  CONSTRAINT `FK_QUESTIONS_QUESTIONNAIRES` FOREIGN KEY (`nombre`) REFERENCES `QUESTIONNAIRES` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `USERS`
--

DROP TABLE IF EXISTS `USERS`;
CREATE TABLE `USERS` (
  `nombre` varbinary(50) NOT NULL,
  `apellido1` varchar(50) NOT NULL,
  `apellido2` varchar(50) DEFAULT NULL,
  `edad` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varbinary(50) NOT NULL,
  `pass` varbinary(50) NOT NULL,
  `doctorEmail` varchar(50) NOT NULL,
  PRIMARY KEY (`email`),
  KEY `FK_USERS_DOCTORS` (`doctorEmail`),
  CONSTRAINT `FK_USERS_DOCTORS` FOREIGN KEY (`doctorEmail`) REFERENCES `DOCTORS` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `PROTOCOLS_USERS`
--

DROP TABLE IF EXISTS `PROTOCOLS_USERS`;
CREATE TABLE `PROTOCOLS_USERS` (
  `nombre` varchar(100) NOT NULL,
  `emailUser` varbinary(100) NOT NULL,
  PRIMARY KEY (`nombre`,`emailUser`),
  KEY `FK_PROTOCOLS_USERS` (`emailUser`),
  CONSTRAINT `FK_PROTOCOLS_PROTOCOLS_USERS` FOREIGN KEY (`nombre`) REFERENCES `PROTOCOLS` (`protocolo`),
  CONSTRAINT `FK_PROTOCOLS_USERS` FOREIGN KEY (`emailUser`) REFERENCES `USERS` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `QUESTIONNAIRE_RESPONSE`
--

DROP TABLE IF EXISTS `QUESTIONNAIRE_RESPONSE`;
CREATE TABLE `QUESTIONNAIRE_RESPONSE` (
`responseId` int unsigned NOT NULL AUTO_INCREMENT,
`emailUser` varbinary(100) NOT NULL,
`questionnaire` varchar(100) NOT NULL,
`date` date NOT NULL,
`score` int NOT NULL,
`result` varchar(100) NOT NULL,
  PRIMARY KEY (`responseId`, `emailUser`, `questionnaire`),
  CONSTRAINT `FK__QUESTIONNAIRE_RESPONSE__USERS__email` FOREIGN KEY (`emailUser`)
  REFERENCES `USERS` (`email`),
  CONSTRAINT `FK__QUESTIONNAIRE_RESPONSE__QUESTIONNAIRES__nombre` FOREIGN KEY (`questionnaire`)
  REFERENCES `QUESTIONNAIRES` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `WOUNDTRACKS`
--

DROP TABLE IF EXISTS `WOUNDTRACKS`;
CREATE TABLE `WOUNDTRACKS` (
  `fecha` date NOT NULL,
  `dolorPierna` int(11) NOT NULL,
  `dolorEspalda` int(11) NOT NULL,
  `temperatura` double NOT NULL,
  `emailUser` varbinary(50) NOT NULL,
  `resultado` int unsigned DEFAULT NULL,
  `img` int(10) unsigned NOT NULL,
  PRIMARY KEY (`fecha`,`emailUser`),
  KEY `FK_WOUNDTRACKS_USERS` (`emailUser`),
  KEY `FK_IMAGES_WOUNDTRACKS` (`img`),
  CONSTRAINT `FK_IMAGES_WOUNDTRACKS` FOREIGN KEY (`img`) REFERENCES `IMAGES` (`img_id`),
  CONSTRAINT `FK_WOUNDTRACKS_USERS` FOREIGN KEY (`emailUser`) REFERENCES `USERS` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
