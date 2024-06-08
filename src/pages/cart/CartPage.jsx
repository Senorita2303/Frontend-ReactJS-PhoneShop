import { useSelector } from "react-redux";
import MetaData from "../../component/layouts/MetaData/MetaData";
import { CheckoutCart, CheckoutBillingAddress, CheckoutPayment } from '../checkout';
export default function CartPage() {
    const { activeStep } = useSelector((state) => state.order);
    const steps = [
        {
            component: <CheckoutCart />
        },
        {
            component: <CheckoutBillingAddress />
        },
        {
            component: <CheckoutPayment />
        },
    ]
    return (
        <>
            <div>
                <MetaData title="Thanh toán - Di Động Việt" />
                <main className="flex w-full flex-col items-center justify-start py-1" style={{ minHeight: '600px' }}>
                    <div className="container w-full" style={{ opacity: 1 }}>
                        {steps[activeStep].component}
                    </div >
                </main >
            </div >

        </>
    );
};
