const contentBuilder = (() => {
    
    const getGeneralUserInfoElement = (user) => {
        const avatar = document.createElement('img');
        const login = document.createElement('p');
        const admin = document.createElement('p');

        const userWrapper = document.createElement('div');

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

    const setupExtraData = (userLogin, userPanel) => {
        userPanel.onclick = () => {
            const extraUserInfoWrapper = userPanel.querySelector('div.extraInfo');
            
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
        loader.loadGeneralData()
        .then(data => {
            while(data.length){
                let user = data.shift();
                const userElement = document.createElement('li');
                
                const generalUserInfoElement = getGeneralUserInfoElement(user); 
                const extraUserInfoElement = getExtraUserInfoElement();

                userElement.appendChild(generalUserInfoElement);
                userElement.appendChild(extraUserInfoElement);
                
                setupExtraData(user.login, userElement);
                allUsers.appendChild(userElement);
            }
        })
        .catch(error => console.log(error));

        const content = document.getElementById("content");
	    const allUsers = document.createElement('ul');
	    
        allUsers.id = 'users';
	    content.appendChild(allUsers);
    }
    return {
        build: build
    }
})();