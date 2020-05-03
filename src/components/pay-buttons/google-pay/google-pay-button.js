import React, { useEffect }from "react";




const GooglePay = (props) => {
    
    // // example – допустимое название шлюза. Если вы хотите протестировать API, можно вставить представленный выше код без изменений
    
    
    // const paymentDataRequest = Object.assign({}, baseRequest);

    // paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];

    // paymentDataRequest.transactionInfo = {
    //     totalPriceStatus: 'FINAL',
    //     totalPrice: '123.45',
    //     currencyCode: 'UAH',
    //     countryCode: 'UA'
    // };

    // paymentDataRequest.merchantInfo = {
    //   merchantName: 'fondyeu',
    //   merchantId: '1397120'
    // };

    const baseRequest = {
      apiVersion: 2,
      apiVersionMinor: 0
    };

    const allowedCardNetworks = ["MASTERCARD", "VISA"];

    const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];
   
    const tokenizationSpecification = {
      type: 'PAYMENT_GATEWAY',
      parameters: {
        'gateway': 'fondyeu',
        'gatewayMerchantId': '1396424'
      }
    };

    const baseCardPaymentMethod = {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: allowedCardAuthMethods,
        allowedCardNetworks: allowedCardNetworks
      }
    };

    const cardPaymentMethod = Object.assign(
      {},
      baseCardPaymentMethod,
      {
        tokenizationSpecification: tokenizationSpecification
      });

    let paymentsClient = null;


    function getGoogleIsReadyToPayRequest() {
      return Object.assign(
          {},
          baseRequest,
          {
            allowedPaymentMethods: [baseCardPaymentMethod]
          }
      );
    }
    
    function getGooglePaymentDataRequest() {
      const paymentDataRequest = Object.assign({}, baseRequest);
      paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
      paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
      paymentDataRequest.merchantInfo = {
        // @todo a merchant ID is available for a production environment after approval by Google
        // See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
        // merchantId: '01234567890123456789',
        merchantName: 'Example Merchant'
      };
      return paymentDataRequest;
    }

    /**
     * Return an active PaymentsClient or initialize
     *
     * @see {@link https://developers.google.com/pay/api/web/reference/client#PaymentsClient|PaymentsClient constructor}
     * @returns {google.payments.api.PaymentsClient} Google Pay API client
     */
    function getGooglePaymentsClient() {
      if ( paymentsClient === null ) {
        console.log('paymentsClient is null')
        paymentsClient = new window.google.payments.api.PaymentsClient({environment: 'TEST'});
      }
      return paymentsClient;
    }

    /**
     * Initialize Google PaymentsClient after Google-hosted JavaScript has loaded
     *
     * Display a Google Pay payment button after confirmation of the viewer's
     * ability to pay.
     */

    useEffect(() => onGooglePayLoaded(), [])

    function onGooglePayLoaded() {
      const paymentsClient = getGooglePaymentsClient();
      paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
          .then(function(response) {
            if (response.result) {
              console.log('response result:', response)
              addGooglePayButton();
              // @todo prefetch payment data to improve performance after confirming site functionality
              // prefetchGooglePaymentData();
            }
          })
          .catch(function(err) {
            // show error in developer console for debugging
            console.error(err);
          });
    }

    /**
     * Add a Google Pay purchase button alongside an existing checkout button
     *
     * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#ButtonOptions|Button options}
     * @see {@link https://developers.google.com/pay/api/web/guides/brand-guidelines|Google Pay brand guidelines}
     */
    function addGooglePayButton() {
      const paymentsClient = getGooglePaymentsClient();
      const button =
          paymentsClient.createButton({onClick: onGooglePaymentButtonClicked});
      document.getElementById('container').appendChild(button);
    }

    /**
     * Provide Google Pay API with a payment amount, currency, and amount status
     *
     * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#TransactionInfo|TransactionInfo}
     * @returns {object} transaction info, suitable for use as transactionInfo property of PaymentDataRequest
     */
    function getGoogleTransactionInfo() {
      return {
        countryCode: 'UA',
        currencyCode: 'UAH',
        totalPriceStatus: 'FINAL',
        // set to cart total
        totalPrice: '5.00'
      };
    }

    /**
     * Prefetch payment data to improve performance
     *
     * @see {@link https://developers.google.com/pay/api/web/reference/client#prefetchPaymentData|prefetchPaymentData()}
     */
    function prefetchGooglePaymentData() {
      const paymentDataRequest = getGooglePaymentDataRequest();
      // transactionInfo must be set but does not affect cache
      paymentDataRequest.transactionInfo = {
        totalPriceStatus: 'NOT_CURRENTLY_KNOWN',
        currencyCode: 'USD'
      };
      const paymentsClient = getGooglePaymentsClient();
      paymentsClient.prefetchPaymentData(paymentDataRequest);
    }

    /**
     * Show Google Pay payment sheet when Google Pay payment button is clicked
     */
    function onGooglePaymentButtonClicked() {
      const paymentDataRequest = getGooglePaymentDataRequest();
      paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

      const paymentsClient = getGooglePaymentsClient();
      paymentsClient.loadPaymentData(paymentDataRequest)
          .then(function(paymentData) {
            // handle the response
            processPayment(paymentData);
            console.log('payment Data', paymentData)
          })
          .catch(function(err) {
            // show error in developer console for debugging
            console.error(err);
          });
    }

    let paymentToken;
    /**
     * Process payment data returned by the Google Pay API
     *
     * @param {object} paymentData response from Google Pay API after user approves payment
     * @see {@link https://developers.google.com/pay/api/web/reference/response-objects#PaymentData|PaymentData object reference}
     */
    function processPayment(paymentData) {
      // show returned data in developer console for debugging
        console.log(paymentData);
      // @todo pass payment token to your gateway to process payment
      paymentToken = paymentData.paymentMethodData.tokenizationData.token;
    }
    
    
    return (
        <>
            <div id="container"></div>
        </>
    )
} 

export default GooglePay