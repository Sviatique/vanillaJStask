const template = (() => {
    const generalDataTemplate = data => {
        const avatar = document.createElement('img');
        const login = document.createElement('p');
        const admin = document.createElement('p');
        const userElement = $(`<li class = ${data.login}>\
        <div class="row">\
        <img class="col-xs-4" src="${data.avatar_url}"></img>\
        <p class="col-xs-4"> ${data.login} </p>\
        <p class="col-xs-4 ${data.site_admin}"></p>\
        </div>\
        </li>`);
        return userElement;
    };
     const setLinkProps = links => {
        links.map(link => {
            link.onclick = (event) => {
                event.stopPropagation();
            };
            link.target="_blank";
        });            
    };

    const extraDataTemplate = () => {
		const extraUserInfoElement = $(`<div class="extraInfo">\
        <p class="name"></p>\
        <p class="email"></p>\
        <div>\
        <a class="following"><img src="icons/person.svg"></img></a>\
        <a class="followers"><img src="icons/smiley.svg"></img></a>\
        <a class="starred"><img src="icons/star.svg"></img></a>\
        <a class="subscriptions"><img src="icons/tasklist.svg"></img></a>\
        <a class="organizations"><img src="icons/organization.svg"></img></a>\
        <a class="repos"><img src="icons/repo.svg"></img></a>\
        </div>\
        </div>`);

        //setLinkProps(extraUserInfoElement.find('a'));

        return extraUserInfoElement;
    };
    
    const getComplexDataTemplate = generalData => {
        const userElement = generalDataTemplate(generalData);
        const extraUserDataTemplate = extraDataTemplate();

        userElement.append(extraUserDataTemplate);
        
        return userElement;
    };

    const fillWithExtraData = data => {
            const extraUserInfoWrapper = $(`li.${data.login} > div.extraInfo`);
            const name = extraUserInfoWrapper.find('p.name');
            const email = extraUserInfoWrapper.find('p.email');

            const following = extraUserInfoWrapper.find('a.following');
            const followers = extraUserInfoWrapper.find('a.followers');
            const starred = extraUserInfoWrapper.find('a.starred');
            const subscriptions = extraUserInfoWrapper.find('a.subscriptions');
            const organizations = extraUserInfoWrapper.find('a.organizations');
            const repos = extraUserInfoWrapper.find('a.repos');

            const followingImage = following.find('img');
            const followersImage = followers.find('img');
            const starredImage = starred.find('img');
            const subscriptionsImage = subscriptions.find('img');
            const organizationsImage = organizations.find('img');
            const reposImage = repos.find('img');

            const url = data.html_url;
            
            const userOrgs = extraUserInfoWrapper.find('div.orgs') || $('<div class="orgs"></div>');

                subscriptions.bind('click', event => {
                        window.open('subscriptions.html?'+userLogin, '_blind');
                        event.stopPropagation();
                    }
                );

                organizations.bind('click', event => {
                    loader.loadExtraData(userLogin+'/orgs') 
                    .then((orgs) => {
                        orgs.map(org => {
                            const orgElement = $(`<a href="https://github.com/${org.login}">${org.login}</a>`);
                            //setLinkProps([orgElement]);
                            // orgElement.text = org.login;
                            // orgElement.href = 'https://github.com/'+org.login;
                            userOrgs.append(orgElement);
                        });
                    });
                    userOrgs.toggleClass('show');
                    extraUserInfoWrapper.append(userOrgs);

                    event.stopPropagation();
                });

                name.text(data.name);
                email.text(data.email);

                following.href = url + '/following';
                followers.href = url + '/followers';
                starred.href = `https://github.com/stars/${data.login}`;
                repos.href = url + '?tab=repositories';
    };

    return {
        getComplexDataTemplate: getComplexDataTemplate,
        getExtraDataTemplate: extraDataTemplate,
        fillWithExtraData: fillWithExtraData
    };
})();