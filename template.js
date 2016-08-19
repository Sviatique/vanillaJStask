const template = (() => {
    const generalDataTemplate = data => {
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
            link.click(event => {
                event.stopPropagation();
            });
            link.attr('target','_blank');
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

            const url = data.html_url;

            setLinkProps([following, followers, starred, repos]);

            const userOrgs = $('<div class="orgs"></div>');
            subscriptions.click(event => {
                    window.open(`subscriptions.html?${data.login}`,'_blind');
                    event.stopPropagation();
                }
            );
            organizations.click(event => {
                if(loader.checkForCaching(data.login+'/orgs')){
                    loader.loadExtraData(data.login+'/orgs') 
                    .then(orgs => {
                        orgs.map(org => {
                            const orgElement = $(`<a href="https://github.com/${org.login}">${org.login}</a>`);
                            userOrgs.append(orgElement);
                        });
                    });
                }
                userOrgs.toggleClass('show');
                extraUserInfoWrapper.append(userOrgs);
                event.stopPropagation();
            });
                
            name.text(data.name);
            email.text(data.email);

            following.attr('href', `${url}/following`);
            followers.attr('href',`${url}/followers`);
            starred.attr('href',`https://github.com/stars/${data.login}`);
            repos.attr('href', `${url}?tab=repositories`);
    };

    return {
        getComplexDataTemplate: getComplexDataTemplate,
        fillWithExtraData: fillWithExtraData
    };
})();
