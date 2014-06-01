//Mapping between the table header and table body
var tableHeadingMappingArray=[['eName','Name'],['eId','Emp Id'],['eLoc','Location'],['eAge','Age'],['eSal','Salary'],['eSkill','Skill']];

//JSON data 
var sample='[{eName:"A",eId:"10001",eLoc:"ABC",eAge:"20",eSal:"10000$",eSkill:"Java"},'+
			'{eName:"B",eId:"10002",eLoc:"BCD",eAge:"25",eSal:"20000$",eSkill:"C#"},'+
			'{eName:"C",eId:"10003",eLoc:"CDE",eAge:"25",eSal:"30000$",eSkill:"JavaScript"},'+
			'{eName:"D",eId:"10004",eLoc:"CDF",eAge:"26",eSal:"30001$",eSkill:"Oracle"}'+
']';
//JSON object created from JSON data
var sampleJSONObject= eval("("+sample+")");


$(function()
{
	//call createTable 
	var initialResultCount=1;
	jjsTable.createTable('tablePlaceHolder',initialResultCount,sampleJSONObject,tableHeadingMappingArray);
	
});
	
	
	
