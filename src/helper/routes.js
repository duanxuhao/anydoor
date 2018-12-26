const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const Handlebars = require("handlebars");
const path = require('path');
const mime = require('./mime.js');
const compress = require("./compress.js");
const range = require("./range.js");
const isFresh = require("./cache.js");


const tplpath = path.join(__dirname,"../template/dir.tpl");
const source = fs.readFileSync(tplpath);
const template = Handlebars.compile(source.toString());


module.exports = async function(req,res,filepath,config){
	try{
		const stats = await stat(filepath);
		if(stats.isFile()){
			const contentType = mime(filepath);
			res.setHeader("Content-Type",contentType);
			if(isFresh(stats,req,res)){
				res.statusCode = 304;
				res.end();
				return;
			}
			let rs;
			const {code,start,end} = range(stats.size,req,res);
			if(code === 200){
				res.statusCode = 200;
				rs = fs.createReadStream(filepath);
			}else{
				res.statusCode = 206;
				rs = fs.createReadStream(filepath,{start,end});
			}
			if(filepath.match(config.compress)){
				rs = compress(rs,req,res);
			}
			rs.pipe(res);
		}else if(stats.isDirectory()){
			const files = await readdir(filepath);
			res.statusCode = 200;
			res.setHeader("Content-Type","text/html");
			const dir = path.relative(config.root,filepath);
			const data = {
				title:path.basename(filepath),
				files:files.map(file =>{
					return {
						file,
						icon:mime(file)
					}
				}),
				dir:dir ? `/${dir}`:""
			}
			res.end(template(data));
		}
	}catch(ex){
		console.log(ex);
		res.statusCode = 404;
		res.setHeader("Content-Type","text/plain");
		res.end(filepath+"is not a directory or file");
	}
}
