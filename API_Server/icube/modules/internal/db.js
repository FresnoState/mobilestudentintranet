var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/msidb';

function connect(operation, collection){
  MongoClient.connect(url, function(err, db){
    if(err){
      console.log(err);
    }
    else{
      operation(db.collection(collection));
    }
    db.close();
  });
}

module.exports = {
  insert: function(collection, data, callback){
    var insertOp = function(collectionObj){
      collectionObj.insert(data, {}, function(err, result){
        if(err)
          console.log(err)
        else if(callback)
          callback(result.ops);
      });
    };
    connect(insertOp, collection);
  },
  find: function(collection, criteria, callback){
    var findOp = function(collectionObj){
      collectionObj.find(criteria).toArray(function(err, docs) {
        if(err)
          console.log(err)
        else
          callback(docs);
      });
    };
    connect(findOp, collection);
  },
  findOne: function(collection, criteria, callback){
    var findOp = function(collectionObj){
      collectionObj.findOne(criteria, {}, function(err, docs) {
        if(err)
          console.log(err)
        else
          callback(docs);
      });
    };
    connect(findOp, collection);
  },
  update: function(collection, criteria, data){
    var updateOp = function(collectionObj){
      collectionObj.updateOne(criteria, data, function(err, results){
        if(err)
          console.log(err)
      });
    };
    connect(updateOp, collection);
  },
  remove: function(collection, criteria){
    var removeOp = function(collectionObj){
      collectionObj.remove(criteria);
    }
    connect(removeOp, collection);
  }
}
