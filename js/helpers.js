function removeChildren(parent) {		//Remove all the children from the parent element
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

function insertAfter(newNode,referenceNode) {		//Insert new node after reference node
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function compare(a,b) {		//comparison function used in combination with a sort function
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
}

var varOperators = {		//list of operators used to all dynamic calculation in formulas
	'+': function(a,b) { return a + b }
	,'-': function(a,b) { return a - b }
	,'*': function(a,b) { return a * b }
	,'/': function(a,b) { return a / b }
	,'<': function(a,b) { return a < b }
	,'>': function(a,b) { return a > b }
};

var range = function(start, end, step) {		//Function allowing the creation of a array of numbers based upon the inputs
	var range = [];
	var typeofStart = typeof start;
	var typeofEnd = typeof end;

	if (step === 0) {
		throw TypeError("Step cannot be zero.");
	}

	if (typeofStart == "undefined" || typeofEnd == "undefined") {
		throw TypeError("Must pass start and end arguments.");
	} else if (typeofStart != typeofEnd) {
		throw TypeError("Start and end arguments must be of same type.");
	}

	typeof step == "undefined" && (step = 1);

	if (end < start) {
		step = -step;
	}

	if (typeofStart == "number") {

		while (step > 0 ? end >= start : end <= start) {
			range.push(start);
			start += step;
		}

	} else if (typeofStart == "string") {

		if (start.length != 1 || end.length != 1) {
			throw TypeError("Only strings with one character are supported.");
		}

		start = start.charCodeAt(0);
		end = end.charCodeAt(0);

		while (step > 0 ? end >= start : end <= start) {
			range.push(String.fromCharCode(start));
			start += step;
		}

	} else {
		throw TypeError("Only string and number types are supported");
	}

	return range;
}

function unescapeHTML(input) {		//Function to remove the html escaped characters in the body of a text and replace them with their true values
	var node = document.createElement('textarea');
	node.innerHTML = input;
	return node.value;
}

function XHR(url) {		//Function to call preferences from a URL using a GET HTTP requests and import them into the application
	if(window.location.href.search('pricer.html')) url = window.location.href.replace('pricer.html','')+url;
	if (window.XMLHttpRequest) {
		var xhr=new XMLHttpRequest();
	} else {
		var xhr=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.onreadystatechange=function() {
		if (xhr.readyState==4 && xhr.status==200) {
			if(xhr.responseText.length != 0){
				importConfig(url,xhr.responseText);
			}
		}
	}
	xhr.open("GET", url);
	xhr.send();
}

function reflowElement(element) {		//Function to attempt to reflow an element in an attempt for it to be positioned correctly
	var display = element.style.display;

	clearTimeout(reflowTimer);
	element.style.display = 'none';

	reflowTimer = setTimeout(function() {
		element.style.display = display;
		console.log('reflow');
	}, 500);
}

function initReflow(ID) {		//Function to initialize the reflow function based on the window resizing
	var element = document.getElementById(ID);

	if(window.attachEvent) {
		window.attachEvent('onresize', reflowElement(element) );
	}
	else if(window.addEventListener) {
		window.addEventListener('resize', reflowElement(element), true);
	}
}
