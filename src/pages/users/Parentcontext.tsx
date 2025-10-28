import React from 'react'
import UserList from './UserList'
import usercontext from './usecontext'

const Parentcontext = () => {
    
  return (
    <div>
       <usercontext.Provider value="Jismy">
          <UserList />
        </usercontext.Provider>
    </div>
  )
}

export default Parentcontext