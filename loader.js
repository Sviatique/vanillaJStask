const loader = (() => {
		let cachedUserData = {}
		const loadGeneralData = () => {
			return new Promise((resolve, reject) => {
				const request = new XMLHttpRequest();
				request.open("GET", "https://api.github.com/users");
				request.responseType = "json";
				request.onload = () => {
						if(request.status === 200) {
							resolve(request.response);
						} else {
							reject(request.statusText);
						}
				};
				request.send();
			});
		};

        const _loadExtraData = userName => {
			return new Promise((resolve, reject) => {
					const request = new XMLHttpRequest();
					request.open("GET", "https://api.github.com/users/"+userName);
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

		const loadExtraData = userName => {
            return cachedUserData[userName] || (cachedUserData[userName] = _loadExtraData(userName));
		}

		return {
			loadGeneralData: loadGeneralData,
			loadExtraData: loadExtraData 	
		}
	})();

