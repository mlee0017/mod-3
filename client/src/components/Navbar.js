import { Link } from "react-router-dom";

function Navbar({ user, setUser }) {
  const logout = () => {
    localStorage.removeItem("token")
    setUser({})
  };

  return (
    <ul className="user-auth">
      {user ? 
        <>
          <li style={{ color: "black" }}>Welcome {user}!</li>
          <li className="memo-nav">
            <Link to="/memo">Memo</Link>
          </li>
          <li onClick={logout}>
            <Link to="/login">Logout</Link>
          </li>
        </>
       : 
        <>
          <li className="memo-nav">
            {/* <Link to="/memo">Memo</Link>
          </li>
          <li> */}
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </>
      }
    </ul>
  );
}

export default Navbar;