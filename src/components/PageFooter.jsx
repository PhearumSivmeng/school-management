import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume, faHouseLaptop, faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';

const PageFooter = () => {
    return (<div className="contain-fluid w-100 bg-primary h-auto mt-5 px-5 py-3">
        <div className="row">
            <div className="col-2 d-flex flex-column justify-content-center align-items-center px-5">
                <img className="w-75 h-auto border border-2 border-white" src="/assets/images/footer/profile.jpg" alt="" />
                <p className="w-100 text-center p-1 fw-bold text-white">ចែករំលែកនិងបណ្តុះបណ្តាលជំនាញ IT អោយទាន់សម័យ 4.0 និងតំរង់អោយសិស្សឆាប់រកការងារធ្វើត្រូវជំនាញ</p>
            </div>
            <div className="col-6 px-5 d-flex">
                <div className="col-4 text-white mx-3">
                    <h5 className="fw-bolder text-decoration-underline">ETEC 01</h5>
                    <p>Location: St 150, Phnom Penh</p>
                    <a className="w-100 h-auto" href="https://www.google.com/maps/place/ETEC1/@11.5610359,104.8887961,17z/data=!3m1!4b1!4m6!3m5!1s0x31095142c9bb017b:0x58219dd024c57ff1!8m2!3d11.5610359!4d104.891371!16s%2Fg%2F11ts3dr1nb?entry=ttu">
                        <img className="w-100 border border-2 border-white" src="/assets/images/footer/etec1.png" alt="" />
                    </a>
                </div>
                <div className="col-4 text-white mx-3">
                    <h5 className="fw-bolder text-decoration-underline">ETEC 02 (Main Office) </h5>
                    <p>Location: St 150, Phnom Penh</p>
                    <a className="w-100 h-auto" href="https://www.google.com/maps/place/ETEC2/@11.5622054,104.8879351,17z/data=!3m1!4b1!4m6!3m5!1s0x310951adb4d4041d:0x8a90e729f62ad800!8m2!3d11.5622054!4d104.89051!16s%2Fg%2F11s8j5cd77?entry=ttu">
                        <img className="w-100 border border-2 border-white" src="/assets/images/footer/etec2.png" alt="" />
                    </a>
                </div>
                <div className="col-4 text-white mx-3">
                    <h5 className="fw-bolder text-decoration-underline">ETEC 03</h5>
                    <p>Location: St 150, Phnom Penh</p>
                    <a className="w-100 h-auto" href="https://www.google.com/maps/place/ETEC3/@11.5635554,104.8905494,17z/data=!3m1!4b1!4m6!3m5!1s0x31095191805840fd:0x1c8c01468d4bf1df!8m2!3d11.5635554!4d104.8931243!16s%2Fg%2F11jslq5ts_?entry=ttu">
                        <img className="w-100 border border-2 border-white" src="/assets/images/footer/etec3.png" alt="" />
                    </a>
                </div>
            </div>
            <div className="col-3 ms-5 ps-5 text-white">
                <h4>Contact</h4>
                <ul className="nav navbar">
                    <li><FontAwesomeIcon icon={faPhoneVolume} /> Phone-Number:  <br />
                        <p className="m-0 ms-5">096 226 884</p>
                        <p className="m-0 ms-5">096 226 884</p>
                    </li>
                    <li><FontAwesomeIcon icon={faHouseLaptop} /> Main-Office:  <br />
                        <a href="https://maps.app.goo.gl/ocTRzEDa7xM1JqQB9" className="m-0 ms-5 text-white">https://maps.app.goo.gl/ocTRzEDa7xM1JqQB9</a>
                    </li>
                    <li><FontAwesomeIcon icon={faEnvelopeCircleCheck} /> Email:  <br />
                        <a href="https://maps.app.goo.gl/ocTRzEDa7xM1JqQB9" className="m-0 ms-5 text-white">https://maps.app.goo.gl/ocTRzEDa7xM1JqQB9</a>
                    </li>
                    <li><FontAwesomeIcon icon={faTelegram} /> Telegram:  <br />
                        <a href="https://maps.app.goo.gl/ocTRzEDa7xM1JqQB9" className="m-0 ms-5 text-white">https://maps.app.goo.gl/ocTRzEDa7xM1JqQB9</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>)
}

export default PageFooter;