import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import 'features/setting/style/Setting.scss'

const setting = () => {
   
    useEffect(() => {
        AOS.init({
            duration : 3000
        });
    });

    return(
        <>
          <div className = "sg">
            <div >
                <p data-aos='fade-down'>QNA 하드코딩 !!!!!!!!!!!!!!!!!</p>
            </div>
            <div >
                <p data-aos="fade-down">체크리스트 수정!!!!!!!!!!!!</p>
            </div>
            <div >
                <p data-aos="fade-down"> 회원정보 수정!!!!!!!!!!</p>
            </div>
            <div className = "hm">
                <Link className="btn6" data-aos="fade-up" to="/">홈으로 돌아가기</Link><br />
            </div>
          </div>    
        </>
    )
};

export default setting;