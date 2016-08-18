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
    const setLinkProps = links => {
        links.map(link => {
            link.onclick = (event) => {
                event.stopPropagation();
            }
            link.target="_blank";
        });            
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

        const starred = document.createElement('a');
        starred.className = 'starred';

        const subscriptions = document.createElement('a');
        subscriptions.className = 'subscriptions';
        
        const organizations = document.createElement('a');
        organizations.className = 'organizations';
        
    
        const repos = document.createElement('a');
        repos.className = 'repos';
        
        setLinkProps([following, followers, starred, subscriptions, repos]);

        const followingImage = document.createElement('img');
        const followersImage = document.createElement('img');
        const starredImage = document.createElement('img');
        const subscriptionsImage = document.createElement('img');
        const organizationsImage = document.createElement('img');
        const reposImage = document.createElement('img');
        
        following.appendChild(followingImage);
        followers.appendChild(followersImage);
        starred.appendChild(starredImage);
        subscriptions.appendChild(subscriptionsImage);
        organizations.appendChild(organizationsImage);
        repos.appendChild(reposImage);
        extraUserInfoWrapper.appendChild(name);
        extraUserInfoWrapper.appendChild(email);
        extraUserInfoWrapper.appendChild(following);
        extraUserInfoWrapper.appendChild(followers);
        extraUserInfoWrapper.appendChild(starred);
        extraUserInfoWrapper.appendChild(subscriptions);
        extraUserInfoWrapper.appendChild(organizations);
        extraUserInfoWrapper.appendChild(repos);

        return extraUserInfoWrapper;
    }

    const setupExtraData = (userLogin, userPanel) => {
        userPanel.onclick = () => {
            const extraUserInfoWrapper = userPanel.querySelector('div.extraInfo');
            
            const name = extraUserInfoWrapper.querySelector('p.name');
            const email = extraUserInfoWrapper.querySelector('p.email');
            const following = extraUserInfoWrapper.querySelector('a.following');
            const followers = extraUserInfoWrapper.querySelector('a.followers');
            const starred = extraUserInfoWrapper.querySelector('a.starred');
            const subscriptions = extraUserInfoWrapper.querySelector('a.subscriptions');
            const organizations = extraUserInfoWrapper.querySelector('a.organizations');
            const repos = extraUserInfoWrapper.querySelector('a.repos');

            const followingImage = following.querySelector('img');
            const followersImage = followers.querySelector('img');
            const starredImage = starred.querySelector('img');
            const subscriptionsImage = subscriptions.querySelector('img');
            const organizationsImage = organizations.querySelector('img');
            const reposImage = repos.querySelector('img');

            followingImage.src = 'icons/person.svg';
            followersImage.src = 'icons/smiley.svg';
            starredImage.src = 'icons/star.svg';
            subscriptionsImage.src = 'icons/tasklist.svg';
            organizationsImage.src = 'icons/organization.svg';
            reposImage.src = 'icons/repo.svg';

            const extraData = loader.loadExtraData(userLogin)
            .then(data => {
                const url = data.html_url;
                console.log(data);
                const userOrgs = extraUserInfoWrapper.querySelector('div.orgs') || document.createElement('div');
                userOrgs.className = 'orgs';
                organizations.onclick = event => {
                    loader.loadExtraData(userLogin+'/orgs') 
                    .then((orgs) => {
                        console.log(orgs);
                        while(orgs.length){
                            const org = orgs.shift();
                            console.log(org)
                            const orgElement = document.createElement('a');
                            setLinkProps([orgElement]);
                            orgElement.text = org.login;
                            orgElement.href = 'https://github.com/'+org.login;
                            userOrgs.appendChild(orgElement);
                        } 
                    })
                    userOrgs.classList.toggle('show');
                    extraUserInfoWrapper.appendChild(userOrgs);

                    event.stopPropagation();
                };
                name.innerHTML = data.name;
                email.innerHTML = data.email;
                following.href = url + '/following';
                followers.href = url + '/followers';
                starred.href = 'https://github.com/stars/'+data.login;
                subscriptions.href = url + '/subscriptions';
                //organizations.href = url + '/organizations';
                repos.href = url + '?tab=repositories';
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