const loader = (() => {
		let cachedUserData = {}

        const loadData = userName => {
            return new Promise((resolve, reject) => {
					const request = new XMLHttpRequest();
                    let link = 'https://api.github.com/users' +  ((userName === undefined)? '' : ('/' + userName));
					request.open('GET', link);
					request.responseType = 'json';
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

		const loadExtraData = userName => {
            return cachedUserData[userName] || (cachedUserData[userName] = loadData(userName));
		}

		return {
			loadGeneralData: loadData,
			loadExtraData: loadExtraData 	
		}
	})();

