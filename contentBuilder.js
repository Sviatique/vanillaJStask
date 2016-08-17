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
        name.className = 'name';

        const email = document.createElement('p');
        email.className = 'email';

        const following = document.createElement('a');
        following.className = 'following';

        const followers = document.createElement('a');
        followers.className = 'followers';

        extraUserInfoWrapper.appendChild(name);
        extraUserInfoWrapper.appendChild(email);
        extraUserInfoWrapper.appendChild(following);
        extraUserInfoWrapper.appendChild(followers);

        return extraUserInfoWrapper;
    }

    const setupExtraData = (userLogin, userPanel) => {
        userPanel.onclick = () => {
            const extraUserInfoWrapper = userPanel.querySelector('div.extraInfo');
            
            const name = extraUserInfoWrapper.querySelector('p.name');
            const email = extraUserInfoWrapper.querySelector('p.email');
            const following = extraUserInfoWrapper.querySelector('a.following');
            const followers = extraUserInfoWrapper.querySelector('a.followers');

            const extraData = loader.loadExtraData(userLogin)
            .then(data => {
                console.log(data);
                name.innerHTML = data.name;
                email.innerHTML = data.email;
                following.innerHTML = 'Following';
                followers.innerHTML = 'Followers';
                following.href = data.html_url + '/following';
                followers.href = data.html_url + '/followers';
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
	    
	    content.appendChild(allUsers);
    }
    return {
        build: build
    }
})();