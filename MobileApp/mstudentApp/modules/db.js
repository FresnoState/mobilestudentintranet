var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'MSI.db', location: 'default'}, ()=>{console.log("success")}, (err)=>{console.log(err)});
db.executeSql(
    `CREATE TABLE IF NOT EXISTS Message (
        ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        msi_key VARCHAR(100),
        topic_key VARCHAR (100),
        channel VARCHAR (100),
        title VARCHAR(500),
        desc VARCHAR(500),
        message VARCHAR(1500),
        timestamp INTEGER
    );`
);

export default db;
