// add javascript as well

var imba = exports.imba = {
	id: 'imba',
	extensions: ['.imba'],
	aliases: ['Imba','imba'],
	mimetypes: ['application/imba'],
	language: require('./imba')
};

var ruby = exports.ruby = {
	id: 'ruby',
	extensions: ['.rb','.rbx','.rjs','.gemspec','.pp'],
	filenames: ['rakefile'],
	aliases: ['Ruby','rb'],
	language: require('./ruby')
};

var javascript = exports.javascript = {
	id: 'javascript',
	extensions: ['.js','.jsx','.json'],
	aliases: ['JavaScript','js'],
	language: require('./javascript')
};

var css = exports.css = {
	id: 'css',
	extensions: ['.css','.scss'],
	aliases: ['CSS','css'],
	mimetypes: ['text/css'],
	language: require('./css')
};

var python = exports.python = {
	id: 'python',
	extensions: ['.py','.rpy','.pyw','.cpy','.gyp','.gypi'],
	aliases: ['Python','py'],
	firstLine: '^#!/.*\\bpython[0-9.-]*\\b',
	language: require('./python')
};

var html = exports.html = {
	id: 'html',
	extensions: ['.html','.htm','.shtml','.xhtml','.mdoc','.jsp','.asp','.aspx','.jshtm'],
	aliases: ['HTML','htm','html','xhtml'],
	mimetypes: ['text/html','text/x-jshtm','text/template','text/ng-template'],
	language: require('./html')
};

var less = exports.less = {
	id: 'less',
	extensions: ['.less'],
	aliases: ['Less','less'],
	mimetypes: ['text/x-less','text/less'],
	language: require('./less')
};

var markdown = exports.markdown = {
	id: 'markdown',
	extensions: ['.md'],
	aliases: ['Markdown','md'],
	mimetypes: ['text/markdown','text/md'],
	language: require('./markdown')
};

var xml = exports.xml = {
	id: 'xml',
	extensions: ['.xml','.dtd','.ascx','.csproj','.config','.wxi','.wxl','.wxs','.xaml','.svg','.svgz'],
	firstLine: '(\\<\\?xml.*)|(\\<svg)|(\\<\\!doctype\\s+svg)',
	aliases: ['XML','xml'],
	mimetypes: ['text/xml','application/xml','application/xaml+xml','application/xml-dtd'],
	language: require('./xml')
};

var java = exports.java = {
	id: 'java',
	extensions: ['.java','.jav'],
	aliases: ['Java','java'],
	mimetypes: ['text/x-java-source','text/x-java'],
	language: require('./java')
};
