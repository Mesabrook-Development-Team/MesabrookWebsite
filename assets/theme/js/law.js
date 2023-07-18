var law = {};

law.fetchSuccess = function(data)
{
	var lawsByGovernment = {};
	law.lawsByID = {};
	
	data.forEach(function(item)
	{
		if (!Object.hasOwn(lawsByGovernment, item.GovernmentID))
		{
			if (item.Government.Name.toLowerCase() == "republic of mesabrook")
			{
				var topObject = {};
				topObject[item.GovernmentID] = { name: item.Government.Name, laws: [] };
				
				Object.assign(topObject, lawsByGovernment);
				lawsByGovernment = topObject;
			}
			else
			{
				lawsByGovernment[item.GovernmentID] = { name: item.Government.Name, laws: [] };
			}
		}
		
		var lawLite = { name: item.Name, displayOrder: item.DisplayOrder, lawID: item.LawID, sections: [] };
		item.LawSections.forEach(function(itemSection)
		{
			lawLite.sections.push({
				title: itemSection.Title,
				detail: itemSection.Detail,
				displayOrder: itemSection.DisplayOrder
			});
		});
		lawsByGovernment[item.GovernmentID].laws.push(lawLite);
		law.lawsByID[lawLite.lawID] = lawLite;
	});
	
	var navHTML = '<h3>Law Selection</h3><ul class="lawList">';
	for(var key in lawsByGovernment)
	{
		if (!Object.hasOwn(lawsByGovernment, key))
		{
			return;
		}
		
		var value = lawsByGovernment[key];
		navHTML = navHTML + "<li>" + value.name + '<ul class="lawList">';
		value.laws.sort(function(a, b) { return a.displayOrder - b.displayOrder }).forEach(function(law)
		{
			navHTML = navHTML + '<li><button class="btn btn-link m-0 p-0 text-primary" style="text-decoration: none; text-align: left;" onclick="law.loadLaw(' + law.lawID + ');">' + law.name + '</button></li>';
		});
		navHTML = navHTML + '</ul></li>'
	}
	navHTML = navHTML + '</ul>';
	
	document.getElementById('LawNav').innerHTML = navHTML;
};

law.fetchFail = function(xhr, status, detail)
{
	
};

law.init = function()
{
	$.ajax({
		url: 'http://localhost:58480/gov/Law/GetAll',
		method: 'GET',
		success: law.fetchSuccess,
		error: law.fetchFail
	});
};

law.loadLaw = function(lawID)
{
	var lawDetailElement = document.getElementById('LawDetail');
	var lawLite = law.lawsByID[lawID];
	if (lawLite == null)
	{
		lawDetailElement.innerHTML = '<h3 class="text-danger">An error occurred loading this law</h3>';
	}
	
	var detailHTML = '<h3>Sections for <strong>' + lawLite.name + '</strong></h3>';
	lawLite.sections.sort(function(a,b) { return a.displayOrder - b.displayOrder; }).forEach(function(section)
	{
		detailHTML = detailHTML + '<hr /><h4>' + section.title + '</h4><p>' + section.detail + '</p>';
	});
	
	lawDetailElement.innerHTML = detailHTML;
};

$(function() { law.init(); });