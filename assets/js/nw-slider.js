function nw_slider_lib(nw_slider_number){

	var self = this;
	var speed;
	var transition_success = true;

	this.first_left = false;
	this.first_right = false;
	this.nw_slider_count = 0;
	this.nw_elements;
	this.transition;

	this.run = function(config){

		this.nw_elements = document.querySelectorAll('#' + config['id'] + ' ul li');
		this.transition = ((config['transition']!=undefined)?config['transition']:'linear-left');
		speed = ((config['speed']!=undefined)?config['speed']:5000);
		speed = ((this.transition == 'opacity' && speed < 6000)?6000:speed);

		var nw_container = document.getElementById(config['id']);
		nw_container.classList.add("nw-slider");

		var calc_height_by_img = document.querySelector('#' + config['id'] + ' li img');
		if(calc_height_by_img != null)
			nw_container.style.height = calc_height_by_img.height + 'px';
		else
			nw_container.style.height = config['height'] + 'px';

		nw_container.onmouseover = function(){self.pause()}
		nw_container.onmouseout = function(){self.restart()}

		if(config['buttons'] != undefined && config['buttons'] == true){

			this.add_buttons(nw_container);
		}

		this.start();
	}

	this.prepare = function(){

		self.changeClass();

		if(transition_success == true){
			if(self.first_left)self.first_left=false;
			if(self.first_right)self.first_right=false;
			self.nw_slider_count = ((++self.nw_slider_count >= self.nw_elements.length)?0:self.nw_slider_count);
		}
	}

	this.changeClass = function(exception){

		var exception_ = ((exception == undefined)?false:exception);

		for(var i=0 ; i<self.nw_elements.length; i++)
			if(transition_success == true || exception_ == true)
				self.nw_elements[i].className =
					((i!=self.nw_slider_count)?'nw-slider-'+self.transition+'-secondary':'nw-slider-'+self.transition+'-primary');
	}

	this.start = function(){

		this.prepare();
		setInterval(this.prepare, speed);
	}

	this.restart = function(){

		transition_success = true;
	}

	this.pause = function(){

		transition_success = false;
	}
}

nw_slider_lib.prototype.add_buttons = function(nw_container){

	var self = this;
	var div = document.createElement('div');
	div.className = 'nw-slider-arrow-left';
	nw_container.appendChild(div);

	div.onclick = function(){

		if(self.first_left == false && self.first_right == false){
			self.nw_slider_count = ((self.nw_slider_count-2 < 0)?self.nw_elements.length-1:self.nw_slider_count-2);
		}
		else
			self.nw_slider_count = ((--self.nw_slider_count < 0)?self.nw_elements.length-1:self.nw_slider_count);

		self.changeClass(true);
		if(self.first_left == false)self.first_left = true;
	}

	var div = document.createElement('div');
	div.className = 'nw-slider-arrow-right';
	nw_container.appendChild(div);

	div.onclick = function(){

		if(self.first_right != false || self.first_left != false)
			self.nw_slider_count = ((++self.nw_slider_count >= self.nw_elements.length)?0:self.nw_slider_count);

		self.changeClass(true);
		if(self.first_right == false)self.first_right = true;
	}
}

function nw_slider(){

	var add_sliders = new Array();

	this.add = function(config_){

		add_sliders_length = add_sliders.length;

		add_sliders.push(new nw_slider_lib(add_sliders_length));
		add_sliders[add_sliders_length].run(config_);

	}
}

var NW_SLIDER = new nw_slider();
