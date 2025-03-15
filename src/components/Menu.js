import {Link} from "react-router-dom";
import "../css/menuHeader/menuCard.css";
import "../css/menuHeader/menuCardLowObjects.css";
import "../css/menuHeader/menuCardManyObjects.css";
import React, {useEffect, useState} from 'react';
import img1 from "../images/1.webp";

export default function Menu() {

    const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        // Устанавливаем видимость после монтирования компонента
        setIsVisible(true);
    }, []);

    const items = [
        {img: img1, text: 'Сервис отправки уведомлений', nav: '/notification'},

    ];


    return (
        <>
            <MenuCardWrapper items={items} isVisible={isVisible}/>
        </>

    )
}

export function MenuCardWrapper({items, isVisible}) {

    const props = {
        items,
        isVisible
    }

    return (
        items.length <= 3 ? <MenuCardLowObjects {...props}/> :
            items.length <= 6 ? <MenuCard {...props}/> :
                <MenuCardManyObjects {...props}/>
    )

}

function MenuCard({items, isVisible}) {

    return (
        <div className={`overlay ${isVisible ? "visible" : ""}`}>
            <div className="complexBack"></div>
            <div className="menu-container">
                {items.map((item, index) => (
                    <Link to={item.nav} key={index} className="menu-item">
                        <div className="image-container">
                            <img src={item.img} alt={item.text} className="menu-image"/>
                        </div>
                        <div className="menuText">{item.text} </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function MenuCardManyObjects({items, isVisible}) {

    return (
        <div className={`overlay ${isVisible ? 'visible' : ''}`}>
            <div className="complexBack"></div>
            <div className="menuManyObj-container">
                {items.map((item, index) => (
                    <Link to={item.nav} key={index} className="menuManyObj-item">
                        <div className="menuManyObj-image-container">
                            <img src={item.img} alt="" className="menuManyObj-image"/>
                        </div>
                        <div className="menuManyObjText">{item.text}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}


function MenuCardLowObjects({items, isVisible}) {

    return (
        <div className={`overlay ${isVisible ? 'visible' : ''}`}>
            <div className="complexBack"></div>
            <div className="menuLowObj-container">
                {items.map((item, index) => (
                    <Link to={item.nav} key={index} className="menuLowObj-item">
                        <div className="menuLowObj-image-container">
                            <img src={item.img} alt="" className="menuLowObj-image"/>
                        </div>
                        <div className="menuLowObjText">{item.text}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
