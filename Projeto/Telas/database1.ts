import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

interface Exercicio {
  idExercicio: number;
  idGrupoMuscular: number;
  nome: string;
  linkPreview: string;
}
interface Treino {
  idSerie: number;
  idTreino:number;
  idTreinoTemplate: number ;
  treinonome : string;
  exercicionome : string;
  dataTreino : string;
  kg: number;
  repetitions: number;
}
interface Serie{
  idTreino:number;
  idSerie: number;
  reps: number;
  carga: number;
}
interface TreinoTemplate{
  idTreinoTemplate: number;
  treinonome: string;
  exercicionome: string;
  qntSeries: number;
  idexercicio: number;
}
interface Informacoes{
  id : number;
  Peso: number;
  CircunferenciaCintura: number;
  CircunferenciaQuadril: number;
  CircunferenciaAbdomen: number;
  CircunferenciaBracoEsqRelax: number;
  CircunferenciaBracoDirRelax: number;
  CircunferenciaBracoEsqContraido: number;
  CircunferenciaBracoDirContraido: number;
  CircunferenciaCoxaEsq: number;
  CircunferenciaCoxaDir: number;
  CircunferenciaPanturrilhaEsq: number;
  CircunferenciaPanturrilhaDir: number;
  Data : string;
}

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
    console.log(FileSystem.documentDirectory);
    const DATABASE_VERSION = 6;

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
     if (currentDbVersion === 3) {
      console.log('Banco de Dados sendo atualizado para v4');
      const result = await db.execAsync(`

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
      currentDbVersion = 4;
     }
     if (currentDbVersion === 4) {
      console.log('Banco de Dados sendo atualizado para v5');
      const result = await db.execAsync(`
      CREATE TABLE treinoTemplate(
        idTreinoTemplate INTEGER PRIMARY KEY NOT NULL,
        nome TEXT  
    );
    
    CREATE TABLE serieTemplate(
        idSerieTemplate INTEGER PRIMARY KEY NOT NULL,
        
        idExercicio INTEGER,
        
        idTreinoTemplate INTEGER,
        
        qntSeries INTEGER,
          
        FOREIGN KEY (idTreinoTemplate)
        REFERENCES treinoTemplate(idTreinoTemplate),

        FOREIGN KEY (idExercicio)
        REFERENCES exercicio(idExercicio)
        );
  `);
      currentDbVersion = 5;
     }
     if (currentDbVersion === 5) {
      console.log('Banco de Dados sendo atualizado para v6');
      const result = await db.execAsync(`
      CREATE TABLE Usuario (
        id INTEGER PRIMARY KEY NOT NULL,
        Peso NUMBER,
        CircunferenciaCintura NUMBER,
        CircunferenciaQuadril NUMBER,
        CircunferenciaAbdomen NUMBER,
        CircunferenciaBracoEsqRelax NUMBER,
        CircunferenciaBracoDirRelax NUMBER,
        CircunferenciaBracoEsqContraido NUMBER,
        CircunferenciaBracoDirContraido NUMBER,
        CircunferenciaCoxaEsq NUMBER,
        CircunferenciaCoxaDir NUMBER,
        CircunferenciaPanturrilhaEsq NUMBER,
        CircunferenciaPanturrilhaDir NUMBER,
        Data DATE NOT NULL
    );
  `);
      currentDbVersion = 6;
     }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }
  


  export const addExercicio = async (db: SQLiteDatabase, 
    idGrupoMuscular: number, 
    nome: string, 
    linkPreview: string) =>{
    await db.runAsync('INSERT INTO exercicio (idgrupomuscular, nome, linkpreview) VALUES (?, ?, ?)', idGrupoMuscular, nome, linkPreview);
  }

  export const saveTreinoVazio =(db: SQLiteDatabase, 
    datatreino: string, 
    nome: string,
  ) =>{
    db.runSync('INSERT INTO treino(dataTreino, nome) VALUES (?, ?)', datatreino, nome);
  }

  export const saveTreinoTemplate = (db: SQLiteDatabase, 
    nome: string, ) =>{
    db.runSync('INSERT INTO treinotemplate(nome) VALUES (?)', nome);
  }

  export const saveSerieTemplate = (db: SQLiteDatabase, 
    idExercicio: number, 
    qntSeries: number,
    idtreinotemplate: number,
  ) =>{
    const idtreino = db.getAllSync<{idTreinoTemplate:number}>('SELECT idTreinoTemplate FROM treinoTemplate ORDER BY idTreinoTemplate DESC LIMIT 1');
    db.runSync('INSERT INTO serieTemplate(idExercicio, idTreinoTemplate, qntSeries) VALUES (?, ?, ?)', idExercicio,  idtreino[0].idTreinoTemplate, qntSeries);
  }

  export const saveExercicio =  (db: SQLiteDatabase,
    idgrupomuscular: number,
    nome: string
  ) => {
    const result = db.runSync('INSERT INTO exercicio (idgrupomuscular, nome) VALUES (?, ?)' , idgrupomuscular, nome);    
  };
  
  export const saveSerie = (db: SQLiteDatabase, 
    idExercicio: number, 
    carga: number, 
    reps: number) =>{
      const idtreino = db.getAllSync<{idTreino:number}>('SELECT idTreino FROM treino ORDER BY idTreino DESC LIMIT 1');
      console.log(idtreino);
      db.runSync('INSERT INTO serie(idExercicio, carga, reps, idTreino) VALUES (?, ?, ?, ?)', idExercicio, carga, reps, idtreino[0].idTreino);
  }
  export const saveInformacoes = (db: SQLiteDatabase, 
    Peso: number,
    CircunferenciaCintura: number,
    CircunferenciaQuadril: number,
    CircunferenciaAbdomen: number,
    CircunferenciaBracoEsqRelax: number,
    CircunferenciaBracoDirRelax: number,
    CircunferenciaBracoEsqContraido: number,
    CircunferenciaBracoDirContraido: number,
    CircunferenciaCoxaEsq: number,
    CircunferenciaCoxaDir: number,
    CircunferenciaPanturrilhaEsq: number,
    CircunferenciaPanturrilhaDir: number,
    Data : string,) =>{
      
      
      db.runSync(`INSERT INTO Usuario (
        Peso, CircunferenciaCintura, CircunferenciaQuadril, 
        CircunferenciaAbdomen, CircunferenciaBracoEsqRelax, 
        CircunferenciaBracoDirRelax, CircunferenciaBracoEsqContraido, 
        CircunferenciaBracoDirContraido, CircunferenciaCoxaEsq, 
        CircunferenciaCoxaDir, CircunferenciaPanturrilhaEsq, 
        CircunferenciaPanturrilhaDir, Data) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, Peso,
        CircunferenciaCintura,
        CircunferenciaQuadril,
        CircunferenciaAbdomen,
        CircunferenciaBracoEsqRelax,
        CircunferenciaBracoDirRelax,
        CircunferenciaBracoEsqContraido,
        CircunferenciaBracoDirContraido,
        CircunferenciaCoxaEsq,
        CircunferenciaCoxaDir,
        CircunferenciaPanturrilhaEsq,
        CircunferenciaPanturrilhaDir,
        Data);
  }

  export const getExercicios = async (db: SQLiteDatabase) => {
    return await db.getAllAsync<Exercicio>('SELECT * FROM exercicio');
  };
  
  
  export const getTreinos = async (db: SQLiteDatabase) => {
    const result = await db.getAllAsync<Treino>(`
    SELECT carga as kg, reps as repetitions, treino.dataTreino as dataTreino, treino.idtreino as idTreino, treino.nome as treinonome, exercicio.nome as exercicionome, serie.idserie FROM TREINO 
join serie on treino.idtreino = serie.idtreino 
join exercicio on exercicio.idexercicio = serie.idexercicio
 ORDER BY idTreino DESC
    `);

    return result;
  };

  export const getTreinosTemplateById = (db: SQLiteDatabase, idtreinotemplate: number) => {
    const result = db.getAllSync<{
      idTreinoTemplate: number;
      treinonome: string;
      nome: string;
      qntSeries: number;
      idexercicio: number;
    }>(`
    select serietemplate.qntSeries as qntSeries, exercicio.nome as nome, exercicio.idexercicio, treinotemplate.nome as treinonome, treinotemplate.idtreinotemplate from treinotemplate 
    join serietemplate on serietemplate.idtreinotemplate = treinotemplate.idtreinotemplate
    join exercicio on exercicio.idexercicio = serietemplate.idexercicio WHERE treinotemplate.idtreinotemplate = ?;
    `, idtreinotemplate);
    return result;
  };

  export const getLastSeriesByExercise = (db: SQLiteDatabase, idexercicio:number) => {
    const lastTreinoId = db.getAllSync<{lastTreinoId: number;}>(`
    SELECT MAX(idTreino) as lastTreinoId
        FROM serie
        WHERE idExercicio = ?
    `, idexercicio);
    const results =  db.getAllSync<{kg: number; reps: number;}>(`
    SELECT carga as kg, reps as repetitions
              FROM serie
              WHERE idExercicio = ? AND idTreino = ?
              ORDER BY idSerie ASC

    `, idexercicio, lastTreinoId[0].lastTreinoId);
    return results;
  };

  export const getTreinosTemplate = async (db: SQLiteDatabase) => {
    const result = await db.getAllAsync<TreinoTemplate>(`
    select serietemplate.qntSeries, exercicio.nome as exercicionome, treinotemplate.nome as treinonome, treinotemplate.idtreinotemplate from treinotemplate 
    join serietemplate on serietemplate.idtreinotemplate = treinotemplate.idtreinotemplate
    join exercicio on exercicio.idexercicio = serietemplate.idexercicio;
    `);
    console.log(result);
    return result;
  };
  export const getTreinoTemplate = async (db: SQLiteDatabase) => {
    const result = await db.getAllAsync<{nome:string; idtreinotemplate:string}>(`
    select * from treinotemplate;
    `);

    return result;
  };

 export const getAllExercicios = async (db: SQLiteDatabase) => {
    const result = await db.getAllAsync<{nome:string; nomegrupomuscular:string}>(`
    select nome, nomegrupomuscular from exercicio join grupomuscular on exercicio.idgrupomuscular = grupomuscular.idgrupomuscular;
    `);

    return result;
  };


  export const deleteTreinosTemplate = async (db: SQLiteDatabase) => {
    await db.runAsync(`
    DELETE FROM TreinoTemplate;
    `,);
    console.log('treinos apagado id: ');

  };

    export const deleteTreinoTemplateById = async (db: SQLiteDatabase, id: number) => {
    await db.runAsync(`
    DELETE FROM TreinoTemplate WHERE idTreinoTemplate = ?;
    `, id);
    await db.runAsync(`
      DELETE FROM SerieTemplate WHERE idTreinoTemplate = ?;
      `, id);
    console.log('treinos apagado id: ' + id);

  };

  
  export const deleteExercicio = (db: SQLiteDatabase,
    idexercicio: number) => {
    db.runAsync('DELETE FROM exercicio WHERE idexercicio = ?;', idexercicio);
  };

  export const deleteTreinos = async (db: SQLiteDatabase) => {
    await db.runAsync(`
    DELETE FROM treino;
    `,);
    await db.runAsync(`
    DELETE FROM serie;
    `,);
    console.log('treinos apagado id: ');

  };

  
  export const deleteSeriesTemplate = async (db: SQLiteDatabase) => {
    await db.runAsync(`
    DELETE FROM SerieTemplate;
    `,);
    console.log('series apagado id: ');

  };

  export const getSeriesTemplate = async (db: SQLiteDatabase) => {
    const result = await db.getFirstAsync<TreinoTemplate>(`
    SELECT * FROM serietemplate ORDER BY idtreinotemplate DESC
    `);

    return result;
  };
  export const getSeries = async (db: SQLiteDatabase) => {
    return await db.getAllAsync<Serie>('SELECT idtreino, idserie, reps, carga FROM serie');
  };
  
  export const getInformacoes =  (db: SQLiteDatabase) => {

    
    const results = db.getFirstSync<Informacoes>('SELECT * FROM Usuario ORDER BY Id DESC LIMIT 1');
    console.log(results);
    return results;
  }; 
