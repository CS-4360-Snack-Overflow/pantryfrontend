const api = process.env.REACT_APP_API_KEY

export async function checkRecipeAuth(recipe_user_id){
    let data = await fetch(api + "user/user-id", {mode: 'cors', credentials : "include"}).catch((err) => console.log(err))
    data = await data.json()
    let result = {belongsToUser: false, isSignedIn: false}
    if(data.userId === -1) {
        return result
    } else {
        result.belongsToUser = data.userId === recipe_user_id
        result.isSignedIn = true
        return result
    }
}

export async function testUserAuth(redirect=true) {
    let auth = await fetch(api + 'user/testAuth', {credentials : "include"})
    auth = await auth.json()
    if(!auth.active && redirect) {
        window.location.href = "/login";
    }
    return auth
}

export async function checkFavorited(recipe_id){
    let data = await fetch(api + "user/isfavorite/" + recipe_id, {mode: 'cors', credentials : "include"}).catch((err) => console.log(err))
    data = await data.json()
    console.log(data)
    return data.result
}

export async function addFavoriteRecipe(recipe_id){
    await fetch(api + "user/favorite/" + recipe_id, {method: "POST", mode: 'cors', credentials : "include",})
    return
}

export async function removeFavoriteRecipe(recipe_id){
    await fetch(api + "user/unfavorite/" + recipe_id, {method: "DELETE", mode: 'cors', credentials : "include",})
    return
}

export async function getUser(){
    let res = await fetch(api + "user/userRead", {mode: 'cors', credentials : "include",}).catch((err) => console.log(err))
    res = await res.json()
    console.log(res)
    return res
}


export async function login(username, password){
    let response = await fetch(api + 'user/userLoginProc', {
        method: "POST", 
        mode: 'cors',
        credentials : "include",
        headers: {
          "Content-Type": "application/json",
          },
        body: JSON.stringify({username: username, password: password})
      })
    response = await response.json()
    return response
}

export async function logout() {
    await fetch(api + "user/logout", {mode: 'cors', credentials : "include"})
    return
}