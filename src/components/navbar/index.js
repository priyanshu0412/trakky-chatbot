"use client"
import Link from 'next/link'
import React from 'react'

// --------------------------------------------------

const Navbar = () => {
    return (
        <>
            <nav className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-bold">Trakky Chatbot</h1>
                <div className="space-x-6">
                    <Link href="/">Home</Link>
                    <Link href="/top-rated">Top Rated Salons</Link>
                    <Link href="/offer-page">Offer Page</Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar
