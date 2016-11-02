import $ from 'jquery';
import Slider from './Slider';

class Post {
	constructor(){
		$('.products-slider').each( function(){
			let t = $(this);
			let s = new Slider({
				element: t,
				items: t.attr('show'),
				total: t.attr('total'),
				spacing: t.attr('spacing')
			});
		});
	}
}

export default Post;
