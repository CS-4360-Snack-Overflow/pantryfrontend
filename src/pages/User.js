import React, { useEffect } from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
//import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import UserForm from "components/forms/UserForm";
import UserRecipes from "components/forms/UserRecipes"
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import styled from "styled-components";
import {getCreatedRecipes, getFavoritedRecipes} from "../helpers/RecipeService"
import {getUser, testUserAuth} from "../helpers/UserService"

const RecipeContainer = tw.div`border-2 border-solid border-orange-500 rounded-lg p-4 mx-2 w-full md:w-2/5`;
const Heading = tw.h2`text-4xl sm:text-5xl font-black tracking-wide text-left pt-10 md:pt-24 w-full`;
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 pt-6 transform -skew-x-12 inline-block`;
// This is the styling for the form




export default () => {
  const navigate = useNavigate()

  const [user, setUser] = useState([])
  const [createdRecipes, setCreated] = useState([])
  const [favoritedRecipes, setFavorited] = useState([])

  useEffect(()=>{
    async function retrieveData() {
        
      testUserAuth()
    
      getUser().then((result) => {
        console.log(result)
        setUser(result)
      })

      getCreatedRecipes().then((result) => {
        console.log(result)
        setCreated(result)
      })

      getFavoritedRecipes().then((result) => {
        console.log(result)
        setFavorited(result);
      })
    }

    retrieveData()

  }, [])

  //Sets up the every component of the pages to create the profile page
  return (
    <AnimationRevealPage>

      <Header />
      <Heading><HighlightedText>Profile</HighlightedText></Heading>
      <div css={tw`flex flex-wrap justify-center md:justify-between py-10`}>
        <UserForm userData={user} css={tw`w-full md:w-2/5 mx-2`}/>
        <RecipeContainer>
        <UserRecipes css={tw`w-full md:w-2/5 mx-2`} heading="Favorited Recipes" recipes={favoritedRecipes}/>
        </RecipeContainer>
        <RecipeContainer>
        <UserRecipes css={tw`w-full md:w-2/5 mx-2`} heading="My Recipes" recipes={createdRecipes} authorized={true}/>
        </RecipeContainer>
      </div>
    
      <Footer />
    </AnimationRevealPage>
  );
};
