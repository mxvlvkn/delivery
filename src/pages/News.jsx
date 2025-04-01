import React, {useContext} from 'react'
import {Header} from '../components/Header.jsx'
import { Navigation } from '../components/Navigation.jsx'
import { PostsManager } from '../components/PostsManager.jsx'

export function News() {
  return (
    <>
      {<PostsManager/>}
    </>
  )
}