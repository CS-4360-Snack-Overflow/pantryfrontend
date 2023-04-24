const api = process.env.REACT_APP_API_KEY

export async function getRecipes(url) {
	try {
		let recipes = []
		await fetch(api + "recipes?" + url, {mode: 'cors'})
		.then((res) => {
		  recipes = res.json()
		})
		  return recipes
	} catch (err) {
		console.log(err)
	}
}

export async function getCreatedRecipes() {
	try {
		let created = await fetch(api + "recipes/created", {mode: 'cors'}).catch((err) => console.log(err))
		created = await created.json()
		return created
	} catch (err) {
		console.log(err)
	}
}

export async function getFavoritedRecipes() {
	try {
		let favorites = await fetch(api + "recipes/favorited", {mode: 'cors'}).catch((err) => console.log(err))
		favorites = await favorites.json()
		return favorites
	}
	catch (err) {
		console.log(err)
	}
}

export async function getOneRecipe(id) {
	try {
		let recipe = null
		await fetch(api + "recipes/"+id, {mode: 'cors'})
		.then((res) => {
		  recipe = res.json()
		})
		  return recipe
	} catch (err) {
		console.log(err)
	}
}

export async function addRecipe(data){
	try {
		return await fetch(api + "recipes/create", {
			method: "POST", 
			mode: 'cors',
			headers: {
				"Content-Type": "application/json",
				},
			body: JSON.stringify(data)
		})
	} catch (err) {
		console.log(err)
	}
}

export async function uploadImage(form){
	try {
		if(!form) {
			return 
		}
		return await fetch(api + "recipes/upload", {
			method: "POST",
			mode: 'cors',
			body: form
		})
	} catch (err) {
		console.log(err)
	}
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