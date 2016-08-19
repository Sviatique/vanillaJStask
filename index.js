'use strict'

require(['loader','contentBuilder'], () =>{
	console.log(loader);
		console.log(loader)
		loader.loadGeneralData()
		.then(response => {
			contentBuilder.build(response);
		})
		.catch(error => console.log(error));
});
