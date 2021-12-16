const escapeText = function (str) {
	return document.createTextNode(str);
};

console.log(escapeText('<h3>hello</h3>'));
