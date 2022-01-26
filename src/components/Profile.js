import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import { auth } from '../firebase/config'

// styles
import './Profile.css'

// components
import Avatar from './Avatar'

export default function Profile() { 
  const { user, dispatch } = useAuthContext()
  const { logout, isPending } = useLogout()
  const [userName, setUserName]= useState(user.displayName)
  const [error, setError]= useState(null)
  
  const changeUsername = async () => {
    if(userName === user.displayName){
      console.log('no changes')
      return
    }
    
    try {
      // get user data from firebase and update displayName
      await auth.currentUser.updateProfile({
        displayName: userName
      })
      // update user context
      dispatch({type:'LOGIN', payload: {
        ...user,
        displayName: userName
      }})
    } catch (err) {
      setError(err.message)
    }
  }
  return (
    <div className="auth-form">
      <div className="profile-header">
        <Avatar src={user.photoURL}/>
      </div>
      <div className="profile-body">
        <label>
          <span>User Name :</span>
          <div className="profile-input">
            <input
              type="text"
              value={userName}
              onChange={(e)=> setUserName(e.target.value)}
            />
            <button onClick={changeUsername}>Update</button>
          </div>
        </label>
        { error && <p className="error">{error}</p> }
      </div>
      <div className="profile-footer">
        {isPending ? (
          <button className="btn" disabled>Loging out...</button>
        ):(
          <button className="btn" onClick={logout}>Logout</button>
        )}
      </div>
    </div>
    ) 
}