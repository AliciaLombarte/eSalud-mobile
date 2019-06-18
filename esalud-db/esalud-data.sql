		
INSERT INTO DOCTORS (nombre, apellido, email, pass) VALUES ("Juan", "García", "juan@gmail.com", "juan");

INSERT INTO USERS (nombre, apellido1, apellido2, edad, username, email, pass, doctorEmail) 
VALUES (AES_ENCRYPT('John',UNHEX('F3229A0B371ED2D9441B830D21A390C3')), "Doe", "Foo", 21, "alexperez11", AES_ENCRYPT('alex@gmail.com',UNHEX('F3229A0B371ED2D9441B830D21A390C3')), AES_ENCRYPT('alex',UNHEX('F3229A0B371ED2D9441B830D21A390C3')), "juan@gmail.com");

INSERT INTO USERS (nombre, apellido1, apellido2, edad, username, email, pass, doctorEmail) 
VALUES (AES_ENCRYPT('Alicia',UNHEX('F3229A0B371ED2D9441B830D21A390C3')), "Lombarte", "García", 20, "alombarte", AES_ENCRYPT('alicia@gmail.com',UNHEX('F3229A0B371ED2D9441B830D21A390C3')), AES_ENCRYPT('alicia',UNHEX('F3229A0B371ED2D9441B830D21A390C3')), "juan@gmail.com");

INSERT INTO USERS (nombre, apellido1, apellido2, edad, username, email, pass, doctorEmail) 
VALUES (AES_ENCRYPT('David',UNHEX('F3229A0B371ED2D9441B830D21A390C3')), "Rubio", "Ramos", 30, "davidRR", AES_ENCRYPT('a',UNHEX('F3229A0B371ED2D9441B830D21A390C3')), AES_ENCRYPT('a',UNHEX('F3229A0B371ED2D9441B830D21A390C3')), "juan@gmail.com");

INSERT INTO USERS (nombre, apellido1, apellido2, edad, username, email, pass, doctorEmail) 
VALUES (AES_ENCRYPT('Ana',UNHEX('F3229A0B371ED2D9441B830D21A390C3')), "León", "Calvo", 30, "davidRR", AES_ENCRYPT('ana',UNHEX('F3229A0B371ED2D9441B830D21A390C3')), AES_ENCRYPT('a',UNHEX('F3229A0B371ED2D9441B830D21A390C3')), "juan@gmail.com");


INSERT INTO QUESTIONNAIRES (nombre, preguntas) VALUES ("Oswestry", 10);
INSERT INTO QUESTIONNAIRES (nombre, preguntas) VALUES ("Pittsburgh", 2);
INSERT INTO QUESTIONNAIRES (nombre, preguntas) VALUES ("WOMAC", 3);

INSERT INTO PROTOCOLS (protocolo, frecuencia) VALUES ("Operación rodilla", 1);
INSERT INTO PROTOCOLS (protocolo, frecuencia) VALUES ("Operación espalda", 3);
INSERT INTO PROTOCOLS (protocolo, frecuencia) VALUES ("Operación cadera", 3);
INSERT INTO PROTOCOLS (protocolo, frecuencia) VALUES ("Operación hombro", 4);

INSERT INTO PROTOCOLS_QUESTIONNAIRES (protocol, questionnaire) VALUES ("Operación rodilla", "Oswestry");
INSERT INTO PROTOCOLS_QUESTIONNAIRES (protocol, questionnaire) VALUES ("Operación rodilla", "WOMAC");
INSERT INTO PROTOCOLS_QUESTIONNAIRES (protocol, questionnaire) VALUES ("Operación espalda", "Oswestry");
INSERT INTO PROTOCOLS_QUESTIONNAIRES (protocol, questionnaire) VALUES ("Operación espalda", "Pittsburgh");
INSERT INTO PROTOCOLS_QUESTIONNAIRES (protocol, questionnaire) VALUES ("Operación cadera", "Oswestry");
INSERT INTO PROTOCOLS_QUESTIONNAIRES (protocol, questionnaire) VALUES ("Operación cadera", "Pittsburgh");
INSERT INTO PROTOCOLS_QUESTIONNAIRES (protocol, questionnaire) VALUES ("Operación hombro", "Oswestry");

