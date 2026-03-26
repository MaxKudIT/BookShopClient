import React from "react";
const Logo = () => {
    return (
        <div style={{display: 'flex', alignItems: 'center', columnGap: 15}}>
              <img src='/public/images/logo2.png' alt='' style={{ width: 40, height: 46 }} />
              <p style={{fontSize: 25, color: 'rgb(236, 233, 233)', fontWeight: 600}}>Magma</p>
        </div>
      
    )
}

export default Logo;