import React, {useEffect} from 'react';
import './checkout.css'


const CheckoutPage = (props) => {
    let Options = {
        options: {
          methods: ["card"],
          cardIcons: ["mastercard", "visa"],
          fields: false,
          title: "my_title",
          link: "https://shop.com",
          fullScreen: false,
          button: true,
          locales: ["ru"],
          email: true,
          tooltip: true,
          fee: true
        },
        params: {
          merchant_id: 1396424,
          required_rectoken: "y",
          currency: "UAH",
          amount: props.total,
          order_desc: "my_order_desc",
          response_url: "http://shop.com/thankyoupage",
          email: "",
          lang: "ru"
        },
        messages: {
          ru: {
            card_number: "Номер карты",
            my_title: "Назначение платежа",
            my_order_desc: "Тестовый платеж",
            pay: "Оплатить"
          }
        }
      };
      
      useEffect(() => window.fondy("#app", Options), [])
      
  return <>
    <div id='app'></div>
  </>
};

export default CheckoutPage;
