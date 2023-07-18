var tos = {};

tos.loadTOS = function(product)
{
	var detailElement = document.getElementById("TOSDetail");
	detailElement.innerHTML = "Fetching Terms Of Service...";
	
	$.ajax({
		url: 'https://api.mesabrook.com/system/TermsofService/Get/' + product,
		method: 'GET',
		success: tos.onSuccess,
		error: tos.onError
	});
};

tos.onSuccess = function(data)
{
	var detailElement = document.getElementById("TOSDetail");
	if (data == null)
	{
		data = "No data was received from the server";
	}
	detailElement.innerHTML = data.replaceAll('\n', '<br />');
};

tos.onError = function(xhr, error, additionalError)
{
	var detailElement = document.getElementById("TOSDetail");
	var errorToDisplay = error;
	if (additionalError != null)
	{
		errorToDisplay = errorToDisplay + " " + additionalError
	}
	detailElement.innerHTML = '<p style="color: #dc3545;">An error occurred fetching Terms Of Service: ' + errorToDisplay + '</p>';
};