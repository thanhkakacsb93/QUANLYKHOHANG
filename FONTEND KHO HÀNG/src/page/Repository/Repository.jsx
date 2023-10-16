import React from 'react'
import Repo from './repo/repo.jsx'

const Repository = () => {
    let listrepo = []
    for (let i = 1; i <= 8; i++) {
        listrepo = [...listrepo, <Repo />]

    }
    return (
        <>
            <div>Repository</div>
            {listrepo}
        </>


    )
}
export default Repository