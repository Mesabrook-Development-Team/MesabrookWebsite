function submit()
{
	$('fieldset').attr('disabled', '');
	$('#spinner').addClass('d-inline');
	$('#spinner').removeClass('d-none');
	$('#errorBanner').addClass('d-none');
	$('#successBanner').addClass('d-none');
	
	$.ajax({
		url: 'https://www.api.mesabrook.com/system/Inactivity/ResetInactivity',
		method: 'PUT',
		data: {
			username: $('#username').val(),
			reason: $('#reason').val()
		},
		headers:
		{
			"Access-Control-Allow-Origin": "http://localhost:58480"
		}
	})
	.fail(function(data)
	{
		$('#errorBanner').removeClass('d-none');
		$('#errorMessage').text('');
		if (data.responseJSON && data.responseJSON.Message)
		{
			$('#errorMessage').text(data.responseJSON.Message);
		}
	})
	.done(function(data)
	{
		$('#successBanner').removeClass('d-none');
	})
	.always(function(arg1, arg2, arg3)
	{
		$('fieldset').removeAttr('disabled');
		$('#spinner').addClass('d-none');
		$('#spinner').removeClass('d-inline');
	});
}

function hidealert(elem)
{
	$(elem).parent().addClass('d-none');
}