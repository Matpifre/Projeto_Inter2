-- Esse script vale para o MySQL 8.x. Se seu MySQL for 5.x, precisa executar essa linha comentada:
-- CREATE DATABASE IF NOT EXISTS biblioteca;
CREATE DATABASE IF NOT EXISTS limpeza DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE limpeza;

CREATE TABLE pedido (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(50) NOT NULL,
  telefone varchar(50) NOT NULL,
  endereco varchar(50) NOT NULL,
  complemento varchar(50) NOT NULL,
  garrafas int NOT NULL,
  data datetime NOT NULL,
  plano varchar(50) NOT NULL,
  PRIMARY KEY (id)
);
