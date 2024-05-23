import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

interface Exercicio {
  idExercicio: number;
  idGrupoMuscular: number;
  nome: string;
  linkPreview: string;
}

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
    console.log(FileSystem.documentDirectory);
    const DATABASE_VERSION = 2;

    let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
      'PRAGMA user_version'
    );
  
    if (currentDbVersion >= DATABASE_VERSION) {
      console.log('O BANCO ESTÀ ATUALIZADO!');
      return;
    }

    if (currentDbVersion === 0) {
      console.log('Está prestes a criar o db');
      const result = await db.execAsync(`
      PRAGMA journal_mode = 'wal';
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
  `);
      console.log(result);
      currentDbVersion = 1;
    }
     if (currentDbVersion === 1) {
      console.log('Banco de Dados sendo atualizado para v1');
      const result = await db.execAsync(`
  `);
      console.log(result);
      await db.runAsync('INSERT INTO grupoMuscular (nomegrupomuscular) VALUES (?)','Costas');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome, linkpreview) VALUES (?, ?, ?)', 1,'Remada', 'https://gymvisual.com/img/p/1/0/6/1/7/10617.gif');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome, linkpreview) VALUES (?, ?, ?)', 1,'Puxador', 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif');
      currentDbVersion = 2;
     }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }
  


  export const addExercicio = async (db: SQLiteDatabase, 
    idGrupoMuscular: number, 
    nome: string, 
    linkPreview: string) =>{
    await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome, linkpreview) VALUES (?, ?, ?)', idGrupoMuscular, nome, linkPreview);
  }


  export const getExercicios = async (db: SQLiteDatabase) => {
    return await db.getAllAsync<Exercicio>('SELECT * FROM exercicio');
  };
  

