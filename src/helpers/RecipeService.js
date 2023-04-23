const api = process.env.REACT_APP_API_KEY

export async function getRecipes(url) {
	let recipes = []
	await fetch(api + "recipes?" + url, {mode: 'cors'})
	.then((res) => {
	  recipes = res.json()
	})
	  return recipes
}

export async function getCreatedRecipes() {
	let created = await fetch(api + "recipes/created", {mode: 'cors'})
	created = await created.json()
	return created
}

export async function getFavoritedRecipes() {
	let favorites = await fetch(api + "recipes/favorited", {mode: 'cors'})
	favorites = await favorites.json()
	return favorites
}

export async function getOneRecipe(id) {
	let recipe = null
	await fetch(api + "recipes/"+id, {mode: 'cors'})
	.then((res) => {
	  recipe = res.json()
	})
	  return recipe
}

export async function addRecipe(data){
	console.log(data)
	return await fetch(api + "recipes/create", {
		method: "POST", 
		mode: 'cors',
		headers: {
			"Content-Type": "application/json",
		  },
		body: JSON.stringify(data)
	})
}

export async function uploadImage(form){
	if(!form) {
		return 
	}
	return await fetch(api + "recipes/upload", {
		method: "POST",
		mode: 'cors',
		body: form
	})
}

export async function editRecipe(data) {
	console.log(data)
	await fetch(api + "recipes/"+data._id, {
		method: "PATCH",
		mode: 'cors',
		headers: {
			"Content-Type": "application/json",
		  },
		body: JSON.stringify(data)
	})
}

export async function deleteRecipe(id) {
	await fetch(api + "recipes/"+id, {
		method: "DELETE",
		mode: 'cors'
	}).catch((err) => {console.log(err)})
}