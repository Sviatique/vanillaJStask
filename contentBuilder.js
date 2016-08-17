const contentBuilder = (() => {
    
    const getUserElement = (user) => {
        const avatar = document.createElement('img');
        const login = document.createElement('p');
        const admin = document.createElement('p');

        const userWrapper = document.createElement('li');

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

        return userWrapper;
    }

    const getExtraUserInfoElement = () => {
        const extraUserInfoWrapper = document.createElement('div');
        extraUserInfoWrapper.className = 'extraInfo';
			
        const name = document.createElement('p');
        name.id = 'userName';
        
        const email = document.createElement('p');
        email.id = 'userEmail';

        extraUserInfoWrapper.appendChild(name);
        extraUserInfoWrapper.appendChild(email);
        return extraUserInfoWrapper;
    }

    const setupExtraData = (userLogin, userPanel, usersList) => {
        userPanel.onclick = () => {
            const extraUserInfoWrapper = userPanel.nextElementSibling;
            
            const name = extraUserInfoWrapper.querySelector('p#userName');
            const email = extraUserInfoWrapper.querySelector('p#userEmail');

            const extraData = loader.loadExtraData(userLogin)
            .then(data => {
                name.innerHTML = data.name;
                email.innerHTML = data.email;
            })
            .catch(error => console.log(error));
             
            
            userPanel.classList.toggle('active');
            extraUserInfoWrapper.classList.toggle('show');
        }
	}

    const build = (data) => {
        const content = document.getElementById("content");
	    const allUsers = document.createElement('ul');
	    
        allUsers.id = 'users';

        while(data.length){
			let user = data.shift();
            const userElement = getUserElement(user);
			allUsers.appendChild(userElement);

			const extraUserInfoElement = getExtraUserInfoElement();
			allUsers.appendChild(extraUserInfoElement);
		
			setupExtraData(user.login, userElement, allUsers);
		}
			content.appendChild(allUsers);
    }
    return {
        build: build
    }
})();