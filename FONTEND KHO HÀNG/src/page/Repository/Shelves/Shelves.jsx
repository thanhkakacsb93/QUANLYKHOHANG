import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Shelves.css"

const Shelves = (props) => {
    const { NameShelves } = props


    return (
        <>
            <div className='Shelves'  >Selves {NameShelves} </div>
        </>


    )
}

export default Shelves