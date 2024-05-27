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
    const DATABASE_VERSION = 3;

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
      console.log('Banco de Dados sendo atualizado para v2');
      const result = await db.execAsync(`
  `);
      console.log(result);
      await db.runAsync('INSERT INTO grupoMuscular (nomegrupomuscular) VALUES (?)','Costas');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome, linkpreview) VALUES (?, ?, ?)', 1,'Remada', 'https://gymvisual.com/img/p/1/0/6/1/7/10617.gif');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome, linkpreview) VALUES (?, ?, ?)', 1,'Puxador', 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif');
      currentDbVersion = 2;
     }
     if (currentDbVersion === 2) {
      console.log('Banco de Dados sendo atualizado para v3');
      const result = await db.execAsync(`
      PRAGMA journal_mode = 'wal';
        CREATE TABLE treino(
        idTreino INTEGER PRIMARY KEY NOT NULL,
        idTreinoTemplate INTEGER,
        nome TEXT,
        dataTreino date,
          
        FOREIGN KEY (idTreinoTemplate)
        REFERENCES treinoTemplate(idTreinoTemplate)
        );
        
        CREATE TABLE serie(
        idSerie INTEGER PRIMARY KEY NOT NULL,
        idExercicio INTEGER,
        carga NUMBER,
        reps INTEGER,
        idTreino INTEGER,
          
        FOREIGN KEY (idExercicio)
        REFERENCES exercicio(idExercicio),
          
        FOREIGN KEY (idTreino)
        REFERENCES treino(idTreino)
        );
  `);
      console.log(result);
        await db.runAsync('INSERT INTO grupoMuscular (nomegrupomuscular) VALUES (?)','Bíceps');
        await db.runAsync('INSERT INTO grupoMuscular (nomegrupomuscular) VALUES (?)','Ombros');
        await db.runAsync('INSERT INTO grupoMuscular (nomegrupomuscular) VALUES (?)','Peito');
        await db.runAsync('INSERT INTO grupoMuscular (nomegrupomuscular) VALUES (?)','Pernas');
        
      // Exercícios para Costas
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 1, 'Levantamento Terra');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 1, 'Remada Unilateral com Halter');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 1, 'Pulldown na Polia Alta');

      // Exercícios para Bíceps
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 2, 'Rosca com Barra no Banco Inclinado');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 2, 'Rosca Alternada com Halteres');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 2, 'Martelo com Halteres');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 2, 'Rosca Scott');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 2, 'Rosca Concentrada');

      // Exercícios para Ombros
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 3, 'Desenvolvimento com Barra ou Halteres');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 3, 'Elevações Laterais com Halteres');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 3, 'Elevações Frontais com Halteres');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 3, 'Desenvolvimento Arnold');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 3, 'Remada Alta');

      // Exercícios para Peito
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 4, 'Supino Inclinado com Barra ou Halteres');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 4, 'Crucifixo');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 4, 'Supino Reto com Barra ou Halteres');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 4, 'Flexão de Braço');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 4, 'Flyes com Halteres ou Máquina');

      // Exercícios para Pernas
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 5, 'Agachamento Livre (Squat)');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 5, 'Leg Press');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 5, 'Afundo');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 5, 'Cadeira Extensora');
      await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)', 5, 'Cadeira Flexora');
      currentDbVersion = 3;
     }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }
  


  export const addExercicio = async (db: SQLiteDatabase, 
    idGrupoMuscular: number, 
    nome: string, 
    linkPreview: string) =>{
    await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome, linkpreview) VALUES (?, ?, ?)', idGrupoMuscular, nome, linkPreview);
  }

  export const saveTreinoVazio = async (db: SQLiteDatabase, 
    datatreino: string, ) =>{
    await db.runAsync('INSERT INTO treino(dataTreino) VALUES (?)', datatreino);
  }
  
  
  export const saveSerie = async (db: SQLiteDatabase, 
    idExercicio: number, 
    carga: number, 
    reps: number) =>{
    const idTreino:number = await db.getFirstAsync('SELECT idtreino FROM treino ORDER BY dataTreino DESC');  
    await db.runAsync('INSERT INTO serie(idExercicio, carga, reps, idTreino) VALUES (?, ?, ?, ?)', idExercicio, carga, reps, idTreino);
  }


  export const getExercicios = async (db: SQLiteDatabase) => {
    return await db.getAllAsync<Exercicio>('SELECT * FROM exercicio');
  };
  export const getSeries = async (db: SQLiteDatabase) => {
    return await db.getFirstAsync('SELECT * FROM serie');  
  };
  

