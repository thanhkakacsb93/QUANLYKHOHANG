import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiRepo from '../Service/methodAxios.Repo.js'
import Shelves from './Shelves/Shelves.jsx'
import "./Repository.css"
import AddShelves from '../../components/formAddShelves/AddShelves.jsx'
import Addsupplies from '../../components/formAddSupplies/AddSupplies.jsx'
import { useNavigate } from 'react-router-dom'
import { selectRepo } from '../../redux/auth/authSlice.js'

const Repository = () => {
    const dispatch = useDispatch()
    const [arrNameShelves, setarrNameShelves] = useState([])
    const { idUser } = useSelector((state) => state.login)
    const [statusAddShelves, setstatusAddShelves] = useState(false)
    const [statusAddSupplies, setstatusAddSupplies] = useState(false)
    // const [viewRepo, setviewRepo] = useState(false)

    const navigate = useNavigate()



    const handleViewRepo = async () => {
        const datarepo = await apiRepo.repo({ CreatorId: idUser })
        const listshelves = datarepo.data.data

        setarrNameShelves(listshelves)

    }

    useEffect(() => { handleViewRepo() }, [arrNameShelves.length, statusAddShelves])
    console.log(" arrNameShelves:", arrNameShelves);

    const handleviewListSupplies = async (item) => {

        const payload = {
            namerepo: item.NameShelves
        }
        await dispatch(selectRepo(payload))
        navigate('/repository/ListSupplies')
    };

    const repo = arrNameShelves.map((item) => (
        <div onClick={() => handleviewListSupplies(item)}>
            <Shelves key={item._id} NameShelves={item.NameShelves} />
        </div>
    ));


    const handleClickbuttonCancel = () => {
        setstatusAddShelves(false)
        setstatusAddSupplies(false)
    }
    const formAddShelves = (
        <div className='pageRepo-button'>
            <AddShelves handleClickbuttonCancel={handleClickbuttonCancel} />
        </div>
    )

    const formAddSupplies = (
        <div className='pageRepo-button'>
            <Addsupplies handleClickbuttonCancel={handleClickbuttonCancel} />
        </div>
    )

    const handleviewFormAddShelves = () => {
        setstatusAddShelves(true)
    }

    const handleviewFormAddSupplies = () => {
        setstatusAddSupplies(true)
    }

    return (
        <>
            <div className='pageRepo'>
                <div></div>
                {statusAddShelves ? formAddShelves : ""}
                {statusAddSupplies ? formAddSupplies : ""}
                <div className='pageRepo-listshelves'>
                    <div>
                        <button className=' bg-[yellow] px-4 py-2 b rounded-[10px] border-solid border-[1px] border-black' onClick={handleviewFormAddShelves} >Add shelves</button>
                        <button className=' bg-[yellow] px-4 py-2 b rounded-[10px] border-solid border-[1px] border-black' onClick={handleviewFormAddSupplies} >Add Supplies</button>
                    </div>
                    {repo}
                </div>

            </div>

        </>
    )
}
export default Repository