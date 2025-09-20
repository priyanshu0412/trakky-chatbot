"use client"
import React from 'react'
import ChatWidget from '../chatWidget'

// ---------------------------------------------

const HomePage = () => {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold">This is Home Page</h1>
                <ChatWidget />
            </div>
        </>
    )
}

export default HomePage
