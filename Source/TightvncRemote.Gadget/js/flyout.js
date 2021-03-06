////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2019 NVA.  All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
var f_mySettings = new Settings();
var f_Buttons = new Array(4);
var objDocument = System.Gadget.document;
var f_Background = null;

// Constant
var UPDATE = 0, REMOVE = 1, EXIT = 2, ADD = 3;

////////////////////////////////////////////////////////////////////////////////
//
// Initialize Flyout
//
////////////////////////////////////////////////////////////////////////////////
function initFlyout()
{
	// Load image for background
	f_Background = document.getElementById("imgBackground");
	f_Background.src = "url(images/bgFlyout.png)";
	
	// Gadget settings
	f_mySettings.load();
	
	// init display objects
	showContactInfo();
	showButtons();
}

////////////////////////////////////////////////////////////////////////////////
//
// Event key "Enter" (keyCode = 13) for "Input"
//
////////////////////////////////////////////////////////////////////////////////
function keyGroup(e)
{
    // look for window.event in case event isn't passed in
    e = e || window.event;
    if (e.keyCode == 13)
    {
		strName.focus();
        return false;
    }
    return true;
}

function keyName(e)
{
    // look for window.event in case event isn't passed in
    e = e || window.event;
    if (e.keyCode == 13)
    {
		strPhone.focus();
        return false;
    }
    return true;
}

function keyPhone(e)
{
    // look for window.event in case event isn't passed in
    e = e || window.event;
    if (e.keyCode == 13)
    {
		strGroup.focus();
        return false;
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////
//
// Show elements controll
//
////////////////////////////////////////////////////////////////////////////////
function showContactInfo()
{
	strGroup.value = objDocument.getElementById("strContactGroup").value;
	strName.value  = objDocument.getElementById("strContactName").value;
	strPhone.value = objDocument.getElementById("strContactPhone").value;
	
	if ( f_mySettings.readAction() != "addContact" )
	{
		strGroup.disabled = true;
	}
}

function showButtons()
{
	// create contactinfo buttons
	f_Buttons[UPDATE] = imgBackground.addImageObject('images/bUpdate.png', 16 , 130);
	f_Buttons[REMOVE] = imgBackground.addImageObject('images/bRemove.png', 50, 130);
	f_Buttons[EXIT] = imgBackground.addImageObject('images/bExit.png'  , 84, 130);
	f_Buttons[ADD] = imgBackground.addImageObject('images/bAdd.png'   , 16 , 130);

	// create Update/Add button controls
	var m = document.createElement('DIV');
	m.className = 'target';
	m.style.posLeft = 16;
	m.style.posTop = 130;
	m.style.posHeight = 24;
	m.style.posWidth = 24;
	if ( f_mySettings.readAction() == "addContact" )
	{
		m.onmouseover = showAddButton;
		m.onmouseout = hideAddButton;
		m.onclick = clickAddButton;
	}
	else
	{
		m.onmouseover = showUpdateButton;
		m.onmouseout = hideUpdateButton;
		m.onclick = clickUpdateButton;
	}
	targets.appendChild(m);

	// create Remove button controls
	var m = document.createElement('DIV');
	m.className = 'target';
	m.style.posLeft = 50;
	m.style.posTop = 130;
	m.style.posHeight = 24;
	m.style.posWidth = 24;
	if ( f_mySettings.readAction() != "addContact" )
	{
		m.onmouseover = showRemoveButton;
		m.onmouseout = hideRemoveButton;
		m.onclick = clickRemoveButton;
	}
	targets.appendChild(m);

	// create Exit button controls
	var m = document.createElement('DIV');
	m.className = 'target';
	m.style.posLeft = 84;
	m.style.posTop = 130;
	m.style.posHeight = 24;
	m.style.posWidth = 24;
	m.onmouseover = showExitButton;
	m.onmouseout = hideExitButton;
	m.onclick = clickExitButton;
	targets.appendChild(m);

	// change buttons opacity
	if ( f_mySettings.readAction() == "addContact" )
	{
		f_Buttons[UPDATE].opacity = 0;
		f_Buttons[REMOVE].opacity = 0;
		f_Buttons[EXIT].opacity = 70;
		f_Buttons[ADD].opacity = 70;
		//
		strGroup.focus();
	}
	else
	{
		f_Buttons[UPDATE].opacity = 70;
		f_Buttons[REMOVE].opacity = 70;
		f_Buttons[EXIT].opacity = 70;
		f_Buttons[ADD].opacity = 0;
		//
		strName.focus();
	}
}

// Button select effect
function showUpdateButton() {if ( strName.value != "" ) f_Buttons[UPDATE].opacity = 100}
function showRemoveButton() {f_Buttons[REMOVE].opacity = 100}
function showExitButton()   {f_Buttons[EXIT].opacity = 100}
function showAddButton()    {if ( strName.value != "" ) f_Buttons[ADD].opacity = 100}

function hideUpdateButton() {f_Buttons[UPDATE].opacity = 70}
function hideRemoveButton() {f_Buttons[REMOVE].opacity = 70}
function hideExitButton()   {f_Buttons[EXIT].opacity = 70}
function hideAddButton()    {f_Buttons[ADD].opacity = 70}

// Update button action
function clickUpdateButton()
{
	if ( (strName.value != "") && (strPhone.value != "") )
	{
		// send modifications to gadget page
		objDocument.getElementById("strContactGroup").value = Trim(strGroup.value);
		objDocument.getElementById("strContactName").value  = Trim(strName.value);
		objDocument.getElementById("strContactPhone").value = Trim(strPhone.value);
		
		// set action flag 
		f_mySettings.saveAction("update");

		// hide flyout
		System.Gadget.Flyout.show = false;
	}
	else
	{
		if(strName.value == "" ) strName.focus();
		else strPhone.focus(); 
	}
}

// Add button action
function clickAddButton()
{
	if ( (strGroup.value != "") && (strName.value != "") && (strPhone.value != "") )
	{
		// send modifications to gadget page
		objDocument.getElementById("strContactGroup").value = Trim(strGroup.value);
		objDocument.getElementById("strContactName").value  = Trim(strName.value);
		objDocument.getElementById("strContactPhone").value = Trim(strPhone.value);

		// set action flag 
		f_mySettings.saveAction("add");
	
		// hide flyout
		System.Gadget.Flyout.show = false;
	}
	else
	{
		if( strGroup.value == "" ) strGroup.focus();
		else if(strName.value == "" ) strName.focus();
		else strPhone.focus();
	}
}

// Remove button action
function clickRemoveButton()
{
	// set action flag 
	f_mySettings.saveAction("remove");

	// hide flyout
	System.Gadget.Flyout.show = false;
}

// Exit button action
function clickExitButton()
{
	// set action flag 
	f_mySettings.saveAction("exit");

	// hide flyout
	System.Gadget.Flyout.show = false;
}


////////////////////////////////////////////////////////////////////////////////
//
// Trim all spaces in Begin and End from string
//
////////////////////////////////////////////////////////////////////////////////
function Trim(str){ return str.replace(/^\s+|\s+$/g,""); }
