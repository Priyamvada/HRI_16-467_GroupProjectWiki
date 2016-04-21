var screen = {};

var constants = {
	CONNECTED: 1,
	DISCONNECTED : 0,
	IDLE: -1,


};

var interactions = {
	
	play: function(interactionNumber)	{

	},

	disableAll: function()	{
		var $inputRadios = screen.$interactionStateRadioGroup.find('input');
		var $radioLabels = screen.$interactionStateRadioGroup.find('label');
		$inputRadios.attr('checked', false);
		$inputRadios.attr('disabled', 'disabled');
		$radioLabels.removeClass('active').addClass('disabled');
	},

	enableAll: function()	{
		var $inputRadios = screen.$interactionStateRadioGroup.find('input');
		$inputRadios.attr('disabled', false);
		screen.$interactionStateRadioGroup.find('label').removeClass('disabled');
	}
};

function init()	{
	screen.$controls = $(document).find('.controls');
	screen.$connectionStateRadioGroup = screen.$controls.find('#experiment-connection-state');
	screen.$interactionStateRadioGroup = screen.$controls.find('#experiment-interaction-state');

	if(parseFloat(screen.$connectionStateRadioGroup.find('input:checked').val()) === constants.IDLE)	{
		interactions.disableAll();
	}	else	{
		interactions.enableAll();
	}
}

function attachListeners()	{
	screen.$connectionStateRadioGroup.find('input').change(function()	{
		if(parseFloat($(this).val()) === constants.IDLE)	{
			interactions.disableAll();
		}	else if(parseFloat($(this).val()) === constants.CONNECTED)	{
			interactions.enableAll();
		}	else {
			interactions.enableAll();
		}
	});

	screen.$interactionStateRadioGroup.find('label').click(function()	{
		if(parseFloat(screen.$connectionStateRadioGroup.find('input:checked').val()) === constants.IDLE)	{
			return false;
		}

		return true;
	});	
}


init();
attachListeners();