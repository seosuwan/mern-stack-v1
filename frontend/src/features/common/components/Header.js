import React from 'react';
import { Navi } from 'features/common';




const Header = () => {
  return (
    <header className="rg-header" >
      <img class='logo' src={require("features/common/images/plan.gif").default}/>
      <Navi />
      <div class="search"><input type="search" placeholder="Search"></input></div>
    </header>
    
  )
}

export default Header