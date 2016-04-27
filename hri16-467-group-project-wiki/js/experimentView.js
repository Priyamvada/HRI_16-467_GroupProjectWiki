var socket = io.connect('http://' + document.domain + ':' + location.port);
    socket.on('connect', function() {
        console.log('I\'m connected!');
    });

    socket.on('changeInteraction', function(message)	{
    	console.log(message);
    	if(message.data != null)	{
			connectionState = message.data.connectionState;
			interactionNumber = message.data.interactionNumber;
    	}
    });

 function playAudio()	{

 }

 $(document).find('#go-home').on('click', function()	{
 	socket.disconnect();
 });

 $(document).find('#this-robot-controller input').change(function()	{
 	thisRobotState = $(this).val();
	socket.emit('updateInteractionState', {
		data: {
			connectionState: -1,
			interactionNumber: -1
		}
	});
});