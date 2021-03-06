////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2009 NVA.  All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

var s_mySettings = new calendarSettings();

////////////////////////////////////////////////////////////////////////////////
//
// SETTING FUNCTIONS
//
////////////////////////////////////////////////////////////////////////////////

function initSetting()
{
	s_mySettings.load();
	
	offset.selectedIndex = parseInt(s_mySettings.CalendarOffSet);
	offset.focus(); // переводим фокус на элемент
	offset.blur(); // убераем фокус с элемента

	System.Gadget.onSettingsClosing = SettingsClosing;
}

function SettingsClosing(event)
{
    // Save the settings if the user clicked OK.
    if (event.closeAction == event.Action.commit)
    {
		s_mySettings.save(s_mySettings.CalendarView, s_mySettings.CalendarDivType, offset.value); 
    }
    // Allow the Settings dialog to close.
    event.cancel = false;
}

////////////////////////////////////////////////////////////////////////////////
//
// writeSetting(string theSettingName, string aSettingValue)- Saves a Setting
//
////////////////////////////////////////////////////////////////////////////////
function writeSetting(theSettingName, aSettingValue)
{
 try
 {
	System.Gadget.Settings.write(theSettingName, aSettingValue);
 }
 catch (objException)
 {
 }
}

////////////////////////////////////////////////////////////////////////////////
//
// readSetting(string theSettingName)- Reads a Setting
//
////////////////////////////////////////////////////////////////////////////////
function readSetting(theSettingName)
{
 var retVal = "";
 try
 {
	retVal = System.Gadget.Settings.read(theSettingName);
 }
 catch (objException)
 {
	retVal = null;
 }
 return retVal;
}

////////////////////////////////////////////////////////////////////////////////
//
// Settings object
//
////////////////////////////////////////////////////////////////////////////////
function calendarSettings()
{
	this.CalendarView	= readSetting("CalendarView") || "";
	this.CalendarDivType	= readSetting("CalendarDivType") || "reset";
	this.CalendarOffSet = readSetting("CalendarOffSet") || "0";

////////////////////////////////////////////////////////////////////////////////
	this.save = function(CalendarView, CalendarDivType, CalendarOffSet)
	{
		if (CalendarDivType == "reset")
		{
			CalendarDivType = "year";
		}

		if (CalendarView == "" || CalendarView == "curl" )
		{
			CalendarView = "DAY";
			CalendarDivType = "day";
		}

		writeSetting("CalendarView", CalendarView );
		writeSetting("CalendarDivType", CalendarDivType );
		writeSetting("CalendarOffSet", CalendarOffSet );
		
		this.CalendarView = CalendarView;
		this.CalendarDivType = CalendarDivType;
		this.CalendarOffSet = CalendarOffSet;
	}
////////////////////////////////////////////////////////////////////////////////
	this.load = function()
	{
		this.CalendarView	= readSetting("CalendarView") || "";
		this.CalendarDivType = readSetting("CalendarDivType") || "reset";
		this.CalendarOffSet = readSetting("CalendarOffSet") || "0";

		if (this.CalendarView == "")
		{
			this.save("DAY","day","0");
		}
	}
}
