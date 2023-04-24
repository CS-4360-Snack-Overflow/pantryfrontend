const api = process.env.REACT_APP_API_KEY

export async function checkRecipeAuth(recipe_user_id){
    let data = await fetch(api + "user-id", {mode: 'cors'}).catch((err) => console.log(err))
    data = await data.json()
    console.log(data)
    return data.userId === recipe_user_id
}

export async function testUserAuth() {
    let auth = await fetch(api + 'user/testAuth')
    auth = await auth.json()
    console.log(auth)
    return auth
    // if(!auth.active) {
    //     window.location.href = "/login";
    // }
}


export async function checkFavorited(recipe_id){
    let data = await fetch(api + "user/isfavorite/" + recipe_id, {mode: 'cors'}).catch((err) => console.log(err))
    data = await data.json()
    console.log(data)
    return data.result
}

export async function addFavoriteRecipe(recipe_id){
    await fetch(api + "user/favorite/" + recipe_id, {method: "POST", mode: 'cors'})
    return
}

export async function removeFavoriteRecipe(recipe_id){
    await fetch(api + "user/unfavorite/" + recipe_id, {method: "DELETE", mode: 'cors'})
    return
}

export async function getUser(){
    let res = await fetch(api + "user/userRead", {mode: 'cors'}).catch((err) => console.log(err))
    res = await res.json()
    console.log(res)
    return res
}


export async function login(username, password){
    let response = await fetch(api + 'user/userLoginProc', {
        method: "POST", 
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          },
        body: JSON.stringify({username: username, password: password})
      })
    response = await response.json()
    return response
}