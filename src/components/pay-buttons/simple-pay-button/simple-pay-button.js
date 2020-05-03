import  React  from "react";
import "./simple-pay-button.css";

const SimplePay = (props) => {

    
    return (
        <div className= "myButton">
        <style>@import url("//portal.fondy.eu/mportal/static/css/button.css");</style>
        <a href="https://api.fondy.eu/s/wvTfs5O" data-button="" 
        className="f-p-b">
        <i data-text="name">Оплатить</i>
        <i data-text="amount">{props.total} Грн</i>
        <i data-brand="visa"></i>
        <i data-brand="mastercard"></i>
        </a>
        </ div>  
    )
}
export default SimplePay;