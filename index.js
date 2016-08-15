const AVATAR_HEIGHT = 40
const AVATAR_WIDTH = 40
window.onload = () => {
	loadData("Sviatique").then((response) => {
		let userId = 0;
		const avatar = new Image()
		const login = document.createElement('p')
		const admin = document.createElement('p') 
		const user = document.createElement('div')
		const content = document.getElementById("content")
		const elements = [avatar, login, admin]

		user.id = 'user'+userId
		userId++;

		content.appendChild(user)

		avatar.src = response.avatar_url
		avatar.height = AVATAR_HEIGHT
		avatar.width = AVATAR_WIDTH
		
		login.innerHTML = response.login

		admin.innerHTML = response.site_admin
		console.log(elements)

		while(elements){
			elements[0].className = "col-md-1"
			user.appendChild(elements.shift())
		}
		
	})
} 

const loadData = (userName) => {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest()
		request.open("GET", "https://api.github.com/users/"+userName)
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