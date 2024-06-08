import PropTypes from 'prop-types';

import { ReactComponent as AddressIcon } from "../../Image/icons/address.svg";
import { ReactComponent as StoreIcon } from "../../Image/icons/store.svg";
import { ReactComponent as EditIcon } from "../../Image/icons/edit.svg";

CheckoutBillingInfo.propTypes = {
    orderInfo: PropTypes.object,
    onBackStep: PropTypes.func,
};

export default function CheckoutBillingInfo({ orderInfo, onBackStep }) {
    const { phone, street, province, district, ward, store, isReceiveAtStore } = orderInfo;

    return (
        <>
            {isReceiveAtStore ?
                (
                    <div className="my-3 w-full flex-col rounded-lg bg-white py-3 px-4">
                        <div className="flex items-center justify-start">
                            <StoreIcon />
                            <p className="px-3 text-24 font-bold">Địa chỉ cửa hàng</p>
                        </div>
                        <p className="py-2 text-sm">Cửa hàng {store}</p>
                        <div className="flex w-full items-center justify-between">
                            <p className="text-sm ">Điện thoại: {phone}</p>
                            <button className="flex items-center" onClick={onBackStep}>
                                <p className="pr-2 text-12 text-linkkhac">Chỉnh sửa</p>
                                <EditIcon />
                            </button>
                        </div>
                    </div>
                ) :
                (
                    <div className="my-3 w-full flex-col rounded-lg bg-white py-3 px-4">
                        <div className="flex items-center justify-start">
                            <AddressIcon />
                            <p className="px-3 text-24 font-bold">Địa chỉ giao hàng</p>
                        </div>
                        <p className="py-2 text-sm">{street}, {ward}, {district}, {province}</p>
                        <div className="flex w-full items-center justify-between">
                            <p className="text-sm ">Điện thoại: {phone}</p>
                            <button className="flex items-center" onClick={onBackStep}>
                                <p className="pr-2 text-12 text-linkkhac">Chỉnh sửa</p>
                                <EditIcon />
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    );
};
