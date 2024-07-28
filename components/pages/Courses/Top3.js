import React, { useState } from "react";


const Top3 = () => {

  const [isopen2, setisopen2] = useState(true);
  const [isopen3, setisopen3] = useState(false);

  const clicked2 = (section) => {
    if (isopen2 === section) {
      // setOpenSection(null);
    } else {
      setisopen2(section);
      setisopen3(false);
    }
  };

  const clicked3 = (section) => {
    if (isopen3 === section) {
      // setOpenSection(null);
    } else {
      setisopen3(section);
      setisopen2(false);
    }
  };

  return (
    <div className="Top3">
        <div className="Top3-biggest-container">
        <div className="container-1">
              <nav className='Upper_part'>
              <a href="#" className='gugu item-container-1'>
                <div
                    className={`${
                      isopen2 === true ? "yesopen" : "notopen"
                    }`}

                    onClick={() => clicked2(true)}
                >Latest</div>
              </a>
              <a href="#" className='gugu item-container-1'>
                <div
                   className={`${
                    isopen3 === true ? "yesopen" : "notopen"
                  }`}

                  onClick={() => clicked3(true)}
                >Following</div>
              </a>

              <div class="animation start-home"></div>
              </nav>
              {/* <div className="item-container-1  filter">
                 
                  
              </div> */}
            </div>
        </div>
    </div>
  )
}

export default Top3;