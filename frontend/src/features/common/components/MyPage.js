import React from "react";
import 'features/common/style/image.scss'
import { Link } from 'react-router-dom';
import 'features/common/style/Button.scss'
import 'features/common/style/MyPage.scss'
import { LogOut } from "features/user";


export default function mypage() {
    
    const sessionUser = localStorage.getItem("sessionUser")
    // alert(sessionUser)
    // const history = useHistory()
    return (
        <>
         {/* <form className="mypage" id="jello-horizontal" >
             <div className="myp">
            <h4>???님 안녕하세요!</h4>
            <img className='snoopy-img' src={require("../images/snoopy.png").default} /><br />
            <h5>be with you</h5>
            <div>
            <Link className="arrow-btn" to="/mypage/setting">설정</Link><br />
            <LogOut/>
            </div>
             </div>
        </form> */}
        
        {localStorage.length > 0 ?
        <form className="mypage" id="jello-horizontal" >
             <div className="myp">
            <h4>{sessionUser}님 안녕하세요!</h4>
            <img className='snoopy-img' src={require("../images/snoopy.png").default} /><br />
            <h5>be with you</h5>
            <div>
            <Link className="arrow-btn" to="/mypage/setting">설정</Link><br />
            <LogOut/>
             </div>
             </div>
        </form>:<></>}
        </>
    )
}