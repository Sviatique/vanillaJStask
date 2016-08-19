const loader = (() => {
		let cachedUserData = {};

        const loadData = userName => {
            return new Promise((resolve, reject) => {
                    let link = 'https://api.github.com/users' +  (userName ? '/' + userName : '');
					$.get(link, '', data => {resolve(data);},'json');
			});
        };

		const loadExtraData = userName => {
            return cachedUserData[userName] || (cachedUserData[userName] = loadData(userName));
		};

		return {
			loadGeneralData: loadData,
			loadExtraData: loadExtraData 	
		};
	})();

