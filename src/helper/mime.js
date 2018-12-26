const path = require("path");

const mimeTypes = {
	'css':'text/css',
	'gif':'image/gif',
	'html':'text/html',
	'ico':'image/x-icon',
	'jpeg':'image/jpeg',
	'jpg':'image/jpeg',
	'js':'text/jacascript',
	'json':'application/json',
	'pdf':'application/pdf',
	'png':'image/png',
	'svg':'image/svg+xml',
	'swf':'application/x-shockwave-flash',
	'tiff':'image/tiff',
	'txt':'text/plain',
	'wav':'audio/x-wav',
	'wma':'audio/x-ms-wma',
	'wmv':'video/x-ms-wmv',
	'xml':'text/xml'
};

module.exports = (filepath)=>{
	let ext = path.extname(filepath).split(".").pop().toLowerCase();
	if(!ext){
		ext = filepath;
	}
	return mimeTypes[ext] || mimeTypes["txt"];
}