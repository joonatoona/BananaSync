var http = require('http');
var fs = require('fs');
var passwordHash = require('password-hash');
var crypto = require('crypto');
var url = require('url');

fs.readFile('users', 'utf8', function (err, data) {
	if (err) {
		throw err;
	}
	else {
		userdata = JSON.parse(data);
		usertokens = [];
		tokenstamps = [];
		for (i = 0; i < userdata.users.length; i++) {
			usertokens.push("");
			tokenstamps.push(0);
		}
	}
});

function recFile(req, res, queryData) {
  var destinationFile = fs.createWriteStream("tmp/"+queryData.fname);
  req.pipe(destinationFile);
  var fileSize = req.headers['content-length'];
  var uploadedBytes = 0 ;
  req.on('data',function(d){
    uploadedBytes += d.length;
    var p = (uploadedBytes/fileSize) * 100;
    res.write("Uploading " + parseInt(p)+ " %\n");
  });
  req.on('end',function(){
    res.end("File Upload Complete");
  });
}

function getToken() {
	return 'xxyxxxxxyxxxxxyxxyxxxyxxxxxyxxyxxxxxxxyxxxxxyxxyxxyxxx'.replace(/[xy]/g, function(c) { var r = crypto.randomBytes(1)[0]%16|0, v = c == 'x' ? r : (r&0x3|0x8); return v.toString(16);});
}

function checkValid(token) {
	tokenindex = usertokens.indexOf(token);
  	if (tokenindex != -1 && token != "") {
  		if (tokenstamps[tokenindex]+(60000*5) <= Date.now()) {
  			usertokens[tokenindex] = "";
  			return false;
  		}
  		else {
  			return userdata.users[tokenindex];
  		}
  	}
  	else {
  		return false;
  	}
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  queryData = url.parse(req.url, true).query;
  queryPath = url.parse(req.url).pathname;
  if (queryPath=="/upload") {
    userindex = userdata.users.indexOf(queryData.user)
    if (userindex != -1) {
      if (passwordHash.verify(queryData.pass, userdata.hashes[userindex])) {
        usertokens[userindex] = getToken();
        tokenstamps[userindex] = Date.now();
        recFile(req, res, queryData);
      }
      else {
        res.end("Invalid Credentials!");
      }
    }
    else {
      res.end('Invalid Credentials!');
    }
  }
  else {
  	res.end('Invalid URL!');
  }
}).listen(8124);