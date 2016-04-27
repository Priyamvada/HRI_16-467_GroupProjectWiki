
var audioElementIds = {
	/**
	<thisRobotState A or S><InteractionNumber 1 to 5.2>_<connectionState-0 or 1>
	*/
	'A1_1': 'A1',
	'A2_1': 'A2',
	'A3_1': 'A3',
	'A3.1_1': 'A3-1',
	'A3.2_1': 'A3-2',
	'A4.1_1': 'A4-1', //positive ack
	'A4.2_0': 'A4-2', // negative ack
	'A4.3_1': 'A4-1', //positive ack
	'A4.3_0': 'A4-2', //negative ack
	'A5.1_1': 'A5-1',
	'A5.2_1': 'A5-2',

	'S1_0': 'S1',
	'S2_0': 'S2',
	'S3_0': 'S3',
	'S3.1_0': 'S3-1',
	'S3.2_0': 'S3-2',
	'S4.1_0': 'S4-1', //positive ack
	'S4.2_1': 'S4-2', //negative ack
	'S4.3_0': 'S4-1', //positive ack
	'S4.3_1': 'S4-2', //negative ack
	'S5.1_0': 'S5-1',
	'S5.2_0': 'S5-2'

};

var expressionLimits = {
	HAPPY_UPPER: 4* screen_height/10, //min - very happy, wide smile
	HAPPY_LOWER: (4+4/3)* screen_height/10, //happy

	SERIOUS_UPPER: (4+4/3)* screen_height/10 + 1, //somewhat smiling
	NEUTRAL: 6* screen_height/10, //straight-faced
	SERIOUS_LOWER: (4+8/3)* screen_height/10, //somewhat unhappy

	UNHAPPY_UPPER: (4+8/3)* screen_height/10 + 1, //unhappy
	UNHAPPY_LOWER: 8* screen_height/10, //max - very unhappy/angry
};

var constants = {
	CONNECTED: 1,
	DISCONNECTED : 0,
	IDLE: -1,
	NONE: -1,
	SOCIAL: 'S',
	ASOCIAL: 'A',
	HAPPY_INTERACTIONS: [4.1, 5.1],
	UNHAPPY_INTERACTIONS: [4.2]
};

var socket = io.connect('http://' + document.domain + ':' + location.port);
    socket.on('connect', function() {
        console.log('I\'m connected!');
    });


 function playAudio()	{
 	var audioId = audioElementIds[thisRobotState + interactionNumber + '_' + connectionState];
 	var activeAudio = document.getElementById(audioId);

 	console.log(thisRobotState, interactionNumber, audioId);
 	if(activeAudio != null)	{
 		activeAudio.play();
 		speaking = true;
 		setTimeout(function(){ speaking = false; }, 6000);
 	}
 }

socket.on('changeInteraction', function(message)	{
	console.log(message);
	var rand = Math.random(),
		factor = 4/3 * screen_height/10;

	if(message.data != null)	{
		connectionState = message.data.connectionState;
		interactionNumber = message.data.interactionNumber;
	}
	if(connectionState === 0)	{
		
		if(thisRobotState === constants.SOCIAL)	{
			if(constants.HAPPY_INTERACTIONS.indexOf(interactionNumber) !== -1)	{
				smile_y = expressionLimits.HAPPY_UPPER + factor*rand; //state change
			}	else	{
				smile_y = expressionLimits.NEUTRAL + factor*rand; //default state is UNHAPPY
			}
		}	

		else if(thisRobotState === constants.ASOCIAL)	{
			if(constants.UNHAPPY_INTERACTIONS.indexOf(interactionNumber) !== -1)	{
				smile_y = expressionLimits.UNHAPPY_UPPER + factor*rand; //state change
			}	else	{
				smile_y = expressionLimits.SERIOUS_UPPER - factor*rand; //default state is HAPPY
			}			
		}

	}	else if(connectionState === 1)	{
		
		if(thisRobotState === constants.ASOCIAL)	{
			if(constants.HAPPY_INTERACTIONS.indexOf(interactionNumber) !== -1)	{
				smile_y = expressionLimits.NEUTRAL - factor*rand; //state change
			}	else	{
				smile_y = expressionLimits.UNHAPPY_UPPER + factor*rand; //default state is UNHAPPY -> ANGRY
			}
		}

		else if(thisRobotState === constants.SOCIAL)	{
			if(constants.HAPPY_INTERACTIONS.indexOf(interactionNumber) !== -1)	{
				smile_y = expressionLimits.NEUTRAL + factor*rand; //state change
			}	else	{
				smile_y = expressionLimits.HAPPY_UPPER + factor*rand; //default state is HAPPY
			}
		}
	}

	playAudio();
});

socket.on('replayAudio', function(message)	{
	playAudio();
});


 $(document).find('#go-home').on('click', function()	{
 	socket.disconnect();
 });

 $(document).find('#this-robot-controller input').change(function()	{
 	thisRobotState = $(this).val();
	socket.emit('updateInteractionState', {
		data: {
			connectionState: constants.IDLE,
			interactionNumber: constants.NONE
		}
	});
});