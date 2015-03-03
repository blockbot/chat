(function($){
	
	var JD = {
		server: io.connect("---------- ADD A LOCAL OR REMOTE URL WITH A MATCHING PORT NUMBER FOUNDIN APP.JS --------------"),
		audioPlayed: false,
		init:function(){
			
			if($("#chat-form").length){
				JD.chat();
			}
			
		},
		chat:function(){

			console.log("hello?");

			JD.server.on("connect", function(data){
				nickname = prompt("What is your nickname?");

				JD.server.emit("join", nickname);

			});

			$('#chat-form').submit(function(e){

				e.preventDefault();
				console.log("submitting?");
				var message = $("#chat-input").val();
				JD.server.emit("messages", message);
				$("#chat-input").val("");

			});

			JD.server.on("chat", function(data){
				
				console.log(data);

				var audio = new Audio('http://cone-of-silence-chat.herokuapp.com/sounds/right.mp3');
					
					
				console.log(!JD.audioPlayed);

				if(!JD.audioPlayed){
				
					console.log();

					audio.play();
				
					JD.audioPlayed = true;

					setTimeout(function(){
						JD.audioPlayed = false;
					}, 60000);
				
				}		
				
				$("#chat-messages").append("<div class='chatter-name-message'><p class='chatter-name'>" + data[0] + ":</p><p class='chatter-message'>" + data[1] + "</p></div>");
			});
		}
		
	}
	
	JD.init();
	
})(jQuery);