'use strict'

window.onload = () => {
	const loader = (() => {
		let cachedUserData = {}
		const loadGeneralData = () => {
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

		const _loadExtraData = userName => {
			
			return cachedUserData[userName];
		}

		const loadExtraData = userName => {
			return new Promise((resolve, reject) => {
				console.log(_loadExtraData(userName));
				if(_loadExtraData(userName) == null){
					const request = new XMLHttpRequest();
					request.open("GET", "https://api.github.com/users/"+userName);
					request.responseType = "json";
					request.onload = () => {
						if(request.status == 200) {
							cachedUserData[userName] = request.response;
							resolve(request.response);
						} else {
							reject(request.statusText);
						}
					};
					request.send(); 
				} 
				else{
					resolve(cachedUserData[userName]);	
				}
			});
		};

		return {
			loadGeneralData: loadGeneralData,
			loadExtraData: loadExtraData 	
		}
	})();
	
	const setupExtraData = (userLogin, userPanel, usersList) => {
		userPanel.onclick = () => {
			const extraUserInfoWrapper = userPanel.nextElementSibling;
			
			const name = extraUserInfoWrapper.querySelector('p#userName');
			const email = extraUserInfoWrapper.querySelector('p#userEmail');
		
				loader.loadExtraData(userLogin)
				.then(response => {
					name.innerHTML = response.name;
					email.innerHTML = response.email; 
				})
				.catch(error => console.log(error));

				userPanel.classList.toggle('active');
				extraUserInfoWrapper.classList.toggle('show');
			}
		}
	
	
	loader.loadGeneralData()
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
			name.id = 'userName';
			
			const email = document.createElement('p');
			email.id = 'userEmail';

			extraUserInfoWrapper.appendChild(name);
			extraUserInfoWrapper.appendChild(email);

			allUsers.appendChild(extraUserInfoWrapper);
		
			setupExtraData(user.login, userWrapper, allUsers);
			
		}
			content.appendChild(allUsers);
	})
	.catch(error => console.log(error));
};
