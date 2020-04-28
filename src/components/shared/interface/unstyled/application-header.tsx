import React from 'react'
import { seoLink } from '@lib/router-helper'
import { Link } from 'react-router-dom'
import { links } from '@components/router'

export const ApplicationHeader = () => {
  return (
    <div className='application-header--container'>
      <div className='application-header--container--left'>
        Application header
      </div>
      <div className='application-header--container--right'>
        <Link to={seoLink(links.LoginPage)} />
      </div>
    </div>
  )
}
