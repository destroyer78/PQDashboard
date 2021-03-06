<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FaultSpecifics.aspx.cs" Inherits="FaultSpecifics" %>
<%@ Import Namespace="FaultData.DataAnalysis" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" style="height: 100%;">
<head id="Head1" runat="server">
    <title>Fault Specifics</title>
    
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="shortcut icon" type="image/ico" href="~/favicon.ico" />
	<link rel="stylesheet" href="./css/FaultSpecifics.css" type="text/css" />

    <style>
        body {
            border: 0;
            margin: 0;
            padding: 0;
            height: 100%;
        }

        div {
            display: block;
            position: absolute;
            height: auto;
            bottom: 0;
            top: 0;
            left: 0;
            right: 0;
            margin: 10px;
        }

        table {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            border-spacing: 0;
            border-collapse: collapse;
        }

        th, td {
            border: solid black 1px;
            padding: 0;
            white-space: nowrap;
        }
    </style>
	
	</head>
	
	<body>
        <div>
	        <table>
                <tr><td colspan="2" style="text-align: center"><%=postedMeterName %></td></tr>
	            <tr><td style="text-align: right">Fault Type:</td><td =><%=postedFaultType %></td></tr>
                <tr><td style="text-align: right">Start Time:</td><td><%=postedStartTime %></td></tr>
	            <tr><td style="text-align: right">Inception Time:</td><td><%=postedInceptionTime %></td></tr>
	            <tr><td style="text-align: right">Delta Time:</td><td><%=postedDeltaTime %></td></tr>
	            <tr><td style="text-align: right">Fault Duration:</td><td><%=postedDurationPeriod %></td></tr>
	            <tr><td style="text-align: right">Fault Current:</td><td><%=postedFaultCurrent %></td></tr>
	            <tr><td style="text-align: right">Distance Method:</td><td><%=postedDistanceMethod %></td></tr>
	            <tr><td style="text-align: right">Single-ended Distance:</td><td><%=postedSingleEndedDistance %></td></tr>
	            <tr><td style="text-align: right">Double-ended Distance:</td><td><%=postedDoubleEndedDistance %></td></tr>
                <tr><td style="text-align: right">Double-ended Angle:</td><td><%=postedDoubleEndedConfidence %></td></tr>
	            <tr><td style="text-align: right">OpenXDA EventID:</td><td><%=postedEventId %></td></tr>
            </table>
        </div>
	</body>
</html>