//SpriteCanvas
;(function(){
		
	//Utils
	if(!window.Object.extend){
		window.Object.prototype.extend = function(source) {
			for (var property in source) {
				if (source[property] && source[property].constructor && source[property].constructor === Object) {
					this[property] = this[property] || {};
					arguments.callee(this[property], source[property]);
				}else{
					this[property] = source[property];
				};
			};
			return this;
		};
	}
	
	var SpriteC = function(){
	
	};
	
	SpriteC.prototype = {
		conf : {			
			x : 0,
			y : 0,
			draw : function(c){}
		},
		c : null,
		parent : null,
		collection : [],
		length : 0,
		init : function(custom){
			this.conf.extend(custom);
			return this;
		},
		add : function(sprite){
			sprite.parent = this;
			sprite.c = this.c;
			this.collection.push(sprite);
			this.length++;
			return this;
		},
		render : function(){
			this.conf.draw(this.c);
			
			for(var i=0;i<this.length;i++){
				this.collection[i].render();
			}
			return this;
		}
	};
	
	var StageC = function(id){
		this.init(id);
	};
	
	StageC.prototype = {
		id : null,
		canvas : null,
		c : null,
		mainSprite : null,
		
		init : function(id){
			this.id = id;
			this.canvas = document.getElementById(id);
			this.c = this.canvas.getContext('2d');
			
			this.mainSprite = new Sprite();
			this.mainSprite.c = this.c;
			this.render();
			return this;
		},
		render : function(){
			var self = this;
			setInterval(function(){
			//	self.c.clearRect(0,0,self.canvas.width,self.canvas.height);
				self.mainSprite.render();
			},20);
			return this;
		},
		add : function(sprite){
			this.mainSprite.add(sprite);
			return this;
		},
		quit : function(sprite){
			this.mainSprite.quit(sprite);
			return this;
		}
	};	
	
	//Shortcut
	if(!window.Sprite){
		window.Sprite = function(custom){
			var newS = new SpriteC(custom);
			newS.init(custom);
			return newS;
		};
		window.Stage = function(custom){
			return new StageC(custom);
		};
	};	
	
})();
