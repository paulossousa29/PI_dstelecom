
CREATE TABLE equipas(id VARCHAR(255) NOT NULL,password VARCHAR(255) NOT NULL,role INT NOT NULL,PRIMARY KEY(id));

CREATE TABLE skill(id INT GENERATED ALWAYS AS IDENTITY,id_equipa VARCHAR(255) NOT NULL,ap VARCHAR(255),CONSTRAINT fk_skill FOREIGN KEY(id_equipa) REFERENCES equipas(id),PRIMARY KEY(id));

CREATE TABLE intervencoes(id VARCHAR(255) NOT NULL,acesso VARCHAR(255) ,elemento VARCHAR(255) ,conector INT ,id_equipa VARCHAR(255) ,CONSTRAINT fk_equipa FOREIGN KEY(id_equipa) REFERENCES equipas(id), PRIMARY KEY(id));

CREATE TABLE relatorios(id INT GENERATED ALWAYS AS IDENTITY,id_intervencao VARCHAR(255) NOT NULL,passo_1 INT NOT NULL,passo_3 INT NOT NULL,passo_5 INT NOT NULL,passo_7 INT NOT NULL,passo_9 INT NOT NULL,passo_11 INT NOT NULL,passo_12  INT NOT NULL, passo_13 INT NOT NULL,observacoes VARCHAR(1000),data_inicio timestamp,data_fim timestamp, verificar INT NOT NULL, CONSTRAINT fk_equipa FOREIGN KEY(id_intervencao) REFERENCES intervencoes(id),PRIMARY KEY(id));

CREATE TABLE pedidos(id INT GENERATED ALWAYS AS IDENTITY, id_intervencao VARCHAR(255) NOT NULL, estado INT NOT NULL, descricao VARCHAR(1000), CONSTRAINT fk_equipa FOREIGN KEY(id_intervencao) REFERENCES intervencoes(id),PRIMARY KEY(id));

CREATE TABLE avaliacoes(id INT GENERATED ALWAYS AS IDENTITY, avaliacao_usabilidade INT NOT NULL, avaliacao_aspeto INT NOT NULL, avaliacao_global INT NOT NULL, PRIMARY KEY(id));

INSERT INTO relatorios (id_intervencao,passo_1 ,passo_3 ,passo_5 ,passo_7 ,passo_9 ,passo_11 ,passo_12,passo_13 ,observacoes ,data_inicio,data_fim,verificar) VALUES ('#2021041965000118_3',1,1,0,1,0,0,0,0,'nada a acrescentar','2022-01-12','2022-07-14',0);
INSERT INTO relatorios (id_intervencao,passo_1 ,passo_3 ,passo_5 ,passo_7 ,passo_9 ,passo_11 ,passo_12,passo_13 ,observacoes ,data_inicio,data_fim,verificar) VALUES ('ULO18Y',1,1,1,1,0,1,1,0,'correu tudo bem','2022-01-17','2022-07-19',1);
INSERT INTO relatorios (id_intervencao,passo_1 ,passo_3 ,passo_5 ,passo_7 ,passo_9 ,passo_11 ,passo_12,passo_13 ,observacoes ,data_inicio,data_fim,verificar) VALUES ('ULO18Y',0,0,0,0,0,0,0,0,'correu tudo bem','2022-01-17','2022-07-19',1);



INSERT INTO pedidos (id_intervencao,estado,descricao) VALUES ('ULO18Y',0,'Mudar PDO de localização');

INSERT INTO equipas (id, password, role) VALUES ('user1', 'user1', 0)




table equipas {
  id varchar [pk, not null] 
  password VARCHAR
  role INT
  
}

table skill {
  id INT [pk]
  id_equipa VARCHAR 
  ap VARCHAR
}

Ref: equipas.id < skill.id

TABLE intervencoes {
  id VARCHAR [pk]
  acesso VARCHAR
  elemento VARCHAR(255) 
  conector INT 
} 

Ref: equipas.id < intervencoes.id


table relatorios {
  id INT [pk]
  id_intervencao VARCHAR
  passo_1 INT
  passo_3 INT
  passo_5 INT
  passo_7 INT 
  passo_9 INT 
  passo_11 INT 
  passo_12  INT 
  passo_13 INT
  observacoes VARCHAR
  data_inicio timestamp
  data_fim timestamp
  verificar INT
} 

Ref: relatorios.id - intervencoes.id

table pedidos {
    id INT [pk]
    id_intervencao VARCHAR
    estado INT
    descricao VARCHAR
}

Ref: intervencoes.id < pedidos.id

table avaliacoes {
    id INT [pk]
    avaliacao_usabilidade INT 
    avaliacao_aspeto INT 
    avaliacao_global INT 
}
