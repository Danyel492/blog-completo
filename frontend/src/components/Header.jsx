import React from 'react'
import '../main.css'
import './header.css'
import { Link } from 'react-router-dom'
import logo from '../assets/header.png'



export const Header = () => {

    return (
        <>
            <header>
                <div className="headerContainer">
                    <Link to={'/'}>
                        <div className='brand'>
                            <img src={logo} alt="" />
                        </div>
                    </Link>
                    <Link to={'/'}>
                        <button>Pagina inicial</button>
                    </Link>
                    
                </div>
            </header>
        </>
    )
}

