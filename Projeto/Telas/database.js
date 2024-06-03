import { Component } from "react";
import { Text, View,TextInput } from "react-native";
import {estilos} from '../Styles/estilos'
import * as SQLite from 'expo-sqlite';
export function createTables() {
    const db =  SQLite.openDatabaseSync('gymgo1');
    db.execAsync(`
    PRAGMA journal_mode = WAL;
      CREATE TABLE grupoMuscular(
        idGrupoMuscular INTEGER PRIMARY KEY NOT NULL,
        nomeGrupoMuscular TEXT
      );
    
      CREATE TABLE exercicio(
        idExercicio INTEGER PRIMARY KEY NOT NULL,
        idGrupoMuscular INTEGER,
        nome TEXT NOT NULL,
        linkPreview TEXT,
        FOREIGN KEY (idGrupoMuscular) REFERENCES grupoMuscular (idGrupoMuscular)
      );
        

`);}

export function insertValues() {
    const db =  SQLite.openDatabaseSync('gymgo1');
    db.execAsync(`
    INSERT INTO grupoMuscular(nomegrupomuscular) values ('Costas');

    INSERT INTO exercicio(idgrupomuscular, nome, linkpreview) values (1, 'Remada', 'https://gymvisual.com/img/p/1/0/6/1/7/10617.gif');
    INSERT INTO exercicio(idgrupomuscular, nome, linkpreview) values (1, 'Puxador', 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif');
`);}

export function dropTable() {
    const db =  SQLite.openDatabaseSync('gymgo1');
    db.execAsync(`
    DROP TABLE grupoMuscular;
    DROP TABLE exercicio;
`);}

export function getValues() {
    const db =  SQLite.openDatabaseSync('gymgo1');
    const allRows = db.getAllSync('SELECT * FROM exercicio');

    for (const row of allRows) {
        console.log(row.nome, row.idexercicio, row.idgrupomuscular,  row.linkpreview);
}
    }

