var screen = {};

var constants = {
	CONNECTED: 1,
	DISCONNECTED : 0,
	IDLE: -1,
	NONE: -1


};

var socket;

var interactions = {

	disableAll: function()	{
		var returnElements = this.clearAll();
		returnElements.$inputRadios.attr('disabled', 'disabled');
		returnElements.$radioLabels.addClass('disabled');
	},

	enableAll: function()	{
		var $inputRadios = screen.$interactionStateRadioGroup.find('input');
		$inputRadios.attr('disabled', false);
		screen.$interactionStateRadioGroup.find('label').removeClass('disabled');
	},

	clearAll: function()	{
		var $inputRadios = screen.$interactionStateRadioGroup.find('input');
		var $radioLabels = screen.$interactionStateRadioGroup.find('label');
		$inputRadios.attr('checked', false);
		$radioLabels.removeClass('active');
		return {$inputRadios: $inputRadios, $radioLabels: $radioLabels};
	}
};

function init()	{
	screen.$controls = $(document).find('.controls');
	screen.$connectionStateRadioGroup = screen.$controls.find('#experiment-connection-state');
	screen.$interactionStateRadioGroup = screen.$controls.find('#experiment-interaction-state');
	screen.$goHome = $(document).find('#go-home');
	screen.$replayBtn = $(document).find('#replay');

	if(parseFloat(screen.$connectionStateRadioGroup.find('input:checked').val()) === constants.IDLE)	{
		interactions.disableAll();
	}	else	{
		interactions.enableAll();
	}
}

function initSocket()	{
	socket = io.connect('http://' + document.domain + ':' + location.port);
    socket.on('connect', function() {
        console.log('I\'m connected!');
    });
}

function attachListeners()	{
	screen.$connectionStateRadioGroup.find('input').change(function()	{
		if(parseFloat($(this).val()) === constants.IDLE)	{
			interactions.disableAll();
		}	else if(parseFloat($(this).val()) === constants.CONNECTED)	{
			interactions.enableAll();
			interactions.clearAll();
		}	else {
			interactions.enableAll();
			interactions.clearAll();
		}

		socket.emit('updateInteractionState', {
			data: {
				connectionState: parseFloat($(this).val()),
				interactionNumber: constants.NONE
			}
		});
	});

	screen.$interactionStateRadioGroup.find('label').click(function()	{
		if(parseFloat(screen.$connectionStateRadioGroup.find('input:checked').val()) === constants.IDLE)	{
			return false;
		}

		return true;
	});

	screen.$interactionStateRadioGroup.find('input').change(function()	{
		socket.emit('updateInteractionState', {
			data: {
				connectionState: parseFloat(screen.$connectionStateRadioGroup.find('input:checked').val()),
				interactionNumber: parseFloat($(this).val())
			}
		});
	});

	screen.$goHome.on('click', function()	{
		if(socket != null)	{
			socket.disconnect();
		}
	});

	screen.$replayBtn.on('click', function()	{
		socket.emit('trigger_replay',{});
	});
}


init();
initSocket();
attachListeners();