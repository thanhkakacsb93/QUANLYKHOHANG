import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { resetState } from '../../../redux/auth/authSlice.js'



const Header = () => {
    const { Roleadmin } = useSelector((state) => state.login)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        const logout = confirm("bạn muốn đăng xuất")
        if (logout) {
            sessionStorage.clear()
            await dispatch(resetState())
            navigate("/")
        }
        else {
            return false
        }
    }
    const headerLogged = (
        <>
            {/* <NavLink to="/repository/sigup"><span>sigup</span></NavLink> */}
            <NavLink to="/repository/accounts"><span>accounts</span></NavLink>
        </>
    )
    return (
        <div className="flex flex-col gap-3">
            <NavLink to="/repository"><span>logo/repository</span></NavLink>
            {/* <NavLink to="/repository/shelves"><span>shelves</span></NavLink> */}
            <NavLink to="/repository/importhistory"><span>import histori</span></NavLink>
            <NavLink to="/repository/exporthistory"><span>export history</span></NavLink>
            <NavLink to="/repository/exportcommand"><span>export command</span></NavLink>
            <NavLink to="/repository/inventory"><span>inventory</span></NavLink>
            {
                Roleadmin ? headerLogged : ""
            }
            <button className='bg-yellow-300' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Header