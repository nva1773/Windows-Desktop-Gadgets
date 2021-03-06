////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2019 NVA.  All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
var g_mySettings = new vncSettings();
var g_visible = false;
var g_select = new Array();

////////////////////////////////////////////////////////////////////////////////
//
// Initialize Main
//
////////////////////////////////////////////////////////////////////////////////
function initMain()
{
	// load Settings
	g_mySettings.load();
	
	System.Gadget.settingsUI = "settings.html";
	System.Gadget.onSettingsClosed = settingsClosed;
	
	// Load image for background
	var oBackground = document.getElementById("imgBackground");
	oBackground.src = "url(images/background.png)";
	
	// Init "Input"
	onClickInput();
	inpAddress.value = g_mySettings.Input;
	
	// Init "Select"
	initServerList();	
}

////////////////////////////////////////////////////////////////////////////////
//
// Event closed settings
//
////////////////////////////////////////////////////////////////////////////////
function settingsClosed(event)
{
    if(event.closeAction == event.Action.commit)
    {
        g_mySettings.load();
		initServerList();
    }
}

////////////////////////////////////////////////////////////////////////////////
//
// Show and Hide Input or Select
//
////////////////////////////////////////////////////////////////////////////////
function onClickInput()
{
	g_visible = false;
	selAddress.style.visibility = "hidden";
	inpAddress.style.visibility = "visible";
	document.getElementById("btInput").disabled = true;
	document.getElementById("btSelect").disabled = false;
}

function onClickSelect()
{
	g_visible = true;
	inpAddress.style.visibility = "hidden";
	selAddress.style.visibility = "visible";
	document.getElementById("btSelect").disabled = true;
	document.getElementById("btInput").disabled = false;
}

////////////////////////////////////////////////////////////////////////////////
//
// Functions for work from Select
//
////////////////////////////////////////////////////////////////////////////////
function initServerList()
{
	var name, ip, select;
	select = document.getElementById("selAddress");
	clearOptions(select);
	g_select =  g_mySettings.Select;	
	for(var i = 0; i < g_select.length; i++)
	{
		name = g_select[i][0];
		ip = g_select[i][1];
		addOption(select, name, ip);
	}
	// Set focuse on "select" and choice first element
	select.focus();
	select.blur();
}

function addOption(sel, name, ip)
{
	var opt = document.createElement("option");
	opt.value = ip;
	opt.innerHTML = name;
	if(name == ip) opt.disabled = true;
	sel.appendChild(opt);
}

function clearOptions(sel)
{
	var length = sel.options.length;
	while(length--)
	{
		sel.remove(length);
	}
}

////////////////////////////////////////////////////////////////////////////////
//
// Event key "Enter" (keyCode = 13) for "Input"
//
////////////////////////////////////////////////////////////////////////////////
function keyPressMain(e)
{
    // look for window.event in case event isn't passed in
    e = e || window.event;
    if (e.keyCode == 13)
    {
		onClickConnect();
        return false;
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////
//
// Connect to VNC server
//
////////////////////////////////////////////////////////////////////////////////
function onClickConnect()
{
	// save input address if new
	if(!g_visible && g_mySettings.Input != inpAddress.value) g_mySettings.saveInput(inpAddress.value);
	
	// open TightVNC
	var host = g_visible == true ? selAddress.value : inpAddress.value;
	if (host != "")
	{
		var strPath = System.Gadget.path;
		var strArgs = "";
		
		if(g_mySettings.Password == "") strArgs = host;
		else strArgs = "-host=" + host + " " + "-password=" + g_mySettings.Password;
		
		var openRDP = System.Shell.execute(strPath + "\\tvnviewer.exe ", strArgs);
	}
}
