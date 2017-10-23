var connection = require('../connection');
  
function Todo() {
  this.getHistory = function(groupId, page, pageSize, res) {
    connection.acquire(function(err, conn) {

    	page = parseInt(page) - 1;
    	pageSize = parseInt(pageSize);

        conn.query('SELECT * FROM (SELECT * FROM archive WHERE to_group = ? ORDER BY id DESC LIMIT ?, ?) sub ORDER BY id ASC', [groupId, page * pageSize, pageSize], function(err, result) {
            conn.release();
         
            if (!err) {
            	 res.json(
                    {
                        'data': result,
                        'error': false,
                        'errors': null
                    }
                );
       
            } else {
            	res.json(
                    {
                        'data': null,
                        'error': true,
                        'errors': [{
                            'errorCode': 9011,
                            'errorMessage': 'Something error'
                        }]
                    }
                );
                console.log(err);
    		}
      });
    });
  }

  this.getDeal = function(where, page, pageSize, res) {
    connection.acquire(function(err, conn) {

        page = parseInt(page) - 1;
        pageSize = parseInt(pageSize);

        var strQuery;
        if (where != "") {
            strQuery = 'SELECT * FROM deal WHERE title LIKE "%' + where + '%" ORDER BY id DESC LIMIT ' + page * pageSize + ', ' + pageSize;
        } else {
            strQuery = 'SELECT * FROM deal ORDER BY count_view DESC LIMIT ' + page * pageSize + ', ' + pageSize;
        }

        conn.query(strQuery, function(err, result) {
            conn.release();
         
            if (!err) {
                 res.json(
                    {
                        'data': result,
                        'error': false,
                        'errors': null
                    }
                );
       
            } else {
                res.json(
                    {
                        'data': null,
                        'error': true,
                        'errors': [{
                            'errorCode': 9011,
                            'errorMessage': 'Something error'
                        }]
                    }
                );
                console.log(err);
            }
      });
    });
  }

    this.getTrend = function(where, page, pageSize, res) {
    connection.acquire(function(err, conn) {

        page = parseInt(page) - 1;
        pageSize = parseInt(pageSize);

        var strQuery;
        if (where != "") {
            strQuery = 'SELECT * FROM trend WHERE title LIKE "%' + where + '%" ORDER BY id DESC LIMIT ' + page * pageSize + ', ' + pageSize;
        } else {
            strQuery = 'SELECT * FROM trend ORDER BY count_view DESC LIMIT ' + page * pageSize + ', ' + pageSize;
        }

        conn.query(strQuery, function(err, result) {
            conn.release();
         
            if (!err) {
                 res.json(
                    {
                        'data': result,
                        'error': false,
                        'errors': null
                    }
                );
       
            } else {
                res.json(
                    {
                        'data': null,
                        'error': true,
                        'errors': [{
                            'errorCode': 9011,
                            'errorMessage': 'Something error'
                        }]
                    }
                );
                console.log(err);
            }
      });
    });
  }

  this.getStatus = function(groupId, res) {
    connection.acquire(function(err, conn) {
        conn.query('SELECT * FROM users WHERE to_group = ? ', [groupId], function(err, result) {
            conn.release();
            if (!err) {
                 res.json(
                    {
                        'data': result,
                        'error': false,
                        'errors': null
                    }
                );
       
            } else {
                res.json(
                    {
                        'data': null,
                        'error': true,
                        'errors': [{
                            'errorCode': 9011,
                            'errorMessage': 'Something error'
                        }]
                    }
                );
                console.log(err);
            }
        });
    });
  }

  this.getLastLocation = function(groupId, res) {
    connection.acquire(function(err, conn) {
        conn.query('SELECT * FROM last_location WHERE to_group = ?', [groupId], function(err, result) {
            conn.release();
            if (!err) {
                res.json({
                    'data': result,
                    'error': false,
                    'errors': null
                });
            } else {
                res.json(
                    {
                        'data': null,
                        'error': true,
                        'errors': [{
                            'errorCode': 9011,
                            'errorMessage': 'Something error'
                        }]
                    }
                );
                console.log(err);
            }
        });
    });
  }

  this.updateTrendCount = function(body, res) {
    connection.acquire(function(err, conn) {
        conn.query('UPDATE trend SET ? WHERE id = ?', [body, body.id], function(err, result) {
            conn.release();
             if (!err && result.affectedRows == 1) {
                res.json({
                    'data': "update success",
                    'error': false,
                    'errors': null
                });
            } else {
                res.json(
                    {
                        'data': null,
                        'error': true,
                        'errors': [{
                            'errorCode': 9011,
                            'errorMessage': 'Something error'
                        }]
                    }
                );
                console.log(err);
            }
        });
    });
  }

}
module.exports = new Todo();