
var socket = io('wss://ws.poyu.xyz:13374');
console.log(socket);

var channelKey = md5(window.location.href);

socket.on(channelKey, function (data) {
	console.log('Received');
	$('#codesmith-chat-logs').append('<p>'+ data +'</p>')
});

$('body').append('<div class="toggle-able sidebar-hidden" id="codesmith-chat"></div>');
$('#codesmith-chat').append('<div id="codesmith-chat-logs"></div>');
$('#codesmith-chat').append('<div id="codesmith-input-group"><input id="codesmith-chat-input" type="text" placeholder="Say Something..."><span class="toggle"><i class="fa fa-window-close-o"" aria-hidden="true"></i></span></div>');

$('body').append('<div id="codesmith-toggle" class="toggle-able toggle"><i class="fa fa-commenting-o" aria-hidden="true"></i></div>');

$('#codesmith-chat-input').on('keypress', function(ev) {
	if (ev.keyCode === 13) {
		socket.emit('test', {
			key: channelKey,
			data: $('#codesmith-chat-input').val()
		});
		$('#codesmith-chat-logs').append('<p>'+ $('#codesmith-chat-input').val() +'</p>');
		$('#codesmith-chat-input').val('');
		console.log('We just emitted!!!');
	} 
});

$('.toggle').on('click', function() {
	$('.toggle-able').toggleClass('sidebar-hidden');
});

var fa = document.createElement('style');
fa.type = 'text/css';
fa.textContent = '@font-face { font-family: FontAwesome; src: url("'
+ chrome.extension.getURL('fonts/fontawesome-webfont.woff')
+ '"); }';
document.head.appendChild(fa);