INSERT INTO PROTOCOLS_USERS (nombre, emailUser) VALUES ("Operación rodilla", AES_ENCRYPT('alicia@gmail.com',UNHEX('F3229A0B371ED2D9441B830D21A390C3')));
INSERT INTO PROTOCOLS_USERS (nombre, emailUser) VALUES ("Operación espalda", AES_ENCRYPT('alicia@gmail.com',UNHEX('F3229A0B371ED2D9441B830D21A390C3')));
INSERT INTO PROTOCOLS_USERS (nombre, emailUser) VALUES ("Operación espalda", AES_ENCRYPT('a',UNHEX('F3229A0B371ED2D9441B830D21A390C3')));


INSERT INTO QUESTIONS (nombre, pregunta, tipo_respuesta, respuesta0, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5) 
VALUES ("Pittsburgh", "Viajar", "a" ,"r1 - cuestionario2 - p1","r2 - cuestionario2 - p1", "r3 - cuestionario2 - p1",
	"r4 - cuestionario2 - p1", "r5 - cuestionario2 - p1", "r6 - cuestionario2 - p1");

INSERT INTO QUESTIONS (nombre, pregunta, tipo_respuesta, respuesta0, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5) 
VALUES ("Pittsburgh", "Estar sentado", "a" ,"r1 - cuestionario2 - p2","r2 - cuestionario2 - p2", "r3 - cuestionario2 - p2",
	"r4 - cuestionario2 - p2", "r5 - cuestionario2 - p2", "r6 - cuestionario2 - p2");

INSERT INTO QUESTIONS (nombre, pregunta, tipo_respuesta, respuesta0, respuesta1) 
VALUES ("WOMAC", "Viajar", "a" ,"r1 - cuestionario3 - p1","r2 - cuestionario3 - p1");

INSERT INTO QUESTIONS (nombre, pregunta, tipo_respuesta, respuesta0, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5) 
VALUES ("WOMAC", "Estar sentado", "a" ,"r1 - cuestionario3 - p2","r2 - cuestionario3 - p2", "r3 - cuestionario3 - p2",
	"r4 - cuestionario3 - p2", "r5 - cuestionario3 - p2", "r6 - cuestionario3 - p2");

INSERT INTO QUESTIONS (nombre, pregunta, tipo_respuesta, respuesta0, respuesta1, respuesta2, respuesta3) 
VALUES ("WOMAC", "Caminar", "a" ,"r1 - cuestionario3 - p3","r2 - cuestionario3 - p3", "r3 - cuestionario3 - p3",
	"r4 - cuestionario3 - p3");

INSERT INTO QUESTIONS (nombre, pregunta, tipo_respuesta, respuesta0, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5) 
VALUES ("Oswestry", "Viajar", "a" ,"Puedo viajar a cualquier sitio sin que me aumente el dolor",
"Puedo viajar a cualquier sitio, pero me aumenta el dolor", 
"El dolor me impide estar sentado más de una hora",
"El dolor me impide estar sentado más de media hora",
"El dolor me limita a viajes cortos y necesarios de menos de media hora", 
"El dolor me impide viajar excepto para ir al médico o al hospital");

INSERT INTO QUESTIONS (nombre, pregunta, tipo_respuesta, respuesta0, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5) 
VALUES ("Oswestry", "Estar sentado", "a" ,"Puedo estar sentado en cualquier tipo de silla todo el tiempo que quiera",
"Puedo estar sentado en mi silla favorita todo el tiempo que quiera", 
"El dolor es fuerte pero aguanto viajes de más de 2 horas",
"El dolor me limita a viajes de menos de una hora",
"El dolor me impide estar sentado más de 10 minutos", 
"El dolor me impide estar sentado");

INSERT INTO QUESTIONS (nombre, pregunta, tipo_respuesta, respuesta0, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5) 
VALUES ("Oswestry", "Vida social","a" , "Mi vida social es normal y no me aumenta el dolor",
"Mi vida social es normal pero me aumenta el dolor", 
"El dolor no tiene no tiene un efecto importante en mi vida social, pero si impide mis actividades más enérgicas como bailar, etc.",
"El dolor ha limitado mi vida social y no salgo tan a menudo",
"El dolor ha limitado mi vida social al hogar", 
"No tengo vida social a causa del dolor");

