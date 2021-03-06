﻿//******************************************************************************************************
//  Default.js - Gbtc
//
//==================================================================
//  Copyright © 2014 Electric Power Research Institute, Inc. 
//  The embodiments of this Program and supporting materials may be ordered from:
//                Electric Power Software Center (EPSC)
//                9625 Research Drive
//                Charlotte, NC 28262 USAd
//                Phone: 1-800-313-3774
//                Email: askepri@epri.com
//  THIS NOTICE MAY NOT BE REMOVED FROM THE PROGRAM BY ANY USER THEREOF.
//==================================================================
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  07/15/2014 - Jeff Walker
//       Generated original version of source code.
//  08/24/2016 - William Ernest
//       Removed jqwidgets, highcharts, google and replaced with primeui, d3, flot, leaflet
//******************************************************************************************************
//////////////////////////////////////////////////////////////////////////////////////////////
// Global

var base64Map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'.split('');

var globalcolorsBreakers = ['#90ed7d', '#434348', '#ff0000'];
var globalcolorsTrending = ['#434348', '#ff0000'];

var globalcolors = ['#90ed7d', '#434348', '#ff0000', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'];
var globalcolorsFaults = [ '#2b908f', '#e4d354', '#f15c80', '#8085e9', '#f7a35c', '#90ed7d', '#434348', '#ff0000'];
//var globalcolorsEvents = ['#C00000', '#FF2800', '#FF9600', '#FFFF00', '#00FFF4', '#0000FF'];
var globalcolorsEvents = ['#0000FF', '#00FFF4', '#FFFF00', '#FF9600', '#FF2800', '#C00000'];

var d3Colors = {
    Interruption: '#C00000',
    Fault: '#FF2800',
    Sag: '#FF9600',
    Transient: '#FFFF00',
    Swell: '#00FFF4',
    Other: '#0000FF',
    5: '#C00000',
    4: '#FF2800',
    3: '#FF9600',
    2: '#FFFF00',
    1: '#00FFF4',
    0: '#0000FF'
}

//var globalcolorsDQ = ['#00FFF4', '#00C80E', '#FFFF00', '#FF9600', '#FF2800', '#FF0EF0', '#0000FF'];
var globalcolorsDQ = ['#0000FF', '#FF0EF0', '#FF2800', '#FF9600', '#FFFF00', '#00C80E', '#00FFF4'];

var javascriptversion = "13";

var usersettings = {
    lastSetting: {},
    uisettings: []
};

var applicationsettings = {};

var cache_Meters = null;

var cache_Map_Matrix_Data = null;
var cache_Map_Matrix_Data_Date_From = null;
var cache_Map_Matrix_Data_Date_To = null;

// Billy's cached data
var cache_Graph_Data = null;
var cache_ErrorBar_data = null;
var cache_Table_Data = null;
var cache_Contour_Data = null;
var cache_Sparkline_Data = null; 
var brush = null;
var cache_Last_Date = null;
var leafletMap = {'Overview-Today': null, 'Overview-Yesterday': null, Events: null, Disturbances: null, Trending: null, TrendingData: null, Faults: null, Breakers: null, Completeness: null, Correctness: null, ModbusData: null};
var markerGroup = null;
var contourLayer = null;
var contourOverlay = null;
var mapMarkers = {Events: [], Disturbances: [], Trending: [], TrendingData: [], Faults: [], Breakers: [], Completeness: [], Correctness: []};
var currentTab = null;
var disabledList = {
    Events: { "Interruption": false, "Fault": false, "Sag": false, "Transient": false, "Swell": false, "Other": false },
    Disturbances: {"5": false, "4": false, "3": false, "2": false, "1": false, "0": false},
    Trending: { "Alarm": false, "OffNormal": false},
    TrendingData: {},
    Faults: { "500 kV": false, "300 kV": false, "230 kV": false, "135 kV": false, "115 kV": false, "69 kV": false, "46 kV": false, "0 kV": false},
    Breakers: {"Normal" : false, "Late": false, "Indeterminate": false},
    Completeness: {"> 100%": false, "98% - 100%": false, "90% - 97%": false, "70% - 89%": false, "50% - 69%": false, ">0% - 49%": false, "0%": false},
    Correctness: { "> 100%": false, "98% - 100%": false, "90% - 97%": false, "70% - 89%": false, "50% - 69%": false, ">0% - 49%": false, "0%": false}
};

var yearBeginMoment = moment().month(yearBegin.split(' ')[0]).startOf('month').date(yearBegin.split(' ')[1]).utc();
var nowMoment = moment.utc();
var dateRangeOptions = {
    "timePicker": false,
    "timePicker24Hour": false,
    "timePickerSeconds": false,
    "locale": {
        "format": 'MM/DD/YYYY'
    },
    "showDropdowns": true,
    "autoApply": true,
    "alwaysShowCalendars": true,
    "minDate": "01/01/1990",
    "maxDate": "12/31/2030",
    "ranges": {
        //'1 Day': [moment().utc().startOf('day'), moment().utc().endOf('day')],
        'Last 3 Days': [moment().utc().startOf('day').subtract(2, 'days'), moment().utc().endOf('day')],
        'Last 7 Days': [moment().utc().startOf('day').subtract(6, 'days'), moment().utc().endOf('day')],
        'Last 30 Days': [moment().utc().startOf('day').subtract(29, 'days'), moment().utc().endOf('day')],
        'Last 90 Days': [moment().utc().startOf('day').subtract(89, 'days'), moment().utc().endOf('day')],
        'Last 365 Days': [moment().utc().startOf('day').subtract(364, 'days'), moment().utc().endOf('day')],
        'Month To Date': [moment().utc().startOf('month'), moment().utc().endOf('day')],
        'Last Month': [moment().utc().subtract(1, 'months').startOf('month'), moment().utc().subtract(1, 'months').endOf('month')],
        'Year To Date': [(nowMoment >= yearBeginMoment ? yearBeginMoment.clone() : yearBeginMoment.clone().subtract(1,'years')), moment().utc().endOf('day')],
        'Last Year': [(nowMoment >= yearBeginMoment ? yearBeginMoment.clone().subtract(1, 'years') : yearBeginMoment.clone().subtract(2, 'years')),
                       (nowMoment >= yearBeginMoment ? yearBeginMoment.clone() : yearBeginMoment.clone().subtract(1, 'years'))],
    },
    "startDate": moment().utc().subtract(29, 'days').startOf('day'),
    "endDate": moment.utc().endOf('day')
};


var calendardatesEvents = [];
var calendartipsEvents = [];

var calendardatesTrending = [];
var calendartipsTrending = [];

var calendardatesBreakers = [];
var calendartipsBreakers = [];

var loadingPanel = null;

var datafromdate = new Date();
var datatodate = new Date();

var contextfromdate = new Date();
var contexttodate = new Date();

var zoomdatefrom = null;
var zoomdateto = null;

var selectiontimeout = null;
var timeout = null;
var lastselectedindex = 0;

var heatmap_Cache_Date_From;
var heatmap_Cache_Date_To;
var heatmapCache = [];

var postedUserName = "";

//////////////////////////////////////////////////////////////////////////////////////////////

Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

//////////////////////////////////////////////////////////////////////////////////////////////

function setMapHeaderDate(datefrom, dateto) {

    if (datefrom == dateto) {
        $("#mapHeader" + currentTab + "From").hide();
        $("#mapHeader" + currentTab + "Divider").hide();
    } else {
        $("#mapHeader" + currentTab + "From").show();
        $("#mapHeader" + currentTab + "Divider").show();
    }
        
    $("#mapHeader" + currentTab + "From")[0].innerHTML = (new  Date(datefrom).getMonth() + 1)+ '/' + new Date(datefrom).getDate() + '/' + new Date(datefrom).getFullYear() ;
    $("#mapHeader" + currentTab + "To")[0].innerHTML = (new Date(dateto).getMonth() + 1) + '/' + new Date(dateto).getDate() + '/' + new Date(dateto).getFullYear();
}

//////////////////////////////////////////////////////////////////////////////////////////////

function loadDataForDate() {
    if (currentTab != null) {
        contextfromdate = moment($('#dateRange').data('daterangepicker').startDate._d.toISOString()).utc().format('MM/DD/YY');
        contexttodate = moment($('#dateRange').data('daterangepicker').endDate._d.toISOString()).utc().format('MM/DD/YY');


        cache_Map_Matrix_Data_Date_From = contextfromdate;
        cache_Map_Matrix_Data_Date_To = contexttodate;

        if (contextfromdate === contexttodate) {
            cache_Last_Date = contexttodate;
        }
        else {
            cache_Last_Date = null;
            cache_Table_Data = null;
            cache_Sparkline_Data = null;
        }

        setMapHeaderDate(contextfromdate, contexttodate);
        manageTabsByDate(currentTab, contextfromdate, contexttodate);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////

function selectmapgrid(thecontrol) {
    if(thecontrol != null){
        $('.mapGrid').val($(thecontrol).val());
        if (thecontrol.selectedIndex === 1) {
            $("#theMatrix" + currentTab).show();
            $("#theMap" + currentTab).hide();
            if (cache_Map_Matrix_Data != null) {
                plotGridLocations(cache_Map_Matrix_Data, currentTab, cache_Map_Matrix_Data_Date_From, cache_Map_Matrix_Data_Date_To);  
            }
            $.sparkline_display_visible();
        }
        else if (thecontrol.selectedIndex === 0) {
            //$("#ContoursControlsTrending").hide();
            $("#theMap" + currentTab).show();
            $("#theMatrix" + currentTab).hide();
            resizeMapAndMatrix(currentTab);
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////

function GetCurrentlySelectedSites() {
    return ($('#siteList').multiselect("getChecked").map(function() {
        return this.title + "|" + this.value;
    }).get());
}

function GetCurrentlySelectedSitesIDs() {
    return ($('#siteList').multiselect("getChecked").map(function () {
        return this.value;
    }).get()).join(',');
}

//////////////////////////////////////////////////////////////////////////////////////////////

function selectsitesincharts() {

    selectiontimeout = null;

    var selectedIDs = GetCurrentlySelectedSites();

    var sitename = selectedIDs.length + " of " + $('#siteList')[0].length + " selected";
    var thesiteidlist = "";

    if (selectedIDs.length > 0) {

        var thedetails = selectedIDs[0].split('|');

        if (selectedIDs.length == 1) {
            sitename = thedetails[0];
        }

        $.each(selectedIDs, function(key, value) {
            thedetails = value.split('|');
            thesiteidlist += thedetails[1] + ",";
        });
    }

    if (cache_Last_Date !== null) {
        getTableDivData('getDetailsForSites' + currentTab, 'Detail' + currentTab, sitename, thesiteidlist, cache_Last_Date);
    } else {
        var parent = $('#Detail' + currentTab + 'Table').parent();
        $('#Detail' + currentTab + 'Table').remove();
        $(parent).append('<div id="Detail' + currentTab + 'Table"></div>');
    }

    ManageLocationClick(sitename, thesiteidlist);  
}

//////////////////////////////////////////////////////////////////////////////////////////////
// The following functions are for getting Table data and populating the tables
function getTableDivData(thedatasource, thediv, siteName, siteID, theDate) {
    var thedatasent = "{'siteID':'" + siteID + "'" +
                    (currentTab === "TrendingData" ? ", 'colorScale': '" + $('#contourColorScaleSelect').val() + "'" : "") +
                    ", 'targetDate':'" + theDate + "'" +
                    ", 'userName':'" + postedUserName + "'}";

    $.ajax({
        type: "POST",
        url: homePath +'eventService.asmx/' + thedatasource,
        data: thedatasent,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        success: function (data) {
            var json = $.parseJSON(data.d)
            cache_Table_Data = json;

            var filterString = [];
            var leg = d3.selectAll('.legend');

            $.each(leg[0], function (i, d) {
                if ($(d).children('rect').css('fill') === 'rgb(128, 128, 128)')
                    filterString.push($(d).children('text').text());
            });
            window["populate" + currentTab + "DivWithGrid"](cache_Table_Data);
        }
    });
}

function populateFaultsDivWithGrid(data) {
    if ($('#Detail' + currentTab + 'Table').children().length > 0) {
        var parent = $('#Detail' + currentTab + 'Table').parent();
        $('#Detail' + currentTab + 'Table').remove();
        $(parent).append('<div id="Detail' + currentTab + 'Table"></div>');
    }

    var filteredData = [];
    if (data != null) {

        $.each(data, function (i, d) {
            if (!disabledList[currentTab][d.voltage + ' kV'])
                filteredData.push(d);
        });


        fixNumbers(data, ['voltage', 'thecurrentdistance']);

        $('#Detail' + currentTab + "Table").puidatatable({
            scrollable: true,
            scrollHeight: '100%',
            columns: [
                {
                    field: 'theinceptiontime', headerText: 'Start Time', headerStyle: 'width: 15%', bodyStyle: 'width: 15%; height: 20px', bodyClass: '', sortable: true, content:
                                function (row, options, td) {
                                    if (row.notecount > 0)
                                        td.addClass('note')
                                    return "<a href='" + xdaInstance + "/Workbench/Event.cshtml?EventID=" + row.theeventid + "' style='color: blue' target='_blank'>" + row.theinceptiontime + "</a>"
                                }
                },
                { field: 'thelinename', headerText: 'Line', headerStyle: 'width: 40%', bodyStyle: 'width: 40%; height: 20px', sortable: true },
                { field: 'voltage', headerText: 'kV', headerStyle: 'width: 6%', bodyStyle: 'width:  6%; height: 20px', sortable: true },
                { field: 'thefaulttype', headerText: 'Type', headerStyle: 'width:  6%', bodyStyle: 'width:  6%; height: 20px', sortable: true },
                { field: 'thecurrentdistance', headerText: 'Miles', headerStyle: 'width:  6%', bodyStyle: 'width:  6%; height: 20px', sortable: true },
                { field: 'locationname', headerText: 'Location', headerStyle: 'width: 10%', bodyStyle: 'width: 10%; height: 20px', sortable: true },
                { field: 'OpenSEE', headerText: '', headerStyle: 'width: 4%', bodyStyle: 'width: 4%; padding: 0; height: 20px', content: makeOpenSEEButton_html },
                { field: 'FaultSpecifics', headerText: '', headerStyle: 'width: 4%', bodyStyle: 'width: 4%; padding: 0; height: 20px', content: makeFaultSpecificsButton_html },
                { headerText: '', headerStyle: 'width: 4%', bodyStyle: 'width: 4%; padding: 0; height: 20px;text-align: center', content: function (row) { return '<button onclick="openNoteModal(' + row.thefaultid + ')"><span class="glyphicon glyphicon-pencil" title="Add Notes."></span></button>'; } }

            ],
            datasource: filteredData
        });
    }
}

function openNoteModal(faultId) {
    $('#previousNotes').remove();
    dataHub.getNotesForFault(faultId).done(function (data) {
        $('#faultId').text(faultId);
        if (data.length > 0)
            $('#previousNotesDiv').append('<table id="previousNotes" class="table" ><tr><th style="width: 70%">Note</th><th style="width: 20%">Time</th><th style="width: 10%"></th></tr></table>')
        $.each(data, function (i, d) {
            $('#previousNotes').append('<tr id="row' + d.ID + '"><td id="note'+d.ID+'">' + d.Note + '</td><td>' + moment(d.TimeStamp).format("MM/DD/YYYY HH:mm:ss") + '</td><td><button onclick="editNote(' + d.ID +')"><span class="glyphicon glyphicon-pencil" title="Edit this note.  Ensure you save after pushing this button or you will lose your note."></span></button><button onclick="removeNote(' + d.ID + ')"><span class="glyphicon glyphicon-remove" title="Remove this note"></span></button></td></tr>');
        });

        $('#note').val('');
        $('#notesModal').modal('show');
    });
}

function saveNote() {
    dataHub.saveNoteForFault($('#faultId').text(), $('#note').val(), userId);
}

function removeNote(id) {
    dataHub.removeNote(id);
    $('#row' +id).remove()
}

function editNote(id) {
    $('#note').val($('#note' + id).text());
    dataHub.removeNote(id);
}

function populateCorrectnessDivWithGrid(data) {
    if ($('#Detail' + currentTab + 'Table').children().length > 0) {
        var parent = $('#Detail' + currentTab + 'Table').parent();
        $('#Detail' + currentTab + 'Table').remove();
        $(parent).append('<div id="Detail' + currentTab + 'Table"></div>');
    }

    var filteredData = [];
    if (data != null) {
        $.each(data, function (i, d) {
            var flag = false;
            $.each($.grep(Object.keys(disabledList[currentTab]), function (d) { return disabledList[currentTab][d] }), function (j, e) {
                switch (e) {
                    case '> 100%':
                        if (parseFloat(d.Correctness) > 100)
                            flag = true;
                        break;

                    case '98% - 100%':
                        if (parseFloat(d.Correctness) >= 98 && parseFloat(d.Correctness) <= 100)
                            flag = true;
                        break;

                    case '90% - 97%':
                        if (parseFloat(d.Correctness) >= 90 && parseFloat(d.Correctness) < 98)
                            flag = true;
                        break;

                    case '70% - 89%':
                        if (parseFloat(d.Correctness) >= 70 && parseFloat(d.Correctness) < 90)
                            flag = true;
                        break;

                    case '50% - 69%':
                        if (parseFloat(d.Correctness) >= 50 && parseFloat(d.Correctness) < 70)
                            flag = true;
                        break;

                    case '>0% - 49%':
                        if (parseFloat(d.Correctness) > 0 && parseFloat(d.Correctness) < 50)
                            flag = true;
                        break;

                    case '0%':
                        if (parseFloat(d.Correctness) == 0)
                            flag = true;
                        break;
                }
            });
            if (!flag)
                filteredData.push(d);
        });


        fixNumbers(data, ['Latched', 'Unreasonable', 'Noncongruent', 'Correctness']);

        $('#Detail' + currentTab + "Table").puidatatable({
            scrollable: true,
            scrollHeight: '100%',
            columns: [
                { field: 'thesite', headerText: 'Name', headerStyle: 'width: 35%', bodyStyle: 'width: 35%; height: 20px', sortable: true },
                { field: 'Latched', headerText: 'Latched', headerStyle: 'width: 12%', bodyStyle: 'width: 12%; height: 20px', sortable: true, content: function (row) { return row.Latched.toFixed(0) + '%'; } },
                { field: 'Unreasonable', headerText: 'Unreasonable', headerStyle: 'width: 10%', bodyStyle: 'width: 10%; height: 20px', sortable: true, content: function (row) { return row.Unreasonable.toFixed(0) + '%'; } },
                { field: 'Noncongruent', headerText: 'Noncongruent', headerStyle: 'width: 10%', bodyStyle: 'width: 10%; height: 20px', sortable: true, content: function (row) { return row.Noncongruent.toFixed(0) + '%'; } },
                { field: 'Correctness', headerText: 'Correctness', headerStyle: 'width: 10%', bodyStyle: 'width:  10%; height: 20px', sortable: true, content: function (row) { return row.Correctness.toFixed(0) + '%'; } },
                { field: 'ChannelDataQuality', headerText: '', headerStyle: 'width: 4%', bodyStyle: 'width: 4%; padding: 0; height: 20px', content: makeChannelDataQualityButton_html }
            ],
            datasource: filteredData
        });
    }
}

function populateCompletenessDivWithGrid(data) {
    if ($('#Detail' + currentTab + 'Table').children().length > 0) {
        var parent = $('#Detail' + currentTab + 'Table').parent();
        $('#Detail' + currentTab + 'Table').remove();
        $(parent).append('<div id="Detail' + currentTab + 'Table"></div>');
    }

    if (data != null) {
        var filteredData = [];
        $.each(data, function (i, d) {
            var flag = false;
            $.each($.grep(Object.keys(disabledList[currentTab]), function (d) { return disabledList[currentTab][d] }), function (j, e) {
                switch (e) {
                    case '> 100%':
                        if (d.Completeness > 100)
                            flag = true;
                        break;

                    case '98% - 100%':
                        if (d.Completeness >= 98 && d.Completeness <= 100)
                            flag = true;
                        break;

                    case '90% - 97%':
                        if (d.Completeness >= 90 && d.Completeness < 98)
                            flag = true;
                        break;

                    case '70% - 89%':
                        if (d.Completeness >= 70 && d.Completeness < 90)
                            flag = true;
                        break;

                    case '50% - 69%':
                        if (d.Completeness >= 50 && d.Completeness < 70)
                            flag = true;
                        break;

                    case '>0% - 49%':
                        if (d.Completeness > 0 && d.Completeness < 50)
                            flag = true;
                        break;

                    case '0%':
                        if (d.Completeness == 0)
                            flag = true;
                        break;
                }
            });
            if (!flag)
                filteredData.push(d);
        });


        fixNumbers(data, ['Expected', 'Received', 'Duplicate', 'Completeness']);

        $('#Detail' + currentTab + "Table").puidatatable({
            scrollable: true,
            scrollHeight: '100%',
            columns: [
                { field: 'thesite', headerText: 'Name', headerStyle: 'width: 35%', bodyStyle: 'width: 35%; height: 20px', sortable: true },
                { field: 'Expected', headerText: 'Expected', headerStyle: 'width: 12%', bodyStyle: 'width: 12%; height: 20px', sortable: true },
                { field: 'Received', headerText: 'Received', headerStyle: 'width: 10%', bodyStyle: 'width: 10%; height: 20px', sortable: true, content: function (row) { return row.Received.toFixed(0) + '%'; } },
                { field: 'Duplicate', headerText: 'Duplicate', headerStyle: 'width: 10%', bodyStyle: 'width: 10%; height: 20px', sortable: true, content: function (row) { return row.Duplicate.toFixed(0) + '%'; } },
                { field: 'Completeness', headerText: 'Complete', headerStyle: 'width: 10%', bodyStyle: 'width:  10%; height: 20px', sortable: true, content: function (row) { return row.Completeness.toFixed(0) + '%'; } },
                { field: 'ChannelCompleteness', headerText: '', headerStyle: 'width: 4%', bodyStyle: 'width: 4%; padding: 0; height: 20px', content: makeChannelCompletenessButton_html }
            ],
            datasource: filteredData
        });
    }
}

function populateEventsDivWithGrid(data) {
    if ($('#Detail' + currentTab + 'Table').children().length > 0) {
        var parent = $('#Detail' + currentTab + 'Table').parent();
        $('#Detail' + currentTab + 'Table').remove();
        $(parent).append('<div id="Detail'+ currentTab +'Table"></div>');
    }

    var filteredData = [];
    if (data != null) {

        $.each(data, function (i, d) {
            var sum = 0;
            $.each(Object.keys(d), function (index, key) {
                if (key != "EventID" && key != "Site" & !disabledList[currentTab][key]) {
                    sum += parseInt(d[key]);
                }
            });
            if (sum > 0)
                filteredData.push(d);
        });

        var tableObject = {
            scrollable: true,
            scrollHeight: '100%',
            columns: [
                { field: 'EventID', headerText: 'Name', headerStyle: 'width: 35%', bodyStyle: 'width: 35%; height: 20px', sortable: true, content: function (row) { return '<button class="btn btn-link" onClick="OpenWindowToMeterEventsByLine(' + row.EventID + ');" text="" style="cursor: pointer; text-align: center; margin: auto; border: 0 none;" title="Launch Events List Page">' + row.Site + '</button>' } },
            ],
            datasource: filteredData
        };
        $.each(Object.keys(data[0]), function (i, d) {
            if (d != "MeterID" && d != "EventID" && d != "Site" && !disabledList[currentTab][d]) {
                tableObject.columns.push({
                    field: d,
                    headerText: d,
                    headerStyle: 'width: 12%; ',
                    bodyStyle: 'width: 12%; height: 20px; ',
                    sortable: true
                });
            }
        });

        $('#Detail' + currentTab + "Table").puidatatable(tableObject);
    }
}

function populateDisturbancesDivWithGrid(data) {
    if ($('#Detail' + currentTab + 'Table').children().length > 0) {
        var parent = $('#Detail' + currentTab + 'Table').parent();
        $('#Detail' + currentTab + 'Table').remove();
        $(parent).append('<div id="Detail' + currentTab + 'Table"></div>');
    }

    var filteredData = [];
    if (data != null) {
        $.each(data, function (i, d) {
            var sum = 0;
            $.each(Object.keys(d), function (index, key) {
                if (key != "themeterid" && key != "theeventid" && key != "thesite" && !disabledList[currentTab][key]) {
                    sum += parseInt(d[key]);
                }
            });
            if (sum > 0)
                filteredData.push(d);
        });
        
        var tableObject = {
            scrollable: true,
            scrollHeight: '100%',
            columns: [
                { field: 'theeventid', headerText: 'Name', headerStyle: 'width: 35%', bodyStyle: 'width: 35%; height: 20px', sortable: true, content: function (row) { return '<button class="btn btn-link" onClick="OpenWindowToMeterEventsByLine(' + row.theeventid + ');" text="" style="cursor: pointer; text-align: center; margin: auto; border: 0 none;" title="Launch Events List Page">' + row.thesite + '</button>' } },
            ],
            datasource: filteredData
        }
        $.each(Object.keys(data[0]), function (i, d) {
            if (d != "themeterid" && d != "theeventid" && d != "thesite" && !disabledList[currentTab][d]) {
                tableObject.columns.push({
                    field: d,
                    headerText: d,
                    headerStyle: 'width: 12%; ',
                    bodyStyle: 'width: 12%; height: 20px; ',
                    sortable: true
                });
            }
        });


        $('#Detail' + currentTab + "Table").puidatatable(tableObject);
    }
}

function populateBreakersDivWithGrid(data) {
    if ($('#Detail' + currentTab + 'Table').children().length > 0) {
        var parent = $('#Detail' + currentTab + 'Table').parent();
        $('#Detail' + currentTab + 'Table').remove();
        $(parent).append('<div id="Detail' + currentTab + 'Table"></div>');
    }

    if (data != null) {
        var filteredData = [];
        $.each(data, function (i, d) {
            if ($.grep(Object.keys(disabledList[currentTab]), function (d) { return disabledList[currentTab][d] }).indexOf(d.operationtype) < 0)
                filteredData.push(d);
        });


        fixNumbers(data, ['timing', 'statustiming', 'speed']);

        $('#Detail' + currentTab + "Table").puidatatable({
            scrollable: true,
            scrollHeight: '100%',
            columns: [
                {
                    field: 'energized', headerText: 'TCE Time', headerStyle: 'width: 140px', bodyStyle: 'width: 140px; height: 20px', sortable: true, content:
                                  function (row) {
                                      return "<a href='" + xdaInstance + "/Workbench/Breaker.cshtml?EventID=" + row.theeventid + "' style='color: blue' target='_blank'>" + row.energized + "</a>"
                                  }
                },
                { field: 'breakernumber', headerText: 'Breaker', headerStyle: 'width: 80px', bodyStyle: 'width: 80px; height: 20px', sortable: true },
                { field: 'linename', headerText: 'Line', headerStyle: 'width: auto', bodyStyle: 'width: auto; height: 20px', sortable: true },
                { field: 'phasename', headerText: 'Phase', headerStyle: 'width: 75px', bodyStyle: 'width: 75px; height: 20px', sortable: true },
                { field: 'timing', headerText: 'Timing', headerStyle: 'width: 80px', bodyStyle: 'width: 80px; height: 20px', sortable: true },
                { field: 'statustiming', headerText: 'Status Timing', headerStyle: 'width: 80px', bodyStyle: 'width: 80px; height: 20px', sortable: true },
                { field: 'speed', headerText: 'Speed', headerStyle: 'width: 75px', bodyStyle: 'width: 75px; height: 20px', sortable: true },
                { field: 'operationtype', headerText: 'Operation', headerStyle: 'width: 100px', bodyStyle: 'width: 100px; height: 20px', sortable: true },
                { field: 'OpenSEE', headerText: '', headerStyle: 'width: 50px', bodyStyle: 'width: 50px; padding: 0; height: 20px', content: makeOpenSEEButton_html },
            ],
            datasource: filteredData
        });
    }
}

function populateTrendingDivWithGrid(data) {
    if ($('#Detail' + currentTab + 'Table').children().length > 0) {
        var parent = $('#Detail' + currentTab + 'Table').parent();
        $('#Detail' + currentTab + 'Table').remove();
        $(parent).append('<div id="Detail' + currentTab + 'Table"></div>');
    }

    if (data != null) {
        var filteredData = [];
        $.each(data, function (i, d) {
            if ($.grep(Object.keys(disabledList[currentTab]), function (d) { return disabledList[currentTab][d] }).indexOf(d.eventtype) < 0)
                filteredData.push(d);
        });


        fixNumbers(data, ['HarmonicGroup', 'eventcount']);

        $('#Detail' + currentTab + "Table").puidatatable({
            scrollable: true,
            scrollHeight: '100%',
            columns: [
                { field: 'sitename', headerText: 'Name', headerStyle: 'width: 25%', bodyStyle: 'width: 35%; height: 20px', sortable: true },
                { field: 'eventtype', headerText: 'Alarm Type', headerStyle: 'width: 12%', bodyStyle: 'width: 12%; height: 20px', sortable: true },
                { field: 'measurementtype', headerText: 'Measurement Type', headerStyle: 'width: 10%', bodyStyle: 'width: 10%; height: 20px', sortable: true },
                { field: 'characteristic', headerText: 'Characteristic', headerStyle: 'width: 10%', bodyStyle: 'width: 10%; height: 20px', sortable: true },
                { field: 'phasename', headerText: 'Phase', headerStyle: 'width: 10%', bodyStyle: 'width:  10%; height: 20px', sortable: true },
                { field: 'HarmonicGroup', headerText: 'HG', headerStyle: 'width: 10%', bodyStyle: 'width:  10%; height: 20px', sortable: true },
                { field: 'eventcount', headerText: 'Count', headerStyle: 'width:  10%', bodyStyle: 'width:  10%; height: 20px', sortable: true },
                { field: 'OpenSTE', headerText: '', headerStyle: 'width: 4%', bodyStyle: 'width: 4%; padding: 0; height: 20px', content: function (row) { return makeOpenSTEButton_html(row); } }
            ],
            datasource: filteredData
        });
    }
}

function populateTrendingDataDivWithGrid(data) {
    if ($('#Detail' + currentTab + 'Table').children().length > 0) {
        var parent = $('#Detail' + currentTab + 'Table').parent();
        $('#Detail' + currentTab + 'Table').remove();
        $(parent).append('<div id="Detail' + currentTab + 'Table"></div>');
    }

    if(data != null){
        fixNumbers(data, ['Minimum', 'Maximum', 'Average']);

        $('#Detail' + currentTab + "Table").puidatatable({
            scrollable: true,
            scrollHeight: '100%',
            columns: [
                { field: 'Name', headerText: 'Name', headerStyle: 'width: 15%', bodyStyle: 'width: 35%; height: 20px', sortable: true },
                { field: 'characteristic', headerText: 'Characterisitc', headerStyle: 'width: 12%', bodyStyle: 'width: 12%; height: 20px', sortable: true },
                { field: 'phasename', headerText: 'Phase', headerStyle: 'width: 10%', bodyStyle: 'width: 10%; height: 20px', sortable: true },
                { field: 'Minimum', headerText: 'Minimum', headerStyle: 'width: 10%', bodyStyle: 'width: 10%; height: 20px', sortable: true, content: function (row) { return parseFloat(row.Minimum).toFixed(4);} },
                { field: 'Maximum', headerText: 'Maximum', headerStyle: 'width: 10%', bodyStyle: 'width:  10%; height: 20px', sortable: true, content: function (row) { return parseFloat(row.Maximum).toFixed(4); } },
                { field: 'Average', headerText: 'Average', headerStyle: 'width: 10%', bodyStyle: 'width:  10%; height: 20px', sortable: true, content: function (row) { return parseFloat(row.Average).toFixed(4); } },
                { field: 'OpenSTE', headerText: '', headerStyle: 'width: 4%', bodyStyle: 'width: 4%; padding: 0; height: 20px', content: function (row) { return makeOpenSTEButton_html(row); }}
            ],
            datasource: data
        });
    }
}

function fixNumbers(data, numFields) {
    if (data != null) {
        $.each(data, function (_, obj) {
            $.each(numFields, function (_, field) {
                obj[field] = Number(obj[field]);
            });
        });
    }
}
//////////////////////////////////////////////////////////////////////////

function getFormattedDate(date) {
    var newdate = new Date(date);
    var year = newdate.getUTCFullYear();
    var month = (1 + newdate.getUTCMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = newdate.getUTCDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return month + '/' + day + '/' + year;
}

//////////////////////////////////////////////////////////////////////////////////////////////

function populateDivWithBarChart(thediv, siteName, siteID, thedatefrom, thedateto) {
    dataHub.getDataForPeriod(siteID, thedatefrom, thedateto, postedUserName, currentTab).done(function (data) {
        var dateDiff = (Date.parse(data.EndDate) - Date.parse(data.StartDate)) / 1000 / 60 / 60 / 24;
        if (data !== null) {

            var graphData = { graphData: [], keys: [], colors: [] };

            var dates = $.map(data.Types[0].Data, function (d) { return d.Item1 });

            $.each(dates, function (i, date) {
                var obj = {};
                var total = 0;
                obj["Date"] = Date.parse(date);
                $.each(data.Types, function (j, type) {
                    obj[type.Name] = type.Data[i].Item2;
                    total += type.Data[i].Item2;
                });
                obj["Total"] = total;
                graphData.graphData.push(obj);

            });

            data.Types.forEach(function (d) {
                graphData.keys.push(d.Name);
                graphData.colors.push(d.Color);
            });


            cache_Graph_Data = graphData;

            if (thediv === "Overview") {

            } else if (thediv === "TrendingData") {

            } else
                buildBarChart(graphData, thediv, siteName, siteID, data.StartDate, data.EndDate);
        }
    });

    if (currentTab == "Disturbances") {
        dataHub.getVoltageMagnitudeData(siteID, thedatefrom, thedateto).done(function (data) {
            cache_MagDur_Data = data;
            buildMagDurChart(data, thediv + "MagDur")
        })
    }
    
}

function buildBarChart(data, thediv, siteName, siteID, thedatefrom, thedateto) {
    $('#' + thediv).children().remove();

    var YaxisLabel = "";
    switch (currentTab) {
        case "Completeness":
            YaxisLabel = "Sites";
            break;

        case "Correctness":
            YaxisLabel = "Sites";
            break;

        default:
            YaxisLabel = currentTab;
            break;
    }

    // D3
    var chartData = deepCopy(data.graphData);
    var date1 = Date.parse(thedatefrom);
    var date2 = Date.parse(thedateto);
    var numSamples = (date2 - date1) / 1000 / 60 / 60 / 24;

    //container sizing variables
    var margin = { top: 20, right: 125, bottom: 100, left: 60 },
        width = $('#' + thediv).width() - margin.left - margin.right,
        height = $('#' + thediv).height() - margin.top - margin.bottom,
        marginOverview = { top: height + 50, right: margin.right, bottom: 20, left: margin.left }
    heightOverview = $('#' + thediv).height() - marginOverview.top - marginOverview.bottom;

    // axis definition and construction
    var x = d3.time.scale.utc().domain([Date.parse(thedatefrom), Date.parse(thedateto) + 1000 * 60 * 60 * 24]).range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
    var binsScale = d3.scale.ordinal().domain(d3.range(30)).rangeBands([0, width], 0.1, 0.05);
    var xOverview = d3.time.scale.utc().domain([Date.parse(thedatefrom), Date.parse(thedateto) + 1000 * 60 * 60 * 24]).range([0, width]);
    var yOverview = d3.scale.linear().range([heightOverview, 0]);
    var color = d3.scale.ordinal().range(data.colors.reverse()).domain(data.keys.reverse());

    var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(d3.format(".2d"));
    var xAxisOverview = d3.svg.axis().scale(xOverview).orient("bottom").ticks((numSamples < 10? numSamples: 10)).tickFormat(d3.time.format.utc('%m/%d'));

    // graph initialization
    var tooltip = d3.select('#' + thediv).append('div')
                .attr('class', 'hidden tooltip');

    var svg = d3.select("#" + thediv).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    var main = null, overview = null, legend = null;

    if (brush === null) {
        brush = d3.svg.brush()
    }
        
     brush.x(xOverview).on("brush", brushed);
    y.domain([0, d3.max(chartData, function (d) { return d.Total; })]);
    yOverview.domain(y.domain());

    var seriesClass = function (seriesName) { return "series-" + seriesName.toLowerCase(); };
    var layerClass = function (d) { return "layer " + seriesClass(d.key); };

    var stack = d3.stack()
        .keys(data.keys)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);

    var series = null;

    var tempKeys = data.keys;

    $.each(chartData, function (i, d) {
        $.each(tempKeys, function (j, k) {
            if (disabledList[currentTab][k] === true)
                chartData[i][k] = 0;

        });

    });


    if (brush !== null && !brush.empty()) {
        x.domain(brush.extent());
        series = stack(chartData.filter(function (d) {
            return d.Date > new Date(brush.extent()[0]).setHours(0, 0, 0, 0) && d.Date < new Date(brush.extent()[1]).setHours(0, 0, 0, 0);
        }));
    }
    else {
        series = stack(chartData);
    }
    var overviewSeries = stack(chartData);
    
    buildMainGraph(series);
    buildOverviewGraph(overviewSeries);
    buildLegend();


    //// d3 Helper Functions
    function buildMainGraph(data) {

        var numSamples;
        if (brush !== null && !brush.empty()) {
            var date1 = new Date(brush.extent()[0]).setHours(0,0,0,0);
            var date2 = new Date(brush.extent()[1]).setHours(0,0,0,0);
            numSamples = 1 + (date2 - date1) / 1000 / 60 / 60 / 24;
        }
        else {
            var date1 = Date.parse(thedatefrom);
            var date2 = Date.parse(thedateto) + 1000*60*60*24;
            numSamples = 1 + (date2 - date1) / 1000 / 60 / 60 / 24;
        }

        var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks((numSamples < 10 ? numSamples : 10)).tickFormat(d3.time.format.utc('%m/%d'));


        y.domain([0, d3.max(data, function (d) { return d3.max(d, function (e) { return e[1] }); })]);

        main = svg.append("g")
            .attr("class", "main")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        main.append("g")
            .attr("class", "grid-lines")
            .selectAll(".grid-line").data(y.ticks(5))
                .enter().append("line")
                    .attr("class", "grid-line")
                    .attr("x1", 0)
                    .attr("x2", width)
                    .attr("y1", y)
                    .attr("y2", y);

        var layersArea = main.append("g")
            .attr("class", "layers");

        var layers = layersArea.selectAll(".layer").data(data)
            .enter().append("g")
                .attr("class", layerClass);

        var bar = layers.selectAll("rect").data(function (d) {
            return d;
        })
            .enter().append("rect")
                .attr("x", function (d) {
                    return x(d.data.Date);
                })
                .attr("width", function () {
                    return width / numSamples;
                })
                .attr("y", function (d) {
                    return y((d[1]? d[1]: 0));
                })
                .attr("height", function (d) { return y(d[0]) - y(d[1]); })
                .style("fill", function (d, e, i) {
                    return color(series[i].key);
                })
                .style("cursor", "pointer");

        main.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        main.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left)
            .attr("x", -height / 2)
            .attr("dy", ".71em")
            .text(YaxisLabel);

        bar.on('mousemove', function (d, f, g) {
            var mouse = d3.mouse(svg.node()).map(function (e) {
                return parseInt(e);
            });
            var html = "<table><tr><td>Date: </td><td style='text-align: right'>" + getFormattedDate(d.data.Date) + "</td></tr>";
            var dKeys = d3.keys(d.data).filter(function (key) { return key !== 'Date' && key !== 'Total' && key !== 'Disabled' && key !== 'Values' && key.indexOf('Disabled') < 0 }).reverse();
            dKeys.forEach(function (data, i) {
                html += "<tr><td>" + data + "</td><td style='text-align: right'>" + (data === "Date" ? getFormattedDate(d.data.Date) : d.data[data]) + "</td></tr>";
            });
            html += "</table>";

            tooltip.classed('hidden', false)
            .attr('style', 'left:' + (mouse[0] + 15) + 'px; top:' + (height / 2) + 'px')
            .html(html);
        });

        bar.on('mouseout', function () {
            tooltip.classed('hidden', true);
        });

        bar.on('click', function (d) {
            var thedate = getFormattedDate(d.data.Date);
            contextfromdate = thedate;
            contexttodate = thedate;
            var filter = [];
            $.each(legend.selectAll("rect"), function (i, element) {
                if ($(this).css('fill') !== 'rgb(128, 128, 128)')
                    filter.push(element[0].__data__);
            });
            manageTabsByDateForClicks(currentTab, thedate, thedate, filter);
            cache_Last_Date = thedate;
            getTableDivData('getDetailsForSites' + currentTab, 'Detail' + currentTab, siteName, siteID, thedate);
        });


    }

    function buildOverviewGraph(data) {
        yOverview.domain([0, d3.max(data, function (d) { return d3.max(d, function (e) { return e[1] }); })]);

        overview = svg.append("g")
            .attr("class", "overview")
            .attr("transform", "translate(" + marginOverview.left + "," + marginOverview.top + ")");

        var layersArea = overview.append("g")
                    .attr("class", "layers");

        var layers = layersArea.selectAll(".layer").data(data)
            .enter().append("g")
                .attr("class", layerClass);

        var bar = layers.selectAll("rect").data(function (d) { return d;  })
            .enter().append("rect")
                .attr("x", function (d) { return xOverview(d.data.Date); })
                .attr("width", function () { return width / numSamples; })
                .attr("y", function (d) {  return yOverview((d[1]? d[1]:0)); })
                .attr("height", function (d) { return yOverview(d[0]) - yOverview(d[1]); })
                .style("fill", "black");


        overview.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + heightOverview + ")")
            .call(xAxisOverview);

        // add the brush target area on the overview chart
        overview.append("g").attr("class", "x brush")
            .call(brush).selectAll("rect").attr("y", -6).attr("height", heightOverview + 7);  // +7 is magic number for styling


    }

    function buildLegend() {
        ////Legend attributes
        legend = svg.selectAll(".legend")
            .data(color.domain().slice().reverse())
            .enter().append("g")
            .attr("id", "chartLegend")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(140," + i * 20 + ")"; });

        var disabledLegendFields = [];

        legend.append("rect")
            .attr("x", width + -65)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function (d, i, e) {
                if (disabledList[currentTab][d]) {
                    return '#808080';
                }
                return color(d);
            })
            .style("cursor", "pointer")
            .on("click", function (d, i) {
                disabledList[currentTab][d] = !disabledList[currentTab][d];
                if (disabledList[currentTab][d]) {
                    $(this).css('fill', 'rgb(128, 128, 128)');
                }
                else {
                    $(this).css('fill', color(d));
                }
                configurationsupdate(null);
                toggleSeries(d, $(this).css('fill') === 'rgb(128, 128, 128)');
                window["populate" + currentTab + "DivWithGrid"](cache_Table_Data);
                resizeMatrixCells(currentTab);
                showSiteSet($("#selectSiteSet" + currentTab)[0]);
                if ($("#map" + currentTab + "Grid")[0].value == "Map" && (currentTab === 'Disturbances' || currentTab === 'Events' || currentTab === 'Trending')) {
                    var legendFields = color.domain().slice().filter(function (a) { return $.map(disabledList[currentTab], function (data, key) { if (data) return key }).indexOf(a) < 0 });
                }

            });

        legend.append("text")
            .attr("x", width - 40)
            .attr("y", 9)
            .attr("width", 40)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function (d) {
                return d;
        });

        $.each(Object.keys(disabledList[currentTab]), function (i, field) {
            if(disabledList[currentTab][field])
                toggleSeries(field, true);
        });
    }

    //called when selection is chosen on overview map
    function brushed() {
        x.domain(brush.empty() ? xOverview.domain() : brush.extent());
        main.selectAll("g").remove();

        var newData = deepCopy(cache_Graph_Data.graphData);
        var tempKeys = cache_Graph_Data.keys;

        $.each(newData, function (i, d) {
            $.each(tempKeys, function (j, k) {
                if (disabledList[currentTab][k] === true)
                    newData[i][k] = 0;

            });

        });
        var stackedData;

        if (brush.empty())
            stackedData = stack(newData);
        else
            stackedData = stack(newData.filter(function (d) {
            return d.Date > new Date(brush.extent()[0]).setHours(0, 0, 0, 0) && d.Date < new Date(brush.extent()[1]).setHours(0, 0, 0, 0);
        }));

        buildMainGraph(stackedData);
    }

    //Toggles a certain series.
    function toggleSeries(seriesName, isDisabling) {

        var newData = deepCopy(cache_Graph_Data.graphData);

        var tempKeys = cache_Graph_Data.keys;
        disabledList[currentTab][seriesName] = isDisabling;

        $.each(newData, function (i, d) {
            $.each(tempKeys, function (j, k) {
                if (disabledList[currentTab][k] === true)
                    newData[i][k] = 0;

            });

        });

        var stackedData = stack((!brush.empty() ? newData.filter(function (d) { return d.Date > new Date(brush.extent()[0]).setHours(0, 0, 0, 0) && d.Date < new Date(brush.extent()[1]).setHours(0, 0, 0, 0); }) : newData));
        var overviewStackedData = stack(newData);
        x.domain(brush.empty() ? xOverview.domain() : brush.extent());
        main.selectAll("g").remove();
        buildMainGraph(stackedData);
        overview.selectAll("g").remove();
        buildOverviewGraph(overviewStackedData);
    }

    // Deep copies an obj
    function deepCopy(obj) {
        if (Object.prototype.toString.call(obj) === '[object Array]') {
            var out = [], i = 0, len = obj.length;
            for (; i < len; i++) {
                out[i] = arguments.callee(obj[i]);
            }
            return out;
        }
        if (typeof obj === 'object') {
            var out = {}, i;
            for (i in obj) {
                out[i] = arguments.callee(obj[i]);
            }
            return out;
        }
        return obj;
    }

}
//////////////////////////////////////////////////////////////////////////////////////////////
function populateDivWithErrorBarChart(thedatasource, thediv, siteName, siteID, thedatefrom, thedateto) {
    dataHub.getTrendingDataForPeriod(siteID, $('#contourColorScaleSelect').val(), thedatefrom, thedateto, postedUserName).done(function (data) {
        cache_ErrorBar_Data = data;
        buildErrorBarChart(data, thediv, siteName, siteID, thedatefrom, thedateto);
    }).fail(function (msg) {
        alert(msg);
    });
}

function buildErrorBarChart(data, thediv, siteName, siteID, thedatefrom, thedateto) {
    function drawCap(ctx, x, y, radius) {
        ctx.beginPath();
        ctx.lineTo(x + radius, y);
        ctx.lineTo(x - radius, y);
        ctx.stroke();
    }

    if (data == null)
        return;

    var dataPoints = {
        show: true,
        radius: 2
    }

    var errorBars = {
        show: false,
        errorbars: "y",
        lineWidth: 0.5,
        radius: 0.5,
        yerr: { show: true, asymmetric: true, upperCap: drawCap, lowerCap: drawCap, shadowSize: 0, radius: 3 }
    }

    var graphData = [
        { color: "", points: { show: true, radius: 0.5 }, data: [], visible: false, label: 'Max' },
        { color: "#90ed7d", points: dataPoints, data: [], label: 'Average', visible: true, type: 'points' },
        { color: "", points: { show: true, radius: 0.5 }, data: [], visible: false, label: 'Min' },
        { color: "black", points: errorBars, data: [], label: "Range", visible: true, type: 'errorbar' }
    ];

    $.each(data, function (_, point) {
        var mid = (point.Maximum + point.Minimum) / 2;
        graphData[0].data.push([new Date(point.Date).getTime(), point.Maximum]);
        graphData[1].data.push([new Date(point.Date).getTime(), point.Average]);
        graphData[2].data.push([new Date(point.Date).getTime(), point.Minimum]);
        graphData[3].data.push([new Date(point.Date).getTime(), mid, mid - point.Minimum, point.Maximum - mid]);
    });


    //Set mins and maxes
    var xMin = new Date(thedatefrom).getTime();
    var xMax = new Date(thedateto).getTime();

    $('#' + thediv).empty();
    //initiate plot
    var plot = $.plot($('#' + thediv), graphData, {
        legend: {
            show: false
        },
        series: {
            lines: {
                show: false
            }
        },
        xaxis: {
            mode: "time",
            zoomRange: [60000 * 15, xMax],
            panRange: [xMin, xMax],
            min: xMin,
            max: xMax
        },
        yaxis: {
            zoomRange: false /*[0.5, yMax+1]*/,
            //panRange: [yMin-1,yMax+1],
        },
        zoom: {
            interactive: true
        },
        pan: {
            interactive: false
        },
        grid: {
            hoverable: true,
            clickable: true
        },
        selection: { mode: "x" }
    });

    $("<div id='tooltip'></div>").css({
        position: "absolute",
        display: "none",
        border: "1px solid #fdd",
        padding: "2px",
        "background-color": "#fee",
        opacity: 0.80
    }).appendTo("body");

    $('#' + thediv).unbind("plothover");
    $('#' + thediv).bind("plothover", function (event, pos, item) {
        if (item) {
            var time = $.plot.formatDate($.plot.dateGenerator(item.datapoint[0], { timezone: "utc" }), "%l:%M:%S %P");
            var thedate = $.plot.formatDate($.plot.dateGenerator(item.datapoint[0], { timezone: "utc" }), "%m/%d/%Y");

            var html = '<div>' + thedate + '</div>';
            html += '<div>' + item.series.label + ': <span style="font-weight:bold">' + (item.series.label !== 'Range' ? parseFloat(item.datapoint[1]).toFixed(3) : (item.datapoint[1] - item.datapoint[2]).toFixed(3) + ' - ' + (item.datapoint[1] + item.datapoint[3]).toFixed(3)) + '</span></div>';
            $("#tooltip").html(html)
                .css({ top: item.pageY + -50, left: item.pageX - 100, border: '1px solid ' + item.series.color })
                .fadeIn(200);
        } else {
            $("#tooltip").hide();
        }

    });

    $('#' + thediv).unbind("plotclick");
    $('#' + thediv).bind("plotclick", function (event, pos, item) {
        if (item) {            
            $('.contourControl').show();
            cache_Contour_Data = null;
            var thedate = $.plot.formatDate($.plot.dateGenerator(item.datapoint[0], { timezone: "utc" }), "%m/%d/%Y");
            manageTabsByDateForClicks(currentTab,thedate, thedate, null);
            cache_Last_Date = thedate;
            getTableDivData('getDetailsForSites' + currentTab, 'Detail' + currentTab, siteName, siteID, thedate);

        }
    });

    $('#' + thediv).unbind("plotselected");
    $('#' + thediv).bind("plotselected", function (event, ranges) {
        var xAxis = plot.getXAxes();

        $.each(xAxis, function (_, axis) {
            var opts = axis.options;
            opts.min = ranges.xaxis.from;
            opts.max = ranges.xaxis.to;
        });

        scaleYAxis(plot, ranges.xaxis.from, ranges.xaxis.to);
        plot.clearSelection();
    });

    $('#' + thediv).unbind("plotzoom");
    $('#' + thediv).bind("plotzoom", function (event, stuff) {
        scaleYAxis(plot);
        plot.clearSelection();
    });

    function scaleYAxis(plot, xMin, xMax) {
        var data = plot.getData();
        var yMin = null, yMax = null;

        $.each(plot.getXAxes(), function (_, xAxis) {
            if (!xMin)
                xMin = xAxis.min;

            if (!xMax)
                xMax = xAxis.max;
        });

        $.each(data, function (i, d) {
            if (d.visible === true) {
                var isAlarmData = (i == 0) || (i == 6);

                $.each(d.data, function (j, e) {
                    if (isAlarmData || (e[0] >= xMin && e[0] <= xMax)) {
                        var eMin = (d.label !== "Range") ? e[1] : e[1] - e[2];
                        var eMax = (d.label !== "Range") ? e[1] : e[1] + e[3];

                        if (yMin == null || yMin > eMin)
                            yMin = eMin;
                        if (yMax == null || yMax < eMax)
                            yMax = eMax;
                    }
                });
            }
        });

        $.each(plot.getYAxes(), function (_, axis) {
            var opts = axis.options;
            var pad = (yMax - yMin) * 0.1;
            opts.min = yMin - pad;
            opts.max = yMax + pad;
        });

        plot.setupGrid();
        plot.draw();
    }


}

function buildMagDurChart(data, thediv) {
    var companyTrace = [{
        x: [],
        y: [],
        name: 'Disturbances',
        text: [],
        type: 'scatter',
        mode: 'markers'
    }];
    $.each(data, function (i, d) {
        companyTrace[0].x.push(d.DurationSeconds);
        companyTrace[0].y.push(d.PerUnitMagnitude * 100);
        companyTrace[0].text.push(d.EventID)
    });

    var layout = {
        title: 'Disturbance Magnitude Duration Scatter Plot',
        hovermode: 'closest',
        //showLink: false,
        //displayLogo: false,
        //autosize: false,
        //width: $('#viewWindow').innerWidth(),
        xaxis: { title: 'Duration (Seconds)', type: 'log', autorange: true, autotick: false, tickvals: [0, 0.001, 0.01, 0.1, 1, 10, 100, 1000, 10000]/*, range: [-3, 4] */ },
        yaxis: { side: 'left', overlaying: 'y', anchor: 'x', title: 'Voltage Magnitude(% of Nominal)'/*, range: [0, 150]*/ },
        //margin: {
        //    l: 15,
        //    r: 15,
        //    t: 50,
        //    b: 50,
        //    pad: 15
        //},
        //height: $('#viewWindow').height() * 0.85,
    };

    dataHub.getCurves().done(function (curves) {

        var curveIds = [];
        $.each(curves, function (index, points) {
            if (curveIds.indexOf(points.ID) < 0)
                curveIds.push(points.ID);
        });
        var lines = []
        $.each(curveIds, function (index, id) {
            companyTrace.push({
                x: $.map(curves, function (curve) { if (curve.ID == id) return parseFloat(curve.DurationSeconds) }),
                y: $.map(curves, function (curve) { if (curve.ID == id) return parseFloat(curve.PerUnitMagnitude) * 100 }),
                name: $.map(curves, function (curve) { if (curve.ID == id) return curve.Name })[0], type: 'scatter', mode: 'lines',
                visible: ($.map(curves, function (curve) { if (curve.ID == id) return curve.Visible })[0] ? true : 'legendonly')
            });
        });

        var plot = Plotly.newPlot(thediv, companyTrace, layout);

        $('#'+ thediv).off('plotly_click');
        $('#'+ thediv).on('plotly_click', function (event, data) {
            window.open(homePath + "Main/OpenSEE?eventid=" + data.points[0].fullData.text[data.points[0].pointNumber] + "&faultcurves=1");
        });
    });

    $(window).off('resize');
    $(window).on('resize', function () {
        Plotly.purge(thediv);
        buildMagDurChart(cache_MagDur_Data, thediv)
    });


}

//////////////////////////////////////////////////////////////////////////////////////////////

function getLocationsAndPopulateMapAndMatrix(currentTab, datefrom, dateto, string) {
    cache_Map_Matrix_Data = null;
    cache_Map_Matrix_Data_Date_From = null;
    cache_Map_Matrix_Data_Date_To = null;

    setMapHeaderDate(datefrom, dateto);
    var meterIds = GetCurrentlySelectedSitesIDs();
    dataHub.getMeterLocations(datefrom, dateto, meterIds, currentTab, userId).done(function (data) {
        data.JSON = JSON.parse(data.Data);
        cache_Map_Matrix_Data_Date_From = this.datefrom;
        cache_Map_Matrix_Data_Date_To = this.dateto;
        cache_Map_Matrix_Data = data;

        plotMapLocations(data, currentTab, this.datefrom, this.dateto);
        plotGridLocations(data, currentTab, this.datefrom, this.dateto, string);
    }).fail(function (msg) {
        alert(msg);
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////

function populateGridMatrix(data, siteID, siteName, colors) {
    var matrixItemID = "#" + "matrix_" + siteID + "_box_" + currentTab;

    $(matrixItemID).empty();

    $(matrixItemID).unbind('click');

    $(matrixItemID)[0].title = siteName + " ";

    $(matrixItemID).append("<div style='font-size: 1em'><div class='faultgridtitle'>" + siteName + "</div>");

    var theGridColor = getColorsForTab(data, colors);

    $(matrixItemID).css("background-color", theGridColor);

    if (parseInt(data.Count) > 0) {
        DrawGridSparklines(data, siteID, siteName, matrixItemID, colors);
    }

    $(matrixItemID).click(function (e) {

        if (!e.shiftKey && !e.ctrlKey ) {
            $('#siteList').multiselect('uncheckAll');                    
        }

        var thisselectedindex = 0;

        $('#siteList').multiselect("widget").find(":checkbox").each(function(item) {
            if (this.title == siteName) {
                thisselectedindex = item;
            }
        });


        $('#siteList').multiselect("widget").find(":checkbox").each(function (item) {

            if (e.shiftKey) {

                if (thisselectedindex > lastselectedindex) {
                    if ((item >= lastselectedindex) && (item <= thisselectedindex)) {
                        if (this.checked == false) this.click();
                    } else {
                        if (this.checked == true) this.click();
                    }
                } else {
                    if ((item >= thisselectedindex) && (item <= lastselectedindex)) {
                        if (this.checked == false) this.click();
                    } else {
                        if (this.checked == true) this.click();
                    }
                }
            } else if (item == thisselectedindex) {
                    this.click();
                    return(false);
            }
        });

        if (!e.shiftKey && !e.ctrlKey) {
            lastselectedindex = thisselectedindex;
        }

        updateGridWithSelectedSites();

        if (e.ctrlKey) {
            if (selectiontimeout != null) clearTimeout(selectiontimeout);
            selectiontimeout = setTimeout('selectsitesincharts()', 1500);
        } else {
            selectsitesincharts();
        }
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////

function updateGridWithSelectedSites() {
        
    $('#siteList').multiselect("widget").find(":checkbox").each(function () {
        var matrixItemID = "#" + "matrix_" + this.value + "_box_" + currentTab;
        if (this.checked) {
            $(matrixItemID).switchClass('matrixButtonBlack', 'matrixButton');
        } else {
            $(matrixItemID).switchClass('matrixButton', 'matrixButtonBlack');
        }
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////
function DrawGridSparklines(data, siteID, siteName, matrixItemID, colors) {
    switch (currentTab) {
        case "Events":
        case "Disturbances":
        case "Breakers":
            populateGridSparklines(data, siteID, siteName, colors);
            break;
        case "Faults":
            $(matrixItemID).append("<div unselectable='on' class='faultgridcount'>" + data.Count + "</div>");
            $(matrixItemID)[0].title = siteName + " Faults: " + data.Count;
            break;
        case "Completeness":
        case "Correctness":
            populateGridSparklineDataQuality(data, siteID, siteName, true, colors);
            break;  
        case "Trending":
        case "TrendingData":
        default:
            break;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////
    
function populateGridSparklineDataQuality(data, siteID, siteName, makespark, colors) {
    var sparkvalues = [];

    var colorMap = [];

    var completeness = parseInt(data.GoodPoints) + parseInt(data.LatchedPoints) + parseInt(data.NoncongruentPoints) + parseInt(data.UnreasonablePoints);

    sparkvalues = [parseInt(data.ExpectedPoints), completeness, parseInt(data.DuplicatePoints)];

    var matrixItemID = "#" + "matrix_" + siteID + "_box_" + currentTab;

    $(matrixItemID).append($("<div unselectable='on' class='sparkbox' id='" + "sparkbox_" + siteID + "_box_" + currentTab + "'/>"));

    var colorMap = ["#FF0000","#00FF00","#0000FF"]

    if (!makespark) return;
    $("#sparkbox_" + siteID + "_box_" + currentTab).sparkline(sparkvalues, {
        type: 'bar',
        tooltipFormatter: function (sp, options, fields) {
            var thetitle = "";
            thetitle += "<table class='table' style='margin-right: 10px'>";
            thetitle += "<tr><td colspan=2 align='center'>" + data.Name + "</td></tr>";
            thetitle += "<tr><td><span style='color: #ff0000'>&#9679;</span> Expected:</td><td align='right'>" + data.ExpectedPoints + "</td></tr>";
            thetitle += "<tr><td><span style='color: #00ff00'>&#9679;</span> Received:</td><td align='right'>" + completeness + "</td></tr>";
            thetitle += "<tr><td><span style='color: #0000ff'>&#9679;</span> Duplicate:</td><td align='right'>" + data.DuplicatePoints + "</td></tr>";
            thetitle += "</table>";
            return (thetitle);
        }
    });

}
//////////////////////////////////////////////////////////////////////////////////////////////

function populateGridSparklines(data, siteID, siteName, colors) {
    var sparkValues = {}; // = { "Interruption": { data: data[0], color: globalcolorsEvents[5] }, "Fault": { data: data[1], color: globalcolorsEvents[4] }, "Sag": { data: data[2], color: globalcolorsEvents[3] }, "Transient": { data: data[3], color: globalcolorsEvents[2] }, "Swell": { data: data[4], color: globalcolorsEvents[1] }, "Other": { data: data[5], color: globalcolorsEvents[0] } };
    $.each(Object.keys(data), function (i, key) {
        if (key != "Count" && key != "ID" && key != "Name" && key != "Latitude" && key != "Longitude")
            sparkValues[key] = { data: data[key], color: colors[key] };
    });

    var numbers = [];
    var color = [];
    $.each($.map(disabledList[currentTab], function (data, key) { if (!data) return key }), function (index, field) {
        if (sparkValues[field] != null) {
            numbers.push(parseInt(sparkValues[field].data));
            color.push(sparkValues[field].color);
        }
    });

    var matrixItemID = "#" + "matrix_" + siteID + "_box_" + currentTab;

    $(matrixItemID).append($("<div unselectable='on' class='sparkbox' id='" + "sparkbox_" + siteID + "_box_" + currentTab + "'/>"));

    $("#sparkbox_" + siteID + "_box_" + currentTab).sparkline(numbers, {
        type: 'bar',
        colorMap: color,
        tooltipFormatter: function (sparkline, options, fields) {
            var thetitle = "";
            thetitle += "<table class='table' style='margin-right: 10px'>";
            thetitle += "<tr><td colspan=2 align='center'>" + data.Name + "</td></tr>";
            $.each(Object.keys(data), function (i, key) {
                if (key != "Count" && key != "ID" && key != "Name" && key != "Latitude" && key != "Longitude")
                    thetitle += "<tr><td><span style='color:"+colors[key]+"'>&#9679;</span>" + key + ":</td><td align='right'>" + data[key] + "</td></tr>";
            });
            thetitle += "</table>";
            return thetitle
        }
    });

}

//////////////////////////////////////////////////////////////////////////////////////////////

function SelectAdd(theControlID,theValue,theText,selected) {

    var exists = false;

    $('#' + theControlID + ' option').each(function () {
        if (this.innerHTML == theText) {
            exists = true;
            return false;
        }
    });

    if (!exists) {
        $('#' + theControlID).append("<option value='" + theValue + "' " + selected+ ">" + theText + "</option>");
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////

function showSiteSet(thecontrol) {

    var mapormatrix = $("#map" + currentTab + "Grid")[0].value;

    if (mapormatrix == "Grid") {

        var gridchildren = $("#theMatrix" + currentTab)[0];

        switch (thecontrol.value) {

            case "All":
                $.each(gridchildren.children, function (key, value) {
                    $(value).show();
                });

                break;

            case "Events":
                $.each(gridchildren.children, function (key, value) {
                    if ($(value).css('background-color') != "rgb(14, 137, 44)" && $(value).css('background-color') != "#0E892C")
                    {
                        $(value).show();
                    }
                    else
                    {
                        $(value).hide();
                    }
                });

                break;

            case "NoEvents":
                $.each(gridchildren.children, function (key, value) {
                    if ($(value).css('background-color') != "rgb(14, 137, 44)" && $(value).css('background-color') != "#0E892C") {
                        $(value).hide();
                    }
                    else {
                        $(value).show();
                    }
                });

                break;

            case "Disturbances":
                $.each(gridchildren.children, function (key, value) {
                    if ($(value).data("gridstatus") != "0") {
                        $(value).show();
                    }
                    else {
                        $(value).hide();
                    }
                });

                break;

            case "RecievedData":
                $.each(gridchildren.children, function (key, value) {
                    if ($(value).css('background-color') != "rgb(0, 0, 0)") {
                        $(value).show();
                    }
                    else {
                        $(value).hide();
                    }
                });

                break;

            case "NoDisturbances":
                $.each(gridchildren.children, function (key, value) {
                    if ($(value).data("gridstatus") != "0") {
                        $(value).hide();
                    }
                    else {
                        $(value).show();
                    }
                });

                break;

            case "NoData":
                $.each(gridchildren.children, function (key, value) {
                    if ($(value).css('background-color') != "rgb(0, 0, 0)") {
                        $(value).hide();
                    }
                    else {
                        $(value).show();
                    }
                });

                break;




            case "SelectedSites":

                var selectedIDs = GetCurrentlySelectedSites();

                $.each(gridchildren.children, function (key, value) {
                    if ($.inArray ($(value).data('siteid'), selectedIDs) > -1) {
                        $(value).show();
                    } else {
                        $(value).hide();
                    }
                });
                break;

            case "None":
                $.each(gridchildren.children, function (key, value) {
                    $(value).hide();
                });

                break;
            default:
                break;
        }

        resizeMatrixCells(currentTab);

    }

    if (mapormatrix == "Map") {
        switch (thecontrol.value) {
            case "All":
                $.each($(leafletMap[currentTab].getPanes().markerPane).children(), function (index, marker) {
                    $(marker).show();
                });
                break;

            case "None":
                $.each($(leafletMap[currentTab].getPanes().markerPane).children(), function (index, marker) {
                    $(marker).hide();
                });
                break;


            case "Events":
                $.each($(leafletMap[currentTab].getPanes().markerPane).children(), function (index, marker) {
                    if ($(marker).children().children().attr('fill') !== '#0E892C')
                        $(marker).show();
                    else
                        $(marker).hide();
                });
                break;

            case "NoEvents":
                $.each($(leafletMap[currentTab].getPanes().markerPane).children(), function (index, marker) {
                    if ($(marker).children().children().attr('fill') === '#0E892C')
                        $(marker).show();
                    else
                        $(marker).hide();
                });
                break;

            case "Disturbances":
                $.each($(leafletMap[currentTab].getPanes().markerPane).children(), function (index, marker) {
                    if ($(marker).children().children().attr('fill') !== '#0E892C')
                        $(marker).show();
                    else
                        $(marker).hide();
                });
                break;

            case "NoDisturbances":
                $.each($(leafletMap[currentTab].getPanes().markerPane).children(), function (index, marker) {
                    if ($(marker).children().children().attr('fill') === '#0E892C')
                        $(marker).show();
                    else
                        $(marker).hide();
                });
                break;

            case "SelectedSites":
                var selectedIDs = GetCurrentlySelectedSites();
                $.each($(leafletMap[currentTab].getPanes().markerPane).children(), function (index, marker) {
                    if ($.inArray($(marker).children().attr('id').replace('-', '|'), selectedIDs) > -1)
                        $(marker).show();
                    else
                        $(marker).hide();
                });
                break;

            case "Sags":
                var selectedIDs = GetCurrentlySelectedSites();
                $.each($(leafletMap[currentTab].getPanes().markerPane).children(), function (index, marker) {
                    if ($(marker).children().children().attr('fill') === '#996633')
                        $(marker).show();
                    else
                        $(marker).hide();
                });
                break;

            case "Swells":
                var selectedIDs = GetCurrentlySelectedSites();
                $.each($(leafletMap[currentTab].getPanes().markerPane).children(), function (index, marker) {
                    if ($(marker).children().children().attr('fill') === '#ff0000')
                        $(marker).show();
                    else
                        $(marker).hide();
                });
                break;

            case "RecievedData":
                $.each($(leafletMap[currentTab].getPanes().markerPane).children(), function (index, marker) {
                    if ($(marker).children().children().attr('fill') !== '#000000')
                        $(marker).show();
                    else
                        $(marker).hide();
                });
                
                break;

            case "NoData":
                $.each($(leafletMap[currentTab].getPanes().markerPane).children(), function (index, marker) {
                    if ($(marker).children().children().attr('fill') === '#000000')
                        $(marker).show();
                    else
                        $(marker).hide();
                });

                break;

            default:
                break;


        }
    }

    if (mapormatrix == "Values") {

    }
}

//////////////////////////////////////////////////////////////////////////////////////////////

function plotGridLocations(locationdata, newTab, thedatefrom, thedateto) {
    /// Clear Matrix
    if ($("#theMatrix" + newTab)[0].childElementCount > 0) {
        $("#theMatrix" + newTab).empty();
    }

    var selectedIDs = GetCurrentlySelectedSites();

    // For each data unit, build containers, add to layer based on status
    $.each(locationdata.JSON, function (key, value) {
        var theindex = $.inArray(value.Name + "|" + value.ID, selectedIDs);
 
        var item;

        if (theindex > -1) {
            item = $("<div unselectable='on' class='matrix matrixButton noselect' id='" + "matrix_" + value.ID + "_box_" + newTab + "'/>");

        } else {
            item = $("<div unselectable='on' class='matrix matrixButtonBlack noselect' id='" + "matrix_" + value.ID + "_box_" + newTab + "'/>");
        }

        item.data('gridstatus', value.Event_Count);
        item.data('siteid', value.name + "|" + value.ID);
        $("#theMatrix" + newTab).append(item);

    });

    /// Set Matrix Cell size
    cache_Sparkline_Data = locationdata;
    showSiteSet($("#selectSiteSet" + currentTab)[0]);
};

/////////////////////////////////////////////////////////////////////////////////////////

function plotMapLocations(locationdata, newTab, thedatefrom, thedateto) {
    var selectedIDs = GetCurrentlySelectedSites();
    if (leafletMap[currentTab] !== null){
        $.each(locationdata.JSON, function (index, data) {
            $('#' + data.Name.replace(/[^A-Za-z0-9]/g, "") + '-' + data.ID + ' circle').attr('fill', getColorsForTab(data, locationdata.Colors));
            $.each(mapMarkers[currentTab], function (mmIndex, object) {
                if(object.id === data.ID)
                    object.marker.getPopup().setContent(getLeafletLocationPopup(data))
            });
        });
    }
    else {
        loadLeafletMap('theMap' + currentTab);

        $.each(locationdata.JSON, function (index, data) {
            var color = getColorsForTab(data, locationdata.Colors);

            var html = '<svg height="12" width="12" id="' + data.Name.replace(/[^A-Za-z0-9]/g, "") + '-' + data.ID + '">' +
                            '<circle cx="6" cy ="6" r="4" stroke="black" stroke-width="1" fill="' + color + '"/>' +
                       '</svg>';

            var popup = getLeafletLocationPopup(data);

            var circleIcon = L.divIcon({ className: 'leafletCircle', html: html });

            var marker = L.marker([data.Latitude, data.Longitude], { icon: circleIcon }).addTo(leafletMap[currentTab]).bindPopup(popup);

            marker.on('click', function (event) {
                if (!event.originalEvent.ctrlKey) {
                    $('#siteList').multiselect("uncheckAll");
                }

                if ($('#siteList').multiselect("option").multiple) {

                    $('#siteList').multiselect("widget").find(":checkbox").each(function () {
                        if (this.value == data.ID) {
                            this.click();
                        }

                    });

                    selectsitesincharts();

                } else {
                    $('#siteList').multiselect("widget").find(":radio[value='" + data.ID + "']").each(function () { this.click(); });
                    $('#siteList').multiselect('refresh');
                }

            });

            marker.on('mouseover', function (event) {
                marker.openPopup();
            });

            marker.on('mouseout', function (event) {
                marker.closePopup();
            });
            if ($.inArray(data.Name + "|" + data.ID, selectedIDs) > -1)
                mapMarkers[currentTab].push({ id: data.ID, marker: marker });
        });

        // Hack: if displaying an overlay for animation,
        //       do not automatically fit bounds
        if (!locationdata.URL) {
            markerGroup = new L.featureGroup(mapMarkers[currentTab].map(function (a) { return a.marker; }));
            if(markerGroup.getBounds().isValid())
                leafletMap[currentTab].fitBounds(markerGroup.getBounds());
            leafletMap[currentTab].setMaxBounds(L.latLngBounds(L.latLng(-180,-270), L.latLng(180,270)));
        }

        var timeoutVal;
        leafletMap[currentTab].off('boxzoomend');
        leafletMap[currentTab].on('boxzoomend', function (event) {
            $('#siteList').multiselect("uncheckAll");

            $.each(locationdata.JSON, function (index, data) {
                if (data.Latitude >= event.boxZoomBounds._southWest.lat && data.Latitude <= event.boxZoomBounds._northEast.lat
                    && data.Longitude >= event.boxZoomBounds._southWest.lng && data.Longitude <= event.boxZoomBounds._northEast.lng) {
                    if ($('#siteList').multiselect("option").multiple) {

                        $('#siteList').multiselect("widget").find(":checkbox").each(function () {
                            if (this.value == data.ID) {
                                this.click();
                            }

                        });
                    } else {
                        $('#siteList').multiselect("widget").find(":radio[value='" + data.ID + "']").each(function () { this.click(); });
                        $('#siteList').multiselect('refresh');
                    }

                }
            });

            clearTimeout(timeoutVal);
            timeoutVal = setTimeout(function () {
                selectsitesincharts();
            }, 500);

        });


    }
    showSiteSet($('#selectSiteSet' + currentTab)[0]);
    plotMapPoints(locationdata, thedatefrom, thedateto);
};

/////////////////////////////////////////////////////////////////////////////////////////////////
function getColorsForTab(dataPoint, colors) {
    var color = '#000000';

    if (currentTab === "TrendingData") {
        color = 'rgb(0,255,0)'; // green
        if (dataPoint[$('#trendingDataTypeSelection').val()] === null) color = '#000000'  // black  
    }
    else if (currentTab === "Correctness") {
        var percentage = (parseFloat(dataPoint.GoodPoints) / (parseFloat(dataPoint.GoodPoints) + parseFloat(dataPoint.LatchedPoints) + parseFloat(dataPoint.UnreasonablePoints) + parseFloat(dataPoint.NoncongruentPoints)) * 100).toFixed(2);

        if (dataPoint.Count == 0) {
            color = '#0000FF';
        } else if (percentage > 100) {
            color = colors["> 100%"];
        } else if (percentage <= 100 && percentage >= 98) {
            color = colors["98% - 100%"];
        } else if (percentage < 98 && percentage >= 90) {
            color = colors["90% - 97%"];
        } else if (percentage < 90 && percentage >= 70) {
            color = colors["70% - 89%"];
        } else if (percentage < 70 && percentage >= 50) {
            color = colors["50% - 69%"];
        } else if (percentage < 50 && percentage > 0) {
            color = colors[">0% - 49%"];
        } else {
            color = colors["0%"];
        }
    }
    else if (currentTab == "Completeness") {
        var percentage = ((parseFloat(dataPoint.GoodPoints) + parseFloat(dataPoint.LatchedPoints) + parseFloat(dataPoint.UnreasonablePoints) + parseFloat(dataPoint.NoncongruentPoints)) / parseFloat(dataPoint.ExpectedPoints) * 100).toFixed(2);

        if (dataPoint.Count == 0) {
            color = '#0000FF';
        } else if (percentage > 100) {
            color = colors["> 100%"];
        } else if (percentage <= 100 && percentage >= 98) {
            color = colors["98% - 100%"];
        } else if (percentage < 98 && percentage >= 90) {
            color = colors["90% - 97%"];
        } else if (percentage < 90 && percentage >= 70) {
            color = colors["70% - 89%"];
        } else if (percentage < 70 && percentage >= 50) {
            color = colors["50% - 69%"];
        } else if (percentage < 50 && percentage > 0) {
            color = colors[">0% - 49%"];
        } else {
            color = colors["0%"];
        }
    }
    else if (currentTab === "Breakers") {
        if (dataPoint.Count == 0) {
            color = '#0E892C';
        } else {
            color = '#CC3300';
        }

    }
    else if (currentTab === "Trending") {
        if (dataPoint.Count == 0) 
            color = '#0E892C';
        else if(dataPoint.Alarm > 0)
            color = colors['Alarm'];
        else 
            color = colors['Offnormal']
    }

    else if (currentTab === "Faults") {
            if (dataPoint.Count == 0) 
                color = '#0E892C';
            else 
                color = '#CC3300';
    }
    else if (currentTab === "Disturbances") {
        if (dataPoint.Count == 0)
            color = '#0E892C';
        else if (dataPoint["5"] > 0)
            color = colors["5"];
        else if (dataPoint["4"] > 0)
            color = colors["4"];
        else if (dataPoint["3"] > 0)
            color = colors["3"];
        else if (dataPoint["2"] > 0)
            color = colors["2"];
        else if (dataPoint["1"] > 0)
            color = colors["1"];
        else if (dataPoint["0"] > 0)
            color = colors["0"];
    }
    else if (currentTab === "Events") {
        if (dataPoint.Count == 0)
            color = '#0E892C';
        else if (dataPoint.Fault > 0)
            color = colors["Fault"];
        else if (dataPoint.Interruption > 0)
            color = colors["Interruption"];
        else if (dataPoint.Sag > 0)
            color = colors["Sag"];
        else if (dataPoint.Swell > 0)
            color = colors["Swell"];
        else if (dataPoint.Other > 0)
            color = colors["Other"];
        else 
            color = '#0E892C';
    }
    return color;

}

//////////////////////////////////////////////////////////////////////////////////////////////////
function getLeafletLocationPopup(dataPoint) {
    var popup;
    popup = "<table><tr><td>Site:&nbsp;</td><td style='text-align: right'>&nbsp;" + dataPoint.Name + "&nbsp;</td></tr>";
    $.each(Object.keys(dataPoint), function (i, key) {
        if(key != "ID" && key != "Name" && key != "Longitude" && key != "Latitude")
            popup += "<tr><td>"+ key +":&nbsp;</td><td style='text-align: right'>&nbsp;" + dataPoint[key] + "&nbsp;</td></tr>";
    });
    popup += "</table>";

    return popup;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
function plotMapPoints(data, thedatefrom, thedateto) {
    $('.contourControl').hide();

    if (currentTab === "TrendingData") {

        if (data.URL)
            loadContourOverlay(data);
        else {
            thedatasent = {
                contourQuery: {
                    Meters: getBase64MeterSelection(),
                    StartDate: thedatefrom,
                    EndDate: thedateto,
                    DataType: $('#trendingDataTypeSelection').val(),
                    ColorScaleName: $('#contourColorScaleSelect').val(),
                    UserName: postedUserName,
                    MeterGroup: $('#meterGroupSelect').val()
                }
            };

            loadContourLayer(thedatasent.contourQuery);

        }
        if (thedatefrom === thedateto)
            $('.contourControl').show();

    }

    $('.info.legend.leaflet-control').remove();
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            labels = [];
        div.innerHTML += "<h4><button class='btn btn-link' style='padding: 0;'data-toggle='collapse' data-target='#innerLegend'><u>Legend</u></button></h4>" +
            "<div id='innerLegend' class='collapse'></div>";
        // loop through our density intervals and generate a label with a colored square for each interval
        return div;
    };

    legend.addTo(leafletMap[currentTab]);

    if (currentTab === "TrendingData") {
        for (var i = data.ColorDomain.length - 2; i >= 1; i -= 1) {
            if (i === data.ColorDomain.length - 2) {
                $('#innerLegend').append('<div class="row"><i style="background: #' + data.ColorRange[i].toString(16).slice(2) + '"></i> >' + data.ColorDomain[i].toFixed(2) + '</div>');
            }
            else if (i == 1) {
                $('#innerLegend').append('<div class="row"><i style="background: #' + data.ColorRange[i].toString(16).slice(2) + '"></i> <' + data.ColorDomain[i].toFixed(2) + '</div>');
            }
            else if (i % 2 !== 0) {
                $('#innerLegend').append('<div class="row"><i style="background: #' + data.ColorRange[i].toString(16).slice(2) + '"></i> ' + data.ColorDomain[i - 1].toFixed(2) + '&ndash;' + data.ColorDomain[i + 1].toFixed(2) + '</div>');
            }
        }
    }
    else if (currentTab === "Breakers") {
        $('#innerLegend').append('<div class="row"><i style="background: #CC3300"></i> Breaker Events</div>');
        $('#innerLegend').append('<div class="row"><i style="background: #0E892C"></i> No Breaker Events</div>');
    }
    else if (currentTab === "Faults") {
        $('#innerLegend').append('<div class="row"><i style="background: #CC3300"></i> Faults</div>');
        $('#innerLegend').append('<div class="row"><i style="background: #0E892C"></i> No Faults</div>');
    }
    else {
        $.each(Object.keys(data.Colors), function(i, key){
            $('#innerLegend').append('<div class="row"><i style="background: ' + data.Colors[key]+ '"></i> ' + key + '</div>');
        });
        $('#innerLegend').append('<div class="row"><i style="background: #0E892C"></i>None</div>');
        LoadHeatmapLeaflet(data);
    }

    legend.getContainer().addEventListener('mouseover', function () {
        leafletMap[currentTab].dragging.disable();
        leafletMap[currentTab].doubleClickZoom.disable();
        leafletMap[currentTab].touchZoom.disable();
        leafletMap[currentTab].scrollWheelZoom.disable();
        leafletMap[currentTab].boxZoom.disable();
        leafletMap[currentTab].keyboard.disable();
    });

    legend.getContainer().addEventListener('mouseout', function () {
        leafletMap[currentTab].dragging.enable();
        leafletMap[currentTab].doubleClickZoom.enable();
        leafletMap[currentTab].touchZoom.enable();
        leafletMap[currentTab].scrollWheelZoom.enable();
        leafletMap[currentTab].boxZoom.enable();
        leafletMap[currentTab].keyboard.enable();
    });


}

//////////////////////////////////////////////////////////////////////////////////////////////

function showHeatmap(thecontrol) {
    if ($(thecontrol).val() == "MinimumSags" || $(thecontrol).val() == "MaximumSwell") {
        dataHub.getLocationsHeatmap(contextfromdate, contexttodate, GetCurrentlySelectedSitesIDs(), $(thecontrol).val()).done(function (data) {
            data.JSON = JSON.parse(data.Data);
            LoadHeatmapLeaflet(data);
        });
    }
    else {
        if(cache_Map_Matrix_Data != null)
            LoadHeatmapLeaflet(cache_Map_Matrix_Data);
        else {
            dataHub.getMeterLocations(contextfromdate, contexttodate, GetCurrentlySelectedSitesIDs(), currentTab, userId).done(function (data) {
                data.JSON = JSON.parse(data.Data);
                LoadHeatmapLeaflet(data);
            });
        }
    }

}

function LoadHeatmapLeaflet(thedata) {
    var GLOBE_WIDTH = 256; // a constant in Google's map projection
    var west = (markerGroup.getBounds()._southWest != undefined? markerGroup.getBounds()._southWest.lng: 84.3880);
    var east = (markerGroup.getBounds()._northEast != undefined ? markerGroup.getBounds()._northEast.lng : 84.3880);
    var angle = east - west;
    if (angle < 0) {
        angle += 360;
    }

    var zoom = Math.round(Math.log(($('#theMap' + currentTab).width() < 500 ? 500 : $('#theMap' + currentTab).width()) * 360 / angle / GLOBE_WIDTH) / Math.LN2);
    var cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        // if scaleRadius is false it will be the constant radius used in pixels
        "radius": 50 / Math.pow(2, (zoom > 13 ? 13 : zoom )),
        "maxOpacity": .5,
        // scales the radius based on map zoom
        "scaleRadius": true,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries 
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": true,
        // which field name in your data represents the latitude - default "lat"
        latField: 'Latitude',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'Longitude',
        // which field name in your data represents the data value - default "value"
        valueField: 'status'
    };

    $(leafletMap[currentTab].getPanes().overlayPane).children().remove();
    var testData = { data: thedata.JSON.filter(function (currentValue, index, array) { return currentValue.Count > 0; }), min: 1, max: 100 };
    var heatmapLayer = new HeatmapOverlay(cfg);
    var heatmap = L.layerGroup().addLayer(heatmapLayer).addTo(leafletMap[currentTab]);
    heatmapLayer.setData(testData);
    L.control.layers().addOverlay(heatmap, "Heatmap layer");
}

function highlightDaysInCalendar(date) {
    var i = -1;

    //if ((i = $.inArray(date.toString().substr(0, 16), calendardatesEvents)) > -1) {

        switch ( currentTab ) {
        
            case "Events":
                if ((i = $.inArray(date.toString().substr(0, 16), calendardatesEvents)) > -1) {
                    return [true, 'highlight', calendartipsEvents[i]];
                }

                break;

            case "Faults":
                if ((i = $.inArray(date.toString().substr(0, 16), calendardatesEvents)) > -1) {
                    if (calendartipsEvents[i].indexOf("Fault") > -1) {
                        return [true, 'highlight', calendartipsEvents[i]];
                    }
                }
                break;

            case "Trending":
                if ((i = $.inArray(date.toString().substr(0, 16), calendardatesTrending)) > -1) {
                    return [true, 'highlight', calendartipsTrending[i]];
                }
                break;

            case "Breakers":
                if ((i = $.inArray(date.toString().substr(0, 16), calendardatesBreakers)) > -1) {
                    return [true, 'highlight', calendartipsBreakers[i]];
                }
                break;
        }
    
    return [true, ''];
}

//////////////////////////////////////////////////////////////////////////////////////////////

function ManageLocationClick(siteName, siteID) {
    var thedatefrom = moment($('#dateRange').data('daterangepicker').startDate._d.toISOString()).utc().format('YYYY-MM-DD') + "T00:00:00Z";
    var thedateto = moment($('#dateRange').data('daterangepicker').endDate._d.toISOString()).utc().format('YYYY-MM-DD') + "T00:00:00Z";

    if ((thedatefrom == "") || (thedateto == "")) return;

    if (currentTab == "TrendingData")
        populateDivWithErrorBarChart('getTrendingDataForPeriod', 'Overview' + currentTab, siteName, siteID, thedatefrom, thedateto);
    else
        populateDivWithBarChart( 'Overview' + currentTab, siteName, siteID, thedatefrom, thedateto);

}

//////////////////////////////////////////////////////////////////////////////////////////////

function manageTabsByDate(theNewTab, thedatefrom, thedateto) {

    if ((thedatefrom == "") || (thedateto == "")) return;

    currentTab = theNewTab;

    //reflowContents(theNewTab);
    resizeMapAndMatrix(theNewTab);
    selectsitesincharts();

    getLocationsAndPopulateMapAndMatrix(theNewTab, thedatefrom, thedateto, "undefined");
    //resizeMapAndMatrix(theNewTab);
}

function manageTabsByDateForClicks(theNewTab, thedatefrom, thedateto, filter) {

    if ((thedatefrom == "") || (thedateto == "")) return;

    currentTab = theNewTab;
    getLocationsAndPopulateMapAndMatrix(theNewTab, thedatefrom, thedateto, filter);
}


//////////////////////////////////////////////////////////////////////////////////////////////

function reflowContents(newTab) {
    resizeMapAndMatrix(newTab);
}

//////////////////////////////////////////////////////////////////////////////////////////////

function resizeDocklet( theparent , chartheight ) {
    var thedatefrom = moment($('#dateRange').data('daterangepicker').startDate._d.toISOString()).utc().format('YYYY-MM-DD') + "T00:00:00Z";
    var thedateto = moment($('#dateRange').data('daterangepicker').endDate._d.toISOString()).utc().format('YYYY-MM-DD') + "T00:00:00Z";

    var selectedIDs = GetCurrentlySelectedSites();

    var siteName = selectedIDs.length + " of " + $('#siteList')[0].length + " selected";

    var siteID = "";

    if (selectedIDs.length > 0) {

        var thedetails = selectedIDs[0].split('|');

        if (selectedIDs.length == 1) {
            siteName = thedetails[0];
        }

        $.each(selectedIDs, function (key, value) {
            thedetails = value.split('|');
            siteID += thedetails[1] + ",";
        });
    }

    theparent.css("height", chartheight);

    var firstChild = $("#" + theparent[0].firstElementChild.id);

    firstChild.css("height", chartheight);
    if (currentTab === "TrendingData") {
        if ($('#Overview' + currentTab).children().length > 0 && cache_ErrorBar_Data !== null)
            buildErrorBarChart(cache_ErrorBar_Data, 'Overview' + currentTab, siteName, siteID, thedatefrom, thedateto);
    }
    else {
        if ($('#Overview' + currentTab).children().length > 0 && cache_Graph_Data !== null)
            buildBarChart(cache_Graph_Data, 'Overview' + currentTab, siteName, siteID, thedatefrom, thedateto);
    }

    if($('#Detail' + currentTab + 'Table').children().length > 0 && cache_Table_Data !== null)
        window["populate" + currentTab + "DivWithGrid"](cache_Table_Data);    
}

//////////////////////////////////////////////////////////////////////////////////////////////

function resizeMapAndMatrix(newTab) {
    var columnheight = $(window).height() - $('#tabs-' + newTab).offset().top - 25;

    $('#tabs-ModbusData').css('height', $(window).height() - $('#tabs-' + currentTab).offset().top);
    $('#tabs-HistorianData').css('height', $(window).height() - $('#tabs-' + currentTab).offset().top);

    $("#theMap" + newTab).css("height", columnheight);

    $("#theMatrix" + newTab).css("height", columnheight);

    var theuncollapsedcount = $("#Portlet1" + currentTab).closest(".column").children().children().find('.ui-icon-minusthick').length;

    if (theuncollapsedcount != 0) {
        var chartheight = (columnheight - 24) / theuncollapsedcount;
        resizeDocklet($("#DockOverview" + newTab), chartheight);
        resizeDocklet($("#DockDetail" + newTab), chartheight);
    }
    if (leafletMap[currentTab] !== null) {
        var onResize = function () {
            markerGroup = new L.featureGroup(mapMarkers[currentTab].map(function (a) { return a.marker; }));
            if (markerGroup.getBounds().isValid())
                leafletMap[currentTab].fitBounds(markerGroup.getBounds());
        };

        // Hack: If the map does need to resize, onResize must be called twice.
        //       Otherwise, it only needs to be called once.
        leafletMap[currentTab].on('resize', onResize);
        try{
            leafletMap[currentTab].invalidateSize(true);
        }
        catch(ex){

        }
        leafletMap[currentTab].off('resize', onResize);
        onResize();
    }
    resizeMatrixCells(newTab);
}

//////////////////////////////////////////////////////////////////////////////////////////////

function resizeMatrixCells(newTab) {
    var h = $("#theMatrix" + newTab).height();
    var w = $("#MapMatrix" + newTab).width();
    var r = $('#siteList')[0].length;

    if($('#selectSiteSet' + currentTab).val() === "SelectedSites" )
        r = $('#siteList').val().length;
    else if ($('#selectSiteSet' + currentTab).val() === "All") 
        r = $('#siteList')[0].length;
    else {
        r = 0;
        $.each($('.matrix'), function (i, element) {
            if ($(element).is(':visible'))
                ++r;
        });
    }


    if (h > 0 && w > 0 && r > 0) {
        var columns = Math.floor(Math.sqrt(r));
        var rows = Math.ceil(r / columns);
        $(".matrix").css("width", (w / columns) - 4);
        $(".matrix").css("height", (h / rows) - 2);

        if ($(".matrix").width() < 200) {
            $('.faultgridtitle').css("font-size", '10px');
        }
        else if ($(".matrix").width() < 1000) {
            $('.faultgridtitle').css("font-size", '20px');
        }
        else {
            $('.faultgridtitle').css("font-size", '30px');
        }

        $.event.trigger({ type: 'matrixResize', message: 'Matrix Resize', time: new Date() });

    }
    if (cache_Sparkline_Data !== null) {
          $.each(cache_Sparkline_Data.JSON, (function (key, value) {
              populateGridMatrix(value, value.ID, value.Name, cache_Sparkline_Data.Colors);
          }));
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////

function initializeDatePickers(datafromdate , datatodate) {

    dateRangeOptions.startDate = moment(datafromdate).utc();
    dateRangeOptions.endDate = moment(datatodate).utc();

    $('#dateRange').daterangepicker(dateRangeOptions, function (start, end, label) {
        $('#dateRangeSpan').html(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));

        loadDataForDate();
    });

    $('#dateRangeSpan').html(dateRangeOptions.startDate.format('MM/DD/YYYY') + ' - ' + dateRangeOptions.endDate.format('MM/DD/YYYY'));

}

function moveDateBackward() {
    var startDate = $('#dateRange').data('daterangepicker').startDate.clone().startOf('day');
    var endDate = $('#dateRange').data('daterangepicker').endDate.clone().endOf('day');
    var duration = moment.duration(endDate.diff(startDate));

    $('#dateRange').data('daterangepicker').setEndDate(startDate);
    $('#dateRange').data('daterangepicker').setStartDate(startDate.subtract(duration.asDays() - 1, 'days'));

    $('#dateRangeSpan').html($('#dateRange').data('daterangepicker').startDate.format('MM/DD/YYYY') + ' - ' + $('#dateRange').data('daterangepicker').endDate.format('MM/DD/YYYY'));
    loadDataForDate();
}

function moveDateForward() {
    var startDate = $('#dateRange').data('daterangepicker').startDate.clone().startOf('day');
    var endDate = $('#dateRange').data('daterangepicker').endDate.clone().endOf('day');
    var duration = moment.duration(endDate.diff(startDate));

    $('#dateRange').data('daterangepicker').setStartDate(endDate);
    $('#dateRange').data('daterangepicker').setEndDate(endDate.add(duration.asDays() - 1, 'days'));

    $('#dateRangeSpan').html($('#dateRange').data('daterangepicker').startDate.format('MM/DD/YYYY') + ' - ' + $('#dateRange').data('daterangepicker').endDate.format('MM/DD/YYYY'));
    loadDataForDate();
}

//////////////////////////////////////////////////////////////////////////////////////////////

function isRightClick(event) {
    var rightclick;
    if (!event) var event = window.event;
    if (event.which) rightclick = (event.which == 3);
    else if (event.button) rightclick = (event.button == 2);
    return rightclick;
}

//////////////////////////////////////////////////////////////////////////////////////////////

function loadconfigdropdown(currentselected) {
    $('#Configurations')[0].options.length = 0;
    $.each(usersettings.uisettings, function (key, value) {
        SelectAdd("Configurations", key, value.Name, (currentselected == value.Name) ? "selected" : "");
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////

function validatesettings(usersettings) {

    if (typeof (usersettings["lastSetting"]) == 'undefined') {
        initializesettings();
        return (false);
    };

    if (typeof (usersettings["javascriptversion"]) == 'undefined') {
        initializesettings();
        return (false);
    } else if (usersettings["javascriptversion"] != javascriptversion) {
        initializesettings();
        return (false);
    }

    if (typeof (usersettings["disabledList"]) == 'undefined') {
        initializesettings();
        return (false);
    };


    $.each(usersettings.uisettings, function(key, value) {

        if (typeof (value["Name"]) == 'undefined') {
            initializesettings();
            return (false);
        };
        if (typeof (value["CurrentTab"]) == 'undefined') {
            initializesettings();
            return (false);
        };
        if (($('#application-tabs li :visible').map(function (i, a) { return $(a).text(); }).get()).indexOf(value["CurrentTab"]) < 0) {
            initializesettings();
            return (false);
        }
        if (typeof (value["DataFromDate"]) == 'undefined') {
            initializesettings();
            return (false);
        };
        if (typeof (value["DataToDate"]) == 'undefined') {
            initializesettings();
            return (false);
        };

        if (typeof (value["ContextFromDate"]) == 'undefined') {
            initializesettings();
            return (false);
        };
        if (typeof (value["ContextToDate"]) == 'undefined') {
            initializesettings();
            return (false);
        };
        if (typeof (value["MapGrid"]) == 'undefined') {
            initializesettings();
            return (false);
        };
        if (typeof (value["EventSiteDropdownSelected"]) == 'undefined') {
            initializesettings();
            return (false);
        };
        if (typeof (value["staticPeriod"]) == 'undefined') {
            initializesettings();
            return (false);
        };

    });
}

//////////////////////////////////////////////////////////////////////////////////////////////

function configurationapply(item) {
        
    var currentconfigname = $("#Configurations :selected").text();

    usersettings["lastSetting"] = currentconfigname;
    $.jStorage.deleteKey("usersettings");
    $.jStorage.set("usersettings", usersettings);
    $('#dateRange').data('daterangepicker').setStartDate(moment(getcurrentconfigsetting("DataFromDate")).utc());
    $('#dateRange').data('daterangepicker').setEndDate(moment(getcurrentconfigsetting("DataToDate")).utc());
    contextfromdate = getcurrentconfigsetting("ContextFromDate");
    contexttodate = getcurrentconfigsetting("ContextToDate");
    disabledList = usersettings["disabledList"];
    if (contextfromdate === contexttodate) {
        cache_Last_Date = contexttodate;
    }
    else {
        cache_Last_Date = null;
        cache_Table_Data = null;
    }

    var selectedsites = getcurrentconfigsetting("EventSiteDropdownSelected");
    if (selectedsites != null) {
        $('#siteList').multiselect("uncheckAll");
        $('#siteList').val(selectedsites);
    }
    else {
        $('#siteList').multiselect("checkAll");
    }

    $('#siteList').multiselect('refresh');
    
    if ($("#application-tabs").tabs("option", "active") !== ($('#application-tabs li a').map(function (i, a) { return $(a).text(); }).get()).indexOf(getcurrentconfigsetting("CurrentTab")))
        $("#application-tabs").tabs("option", "active", ($('#application-tabs li a').map(function (i, a) { return $(a).text(); }).get()).indexOf(getcurrentconfigsetting("CurrentTab")));
    else 
        manageTabsByDate(currentTab, contextfromdate, contexttodate);

    $(".mapGrid").val(getcurrentconfigsetting("MapGrid"));
    //$("#staticPeriod")[0].value = getcurrentconfigsetting("staticPeriod");

    $.each($('.ranges li'), function (i, a) {
        if ($(a).text() == getcurrentconfigsetting("staticPeriod"))
            $(a).click();
    })


    selectmapgrid($("#map" + currentTab + "Grid")[0]);
}

//////////////////////////////////////////////////////////////////////////////////////////////

function deleteconfirmation(item) {

    var currentconfigname = $("#Configurations :selected").text();

    if (currentconfigname == "Last Session") return;
    if (currentconfigname == "Default") return;

    $('#deleteconfigname')[0].innerText = currentconfigname;

    var dialog = $('#delete-dialog').dialog({
        modal: true,
        stack: true,
        width: 300,
        buttons: {

            "Delete": function () {

                var loc = -1;

                $.each(usersettings.uisettings, function (key, value) {
                    if (currentconfigname == value.Name) {


                            usersettings.uisettings.remove(key, key);
                            usersettings["lastSetting"] = "Default";
                            $.jStorage.deleteKey("usersettings");
                            $.jStorage.set("usersettings", usersettings);
                            loadconfigdropdown("Default");
                            configurationapply(item);
                            return (false);
                            
                    }
                });

                $(this).dialog("close");
            },

            Cancel: function () {

                $(this).dialog("close");

            }

        }
    }).parent('.ui-dialog').css('zIndex', 1000000);
}

//////////////////////////////////////////////////////////////////////////////////////////////

function configurationscopy(item) {
    var dialog = $('#modal-dialog').dialog({
        modal: true,
        stack: true,
        width: 300,
        buttons: {

            "Create": function () {
                var theconfigname = $("#newconfigname").val();
                $("#newconfigname")[0].value = "";

                if (theconfigname.length > 0) {
                    createupdateconfig(theconfigname);
                    loadconfigdropdown(theconfigname);
                }

                $(this).dialog("close");
            },

            Cancel: function () {

                $(this).dialog("close");

            }

        }
    }).parent('.ui-dialog').css('zIndex', 1000000);
}

//////////////////////////////////////////////////////////////////////////////////////////////

function substituteToken(thetoken) {

var returnvalue = "";

switch (thetoken) {

    case "Today":
        returnvalue = moment().utc().format('MM/DD/YY');
        break;

    case "PastWeek":
        returnvalue = moment().utc().subtract(7, 'days').format('MM/DD/YY');
        break;

    case "PastMonth":
        returnvalue = moment().utc().subtract(30, 'days').format('MM/DD/YY');
        break;

    case "PastYear":
        returnvalue = moment().utc().subtract(365, 'days').format('MM/DD/YY');
        break;
            
    default:
        returnvalue = thetoken;
        /// Today
        break;
}

return (returnvalue);
}

//////////////////////////////////////////////////////////////////////////////////////////////

function getcurrentconfigsetting(configatom) {
    var returnvalue = null;
    var currentconfigname = $("#Configurations :selected").text();

    $.each(usersettings.uisettings, function (key, value) {
        if (currentconfigname == value.Name) {

            switch (configatom) {
                
                case "DataToDate":
                case "DataFromDate":
                case "ContextToDate":
                case "ContextFromDate":
                    returnvalue = substituteToken(value[configatom]);
                    break;

                default:
                    returnvalue = value[configatom];
                    break;
            }

            return (false);
        }
    });
    return (returnvalue);
}

//////////////////////////////////////////////////////////////////////////////////////////////

function configurationsupdate(item) {
    var currentconfigname = $("#Configurations :selected").text();
    createupdateconfig(currentconfigname);
}

//////////////////////////////////////////////////////////////////////////////////////////////

function configurationsdelete(item) {
    deleteconfirmation(item);
}

//////////////////////////////////////////////////////////////////////////////////////////////

function initializesettings() {
    var thesetting = {};
    usersettings.uisettings.length = 0;

    usersettings["javascriptversion"] = javascriptversion;
    usersettings["disabledList"] = disabledList;

    thesetting["Name"] = "Default";
    thesetting["DataToDate"] = "Today";
    thesetting["DataFromDate"] = "PastMonth";
    thesetting["ContextToDate"] = "Today";
    thesetting["ContextFromDate"] = "PastMonth";
    thesetting["CurrentTab"] = $('#application-tabs li :visible').first().text();
    thesetting["MapGrid"] = "Grid";
    thesetting["EventSiteDropdownSelected"] = null;
    thesetting["staticPeriod"] = "Last 30 Days";


    usersettings["uisettings"].push(thesetting);

    var thesetting = {};
    thesetting["Name"] = "Last Session";
    thesetting["CurrentTab"] = $('#application-tabs li :visible').first().text();
    thesetting["DataFromDate"] = moment(datafromdate).utc().format('MM/DD/YY');
    thesetting["DataToDate"] = moment(datatodate).utc().format('MM/DD/YY');
    thesetting["ContextFromDate"] = moment(datafromdate).utc().format('MM/DD/YY');
    thesetting["ContextToDate"] = moment(datatodate).utc().format('MM/DD/YY');
    thesetting["MapGrid"] = "Map";
    thesetting["EventSiteDropdownSelected"] = null;
    thesetting["staticPeriod"] = "Custom Range";
    usersettings["lastSetting"] = "Default";
    usersettings["uisettings"].push(thesetting);

    $.jStorage.deleteKey("usersettings");
    $.jStorage.set("usersettings", usersettings);
}

//////////////////////////////////////////////////////////////////////////////////////////////

function createupdateconfig(configname) {

    if (configname == "Default") return;

    if (configname == null) {
        configname = "Last Session";
    }

    if (usersettings == null) {
        usersettings = {
            lastSetting: {},
            uisettings: []
        };
    }

    var thesetting = {};

    thesetting["Name"] = configname;
    thesetting["CurrentTab"] = currentTab;
    thesetting["DataFromDate"] = $('#dateRange').data('daterangepicker').startDate._i;
    thesetting["DataToDate"] = $('#dateRange').data('daterangepicker').endDate._i;
    thesetting["ContextFromDate"] = moment(datafromdate).utc().format('MM/DD/YY');
    thesetting["ContextToDate"] = moment(datatodate).utc().format('MM/DD/YY');
    thesetting["MapGrid"] = $("#map" + currentTab + "Grid")[0].value;
    thesetting["EventSiteDropdownSelected"] = $("#siteList").val();
    thesetting["staticPeriod"] = $('.ranges li.active').text();

    var loc = -1;

    $.each(usersettings.uisettings, function (key, value) {
        if (configname == value.Name) loc = key;
    });

    if (loc == -1) {
        usersettings["uisettings"].push(thesetting);
    } else {
        usersettings.uisettings[loc] = thesetting;
    }

    usersettings["lastSetting"] = "Default";
    $.jStorage.deleteKey("usersettings");
    $.jStorage.set("usersettings", usersettings);
}

//////////////////////////////////////////////////////////////////////////////////////////////

function showContent() {

    $("#loginContent").css("visibility", "hidden");
    $("#ApplicationContent").css("visibility", "visible");
    $("#logout_button").css("visibility", "visible");
    buildPage();
}

//////////////////////////////////////////////////////////////////////////////////////////////

function getMeters(meterGroup) {
    dataHub.getMeters(meterGroup, postedUserName).done(function (data) {
        cache_Meters = data;
        updateMeterselect();
        $('#meterSelected').text(data.length);
        $(window).trigger("meterSelectUpdated");
    }).fail(function (msg) {
        alert(msg);
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////

function selectMeterGroup(thecontrol) {
    mg = thecontrol.value;
    $('#siteList').children().remove();
    $('#siteList').multiselect('refresh');
    getMeters(mg);

    $.each(Object.keys(leafletMap), function (i, key) {
        if (leafletMap[key]) {
            mapMarkers[key].forEach(function (d) { leafletMap[key].removeLayer(d.marker) });
            mapMarkers[key] = [];
            leafletMap[key] = null;
            var parent = $('#theMap' + key).parent();
            $('#theMap' + key).remove();
            $(parent).append('<div id="theMap' + key + '"></div>');
        }
    });
    var newTab = currentTab;
    if (newTab.indexOf("Overview") > -1) {
        $('#headerStrip').hide();
        showOverviewPage(currentTab);
    }
    else if (newTab === "ModbusData") {
        showModbusData();
    }
    else if (newTab === "HistorianData") {
        showHistorianData();
    }
    else {
        cache_Graph_Data = null;
        cache_Errorbar_Data = null;
        cache_Sparkline_Data = null;
        var mapormatrix = $("#map" + currentTab + "Grid")[0].value;
        $(window).one("meterSelectUpdated", function () {
            manageTabsByDate(newTab, contextfromdate, contexttodate);
            $(".mapGrid").val(mapormatrix);
            selectmapgrid($("#map" + currentTab + "Grid")[0]);
        });

    }


}

//////////////////////////////////////////////////////////////////////////////////////////////

function updateMeterselect() {
    $.each(cache_Meters, function (key, value) {
        SelectAdd("siteList", value.ID, value.Name, "selected");
    });
    $('#siteList').multiselect('refresh');

}

//////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {

    postedUserName = $("#postedUserName")[0].innerHTML;

    $('form').bind('submit', $('form'), function(event) {
        var form = this;
        event.preventDefault();
        event.stopPropagation();
        showcontent();
        return;
    });

    $("#password").keyup(function(event) {
        if (event.keyCode == 13) {
            $("#loginbutton").click();
        }
    });

    $(window).on('hubConnected', function () {
        showContent();
    })
});

//////////////////////////////////////////////////////////////////////////////////////////////

function loadsitedropdown() {

    $("#siteList").multiselect({
        close: function (event, ui) {
            showSiteSet($("#selectSiteSet" + currentTab)[0]);
            updateGridWithSelectedSites();
            selectsitesonmap();
            selectsitesincharts();
        },
        minWidth: 250, selectedList: 1, noneSelectedText: "Select Site", cssClass: '.multiselectText'
    }).multiselectfilter();


    var selectedsites = getcurrentconfigsetting("EventSiteDropdownSelected");
    if (selectedsites != null) {
        $('#siteList').multiselect("uncheckAll");
        $('#siteList').val(selectedsites);
    }
    else {
        $('#siteList').multiselect("checkAll");
    }

    $('#siteList').multiselect('refresh');
    $('.ui-multiselect').hide()
}

//////////////////////////////////////////////////////////////////////////////////////////////
function loadSettingsAndApply() {
    dataHub.getTabSettings(postedUserName).done(function (data) {
        var settings = eval(data);
        // Turn Off Features

        applicationsettings = settings;

        $.each(settings, (function (key, value) {
            if (value.Name == "DashTab") {
                if (value.Enabled == true) {
                    $(value.Value).show();
                } else {
                    $(value.Value).hide();
                }
            }


            if (value.Name == "DashImage") {

            }

        }));

        $(window).trigger("settingsLoaded");

    }).fail(function (msg) {
        alert(msg);
    });
}
  
//////////////////////////////////////////////////////////////////////////////////////////////

function buildPage() {

    loadSettingsAndApply();

    $(document).bind('contextmenu', function (e) { return false; });

    $.blockUI({ css: { border: '0px' } });

    $(document).ajaxStart(function () {
        timeout = setTimeout(function () {
            $.blockUI({ message: '<div unselectable="on" class="wait_container"><img alt="" src="' + homePath + '/Images/ajax-loader.gif" /><br><div unselectable="on" class="wait">Please Wait. Loading...</div></div>' });
        }, 1000);
    });

    $(document).ajaxStop(function () {
        if (timeout != null) {
            clearTimeout(timeout);
            timeout = null;
        }

        $.unblockUI();
    });

    $("#draggable").draggable({ scroll: false });

    $('#draggable').hide();

    $('#delete-dialog').hide();

    $('#modal-dialog').hide();

    var mousemove = null;


    $(".resizeable").resizable(
    {
        autoHide: true,
        handles: 'e',
        animate: false,

        resize: function (e, ui) {
            var parent = ui.element.parent();
            var remainingSpace = parent.width() - ui.element.outerWidth(),
                divTwo = ui.element.next(),
                divTwoWidth = ((remainingSpace - (divTwo.outerWidth() - divTwo.width() + 1)) / parent.width()) * 100 + "%";
            divTwo.width(divTwoWidth);
        },
        stop: function (e, ui) {
            var parent = ui.element.parent();
            ui.element.css(
            {
                width: ui.element.width() / parent.width() * 100 + "%"
            });

            reflowContents(currentTab);
        }
    });

    $(".portlet")
        .addClass("ui-widget ui-widget-content ui-helper-clearfix")
        .find(".portlet-header")
        .addClass("ui-widget-header")
        .prepend("<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>")
        .end()
        .find(".portlet-content");

    $(".portlet-toggle").click(function () {
        var icon = $(this);
        icon.toggleClass("ui-icon-minusthick ui-icon-plusthick");
        icon.closest(".portlet").find(".portlet-content").slideToggle(0, function () { reflowContents(currentTab); });
        return (true);
    });

    $.ech.multiselect.prototype.options.selectedText = "# of # selected";

    $(window).on('resize', function () { resizeMapAndMatrix(currentTab); });

    if ($.jStorage.get("usersettings") != null) {
        usersettings = $.jStorage.get("usersettings");
        validatesettings(usersettings);
    } else {
        initializesettings();
    }

    disabledList = usersettings["disabledList"];
    loadconfigdropdown(usersettings.lastSetting);
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: 400
    });

    $('#settingsModal').on('shown.bs.modal', function () {
        $('.grid').masonry('layout');
    });

    $('#filterExpressionHelp').mouseenter(function(e){
        $.jsPanel({
            paneltype: {
                tooltip: true,
                mode: 'semisticky',
                connector: true
            },
            position: {
                my: 'center-bottom',
                at: 'center-top',
                of: e.target
            },
            contentSize: { width: 400, height: 400 },
            theme: 'blue',
            headerTitle: 'Filter Expression Help',
            callback: function (panel) {
                panel.content.css('padding', '10px');
                panel.css('z-index','2000')
                if ($(window).scrollTop() > parseInt(panel.css('top'))) {
                    panel.reposition({ my: 'center-top', at: 'center-bottom', of: e.target });
                }

                var content = "<p>Filter expressions can be used to limit the number of monitors for a monitor (meter) group.  The syntax is like a SQL WHERE expression.  The operators are:</p><ul><li><code>=</code> operator to equate an attribute</li><li> the <code>LIKE</code> operator to do a compare</li><li> the <code>%</code> or <code>*</code> operator are used as a wild card</li></ul> " +
                              "<p>The available fields for filtering are associted with a monitor (meter) are: </p><ul><li>Name</li><li>Alias</li><li>ShortName</li><li>AssetKey</li><li>MeterLocationID</li></ul>" +
                              "<p>Examples:</p> <ul><li><code>Alias = 'Greenville'</code></li><li><code>Name LIKE 'DFR%'</code></li><li><code>ShortName LIKE '%ville'</code></li></ul>"

                panel.content.append(content)

            }
        });
    });

    // Settings modal jscolor and enable change events
    $('.modal-body input').change(function(event){
        var field;
        if ($(event.currentTarget).attr('id').indexOf('enable') > -1)
            field = "enable";
        else if ($(event.currentTarget).attr('id').indexOf('tab') > -1)
            field = "tab"
        else if ($(event.currentTarget).attr('id').indexOf('color') > -1)
            field = "color"
        var id = parseInt($(event.currentTarget).attr('id').split(field)[1]);

        var value;
        if ($(event.currentTarget).attr('type') == "checkbox")
            value = $(event.currentTarget).prop('checked');
        else
            value = $(event.currentTarget).val();
        dataHub.updateDashSettings(id, field, value, userId);
    });

    $("#application-tabs").tabs({
        heightStyle: "100%",
        widthStyle: "99%",

        activate: function (event, ui) {
            var newTab = currentTab = ui.newTab.attr('li', "innerHTML")[0].getElementsByTagName("a")[0].innerHTML;
            if (newTab.indexOf("Overview") > -1) {
                $('#headerStrip').hide();
                showOverviewPage(currentTab);
            }
            else if (newTab === "ModbusData") {
                showModbusData();
            }
            else if (newTab === "HistorianData") {
                showHistorianData();
            }
            else {
                cache_Graph_Data = null;
                cache_Errorbar_Data = null;
                cache_Sparkline_Data = null;
                var mapormatrix = $("#map" + currentTab + "Grid")[0].value;
                $('#headerStrip').show();
                manageTabsByDate(newTab, contextfromdate, contexttodate);
                $(".mapGrid").val(mapormatrix);
                selectmapgrid($("#map" + currentTab + "Grid")[0]);

            }


        }
    });

    loadsitedropdown();

    $(window).one("settingsLoaded", function () {

        currentTab = $('#application-tabs li :visible').first().text();


        datafromdate = getcurrentconfigsetting("DataFromDate");
        datatodate = getcurrentconfigsetting("DataToDate");

        contextfromdate = getcurrentconfigsetting("ContextFromDate");
        contexttodate = getcurrentconfigsetting("ContextToDate");

        initializeDatePickers(datafromdate, datatodate);
        getMeters("0");
        $(window).one("meterSelectUpdated", function () {
            initiateTimeRangeSlider();
            initiateColorScale();


            resizeMapAndMatrix(currentTab);
            if (currentTab.indexOf("Overview") > -1) {
                $('#headerStrip').hide();
                showOverviewPage(currentTab);

            } else if (currentTab === "ModbusData") {
                showModbusData();
            }
            else if (currentTab === "HistorianData") {
                showHistorianData();
            }
            else {
                $("#application-tabs").tabs("option", "active", ($('#application-tabs li a').map(function (i, a) { return $(a).text(); }).get()).indexOf(currentTab));
                $(".mapGrid").val(getcurrentconfigsetting("MapGrid"));
                //$("#staticPeriod")[0].value = getcurrentconfigsetting("staticPeriod");

                $.each($('.ranges li'), function (i, a) {
                    if ($(a).text() == getcurrentconfigsetting("staticPeriod"))
                        $(a).click();
                })
                selectmapgrid($("#map" + currentTab + "Grid")[0]);
            }


        });


    });
}

//////////////////////////////////////////////////////////////////////////////////////////////

function loadLeafletMap(theDiv) {

    if (leafletMap[currentTab] === null) {
        leafletMap[currentTab] = L.map(theDiv, {
            center: [35.0456, -85.3097],
            zoom: 6,
            minZoom: 2,
            maxZoom: 15,
            zoomControl: false,
            attributionControl: false
        });

        mapLink =
            '<a href="https://openstreetmap.org">OpenStreetMap</a>';

        L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            }).addTo(leafletMap[currentTab]);


        var contourControl = L.control({ position: 'bottomleft' });

        contourControl.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info contourControl'),
                labels = [];
            div.innerHTML =
                '<div id="ContoursControlsTrending">' +
                    '<div class="row" style="width: 100%; margin: auto">' +
                        '<div class="" style="float: left; margin-right: 4px;">' +
                            '<table>' +
                                '<tr>' +
                                    '<td colspan="1">' +
                                        '<div class="checkbox"><label><input type="checkbox" id="weatherCheckbox"/>Weather</label></div>' +
                                    '</td>' +
                                    '<td colspan="1">' +
                                        '<select class="form-control" id="contourAnimationResolutionSelect">' +
                                            '<option value="15">15</option>' +
                                            '<option value="14">14</option>' +
                                            '<option value="13">13</option>' +
                                            '<option value="12">12</option>' +
                                            '<option value="11">11</option>' +
                                            '<option value="10">10</option>' +
                                            '<option value="9">9</option>' +
                                            '<option value="8">8</option>' +
                                            '<option value="7">7</option>' +
                                            '<option selected="selected" value="6">6</option>' +
                                            '<option value="5">5</option>' +
                                            '<option value="4">4</option>' +
                                            '<option value="3">3</option>' +
                                            '<option value="2">2</option>' +
                                        '</select>' +
                                    '</td>' +
                                '</tr>' +
                                '<tr><td colspan="2">' +
                                    '<select class="form-control" id="contourAnimationStepSelect" onchange="stepSelectionChange(this);">' +
                                        '<option value="60">60 min</option>' +
                                        '<option value="30">30 min</option>' +
                                        '<option value="20">20 min</option>' +
                                        '<option selected="selected" value="15">15 min</option>' +
                                        '<option value="10">10 min</option>' +
                                        '<option value="5">5 min</option>' +
                                        '<option value="1">1 min</option>' +
                                    '</select>' +
                                '</td></tr>' +
                                '<tr>' +
                                        '<td colspan="2">' +
                                        '<div id="time-range">' +
                                            '<div class="sliders_step1">' +
                                                '&nbsp;<div class="slider-range"></div> ' +
                                            '</div>' +
                                            '<p><span class="slider-time">12:00 AM</span> - <span class="slider-time2">11:59 PM</span></p>' +
                                        '</div>' +
                                    '</td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td colspan="2">' +
                                        '<button class="btn btn-default form-control" onclick="loadContourAnimationData()">Load Data</button>' +
                                    '</td>' +
                                '</tr>' +
                            '</table>' +
                        '</div>' +
                        '<div class="" id="progressBar" style="float: left; margin-left: 40px; display: none">' +
                            '<table style="width: 100%">' +
                                '<tr><td>&nbsp;</td></tr>' +
                                '<tr><td>&nbsp;</td></tr>' +
                                '<tr><td><span id="progressDate"></span></td></tr>' +
                                '<tr><td style="width: 100%">' +
                                        '<progress id="contourProgressBar" style ="width: 100%" value="0" max ="100"></progress>' +
                                '</td></tr>' +
                                '<tr><td>&nbsp;</td></tr>' +
                                '<tr><td>&nbsp;</td></tr>' +
                                '<tr><td style="width: 100%; text-align: center">' +
                                            '<div class="player text-center" id="contourPlayerButtons">' +
                                                '<button type="button" id="button_fbw" class="btn"><i class="fa fa-fast-backward"></i></button>' +
                                                '<button type="button" id="button_bw" class="btn"><i class="fa fa-backward"></i></button>' +
                                                '<button type="button" id="button_play" class="btn"><i class="fa fa-play"></i></button>' +
                                                '<button type="button" id="button_stop" class="btn"><i class="fa fa-stop"></i></button>' +
                                                '<button type="button" id="button_fw" class="btn"><i class="fa fa-forward"></i></button>' +
                                                '<button type="button" id="button_ffw" class="btn"><i class="fa fa-fast-forward"></i></button>' +
                                            '</div>' +
                                '</td></tr>' +
                            '</table>' +
                        '</div>' +
                    '</div>' +
                '</div>';

            
            return div;
        };

        contourControl.addTo(leafletMap[currentTab]);
        initiateTimeRangeSlider();

        $('.contourControl').hide();
        contourControl.getContainer().addEventListener('mouseover', function () {
            leafletMap[currentTab].dragging.disable();
            leafletMap[currentTab].doubleClickZoom.disable();
            leafletMap[currentTab].touchZoom.disable();
            leafletMap[currentTab].scrollWheelZoom.disable();
            leafletMap[currentTab].boxZoom.disable();
            leafletMap[currentTab].keyboard.disable();

        });

        contourControl.getContainer().addEventListener('mouseout', function () {
            leafletMap[currentTab].dragging.enable();
            leafletMap[currentTab].doubleClickZoom.enable();
            leafletMap[currentTab].touchZoom.enable();
            leafletMap[currentTab].scrollWheelZoom.enable();
            leafletMap[currentTab].boxZoom.enable();
            leafletMap[currentTab].keyboard.enable();

        });
    }
}

function loadContourLayer(contourQuery) {
    var tileURL = homePath + 'mapService.asmx/getContourTile?x={x}&y={y}&zoom={z}';

    $.each(contourQuery, function (key, value) {
        tileURL += '&' + key + '=' + encodeURIComponent(value);
    });

    if (contourOverlay) {
        leafletMap[currentTab].removeLayer(contourOverlay);
        contourOverlay = null;
    }

    if (contourLayer)
        contourLayer.setUrl(tileURL);
    else
        contourLayer = L.tileLayer(tileURL, { m: getBase64MeterSelection() }).addTo(leafletMap[currentTab]);
}

function loadContourOverlay(contourInfo) {
    var bounds = [[contourInfo.MaxLatitude, contourInfo.MinLongitude], [contourInfo.MinLatitude, contourInfo.MaxLongitude]];

    if (contourLayer) {
        leafletMap[currentTab].removeLayer(contourLayer);
        contourLayer = null;
    }

    if (contourOverlay)
        contourOverlay.setUrl(contourInfo.URL);
    else
        contourOverlay = L.imageOverlay(contourInfo.URL, bounds).addTo(leafletMap[currentTab]);
}

function showType(thecontrol) {
    plotMapLocations(cache_Map_Matrix_Data.d, currentTab, cache_Map_Matrix_Data_Date_From, cache_Map_Matrix_Data_Date_To, null);
}

function initiateTimeRangeSlider() {
    $('#tabs-' + currentTab + " .slider-range").slider({
        range: true,
        min: 0,
        max: 1440,
        step: 15,
        values: [0, 1440],
        slide: function (e, ui) {
            var hours1 = Math.floor(ui.values[0] / 60);
            var minutes1 = ui.values[0] - (hours1 * 60);

            if (hours1.length == 1) hours1 = '0' + hours1;
            if (minutes1.length == 1) minutes1 = '0' + minutes1;
            if (minutes1 == 0) minutes1 = '00';
            if (hours1 >= 12) {
                if (hours1 == 12) {
                    hours1 = hours1;
                    minutes1 = minutes1 + " PM";
                } else {
                    hours1 = hours1 - 12;
                    minutes1 = minutes1 + " PM";
                }
            } else {
                hours1 = hours1;
                minutes1 = minutes1 + " AM";
            }
            if (hours1 == 0) {
                hours1 = 12;
                minutes1 = minutes1;
            }



            $('#tabs-' + currentTab + ' .slider-time').html(hours1 + ':' + minutes1);

            var hours2 = Math.floor(ui.values[1] / 60);
            var minutes2 = ui.values[1] - (hours2 * 60);

            if (hours2.length == 1) hours2 = '0' + hours2;
            if (minutes2.length == 1) minutes2 = '0' + minutes2;
            if (minutes2 == 0) minutes2 = '00';
            if (hours2 >= 12) {
                if (hours2 == 12) {
                    hours2 = hours2;
                    minutes2 = minutes2 + " PM";
                } else if (hours2 == 24) {
                    hours2 = 11;
                    minutes2 = "59 PM";
                } else {
                    hours2 = hours2 - 12;
                    minutes2 = minutes2 + " PM";
                }
            } else {
                hours2 = hours2;
                minutes2 = minutes2 + " AM";
            }

            $('#tabs-' + currentTab + ' .slider-time2').html(hours2 + ':' + minutes2);
        }
    });
}

function loadContourAnimationData() {
    var dateFrom = new Date($('#mapHeaderTrendingDataTo').text() + ' ' + $('#tabs-' + currentTab + ' .slider-time').text() + ' UTC').toISOString();
    var dateTo = new Date($('#mapHeaderTrendingDataTo').text() + ' ' + $('#tabs-' + currentTab + ' .slider-time2').text() + ' UTC').toISOString();
    var meters = "";
    $.each($('#siteList').multiselect("getChecked").map(function () { return this.value; }), function (index, data) {
        if (index === 0)
            meters = data;
        else
            meters += ',' + data;
    });

    var thedatasent = {
        contourQuery: {
            Meters: getBase64MeterSelection(),
            StartDate: dateFrom,
            EndDate: dateTo,
            DataType: $('#trendingDataTypeSelection').val(),
            ColorScaleName: $('#contourColorScaleSelect').val(),
            UserName: postedUserName,
            StepSize: $('#contourAnimationStepSelect').val(),
            Resolution: $('#contourAnimationResolutionSelect').val(),
            IncludeWeather: $('#weatherCheckbox:checked').length > 0,
            MeterGroup: $('#meterGroupSelect').val()
        }
    };

    $.blockUI({ message: '<div unselectable="on" class="wait_container"><div unselectable="on" class="wait">Please Wait. Loading...</div><br><div id="loadAnimationProgressBar" class="progressBar"><div id="loadAnimationProgressInnerBar" class="progressInnerBar"><div id="loadAnimationProgressLabel" class="progressBarLabel">0%</div></div></div><br><button class="btn btn-default btn-cancel">Cancel</button><br></div>' });

    $.ajax({
        type: "POST",
        url: homePath + 'mapService.asmx/getContourAnimations',
        data: JSON.stringify(thedatasent),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        success: function (data) {
            $('.btn-cancel').click(function () {
                data.d.Cancelled = true;
                cancelCall(data.d.AnimationID);
            });

            loopForAnimation(data.d);
        },
        failure: function (msg) {
            alert(msg);
        },
        global: false,
        async: true
    });
}

function loopForAnimation(animationData) {
    var message = {
        taskID: animationData.AnimationID
    };

    $.ajax({
        type: "POST",
        url: homePath + 'mapService.asmx/GetProgress',
        data: JSON.stringify(message),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        success: function (data) {
            $('#loadAnimationProgressInnerBar').css('width', data.d + '%');
            $('#loadAnimationProgressLabel').text(data.d + '%');

            if (data.d < 100 && !animationData.Cancelled) {
                setTimeout(loopForAnimation, 100, animationData);
            } else if (!animationData.Cancelled) {
                $.unblockUI();
                runContourAnimation(animationData);
            }
        },
        failure: function (msg) {
            alert(msg);
        },
        global: false,
        async: true
    });
}

function runContourAnimation(contourData) {
    var d = new Date(contourData.Infos[0].Date + ' UTC');

    $('#tabs-' + currentTab + ' .contourControl').css('width', '500px');
    $('#tabs-' + currentTab + ' #progressBar').show();

    $.each(contourData.Infos, function (_, info) {
        info.ColorDomain = contourData.ColorDomain;
        info.ColorRange = contourData.ColorRange;
        info.MinLatitude = contourData.MinLatitude;
        info.MaxLatitude = contourData.MaxLatitude;
        info.MinLongitude = contourData.MinLongitude;
        info.MaxLongitude = contourData.MaxLongitude;
    });

    var index = 0
    update();

    function update() {
        var info = contourData.Infos[index];
        var progressBarIndex = Math.round(index / (contourData.Infos.length - 1) * 100);
        $('#tabs-' + currentTab + ' #contourProgressBar').attr('value', progressBarIndex);
        $('#tabs-' + currentTab + ' #progressDate').text(contourData.Infos[index].Date);
        plotMapLocations(info, null, null, null, null);
    }
    var interval;
    $('#tabs-' + currentTab + ' #contourProgressBar').off('click');
    $('#tabs-' + currentTab + ' #contourProgressBar').on('click', function (event) {
        var progressBarindex = event.offsetX / $(this).width();
        index = Math.round((contourData.Infos.length - 1) * progressBarindex);
        update();
    });
    $('#tabs-' + currentTab + ' #button_play').off('click');
    $('#tabs-' + currentTab + ' #button_play').on('click', function () {
        clearInterval(interval);
        $('#trendingDataTypeSelection').on('change', function () { clearInterval(interval) });
        $('#contourColorScaleSelect').on('change', function () { clearInterval(interval) });
        $('#application-tabs a').on('click', function () { clearInterval(interval) });

        interval = setInterval(function () {
            index++;

            if (index >= contourData.Infos.length) {
                index = 0;
                update();
                clearInterval(interval);
            }
            else {
                //if ($('#weatherCheckbox').prop('checked')) {
                //    d = new Date(contourData.Infos[index].Date + ' UTC');
                //    wmsLayer.setParams({ time: new Date(d.setMinutes(d.getMinutes() - d.getMinutes() % 5)).toISOString() }, false);
                //}
                update();
            }
        }, 1000);
    });

    $('#tabs-' + currentTab + ' #button_stop').off('click');
    $('#tabs-' + currentTab + ' #button_stop').on('click', function () {
        clearInterval(interval);
    });

    $('#tabs-' + currentTab + ' #button_bw').off('click');
    $('#tabs-' + currentTab + ' #button_bw').on('click', function () {
        if (index > 0) {
            --index;
            update();
        }
    });

    $('#tabs-' + currentTab + ' #button_fbw').off('click');
    $('#tabs-' + currentTab + ' #button_fbw').on('click', function () {
        if (index > 0) {
            index = 0;
            update();
        }
    });

    $('#tabs-' + currentTab + ' #button_fw').off('click');
    $('#tabs-' + currentTab + ' #button_fw').on('click', function () {
        if (index < contourData.Infos.length - 1) {
            ++index;
            update();
        }
    });

    $('#tabs-' + currentTab + ' #button_ffw').off('click');
    $('#tabs-' + currentTab + ' #button_ffw').on('click', function () {
        if (index < contourData.Infos.length - 1) {
            index = contourData.Infos.length - 1;
            update();
        }
    });
}

function stepSelectionChange(thecontrol) {
    $('.slider-range').slider("option", "step", parseInt(thecontrol.value));
}

function showOverviewPage(tab) {
    $('#overviewYesterdayDate').text(new Date(new Date().setDate(new Date().getDate() - 1)).toDateString());
    $('#overviewTodayDate').text(new Date(new Date().setDate(new Date().getDate())).toDateString());

    $('.grid2').masonry({
        itemSelector: '.grid2-item',
        columnWidth: 300,
        gutter: 4
    });

    var heightNew = 0;
    var ovtodayHeight = $('#tabs-Overview-Today').height();
    var ovyesterdayHeight = $('#tabs-Overview-Yesterday').height();

    if (currentTab != 'Overview-Today') {
        heightNew = ovyesterdayHeight;
        if (ovtodayHeight > 1 & ovyesterdayHeight <= ovtodayHeight) {
            heightNew = ovtodayHeight;
        }

        $('#tabs-' + tab).css('height', heightNew);
    }
    else if (currentTab === 'Overview-Today') {
        heightNew = ovtodayHeight;

        $('#tabs-' + 'Overview-Today').css('height', heightNew);
    }

    $(window).resize(function () {
        $('.grid2').masonry('layout');

        var myheightNew = 0;

        if (currentTab === 'Overview-Today') {
            var ovtodayWidth = $('#tabs-Overview-Today').width();
            var leftrightoffset = $('#grid2Today').offset().left * 2.0;
            var grid2width = $('#grid2Today').width();

            myheightNew = ($('#tabs-Overview-Today').offset().top) + 60;

            if (ovtodayWidth > (1200 + leftrightoffset)) {
                var iterator = 1;
                while (iterator <= 4) {

                    if (myheightNew <= $('#grid2-item-Today-' + iterator).height())
                    {
                        myheightNew += $('#grid2-item-Today-' + iterator).height();
                    }
                    iterator++;
                }
            }
            else if (ovtodayWidth <= (1200 + leftrightoffset) & ovtodayWidth > (600 + leftrightoffset)) {
                var iterator = 2;
                while (iterator <= 4) {

                    myheightNew += $('#grid2-item-Today-' + iterator).height();
                    iterator++;
                }
            }
            else if (ovtodayWidth <= (600 + leftrightoffset)) {
                var iterator = 1;
                while (iterator <= 4) {

                    myheightNew += $('#grid2-item-Today-' + iterator).height();

                    iterator++;
                }
            }
        }

        if (currentTab === 'Overview-Yesterday') {
            var ovyesterdayWidth = $('#tabs-Overview-Yesterday').width();
            var leftrightoffset = $('#grid2Yesterday').offset().left * 2.0;
            var grid2width = $('#grid2Yesterday').width();

            myheightNew = ($('#tabs-Overview-Yesterday').offset().top) + 60;

            if (ovyesterdayWidth > (1200 + leftrightoffset)) {

                var iterator = 1;
                while (iterator <= 6) {

                    if (myheightNew <= $('#grid2-item-Yesterday-' + iterator).height()) {
                        myheightNew += $('#grid2-item-Yesterday-' + iterator).height();
                    }
                    iterator++;
                }
            }
            else if (ovyesterdayWidth <= (1200 + leftrightoffset) & ovyesterdayWidth > (900 + leftrightoffset)) {
                var iterator = 3;
                while (iterator <= 4) {

                    myheightNew += $('#grid2-item-Yesterday-' + iterator).height();
                    iterator++;
                }
            }
            else if (ovyesterdayWidth <= (900 + leftrightoffset) & ovyesterdayWidth > (600 + leftrightoffset)) {

                var iterator = 2;
                while (iterator <= 6) {

                    myheightNew += $('#grid2-item-Yesterday-' + iterator).height();
                    iterator++;
                }
            }
            else if (ovyesterdayWidth <= (600 + leftrightoffset) & ovyesterdayWidth > (300 + leftrightoffset)) {
                var iterator = 1;
                while (iterator <= 6) {

                    myheightNew += $('#grid2-item-Yesterday-' + iterator).height();

                    iterator++;
                }
            }
            else if (ovyesterdayWidth <= (300 + leftrightoffset)) {
                var iterator = 1;
                while (iterator <= 6) {

                    myheightNew += $('#grid2-item-Yesterday-' + iterator).height();

                    iterator++;
                }
            }
        }

        $('#tabs-' + currentTab).css('height', myheightNew);
    });

    $(window).resize();
}

function initiateColorScale() {
    $.ajax({
        type: "POST",
        url: homePath + 'mapService.asmx/getColorScales',
        contentType: "application/json; charset=utf-8",
        cache: true,
        success: function (data) {
            $.each(data.d, function (i, d) {
                $('#contourColorScaleSelect').append(new Option(d, d));
            });
        },
        failure: function (msg) {
            alert(msg);
        },
        async: true
    });

}

function showColorScale(thecontrol) {
    $('#tabs-' + currentTab + ' #progressBar').hide();
    $('#tabs-' + currentTab + ' .contourControl').css('width', '165px');

    var mapormatrix = $("#map" + currentTab + "Grid")[0].value;

    manageTabsByDate(currentTab, cache_Map_Matrix_Data_Date_From, cache_Map_Matrix_Data_Date_To);
    $(".mapGrid").val(mapormatrix);
    selectmapgrid($("#map" + currentTab + "Grid")[0]);
}

function cancelCall(animationID) {
    $.unblockUI();

    $.ajax({
        type: "POST",
        data: { 'taskID': animationID },
        url: homePath + 'mapService.asmx/CancelCall',
        failure: function (msg) {
            alert(msg);
        },
        global: false,
        async: true
    });
}

function showModbusData() {
    $('#tabs-ModbusData').css('height', $(window).height() - $('#tabs-' + currentTab).offset().top);
    $('#modbusFrame').attr({
        //"src": "Main/GraphMeasurements",
        "src": historianConnection + '/GraphMeasurements.cshtml?ShowMenu=false',
        'width': '100%',
        'height': $(window).height() - $('#tabs-' + currentTab).offset().top
    });

    $(window).resize(function () {
        $('#modbusFrame').attr({
            'height': $(window).height() - $('#tabs-' + currentTab).offset().top
        });
    });


}

function showHistorianData() {
    $('#tabs-HistorianData').css('height', $(window).height() - $('#tabs-' + currentTab).offset().top);
    $('#historianFrame').attr({
        "src": historianConnection + '/TrendMeasurements.cshtml?ShowMenu=false',
        'width': '100%',
        'height': $(window).height() - $('#tabs-' + currentTab).offset().top
    });

    $(window).resize(function () {
        $('#historianFrame').attr({
            'height': $(window).height() - $('#tabs-' + currentTab).offset().top
        });
    });
}

function getBase64MeterSelection() {
    var meterSelections = $('#siteList').multiselect('widget').find('input:checkbox').sort(function (a, b) {
        return Number(a.value) - Number(b.value);
    }).map(function () {
        return $(this).is(':checked');
    }).get();

    var base64Selections = '';

    for (var i = 0; i < meterSelections.length; i += 6) {
        var mapIndex =
            (meterSelections[i + 0] ? 32 : 0) +
            (meterSelections[i + 1] ? 16 : 0) +
            (meterSelections[i + 2] ?  8 : 0) +
            (meterSelections[i + 3] ?  4 : 0) +
            (meterSelections[i + 4] ?  2 : 0) +
            (meterSelections[i + 5] ?  1 : 0);

        base64Selections += '' + base64Map[mapIndex];
    }

    return base64Selections;
}

function showMagDur(theControl) {
    if ($(theControl).val() == 0) {
        $('#OverviewDisturbances').show()
        $('#OverviewDisturbancesMagDur').hide()
    }
    else {
        $('#OverviewDisturbances').hide()
        $('#OverviewDisturbancesMagDur').show()
        $(window).trigger('resize');
    }
}

function showDeviceFilter(word) {
    if (word == 'new') {
        $('#deviceFilterId').text('');
        $('#deviceFilterName').val('');
        $('#filterExpression').val('');
        $('#deviceFilterMeterGroup').val(0);

        $('#deviceFilterModal').modal().show();
        $('#showDeviceFilterSaveBtn').show();
        $('#showDeviceFilterEditBtn').hide();
        $('#showDeviceFilterDeleteBtn').hide();
    }
    else if (word == 'edit' && $('#deviceFilterList').val() != 0) {
        dataHub.queryDeviceFilterRecord($('#deviceFilterList').val()).done(function (data) {
            $('#deviceFilterId').text(data.ID);
            $('#deviceFilterName').val(data.Name);
            $('#filterExpression').val(data.FilterExpression);
            $('#deviceFilterMeterGroup').val(data.MeterGroupID);

            $('#deviceFilterModal').modal().show();
            $('#showDeviceFilterSaveBtn').hide();
            $('#showDeviceFilterEditBtn').show();
            $('#showDeviceFilterDeleteBtn').show();
        });
    }
}

function saveDeviceFilter(word) {
    if (word == 'new') {
        var record = {
            Name: $('#deviceFilterName').val(),
            UserAccount: postedUserName,
            FilterExpression: $('#filterExpression').val(),
            MeterGroupID: $('#deviceFilterMeterGroup').val()
        }

        dataHub.addDeviceFilter(record).done(function (data) {
            $('#deviceFilterList').append(new Option(record.Name, data));
        });

    }
    else if (word == 'edit') {
        var record = {
            ID: $('#deviceFilterId').text(),
            Name: $('#deviceFilterName').val(),
            UserAccount: postedUserName,
            FilterExpression: $('#filterExpression').val(),
            MeterGroupID: $('#deviceFilterMeterGroup').val()
        }

        dataHub.editDeviceFilter(record).done(function (data) {
            $('#deviceFilterList').children().filter('option[value=' + record.ID + ']').remove();
            $('#deviceFilterList').append(new Option(record.Name, record.ID));
        });


    }
    else if (word == 'delete') {
        dataHub.deleteDeviceFilter($('#deviceFilterId').text()).done(function () {
            $('#deviceFilterList').children().filter('option[value=' + $('#deviceFilterId').text() + ']').remove();
        });
    }
}

function previewDeviceFilter() {
    dataHub.deviceFilterPreview($('#deviceFilterMeterGroup').val(), $('#filterExpression').val(), postedUserName).done(function (data) {
        var html = "<div>Total: "+ data.length +"<ul style='height: 300px; overflow-y:scroll'>";
        $.each(data, function (i, d) {
            html += "<li>"+ d.Name +"</li>";
        });
        html += "</ul></div>"
        var myPanel = $.jsPanel({
            headerTitle: "Preview Meter List",
            content: html,
            contentSize: {
                width: 300,
                height: 300
            },
            callback: function (panel) {
                panel.css('z-index', '2000')
            }
        });
    });
}

function saveView() {
    $.jsPanel({
        paneltype: 'modal',
        headerTitle: 'Save View',
        theme: 'success',
        show: 'animated fadeInDownBig',
        content: '<label>View Name:</label><input type="text" id="viewName" class="form-control" maxlength="10" /><button class="btn btn-primary pull-right">Submit</button>',
        callback: function (panel) {
            $("input:first", this).focus();
            $("button", this.content).click(function () {
                record ={
                    Name: $('#viewName').val(),
                    UserAccount: postedUserName,
                    FromDate: contextfromdate,
                    ToDate:contexttodate,
                    Tab: currentTab,
                    DeviceFilterID: $('#deviceFilterList').val(),
                    MapGrid: $('#map' + currentTab + 'Grid').val()
                }

                dataHub.addSavedViews(record).done(function (data) {
                    $('#viewSelect').append(new Option(record.Name, data));
                    panel.close()
                });

            });
        }
    });
}

function deleteView() {
    if ($('#viewSelect').val() != 0) {
        dataHub.deleteSavedViews($('#viewSelect').val()).done(function () {
            $('#viewSelect :selected').remove();
        });
    }

}

function selectView(theControl) {
    if($(theControl).val() != 0){
        dataHub.querySavedViewsRecord($(theControl).val()).done(function (record) {
            $('#deviceFilterList').val(record.DeviceFilterID);
            $($('a.ui-tabs-anchor:contains("' + record.Tab + '")')).click();
            $('#map' + record.Tab + 'Grid').val(record.MapGrid);
            $('#dateRange').data('daterangepicker').setStartDate(moment(record.FromDate).utc().format('MM/DD/YY'));
            $('#dateRange').data('daterangepicker').setEndDate(moment(record.ToDate).utc().format('MM/DD/YY'));
            $('#dateRangeSpan').html($('#dateRange').data('daterangepicker').startDate.format('MM/DD/YYYY') + ' - ' + $('#dateRange').data('daterangepicker').endDate.format('MM/DD/YYYY'));
            selectMeterGroup(document.getElementById("deviceFilterList"));
            loadDataForDate();
        });
    }
}

/// EOF