import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './GithubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SET_LOADING
} from '../types'

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false

    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

    // Search Users
    const searchUsers = async (searchText) => {
        setLoading()
        const res = await axios.get(`https://api.github.com/search/users?q=${searchText}&client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
        // setUsers(res.data.items)
        
        // dispatch to reducer
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
      }
    const getInitialUsers = async () => {
        // setLoading()
        const res = await axios.get(`https://api.github.com/users?client_id=${
            process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
            dispatch({
                type: SEARCH_USERS,
                payload: res.data.items
            })
      }

    // Get User

    // Get Repos
    
  const getUserRepos = async (username) => {
    setLoading()
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    //   setRepos(res.data)
      dispatch({
          type: GET_REPOS,
          payload: res.data
      })
  }

    // Clear Users 
    const getUser = async (username) => {
        setLoading()
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
        //   setUser(res.data)
        dispatch({
            type: GET_USER,
            payload: res.data
        })
      }

    const clearUsers = () => dispatch({type: CLEAR_USERS})


    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING })


    // should return provider (provider wraps entire app). 
    // value prop - anything available to entire app
    return <GithubContext.Provider
    value = {{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getInitialUsers,
        getUser,
        getUserRepos
    }}
    
    >
    {props.children}
    </GithubContext.Provider>
}

export default GithubState