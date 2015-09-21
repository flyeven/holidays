module.exports.name = 'hello-world';

module.exports.run = function () {
	
	if (Impulse.settings.debug) {
		console.log('Running holidays module');
		
	}
	
	var request = new XMLHttpRequest();
	
	var country = navigator.language.slice(-2);
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
	var day = new Date().getDay();
	
	request.open('get', 'http://holidayapi.com/v1/holidays?country='+country+'&year='+year+'&month='+month+'&day='+day, false);
	
	request.send(null);
	
	var response = JSON.parse(request.response);
	
	for(var i=0; i<response.holidays.length;i++) {
		Impulse.cards.pushCard({
			type: Impulse.cards.type.Alert,
			layout: Impulse.cards.layout.TitleAndText,
			
			data: {
				title: response.holidays[i].name,
				text: 'Today is ' + response.holidays[i].name + '!'
			}
		});
	}
}