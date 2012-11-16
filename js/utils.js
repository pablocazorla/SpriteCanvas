;(function(){
	
	//Debbuger
	if(!window.log){
		window.log = function (test,message) {
			try {				
				if(message==undefined){
					console.log(test);
				}else{
					if(test){
						console.log(message);
					}
				}
			} catch (exception) {
				return;
			}
		}
	};
	
		
})();

