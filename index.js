'use strict'

define(['./loader','./contentBuilder'], (loader, contentBuilder) =>{
		loader.loadGeneralData()
		.then(response => {
			contentBuilder.build(response);
		})
		.catch(error => console.log(error));
});
