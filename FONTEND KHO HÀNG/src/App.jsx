import { BrowserRouter, Routes, Route } from "react-router-dom"
import ExportCommand from "./page/ExportCommand/ExportCommand"
import SiteLayout from "./components/layout/Sitelayout/SiteLayout"
import ExportHistory from "./page/ExportHistory/ExportHistory"
import ImportHistory from "./page/ImportHistory/ImportHistory"
import Inventory from "./page/Inventory/Inventory"
import Login from "./page/Login/Login"
import Repository from "./page/Repository/Repository"
import Sigup from "./page/Sigup/Sigup"
import Accountlist from "./page/Account list/Accountlist"
import { useEffect } from "react"
import { TOKENS } from "./utils/constant"
import apiUser from "./page/Service/methodAxios"
import { useDispatch, useSelector } from "react-redux"
import Protectedroute from "./components/protectedroute/protectedroute"
import { roleadmin, rolemember, saveUser } from "./redux/auth/authSlice.js"
import ListSupplies from "./page/Repository/listSupplies/ListSupplies"

function App() {
  const dispathch = useDispatch()
  const { idUser } = useSelector((state) => state.login)
  const token = sessionStorage.getItem(TOKENS.login)
  const current = async () => {
    if (token) {
      try {
        const user = await apiUser.fechtcurrent()
        const payload = {
          id: user.data.data._id
        }
        await dispathch(saveUser(payload))

        if (user.data.data.Role === "admin") {
          dispathch(roleadmin())
        }
        if (user.data.data.Role === "member") {
          dispathch(rolemember())
        }

      } catch (error) {

      }
    }
  }
  useEffect(() => { current() }, [])
  {/* <Route path="Sigup" element={<Sigup />}></Route> */ }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/repository" element={< Protectedroute component={SiteLayout} />}>
            <Route index element={<Repository />} />

            <Route path="ListSupplies" element={<ListSupplies />}></Route>
            <Route path="exportcommand" element={<ExportCommand />}></Route>
            <Route path="importHistory" element={<ImportHistory />}></Route>
            <Route path="exportHistory" element={<ExportHistory />}></Route>
            <Route path="accounts" >
              <Route index element={<Accountlist />}></Route>
              <Route path="signup" element={<Sigup />}></Route>
            </Route>

            <Route path="inventory" element={<Inventory />}></Route>

          </Route>

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
