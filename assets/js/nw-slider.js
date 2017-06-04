function nw_slider_lib(){

	var btnActive,
		self = this,
		speed,
		transition,
		transition_success = true;

	this.btnStatus = true;
	this.first_left = false;
	this.first_right = false;
	this.nw_slider_count = 0;
	this.nw_elements;
	this.nw_elements_length;

	this.run = function(config){

		this.nw_elements = document.querySelectorAll('#' + config['id'] + ' ul li');
		this.nw_elements_length = this.nw_elements.length;

		var nw_container = document.getElementById(config['id']);
		nw_container.classList.add("nw-slider");

		var calc_height_by_img = document.querySelector('#' + config['id'] + ' li img');
		nw_container.style.height = calc_height_by_img.height + 'px';

		nw_container.onmouseover = function(){transition_success = false;}
		nw_container.onmouseout = function(){transition_success = true;}

		set_vars(config);
		if(config['buttons'] != undefined && config['buttons'] == true)
			add_buttons(nw_container);

		prepare();
		setInterval(prepare, speed);
	}

	this.changeClass = function(exception){

		for(var i=0 ; i<self.nw_elements_length; i++){
			if(transition_success === true || exception === true)
				self.nw_elements[i].className =
					((i!=self.nw_slider_count)?'nw-slider-'+transition+'-secondary':'nw-slider-'+transition+'-primary');
		}
	}

	function add_buttons(nw_container){

		var div = document.createElement('div');
		div.className = 'nw-slider-arrow-left';
		nw_container.appendChild(div);

		div.onclick = function(){

			if(self.btnStatus === true) {

				setBtnStatus();

				if(self.first_left == false && self.first_right == false)
					if(self.nw_slider_count == 1)
						self.nw_slider_count = self.nw_elements_length - 1;
					else
						self.nw_slider_count = ((self.nw_slider_count-2 < 0)?self.nw_elements_length-2:self.nw_slider_count-2);
				else
					self.nw_slider_count = ((--self.nw_slider_count < 0)?self.nw_elements_length-1:self.nw_slider_count);

				self.changeClass(true);
				if(self.first_left == false)self.first_left = true;
			}
		}

		var div = document.createElement('div');
		div.className = 'nw-slider-arrow-right';
		nw_container.appendChild(div);

		div.onclick = function(){

			if(self.btnStatus === true) {

				setBtnStatus();

				if(self.first_right != false || self.first_left != false)
					self.nw_slider_count = ((++self.nw_slider_count >= self.nw_elements_length)?0:self.nw_slider_count);

				self.changeClass(true);
				if(self.first_right == false)self.first_right = true;
			}
		}
	}

	function prepare(){

		self.changeClass();

		if(transition_success == true){
			if(self.first_left)self.first_left=false;
			if(self.first_right)self.first_right=false;
			self.nw_slider_count = ((++self.nw_slider_count >= self.nw_elements_length)?0:self.nw_slider_count);
		}
	}

	function setBtnStatus(){

		if(self.btnStatus === true && transition != 'none'){

			self.btnStatus = false;
			var x = 0;

			btnActive = setInterval(function(){

				if(x > 0) {
					window.clearInterval(btnActive);
					self.btnStatus = true;
				}
				++x;

			},500);
		}
	}

	function set_vars(config){

		if(config['backgroundColor'] != undefined)
			for(var i = 0; i < this.nw_elements_length; i++)
    			this.nw_elements[i].style.backgroundColor = config['backgroundColor'];

		transition = ((config['transition']!=undefined)?config['transition']:'linear-left');
		speed = ((config['speed']!=undefined)?config['speed']:5000);
		speed = ((transition == 'opacity' && speed < 6000)?6000:speed);
		speed = ((transition != 'none' && speed < 2000)?2000:speed);
	}
}

function nw_slider(){

	var add_sliders = new Array();

	this.add = function(config_){

		add_sliders_length = add_sliders.length;

		add_sliders.push(new nw_slider_lib());
		add_sliders[add_sliders_length].run(config_);
	}
}

var NW_SLIDER = new nw_slider();
