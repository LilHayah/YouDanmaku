var btnSubmit = 'Submit-Comment';

function checkButton(){
	var button = document.getElementById(btnSubmit);

	if (button == null){
		add button();
	}
		
}

function addButton(){
	var container = document.getElementById('watch7-user-header');
	var btn = document.createElement('button');
	lastContainerChild = container.lastElementChild;
	btn.id = 'comment';
	btn.setAttribute('type', 'button');
	btn.setAttribute('Title', 'Submit');
	btn.setAttribute('data-tool-tip', 'Submit');
	btn.setAttribute('class', 'yt-subscription-button yt-uix-button yt-uix-button-subscribe-branded');
	btn.style.marginleft='10px';


	var btnTitle = document.createElement('span');
	btnTitle.setAttribute('id', 'submit');
	btnTitle.appendChild(document.createTextNode('Submit!'));
	btnTitle.setAttribute('class', 'yt-uix-button-content');
	btn.appendChild(btnTitle);
	container.appendChild(btn);
	// event listner for button click to send comments
}

// send comment function

window.setInterval(checkButton,1000);
