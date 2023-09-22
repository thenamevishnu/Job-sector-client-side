import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import api_call from "../../../axios";

const style = {"layout":"vertical"};

export const Paypal = ({ currency, showSpinner, amount , getSuccess , action}) => {

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
    }, [currency, showSpinner, dispatch, options]);

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
                createOrder={async (data, actions) => {
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
                            return orderId;
                        });
                }}
                onApprove={async function (data, actions) {
                    return actions.order.capture().then(async function () {
                        const obj = {
                            pay_id: data.orderID,
                            amount:amount,
                            currency:currency,
                            user_id:id
                        }
                        const response = await api_call.post(`/onPaymentCompleted`,obj,{withCredentials:true})
                        await getSuccess({amountPaid:amount,transactions:response.data.transactions})
                        setTimeout(() => {
                            showModal(!modal)
                        }, 1500);
                    });
                }}
            />
        </>
    );
}
