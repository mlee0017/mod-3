import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { userInfo } from './services/userService';
import './index.css';
import EditMemo from './pages/memos/Edit';
import IndexMemo from './pages/memos/Index';
import NewMemo from './pages/memos/New';
import ShowMemo from './pages/memos/Show';
import EditComment from './pages/comments/Edit';
import Register from './pages/users/Register';
import Login from './pages/users/Login';
import Navbar from './components/Navbar';


function App() {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
      let token = localStorage.getItem("token")
      if (token) {
          getLoggedInUser()
      } else {
          setIsLoading(false)
      }
      async function getLoggedInUser() {
          const user = await userInfo()
          setUser(user)
          setIsLoading(false)
      }

  }, [])
  let loggedIn = user.username
  return (
    <div className="App">
      <Navbar user={loggedIn} setUser={setUser} />
      <Routes>
          <Route path='/memo' element={<IndexMemo user={loggedIn} />} />
          <Route path='/memo/:id' element={<ShowMemo user={loggedIn} />} />
          {loggedIn ?
            <>
              <Route path='/memo/new' element={<NewMemo user={loggedIn} />} />
              <Route path='/memo/:id/edit' element={<EditMemo />} />
              <Route path='/memo/:id/comments/:cid' element={<EditComment />} />
              {!isLoading && <Route path='*' element={<Navigate to='/memo' />} />}
            </>
            :
            <>
              <Route path='/register' element={<Register setUser={setUser} />} />
              <Route path='/login' element={<Login setUser={setUser} />} />
              {!isLoading && <Route path='*' element={<Navigate to='/login' />} />}
            </>
          }
      </Routes>
    </div>
  );
}
// router is like res.render in express app 

export default App;
