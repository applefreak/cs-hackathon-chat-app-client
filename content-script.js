
var socket = io('http://192.168.0.96:3000');

var channelKey = md5(window.location);

socket.on(channelKey, function (data) {
	console.log('Received');
    $('#codesmith-chat').append('<p>'+ data +'</p>')
});

var $ourDiv = $('body').append('<div id="codesmith-chat"></div>');
$('#codesmith-chat').append('<input id="codesmith-chat-input" type="text" placeholder="Say Something...">');

$('#codesmith-chat-input').on('keypress', function(ev) {
	if (ev.keyCode === 13) {
		socket.emit('test', {
			key: channelKey,
			data: $('#codesmith-chat-input').val()
		});
		console.log('We just emitted!!!');
	} 
});
