import { BrowserRouter, Routes, Route } from "react-router-dom"
import ExportCommand from "./page/ExportCommand/ExportCommand"
import SiteLayout from "./components/layout/Sitelayout/SiteLayout"
import ExportHistory from "./page/ExportHistory/ExportHistory"
import ImportHistory from "./page/ImportHistory/ImportHistory"
import Inventory from "./page/Inventory/Inventory"
import Login from "./page/Login/Login"
import Repository from "./page/Repository/Repository"
import Shelves from "./page/Shelves/Shelves"
import Sigup from "./page/Sigup/Sigup"

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/repository" element={<SiteLayout />}>
            <Route index element={<Repository />} />
            <Route path="shelves" element={<Shelves />}></Route>
            <Route path="exportcommand" element={<ExportCommand />}></Route>
            <Route path="importHistory" element={<ImportHistory />}></Route>
            <Route path="exportHistory" element={<ExportHistory />}></Route>
            <Route path="Sigup" element={<Sigup />}></Route>
            <Route path="inventory" element={<Inventory />}></Route>



          </Route>

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