INSERT INTO QUESTIONS (nombre, pregunta, tipo_respuesta, respuesta0, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5) 
VALUES ("Oswestry", "Andar", "a" ,"El dolor no me impide andar",
"El dolor me impide andar más de un kilómetro", 
"El dolor me impide andar más de 500 metros",
"El dolor me impide andar más de 250 metros",
"Sólo puedo andar con bastón o muletas", 
"Permanezco en la cama casi todo el tiempo y tengo que ir a rastras al baño");

INSERT INTO QUESTIONS (nombre, pregunta, tipo_respuesta, respuesta0, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5) 
VALUES ("Oswestry", "Actividad sexual","a" , "Mi actividad sexual es normal y no me aumenta el dolor",
"Mi actividad sexual es normal pero me aumenta el dolor", 
"Mi actividad sexual es casi normal pero me aumenta mucho el dolor",
"Mi actividad sexual se ha visto muy limitada a causa del dolor",
"Mi actividad sexual es casi nula a causa del dolor", 
"El dolor me impide todo tipo de actividad sexual");

INSERT INTO QUESTIONS (nombre, pregunta, tipo_respuesta, respuesta0, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5) 
VALUES ("Oswestry", "Levantar peso","a" , "Puedo levantar objetos pesados sin que me aumente el dolor",
"Puedo levantar objetos pesados pero me aumenta el dolor", 
"El dolor me impide levantar objetos pesados del suelo, pero puedo hacerlo si están en un sitio cómodo (ej. en una mesa)",
"El dolor me impide levantar objetos pesados, pero sí puedo levantar objetos ligeros o medianos si están en un sitio cómodo",
"Sólo puedo levantar objetos muy ligeros", 
"No puedo levantar ni elevar ningún objeto");

INSERT INTO QUESTIONS (nombre, pregunta, tipo_respuesta, respuesta0, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5) 
VALUES ("Oswestry", "Dormir","a" , "El dolor no me impide dormir bien",
"Sólo puedo dormir si tomo pastillas", 
"Incluso tomando pastillas duermo menos de 6 horas",
"Incluso tomando pastillas duermo menos de 4 horas",
"Incluso tomando pastillas duermo menos de 2 horas", 
"El dolor me impide totalmente dormir");

INSERT INTO QUESTIONS (nombre, pregunta, tipo_respuesta, respuesta0, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5) 
VALUES ("Oswestry", "Cuidados personales","a" , "Me las puedo arreglar solo sin que me aumente el dolor", 
"Me las puedo arreglar solo pero esto me aumenta el dolor", "Lavarme, vestirme, etc, me produce dolor y tengo que hacerlo despacio y con cuidado",
"Necesito alguna ayuda pero consigo hacer la mayoría de las cosas yo solo", 
"Necesito ayuda para hacer la mayoría de las cosas", "No puedo vestirme, me cuesta lavarme y suelo quedarme en la cama");

INSERT INTO QUESTIONS (nombre, pregunta, tipo_respuesta, respuesta0, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5) 
VALUES ("Oswestry", "Estar de pie", "a" ,"Puedo estar de pie tanto tiempo como quiera sin que me aumente el dolor", 
"Puedo estar de pie tanto tiempo como quiera pero me aumenta el dolor", "El dolor me impide estar de pie más de una hora", 
"El dolor me impide estar de pie más de media hora", "El dolor me impide estar de pie más de 10 minutos",
"El dolor me impide estar de pie");

INSERT INTO QUESTIONS (nombre, pregunta, tipo_respuesta, respuesta0, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5) 
VALUES ("Oswestry", "Intensidad del dolor", "a" ,"Puedo soportar el dolor sin necesidad de tomar calmantes", 
"El dolor es fuerte pero me arreglo sin tomar calmantes", "Los calmantes me alivian completamente el dolor", 
"Los calmantes me alivian un poco el dolor", "Los calmantes apenas me alivian el dolor",
"Los calmantes no me alivian el dolor y no los tomo");
