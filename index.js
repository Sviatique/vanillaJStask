'use strict'

window.onload = () => {
	loader.loadGeneralData()
	.then(response => {
		contentBuilder.build(response);
	})
	.catch(error => console.log(error));
};
