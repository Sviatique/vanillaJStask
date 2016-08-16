'use strict'

window.onload = () => {
	
	const loadData = () => {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open("GET", "https://api.github.com/users");
			request.responseType = "json";
			request.onload = () => {
			    	if(request.status == 200) {
			    		resolve(request.response);
			        } else {
			        	reject(request.statusText);
			        }
			};
			request.send();
		});
	};

	const loadConreteUserData = (userName) => {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open("GET", "https://api.github.com/users/"+userName);
			request.responseType = "json";
			request.onload = () => {
			    	if(request.status == 200) {
			    		resolve(request.response);
			        } else {
			        	reject(request.statusText);
			        }
			};
			request.send();
		});
	}

	const setupExtraUserData = (userLogin, userPanel, usersList) => {
		userPanel.onclick = () => {
			// loadConreteUserData(userLogin)
			// .then(response => {
			// 	const name = document.createElement('p');
			// 	const email = document.createElement('p');
			// 	const extraUserInfoWrapper = userPanel.nextElementSibling;

			// 	name.innerHTML = user.name;
			// 	email.innerHTML = user.email; 

			// 	extraUserInfoWrapper.appendChild(name);
			// 	extraUserInfoWrapper.appendChild(email);

			// 	usersList.appendChild(extraUserInfoWrapper);
			// })
			//.catch(error => console.log(error));

			const extraUserInfoWrapper = userPanel.nextElementSibling;


			userPanel.classList.toggle('active');
			extraUserInfoWrapper.classList.toggle('show');
		}
	}
	
	loadData()
	.then(response => {
		const content = document.getElementById("content");
		const allUsers = document.createElement('ul');
		allUsers.id = 'users';

		while(response.length){
			const avatar = document.createElement('img');
			const login = document.createElement('p');
			const admin = document.createElement('p');
			const userWrapper = document.createElement('li');
			
			let user = response.shift();

			userWrapper.id = user.id;
			userWrapper.className = 'row';

			avatar.src = user.avatar_url;
			avatar.className = 'col-xs-4';

			login.innerHTML = user.login;
			login.className = 'col-xs-4';
			
			admin.innerHTML = user.site_admin;
			admin.className = 'col-xs-4';
			
			userWrapper.appendChild(avatar);
			userWrapper.appendChild(login);
			userWrapper.appendChild(admin);

			allUsers.appendChild(userWrapper);

			const extraUserInfoWrapper = document.createElement('div');
			extraUserInfoWrapper.className = 'extraInfo';

			const name = document.createElement('p');
			const email = document.createElement('p');

			name.innerHTML = 'userLogin';
			email.innerHTML = 'userEmail'; 

			extraUserInfoWrapper.appendChild(name);
			extraUserInfoWrapper.appendChild(email);

			allUsers.appendChild(extraUserInfoWrapper);

			setupExtraUserData(user.login, userWrapper, allUsers);
		}
		
			content.appendChild(allUsers);
	})
	.catch(error => console.log(error));
};
