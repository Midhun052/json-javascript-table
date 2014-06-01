json-javascript-table
=====================

JSON-JavaScript-Table (jjsTable) is JavaScript library used to create html table from JSON data.
Bootstrap framework used to make the table responsive. 

 > Allows sorting by column
 > Allows pagination
 > User can configure number of results to be shown
 
Important:
User needs to create a mapping library between the JSON data and column header to be shown. Please follows as shown in the example.


syntax:
jjsTable.createTable('tablePlaceHolder',initialResultCount,sampleJSONObject,columnHeadingMappingArray);

 tablePlaceHolder - a html place holder to render the table
 initialResultCount - initial result count to be displayed in table.
 sampleJSONObject - JSON Object containing data.
 columnHeadingMappingArray - A mapping between the JSON data and the table column to be displayed

example:

//JSON data 
var sample='[{eName:"A",eId:"10001",eLoc:"ABC",eAge:"20",eSal:"10000$",eSkill:"Java"},'+
			'{eName:"B",eId:"10002",eLoc:"BCD",eAge:"25",eSal:"20000$",eSkill:"C#"},'+
			'{eName:"C",eId:"10003",eLoc:"CDE",eAge:"25",eSal:"30000$",eSkill:"JavaScript"},'+
			'{eName:"D",eId:"10004",eLoc:"CDF",eAge:"26",eSal:"30001$",eSkill:"Oracle"}'+
']';

//Mapping between the table header and table body
var columnHeadingMappingArray=[['eName','Name'],['eId','Emp Id'],['eLoc','Location'],['eAge','Age'],['eSal','Salary'],['eSkill','Skill']];


//JSON object created from JSON data
var sampleJSONObject= eval("("+sample+")");


$(function()
{
	//call createTable 
	var initialResultCount=1;
	jjsTable.createTable('tablePlaceHolder',initialResultCount,sampleJSONObject,columnHeadingMappingArray);
	
});
	