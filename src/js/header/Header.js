import wp from '../includes/waypoints';

class Header {
	/***************
	CONSTRUCTOR
	***************/
	constructor(){
		this.activateWaypoint();
	}

	/***************
	ACTIVATE MENU WAYPOINT TO ADD STICKY
	***************/
	activateWaypoint(){
		let wp = document.getElementById('menu-waypoint');
		if (wp) {
			this.waypoint = new Waypoint({
				element: document.getElementById('menu-waypoint'),
				handler: this.handleWaypoint
			});
		}
	}

	/***************
	ADD OR REMOVE STICKY BASED ON DIRECTION OF SCROLLING
	***************/
	handleWaypoint(direction){
		if (direction==="down") {
			document.getElementById('menu').classList.add("sticky");
			document.getElementById('menu-waypoint').classList.add("sticky");
		} else {
			document.getElementById('menu').classList.remove("sticky");
			document.getElementById('menu-waypoint').classList.remove("sticky");
		}
	}
}

export default Header;
