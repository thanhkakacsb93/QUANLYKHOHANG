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
import { resetsearchRepo, searchRepo, selectRepo } from '../../redux/auth/authSlice.js'
import { Input } from 'antd';
import { current } from '@reduxjs/toolkit'



const Repository = () => {
    const dispatch = useDispatch()
    const [arrNameShelves, setarrNameShelves] = useState([])
    const { idUser, StatusSearchRepo } = useSelector((state) => state.login)
    const [statusAddShelves, setstatusAddShelves] = useState(false)
    const [statusAddSupplies, setstatusAddSupplies] = useState(false)
    const [valueSearchRepo, setvalueSearchRepo] = useState(false)
    const { Search } = Input;
    // const [viewRepo, setviewRepo] = useState(false)

    const navigate = useNavigate()

    const onChange = async (e) => {
        const updatevalue = e.target.value
        if (updatevalue) {
            const searchValue = {
                CreatorId: idUser,
                valueSerch: updatevalue
            }
            const dataRepoSearch = await apiRepo.searchRepo(searchValue)
            const fillShelves = dataRepoSearch.data.data
            const lastShelves = fillShelves.reduce((accumulator, current) => {
                const checkNameShelves = accumulator.find((item) => item.NameShelves === current.NameShelves)
                if (!checkNameShelves) {
                    accumulator.push(current)
                }
                return accumulator
            }, [])

            await dispatch(searchRepo())
            setarrNameShelves(lastShelves)
        }
        else {
            await dispatch(resetsearchRepo())
            setvalueSearchRepo(!valueSearchRepo)
        }

    }

    const handleViewRepo = async () => {
        const datarepo = await apiRepo.repo({ CreatorId: idUser })
        const listshelves = datarepo.data.data

        setarrNameShelves(listshelves)
    }
    console.log("StatusSearchRepo: ", StatusSearchRepo)

    useEffect(() => {
        if (!StatusSearchRepo) {
            handleViewRepo()
        }
    }, [arrNameShelves.length, statusAddShelves, valueSearchRepo])


    const handleviewListSupplies = async (item) => {
        const payload = {
            namerepo: item.NameShelves
        }
        await dispatch(selectRepo(payload))
        await dispatch(resetsearchRepo())
        navigate('/repository/ListSupplies')
    };

    const repo = arrNameShelves.map((item) => (
        <div key={item._id} onClick={() => handleviewListSupplies(item)}>
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
                    <Search
                        placeholder="search supplies"
                        onChange={onChange}
                        enterButton
                        style={{
                            width: 200,
                        }}
                    />
                    {repo}
                </div>

            </div>

        </>
    )
}
export default Repository