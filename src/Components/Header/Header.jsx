import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';


import "./Header.scss";

const Header = () => {
  return (
    <div>
            <div className='header'>
                <div className='container'>
                    <div className='nav'>
                        <div className='nav__logo'>
                            <span className='nav__logo--title'>MovieFind</span>
                        </div>
                        <form className='nav__search d-none d-lg-flex'>
                            <input className='nav__search--input' type="search" name="search" id="search" placeholder='Kino izlash...'/>
                            <button className='nav__search--button'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </form>
                        <div className='nav__social'>
                            <button className='nav__social--button d-inline d-lg-none'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                            <Link to="https://t.me/mardonbekdusbekov" className='nav__social--telegram'>
                                <FontAwesomeIcon icon={faTelegram} />
                                <span className='d-none d-lg-block'>Telegram</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Header