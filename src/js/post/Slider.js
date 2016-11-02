import $ from 'jquery';

class Slider{
	constructor(options){
		this.options = options;

		this.current = 0;
		this.pages = Math.ceil(this.options.total/this.options.items);

		if (this.pages==1){

		}

		this.el = options.element;
		this.content = this.el.find('.content');
		this.ul = this.content.find('ul');
		this.li = this.ul.find('li');
		this.next = options.element.find('.next');
		this.previous = options.element.find('.previous');



		this.resize = this.resize.bind(this);

		this.resize();
		$(window).resize( this.resize );

		this.next.click( ()=>this.handleScroll(1) );
		this.previous.click( ()=>this.handleScroll(-1) );
	}

	resize(){
		if (this.pages==1){
			this.next.hide();
			this.previous.hide();
		}

		const width = this.el.width()-this.next.width()-this.previous.width();
		this.content.width(width);
		let elWidth = (this.content.width()-(this.options.spacing*(this.options.items-1)))/this.options.items;
		//this.ul.width((elWidth+this.options.spacing)*this.options.total);
		this.li.width(elWidth);
		this.li.css('margin-right', this.options.spacing+'px');
		const str = 'li:nth-child('+this.options.items+'n)';
		this.ul.find(str).css('margin-right','0px');
		this.content.height( this.li.eq(0).height() );
	}

	handleScroll(n){
		this.current = this.current+n;
		if (this.current>=this.pages) this.current=0;
		if (this.current<0) this.current=this.pages-1;

		this.ul.css('left',(-100*this.current)+'%')
	}
}


export default Slider;
