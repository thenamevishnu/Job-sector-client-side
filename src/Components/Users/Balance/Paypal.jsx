import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { errorAlert } from "../../../Functions/Toasts";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const style = {"layout":"vertical"};

export const Paypal = ({ currency, showSpinner, amount , getSuccess , action}) => {
    const navigate = useNavigate()
    const [modal,showModal] = action
    const {id} = useSelector(state => state.user)
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    useEffect(() => {
        dispatch(
            {
                type: "resetOptions",
                value: {
                    ...options,
                currency: currency,
                },
            }
        );
    }, [currency, showSpinner]);

    return (
        <>
            { 
                (showSpinner && isPending) && <div className="spinner" /> 
            }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    description:`Payment to JOB SECTOR`,
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(async function () {
                        const obj = {
                            pay_id: data.orderID,
                            amount:amount,
                            currency:currency,
                            user_id:id
                        }
                        const response = await axios.post(`${process.env.react_app_server}/onPaymentCompleted`,obj,{withCredentials:true})
                        getSuccess({amountPaid:amount,transactions:response.data.transactions})
                        showModal(!modal)
                    });
                }}
            />
        </>
    );
}
