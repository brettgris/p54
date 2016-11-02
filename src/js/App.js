import Header from './header/Header';
import Post from './post/Post';
import $ from 'jquery';

class App {
	/***************
	CONSTRUCTOR
	***************/
	constructor(){
		//ADD HEADER

		$(document).ready( ()=>{
			this.Header = new Header();
			this.Post = new Post();
		});
	}
}

export default new App();
