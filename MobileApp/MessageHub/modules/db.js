var SQLite = require('react-native-sqlite-storage');
//opens database if pre-existing, else creates it
var db = SQLite.openDatabase({name: 'MSI.db', location: 'default'});
//creates schema if not already created
db.executeSql(
    `CREATE TABLE IF NOT EXISTS Message (
        ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        msi_key VARCHAR(100),
        topic_key VARCHAR (100),
        dist VARCHAR (50),
        title VARCHAR(500),
        desc VARCHAR(500),
        message VARCHAR(1500),
        timestamp INTEGER
    );`
);

export default db;
