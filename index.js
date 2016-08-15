const AVATAR_HEIGHT = 40
const AVATAR_WIDTH = 40
window.onload = () => {
	loadData("Sviatique").then((response) => {
		let userId = 0;
		const content = document.getElementById("content")
		let i = 0;
		while(response){
			const avatar = new Image()
			const login = document.createElement('p')
			const admin = document.createElement('p') 
			const userWrapper = document.createElement('div')
			const elements = [login, admin]
			let user = response.shift();

			userWrapper.id = 'user'+userId
			userId++;

			content.appendChild(userWrapper)
			userWrapper.appendChild(avatar)

			avatar.src = user.avatar_url
			avatar.height = AVATAR_HEIGHT
			avatar.width = AVATAR_WIDTH
			
			login.innerHTML = user.login
			admin.innerHTML = user.site_admin

			while(elements[0]){
				elements[0].className = "col-md-1"
				userWrapper.appendChild(elements.shift())
			}
		}
		

		
		
	})
} 

const loadData = (userName) => {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest()
		request.open("GET", "https://api.github.com/users")
		request.responseType = "json"
		request.onload = () => {
		    	if(request.status == 200) {

		    		resolve(request.response)
		        } else {
		        	reject(request.statusText)
		        }
		}
		request.send()
	})
}