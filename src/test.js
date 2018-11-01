function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var self = {};
// ivar namespace.instance.identifier

var monarch = require('./monarch');
var languages = require('./monaco/languages');

var Theme = require('./theme').Theme;

var raw = Theme.toMonaco();
var inv = Theme.inverted;
var theme = exports.theme = monarch.TokenTheme.createFromRawTokenTheme(raw.rules);

var css = [];

var colors = {
	dark: {},
	light: {}
};

for (let i = 0, items = iter$(theme.getColorMap()), len = items.length, color; i < len; i++) {
	color = items[i];
	if (i <= 0) { continue; };
	colors.dark[i] = color;
	if (inv[color]) {
		colors.light[i] = inv[color];
	};
	css.push((".tok" + i + " \{ color: " + color + "; \}"));
	if (inv[color]) {
		css.push((".mlight .tok" + i + " \{ color: " + (inv[color]) + "; \}"));
	};
};

var cache = {};
var aliases = {
	js: 'javascript',
	jsx: 'javascript',
	ts: 'typescript',
	md: 'markdown'
};
var styleElement;

exports.styles = self.styles = function (){
	return css;
};

var registeredLanguages = {};

exports.getLanguage = self.getLanguage = function (lang){
	if (false && !styleElement) {
		styleElement = document.createElement('style');
		styleElement.innerHTML = css.join("\n");
		document.head.appendChild(styleElement);
	};
	
	lang = aliases[lang] || lang;
	
	if (registeredLanguages[lang]) {
		return registeredLanguages[lang];
	};
	if (languages[lang]) {
		monarch.register(lang,languages[lang].language.language);
		return registeredLanguages[lang] = true;
	};
	return false;
};


exports.tokenize = self.tokenize = function (lang,code,options){
	if(options === undefined) options = {};
	lang = aliases[lang] || lang;
	
	// if $node$ and options:decorate and lang == 'imba'
	// 	# not on the web -- for now
	// 	var compiler = require 'imba/compiler'
	// 	var helpers = require 'imba/lib/compiler/helpers'
	// 	let analysis = compiler.analyze(code,{target: 'web'})
	// 	var locmap = helpers.locationToLineColMap(code)
	// 	var vars = []
	// 	for scope in analysis:scopes
	// 		for item in scope:vars
	// 			for ref in item:refs
	// 				let loc = locmap[ref:loc[0]].concat('identifier.l' + item:type)
	// 				vars.push(loc)
	// 	
	// 	vars = vars.sort do |a,b|
	// 		if a[0] == b[0]
	// 			a[1] - b[1]
	// 		else
	// 			a[0] - b[0]
	// 	
	// 	# console.log "decorations",vars
	// 
	// 	options:decorations = vars
	
	// make sure language exists?
	if (!self.getLanguage(lang)) {
		console.log("could not find language");
		if (code.indexOf('"') >= 0) { code = code.replace(/\"/g,"&quot;") };
		if (code.indexOf('<') >= 0) { code = code.replace(/\</g,"&lt;") };
		if (code.indexOf('>') >= 0) { code = code.replace(/\>/g,"&gt;") };
		return code;
	};
	
	var theme = options.theme;
	var decorations = (options.decorations || []).slice();
	var lexer = monarch.getLexer(lang);
	var types = theme ? null : [];
	var map = {};
	var state = lexer.getInitialState();
	var lines = [];
	var dec = decorations.shift();
	
	
	for (let ln = 0, items = iter$(code.split('\n')), len = items.length, line; ln < len; ln++) {
		line = items[ln];
		var result = lexer.tokenize(line,state,0);
		let tokens = result.tokens.filter(function(tok) { return tok.type.indexOf("white") == -1; });
		let offset = 0;
		let lstr = "";
		
		for (let i = 0, ary = iter$(tokens), len = ary.length, token; i < len; i++) {
			// skip whitespace
			token = ary[i];
			let tref;
			
			// console.log ln,token:offset,token:type
			if (dec && dec[0] == ln && dec[1] == token.offset) {
				// console.log "found decoration!!!",dec
				token.type = dec[2];
				dec = decorations.shift();
			};
			
			let next = tokens[i + 1];
			if (theme) {
				tref = theme._match(token.type);
				tref = tref._foreground;
			} else {
				let type = token.type.replace(/\./g,' ').replace(lang,'').trim();
				tref = map[type];
				if (tref == undefined) {
					tref = map[type] = (types.push(type) - 1);
				};
			};
			
			let end = next ? next.offset : line.length;
			lstr += String.fromCharCode(64 + tref);
			let move = (end) - offset;
			lstr += String.fromCharCode(64 + move);
			offset += move;
		};
		
		state = result.endState;
		lines.push(lstr);
	};
	
	return [code,lines.join('\n'),types];
};

exports.jsonify = self.jsonify = function (code,lineCount){
	if(lineCount === undefined) lineCount = 30;
	var out = "";
	
	var raw = code[0];
	var tokens = code[1].split('\n');
	var types = code[2];
	
	var i = 0;
	var start = 0;
	var l = tokens.length;
	var lines = raw.split('\n');
	
	out = [];
	
	for (let li = 0, items = iter$(lines), len = items.length, line; li < len; li++) {
		line = items[li];
		let start = 0;
		let desc = tokens[li];
		
		let k = 0;
		let type;
		let color;
		
		while (k < desc.length){
			let code = desc.charCodeAt(k++) - 64;
			if (k % 2 == 0) { // move
				let content = line.slice(start,start = start + code);
				out.push([content,color]);
			} else {
				type = code;
				color = colors.dark[code];
			};
		};
		out.push(['\n',{}]);
	};
	
	return out;
};

exports.htmlify = self.htmlify = function (code,lineCount){
	if(lineCount === undefined) lineCount = 30;
	var out = "";
	
	var raw = code[0];
	var tokens = code[1].split('\n');
	var types = code[2];
	
	var i = 0;
	var start = 0;
	var l = tokens.length;
	var lines = raw.split('\n');
	
	out = [];
	
	for (let li = 0, items = iter$(lines), len = items.length, line; li < len; li++) {
		line = items[li];
		let start = 0;
		let desc = tokens[li];
		let k = 0;
		let s = "<span class='line'>";
		while (k < desc.length){
			let code = desc.charCodeAt(k++) - 64;
			if (k % 2 == 0) { // move
				let content = line.slice(start,start = start + code);
				s += content.replace(/\</g,'&lt;').replace(/\>/g,'&gt;');
				s += '</span>';
			} else {
				s += '<span class="' + (types ? types[code] : (('tok' + code))) + '">';
			};
		};
		s += "</span>";
		out.push(s);
	};
	
	return out.join('\n');
};

exports.highlight = self.highlight = function (code,lang,options){
	if(options === undefined) options = {};
	lang = aliases[lang] || lang;
	let langconf = self.getLanguage(lang);
	if (!langconf) {
		// return htmlify([code])
		return code;
	};
	(options.theme == null) ? (options.theme = theme) : options.theme;
	var tokens = self.tokenize(lang,code,options);
	return options.json ? self.jsonify(tokens) : self.htmlify(tokens);
};

self.test = function (code){
	return self.highlight(code,'imba',{json: true});
};

console.log(JSON.stringify(self.test("var hello = 1;")));
