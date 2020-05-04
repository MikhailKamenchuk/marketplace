import  React  from "react";
import './shop-footer.css';
import PaymentMethods from '../../public/master_visa_fondy_w.png'

const ShopHeader = () => {
    return (
        <footer>
            <div>
                <img className="paymentMethods" src={PaymentMethods} alt="payment methods" />
            </div>
        </footer>
    )
}


export default ShopHeader
