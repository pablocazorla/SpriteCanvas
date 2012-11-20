//SpriteCanvas
;(function(){
		
	
	var SpriteConstructor = function(custom){
		this.init(custom);
	};
	
	SpriteConstructor.prototype = {
		conf : null,
		collection : [],
		length : 0,
		msStep : 20,
		
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
		
		
		
		//Cinematics
		
		cinematic : {
			e : [],
			l : 0
		},
				
		
		
		
		
		
		
		animate : function(props,duration){
			var steps = Math.round(duration/this.msStep),
				animation = [{},steps];
			for(var a in props){
				animation[0][a] = (parseInt(props[a]) - parseInt(this.conf[a]))/steps;
			};
			this.cinematic.e.push(animation);
			this.cinematic.l++;
			return this;
		},
		render : function(stage){
			
			//Cinematics
			if(this.cinematic.l > 0){
				for(var i=0;i<this.cinematic.l;i++){
					for(var a in this.cinematic.e[i][0]){
						this.conf[a] += this.cinematic.e[i][0][a];
					};
					this.cinematic.e[i][1]--;
				}
				
			}
			
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
			},self.msStep);
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
