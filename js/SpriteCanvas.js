//SpriteCanvas
;(function(){
		
	
	var SpriteConstructor = function(custom){
		this.init(custom);
	};
	
	SpriteConstructor.prototype = {
		conf : null,
		collection : [],
		length : 0,
		
		init : function(custom){
			this.conf = {			
				x : 0,
				y : 0,
				xScale : 1,
				yScale : 1,
				rotation : 0,
				draw : function(c){}
			};
			this.conf = extendObject(this.conf,custom);
			
			this.collection = [];
			this.length = 0;
			return this;
		},
		add : function(sprite){
			this.collection.push(sprite);
			this.length++;
			return this;
		},
		animate : function(props,duration){
			
		},
		render : function(stage){
			
			//Set transform
			stage.c.translate(this.conf.x,this.conf.y);
			stage.c.scale(this.conf.xScale,this.conf.yScale);
			stage.c.rotate(this.conf.rotation*Math.PI/180);
			
			this.conf.draw(stage.c);
			
			for(var i=0;i<this.length;i++){
				this.collection[i].render(stage);
			}
			return this;
		}
	};
	
	var StageConstructor = function(id){
		this.init(id);
	};
	
	StageConstructor.prototype = {
		id : null,
		canvas : null,
		c : null,
		collection : [],
		length : 0,
		cTransform : {},
		
		init : function(id){
			this.id = id;
			this.canvas = document.getElementById(id);
			this.c = this.canvas.getContext('2d');
			this.collection = [];
			this.length = 0;
			this.cTransform = {
				x : 0,
				y : 0,
				xScale : 1,
				yScale : 1,
				rotation : 0
			};
			this.render();
			return this;
		},
		render : function(){
			var self = this;
			setInterval(function(){
				self.c.clearRect(0,0,self.canvas.width,self.canvas.height);
				for(var i=0;i<self.length;i++){
					
					//Reset C
					self.c.setTransform(1,0,0,1,0,0);
					self.cTransform = {
						x : 0,
						y : 0,
						xScale : 1,
						yScale : 1,
						rotation : 0
					};
					
					//Render branch
					self.collection[i].render(self);
				}
			},20);
			return this;
		},
		add : function(sprite){
			this.collection.push(sprite);
			this.length++;
			return this;
		},
		quit : function(sprite){
			//
			return this;
		}
	};	
	
	//Shortcut
	if(!window.Sprite){
		window.Sprite = function(custom){			
			return new SpriteConstructor(custom);
		};
		window.Stage = function(custom){
			return new StageConstructor(custom);
		};
	};	
	
})();
