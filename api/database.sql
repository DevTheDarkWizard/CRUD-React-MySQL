drop database if exists crud_react;
create database if not exists crud_react;

use crud_react;

create table if not exists usuario (
	id int primary key auto_increment,
    nome varchar(255) not null,
    email varchar(255) not null unique,
    fone varchar(45) not null,
    data_nascimento date not null
) Engine = InnoDB, auto_increment = 1;