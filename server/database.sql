
CREATE TABLE equipas(id VARCHAR(255) NOT NULL,password VARCHAR(255) NOT NULL,role INT NOT NULL,PRIMARY KEY(id));

CREATE TABLE skill(id INT GENERATED ALWAYS AS IDENTITY,id_equipa VARCHAR(255) NOT NULL,ap VARCHAR(255),CONSTRAINT fk_skill FOREIGN KEY(id_equipa) REFERENCES equipas(id),PRIMARY KEY(id));

CREATE TABLE intervencoes(id VARCHAR(255) NOT NULL,acesso VARCHAR(255) ,elemento VARCHAR(255) ,conector INT ,id_equipa VARCHAR(255) ,CONSTRAINT fk_equipa FOREIGN KEY(id_equipa) REFERENCES equipas(id), PRIMARY KEY(id));

CREATE TABLE relatorios(id INT GENERATED ALWAYS AS IDENTITY,id_intervencao VARCHAR(255) NOT NULL,passo_1 INT NOT NULL,passo_3 INT NOT NULL,passo_5 INT NOT NULL,passo_7 INT NOT NULL,passo_9 INT NOT NULL,passo_11 INT NOT NULL,passo_13 INT NOT NULL,observacoes VARCHAR(1000),data_inicio timestamp,data_fim timestamp, CONSTRAINT fk_equipa FOREIGN KEY(id_intervencao) REFERENCES intervencoes(id),PRIMARY KEY(id));

CREATE TABLE pedidos(id INT GENERATED ALWAYS AS IDENTITY, id_intervencao VARCHAR(255) NOT NULL, estado INT NOT NULL, descricao VARCHAR(1000), CONSTRAINT fk_equipa FOREIGN KEY(id_intervencao) REFERENCES intervencoes(id),PRIMARY KEY(id));

CREATE TABLE avaliacoes(id INT GENERATED ALWAYS AS IDENTITY, avaliacao_usabilidade INT NOT NULL, avaliacao_aspeto INT NOT NULL, avaliacao_global INT NOT NULL, PRIMARY KEY(id));

INSERT INTO relatorios (id_intervencao,passo_1 ,passo_3 ,passo_5 ,passo_7 ,passo_9 ,passo_11 ,passo_12,passo_13 ,observacoes ,data_inicio,data_fim) VALUES ('#2021041965000118_3',1,1,0,1,0,0,1,0,'nada a acrescentar','2022-01-12','2022-07-14');
INSERT INTO relatorios (id_intervencao,passo_1 ,passo_3 ,passo_5 ,passo_7 ,passo_9 ,passo_11 ,passo_12,passo_13 ,observacoes ,data_inicio,data_fim) VALUES ('ULO18Y',1,1,1,1,0,1,1,0,'correu tudo bem','2022-01-17','2022-07-19');



INSERT INTO relatorios (id_intervencao,passo_1 ,passo_3 ,passo_5 ,passo_7 ,passo_9 ,passo_11 ,passo_12,passo_13 ,observacoes ,data_inicio,data_fim) VALUES ('ULO18Y',0,1,0,1,1,1,1,1,'tudo bem','2022-01-17','2022-07-22');


INSERT INTO relatorios (id_intervencao,passo_1 ,passo_3 ,passo_5 ,passo_7 ,passo_9 ,passo_11 ,passo_12,passo_13 ,observacoes ,data_inicio,data_fim) VALUES ('#2021041965000118_4',1,0,0,0,1,0,1,1,'mais um','2022-01-17','2022-08-22');
INSERT INTO relatorios (id_intervencao,passo_1 ,passo_3 ,passo_5 ,passo_7 ,passo_9 ,passo_11 ,passo_12,passo_13 ,observacoes ,data_inicio,data_fim) VALUES ('TESTE',0,0,0,0,0,0,0,0,'sem erros','2022-01-17','2022-01-22');
INSERT INTO relatorios (id_intervencao,passo_1 ,passo_3 ,passo_5 ,passo_7 ,passo_9 ,passo_11 ,passo_12,passo_13 ,observacoes ,data_inicio,data_fim) VALUES ('TESTE',0,0,0,0,0,0,0,0,'sem erros','2022-01-17','2022-01-22');
INSERT INTO relatorios (id_intervencao,passo_1 ,passo_3 ,passo_5 ,passo_7 ,passo_9 ,passo_11 ,passo_12,passo_13 ,observacoes ,data_inicio,data_fim) VALUES ('TESTE',0,1,0,0,0,0,0,0,'tem um erro','2022-01-17','2022-01-22');


INSERT INTO intervencoes(id, acesso, elemento, conector, id_equipa) VALUES ('TESTE', 'FTTH_DST_00231064', 'S25/R03/PLDP/2024', 3,'CGO0046')
INSERT INTO intervencoes(id, acesso, elemento, conector, id_equipa) VALUES ('TESTE2', 'FTTH_DST_00231064', 'S25/R03/PLDP/2024', 3,'CGO0046')
INSERT INTO intervencoes(id, acesso, elemento, conector, id_equipa) VALUES ('TESTE3', 'FTTH_DST_00231064', 'S25/R03/PLDP/2024', 3,'CGO0050')
INSERT INTO intervencoes(id, acesso, elemento, conector, id_equipa) VALUES ('TESTE4', 'FTTH_DST_00231064', 'S25/R03/PLDP/2024', 3,'CGO0057')



INSERT INTO relatorios (id_intervencao,passo_1 ,passo_3 ,passo_5 ,passo_7 ,passo_9 ,passo_11 ,passo_12,passo_13 ,observacoes ,data_inicio,data_fim) VALUES ('TESTE3',0,1,0,0,0,1,0,0,'tem dois erro','2022-01-17','2022-01-28');
INSERT INTO relatorios (id_intervencao,passo_1 ,passo_3 ,passo_5 ,passo_7 ,passo_9 ,passo_11 ,passo_12,passo_13 ,observacoes ,data_inicio,data_fim) VALUES ('TESTE4',0,1,1,1,0,0,0,0,'tem três erro','2022-01-17','2022-01-27');


INSERT INTO pedidos (id_intervencao,estado,descricao) VALUES ('ULO18Y',0,'Mudar PDO de localização');

INSERT INTO equipas (id, password, role) VALUES ('user1', 'user1', 0)