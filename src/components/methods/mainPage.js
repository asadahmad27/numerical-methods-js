import React from 'react'

const MainPage = () => {
    return (
        <div>{[1, 2, 3, 4].map((i) => (
            <div>{i}</div>
        ))}</div>
    )
}

export default MainPage