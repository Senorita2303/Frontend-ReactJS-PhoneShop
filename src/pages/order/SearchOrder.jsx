import MetaData from "../../component/layouts/MetaData/MetaData";
function SearchOrder() {
    // const { orderId } = useParams();

    return (
        <>
            <MetaData title={"Tra cứu vận đơn"} />
            <main className="flex w-full flex-col items-center justify-start py-1" style={{ minHeight: '600px' }}>
                <div className="container w-full" style={{ opacity: 1 }}>
                    <div className="container">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <img
                                    src="https://didongviet.vn/icon/tracuu/tracuu.png"
                                    width="627"
                                    alt="DDV"
                                    height="417"
                                    style={{ height: '417px', objectFit: 'contain' }}
                                />
                            </div>
                            <div className="col-span-1" style={{ width: '347px' }}>
                                <div className="my-3 flex-col rounded-2xl bg-white py-3 px-4" style={{ width: '347px' }}>
                                    <div className="flex items-center justify-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none"><g clip-path="url(#packagelarge_svg__a)"><path fill="#BE1E2D" d="M24.443 6.184V6.13c-.027-.053-.027-.106-.053-.159v-.026a.574.574 0 0 0-.106-.132l-.026-.027c-.027-.026-.08-.053-.106-.079l-.026-.026h-.027l-.026-.027L12.842.08a.842.842 0 0 0-.714 0L8.35 1.956l11.284 5.787.027.026c.026 0 .026.027.053.027.026.026.026.052.052.079v6.21a.277.277 0 0 1-.132.238l-2.272 1.189c-.133.08-.291.026-.37-.106-.027-.026-.027-.079-.027-.132V9.276L5.548 3.382l-.026-.027L.95 5.63l-.026.026H.897l-.026.027c-.027.026-.08.052-.106.079l-.026.026c-.053.053-.08.106-.132.159v.026a.376.376 0 0 0-.053.159v.053c0 .053-.027.079-.027.132v12.341c0 .29.159.581.45.713l11.125 5.55c.158.079.343.105.528.052l.053-.026c.053 0 .08-.026.132-.053l11.205-5.55a.796.796 0 0 0 .45-.713V6.316c-.027-.053-.027-.08-.027-.132Z"></path></g><defs><clipPath id="packagelarge_svg__a"><path fill="#fff" d="M0 0h25v25H0z"></path></clipPath></defs></svg>
                                        <p className="px-3 text-24 font-bold">Tra cứu đơn hàng</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}
export default SearchOrder;