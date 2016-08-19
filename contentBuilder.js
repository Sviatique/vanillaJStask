'use strict'

const contentBuilder = (() => {
    const setupExtraData = (userLogin, userPanel) => {
        userPanel.click(() => {
            if(loader.checkForCaching(userLogin)){
                const extraData = loader.loadExtraData(userLogin)
                .then(data => {
                    require(['template'], () => {
                        template.fillWithExtraData(data);
                    })
                    
                })
                .catch(error => console.log(error));
            }
            userPanel.toggleClass('active');
            userPanel.find($(`li.${userLogin} > div.extraInfo`)).toggleClass('show');
        });
	};

    const build = (data) => {
        const allUsers = $('<ul></ul>');
        const content = $("#content");
        loader.loadGeneralData()
        .then(data => {
            data.map(user => { 
                require(['template'], () => {
                        const userElement = template.getComplexDataTemplate(user);
                        setupExtraData(user.login, userElement);
                        allUsers.append(userElement);
                    })
                
            });
        })
        .catch(error => console.log(error));
	    content.append(allUsers);
    };
    return {
        build: build
    };
})();