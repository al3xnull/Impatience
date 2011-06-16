var sys = require("sys"),
	http = require("http"),
	url = require("url"),
	path = require("path"),
	fs = require("fs");

function load_static_file(uri,res){
	var filename = path.join(process.cwd(),uri);
	path.exists(filename, function(exists){
		if(!exists){
			res.writeHead(404,{"Content-Type":"text/plain"});
			res.write("404 Not Found\n");
			res.end();
			return;
		}

		fs.readFile(filename,"binary",function(err,file){
			if(err){
				res.writeHead(500, {"Content-Type": "text/plain"});  
                res.write(err + "\n");  
                res.end();  
                return;
			}

			res.writeHead(200);  
            res.write(file, "binary");  
            res.end();
		});
	});
}

http.createServer(function(req,res){
	var uri = url.parse(req.url).pathname;
	if(uri === "/stream"){

		
		res.writeHead('200');
		res.write('well, this is where good code is supposed to go.');
		res.end();
		// var listener = tweet_emitter.addListener("tweets",function(tweets){
		// 	res.writeHead(200,{"Content-Type":"text/plain"});
		// 	res.write(JSON.stringify(tweets));
		// 	res.end();
		// 	
		// 	clearTimeout(timeout);
		// });
		// 
		// var timeout = setTimeout(function(){
		// 	res.writeHead(200,{"Content-Type":"text/plain"});
		// 	res.write(JSON.stringify([]));
		// 	res.end();
		// 	
		// 	tweet_emitter.removeListener(listener);
		// }, 10000);
	}else{
		load_static_file(uri,res);
	}
}).listen(8080);

sys.puts("Server running at http://localhost:8080");