var jjsTable={
initialResultCount:0,
resultCountDisplayed:0,
startValue:0,
endValue:0,
totalResults:0,
sampleTableObject:{},
TableHearderMapping:{},
sortTable:function (property,asc)
{
	sampleTableObject = sampleTableObject.sort(function(a, b) {
        if (asc) return (a[property] > b[property]) ? 1 : ((a[property] < b[property]) ? -1 : 0);
        else return (b[property] > a[property]) ? 1 : ((b[property] < a[property]) ? -1 : 0);
    });
	this.createTableBody();
},
sort:function (object)
{
	this.startValue=0;
    this.endValue =this.resultCountDisplayed;	
	var elementName = object;
	var id;	
	var jsonObjectReference;
	id=elementName.substring(1,3);
	jsonObjectReference =TableHearderMapping[id][0];	
	sortVal= $('#'+elementName).attr('sortOrder');	
	for(i=0;i<TableHearderMapping.length;i++)
	{
		$('#imgH'+i).hide();
	}	
	if(sortVal=='asc')
	{		
		$('#'+elementName).attr('sortOrder','desc');		
		$('#img'+elementName).attr('src','images/moveup_arrow.png');
		$('#img'+elementName).show();		
		this.sortTable(jsonObjectReference,true);		
	}
	else
	{		
		$('#'+elementName).attr('sortOrder','asc');
		$('#img'+elementName).attr('src','images/down_arrow.png');
		$('#img'+elementName).show();
		this.sortTable(jsonObjectReference,false);			
	}	
	return false;
},
createTableHolder:function(holdername)
{
var jjsTable='<table>'+
			'<tr>'+				
				'<td><select title="Results per page" id="resultViewperPage" onchange="jjsTable.changeTableResults(this.value)"><option selected="selected">'+this.initialResultCount+'</option><option>2</option><option>3</option><option>4</option></select></td>'+
				'<td><button title="Previous"  class="glyphicon glyphicon-chevron-left navigationButtons" id="prevReultTable" onclick="jjsTable.prevSet()"></button></td>'+
				'<td><button title="Next"  class="glyphicon glyphicon-chevron-right navigationButtons" id="nextResultTable" onclick="jjsTable.nextSet()"></button></td>'+
			'</tr>'+
		'</table>'+
	  	'<div id="jjsTable" style="width:100%;height:auto;overflow-x: scroll;border:1px solid;">'+
			'<br>'+
		'</div>';
$('#'+holdername).html(jjsTable);
},
createTable:function (divName,initialCount,resultObject,tableHeaderMapping)
{
	this.initialResultCount=initialCount;
	this.endValue=--initialCount;
	this.createTableHolder(divName);
	sampleTableObject=resultObject;
	TableHearderMapping=tableHeaderMapping;
	$('#jjsTable').prepend('<table id="ResultTable" class="table table-hover table-striped table-bordered"></table>');		
	var headerString= "null";		
	for(i=0;i<TableHearderMapping.length;i++)
	{			
			if(headerString=="null")
			{
			headerString='<th style="width:1%"></th><th ><a id="H'+i+'" href="#" sortOrder="asc" onclick="return jjsTable.sort(this.id);">'+TableHearderMapping[i][1]+'<img id="imgH'+i+'" style="display:none;" src="images/down_arrow.png" width="9" height="12" border="0" align="absmiddle"></a></th>';
			}
			else
			{
			headerString+='<th ><a id="H'+i+'" href="#" sortOrder="asc" onclick="return jjsTable.sort(this.id);">'+TableHearderMapping[i][1]+'<img id="imgH'+i+'" style="display:none;" src="images/down_arrow.png" width="9" height="12" border="0" align="absmiddle"></a></th>';
			}
	}
	headerString = '<tr>'+headerString+'</tr>';
	$('#ResultTable').append(headerString);		
	this.createTableBody();
},
createTableBody:function()
{
	var rowCounter=0;
	var rowString="null";
	$("#ResultTable tr:gt(0)").remove();	
	$.map(sampleTableObject, function(obj)
		{					
			var result=jjsTable.tableNavigation(rowCounter);
			if(result===true)
			{
						rowString="null";
						$.each(obj, function(key, value) {			
							if(rowString=="null")
							{
							rowString='<td><input type = "radio" name = "rad"  /></td><td><span>'+value+'</span></td>';
							}							
							else
							{
							rowString+='<td><span>'+value+'</span></td>';
							}	   
						});							
				rowString='<tr>'+rowString+'</tr>';		
				$('#ResultTable tr:last').after(rowString);
			}			
			rowCounter+=1;
		});
		totalResults = rowCounter;
},
tableNavigation:function(currVal)
{	
	if(currVal >= this.startValue)
	{		
		if(currVal<=this.endValue)
		{			
			return true;
		}
		else
		{			
			return false;
		}
	}
	else
	{	
	 return false;
	}
},
changeTableResults:function(futureRowCount)
{
	this.resultCountDisplayed = futureRowCount -1;
	this.startValue=0;
	this.endValue = this.resultCountDisplayed;
	this.createTableBody();
},
nextSet:function()
{
	var selectCount = $( "#resultViewperPage option:selected" ).text();	
	selectCount*=1;
	var tempVal = this.endValue + selectCount;	
	tempVal*=1;	
	if(tempVal < totalResults)
	{
		this.startValue += selectCount;	
		this.endValue +=  selectCount;		
		this.createTableBody();
	}
	else if(totalResults != selectCount)
	{	
		var orginalCount = totalResults -1;
		orginalCount*=1;
		if(orginalCount!=this.startValue && orginalCount != this.endValue)
		{
			 var pendingCount = orginalCount - this.endValue;
			 pendingCount*=1;
			 this.startValue+=pendingCount;			
			 this.endValue+=pendingCount;		 
			 this.createTableBody();
		}
	}
},
prevSet:function()
{
	var selectCount = $( "#resultViewperPage option:selected" ).text();
	selectCount*=1;
	var tempVal = this.endValue - selectCount;		
	tempVal*=1;	
	if(tempVal > 0)
	{
		this.startValue -= selectCount;	
		this.endValue -=  selectCount;
		if(this.startValue<0)
		{
			this.startValue = 0;	
			this.endValue =  (selectCount-1);
		}		
		this.createTableBody();
	}
	else
	{
    	this.startValue = 0;	
		this.endValue =  (selectCount-1);
		this.createTableBody();
	}
}
};
