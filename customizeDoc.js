function mouseMove(e) {
        var srcElement = e.srcElement;
	console.log(e);

	if (srcElement.nodeName = "DIV") {

		// For NPE checking, we check safely. We need to remove the class name
		// Since we will be styling the new one after.
		if (prevDOM != null) {
			prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);
		}

		// Add a visited class name to the element. So we can style it.
		srcElement.classList.add(MOUSE_VISITED_CLASSNAME);

		// The current element is now the previous. So we can remove the class
		// during the next iteration.
		prevDOM = srcElement;
	}
}

function mouseClick(e) {
	if (enabled) {
		var srcElement = e.srcElement;
		var parent = srcElement.parentNode;
		if (parent != null) {
			parent.removeChild(srcElement);
			e.stopPropagation();
		}
		return false;
	}
}


function keyDown(e) {
	console.log(e);
	var KeyID = (window.event) ? event.keyCode : e.keyCode;

	switch(KeyID) {
		case enabledKeyStroke:
		// Ctrl clicked.
		// Mouse listener for any move event on the current document.
		enabled = true;
		document.addEventListener('mousemove',mouseMove,false);
		return false;

		case rightArrow:
		if (enabled) {
			console.log("Resizing");
			// Resize object. Increase width.
			prevDOM.style.width = prevDOM.clientWidth + 25 + "px";
		}
		return false;

		case leftArrow:
		if (enabled) {
			console.log("Resizing");
			// Resize object. Increase width.
			prevDOM.style.width = prevDOM.clientWidth - 25 + "px";
		}
		return false;
		case upArrow:
		if (enabled) {
			console.log("Resizing");
			// Resize object. Increase width.
			prevDOM.style.height = prevDOM.clientHeight - 25 + "px";
		}
		return false;
		case downArrow:
		if (enabled) {
			console.log("Resizing");
			// Resize object. Increase width.
			prevDOM.style.height = prevDOM.clientHeight + 25 + "px";
		}
		return false;
		
	}

}

function keyUp(e) {
	console.log(e);
	var KeyID = (window.event) ? event.keyCode : e.keyCode;

	switch(KeyID) {
		case enabledKeyStroke:
		// Ctrl clicked.
		// Mouse listener for any move event on the current document.
		enabled = false;
		document.removeEventListener('mousemove',mouseMove,false);
		if (prevDOM != null) {
                        prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);
		}
		break;
	}

}

// The key stroke that enables customization.
var enabledKeyStroke = 18;
var leftArrow = 37;
var upArrow = 38;
var rightArrow = 39;
var downArrow = 40;

// Indicates if the customization features are enabled.
var enabled = false;

// Unique ID for the className.
var MOUSE_VISITED_CLASSNAME = 'crx_mouse_visited';

// Previous dom, that we want to track, so we can remove the previous styling.
var prevDOM = null;

// Act on keystrokes
//document.addEventListener('keydown',keyCheck,false);
document.onkeydown = keyDown;
document.onkeyup = keyUp;       
document.onclick = mouseClick;

//document.addEventListener('click',mouseClick,false);
