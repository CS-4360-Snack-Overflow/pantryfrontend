const api = process.env.REACT_APP_API_KEY

export async function checkAuth(recipe_user_id){
    let data = await fetch(api + "user-id")
    data = await data.json()
    return data.userId === recipe_user_id
}

export async function checkFavorited(recipe_id){
    let data = await fetch(api + "user/isfavorite/" + recipe_id)
    data = await data.json()
    return data.result
}

export async function addFavoriteRecipe(recipe_id){
    await fetch(api + "user/favorite/" + recipe_id, {method: "POST"})
    return
}

export async function removeFavoriteRecipe(recipe_id){
    await fetch(api + "user/unfavorite/" + recipe_id, {method: "DELETE"})
    return
}

export async function getUser(){
    const res = await fetch(api + "user/userRead")
    return await res.json()
}


export async function login(username, password){
    let response = await fetch('user/userLoginProc', {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          },
        body: JSON.stringify({username: username, password: password})
      })
    response = await response.json()
    return response
}