var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'MSI.db', location: 'default'});
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
/*
db.executeSql('INSERT INTO Message (msi_key, topic_key, dist, title, desc, message, timestamp) VALUES ("abc","59ee1ac3ff1d0dfba2376e24-5a0e2fe33e99b823d5d2352b-5a0e30193e99b823d5d2352c","Information","title1","na","message here",1511801267844);');
db.executeSql('INSERT INTO Message (msi_key, topic_key, dist, title, desc, message, timestamp) VALUES ("d","59ee1ac3ff1d0dfba2376e24-5a0e2fe33e99b823d5d2352b-5a0e30193e99b823d5d2352c","Information","title2","na","message here",1511801267844);');
db.executeSql('INSERT INTO Message (msi_key, topic_key, dist, title, desc, message, timestamp) VALUES ("e","59ee1ac3ff1d0dfba2376e24-5a0e2fe33e99b823d5d2352b-5a0e30193e99b823d5d2352c","Information","title3","na","message here",1511801267844);');
db.executeSql('INSERT INTO Message (msi_key, topic_key, dist, title, desc, message, timestamp) VALUES ("f","59ee1ac3ff1d0dfba2376e24-5a0e2fe33e99b823d5d2352b-5a0e30193e99b823d5d2352c","Information","title4","na","message here",1511801267844);');
db.executeSql('INSERT INTO Message (msi_key, topic_key, dist, title, desc, message, timestamp) VALUES ("g","59ee1ac3ff1d0dfba2376e24-5a0e2fe33e99b823d5d2352b-5a0e30193e99b823d5d2352c","Information","title5","na","message here",1511801267844);');
db.executeSql('INSERT INTO Message (msi_key, topic_key, dist, title, desc, message, timestamp) VALUES ("h","59ee1ac3ff1d0dfba2376e24-5a0e2fe33e99b823d5d2352b-5a0e30193e99b823d5d2352c","Information","title6","na","message here",1511746107000);');
db.executeSql('INSERT INTO Message (msi_key, topic_key, dist, title, desc, message, timestamp) VALUES ("i","59ee1ac3ff1d0dfba2376e24-5a0e2fe33e99b823d5d2352b-5a0e30193e99b823d5d2352c","Information","title7","na","message here",1511659707000);');
db.executeSql('INSERT INTO Message (msi_key, topic_key, dist, title, desc, message, timestamp) VALUES ("j","59ee1ac3ff1d0dfba2376e24-5a0e2fe33e99b823d5d2352b-5a0e30193e99b823d5d2352c","Information","title7","na","message here",1511659707000);');
db.executeSql('INSERT INTO Message (msi_key, topic_key, dist, title, desc, message, timestamp) VALUES ("k","59ee1ac3ff1d0dfba2376e24-5a0e2fe33e99b823d5d2352b-5a0e30193e99b823d5d2352c","Information","title7","na","message here",1511659707000);');
db.executeSql('INSERT INTO Message (msi_key, topic_key, dist, title, desc, message, timestamp) VALUES ("l","59ee1ac3ff1d0dfba2376e24-5a0e2fe33e99b823d5d2352b-5a0e30193e99b823d5d2352c","Information","title7","na","message here",1511659707000);');
db.executeSql('INSERT INTO Message (msi_key, topic_key, dist, title, desc, message, timestamp) VALUES ("m","59ee1ac3ff1d0dfba2376e24-5a0e2fe33e99b823d5d2352b-5a0e30193e99b823d5d2352c","Information","title7","na","message here",1511659707000);');
db.executeSql('INSERT INTO Message (msi_key, topic_key, dist, title, desc, message, timestamp) VALUES ("n","59ee1ac3ff1d0dfba2376e24-5a0e2fe33e99b823d5d2352b-5a0e30193e99b823d5d2352c","Information","title7","na","message here",1511659707000);');
db.executeSql('INSERT INTO Message (msi_key, topic_key, dist, title, desc, message, timestamp) VALUES ("o","59ee1ac3ff1d0dfba2376e24-5a0e2fe33e99b823d5d2352b-5a0e30193e99b823d5d2352c","Information","title7","na","message here",1511659707000);');
db.executeSql('INSERT INTO Message (msi_key, topic_key, dist, title, desc, message, timestamp) VALUES ("p","59ee1ac3ff1d0dfba2376e24-5a0e2fe33e99b823d5d2352b-5a0e30193e99b823d5d2352c","Information","title7","na","message here",1511659707000);');
db.executeSql('INSERT INTO Message (msi_key, topic_key, dist, title, desc, message, timestamp) VALUES ("q","59ee1ac3ff1d0dfba2376e24-5a0e2fe33e99b823d5d2352b-5a0e30193e99b823d5d2352c","Information","title7","na","message here",1511659707000);');
*/
//db.executeSql('INSERT INTO Message (msi_key, topic_key, dist, title, desc, message, timestamp) VALUES ("r","59f1fe1b1fd0c121974886d1-59f1fe9c3e99b823d5d233f5-59f1ffa13e99b823d5d233fa","Information","title8","na","diff ch msg",1511659707000);');
export default db;
