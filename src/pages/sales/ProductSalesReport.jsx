import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Pagination from "./PaginationRowPerPage";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactDatePicker from "react-datepicker";
import PopoverFilter from "./PopoverFilter";
import Breadcrumb from '../../component/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../component/layouts/DefaultLayout';
import MetaData from "../../component/layouts/MetaData/MetaData";
import axios from "../../common";

function Table({ tableData }) {
    return (
        <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle px-4 sm:px-6 md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr> <th scope="col" className="px-3 py-3 text-left text-sm font-semibold text-gray-900 sm:pl-6" > {" "} Order ID{" "} </th> <th scope="col" className="px-3 py-3 text-left text-sm font-semibold text-gray-900" > {" "} Branch Name{" "} </th> <th scope="col" className="px-3 py-3 text-left text-sm font-semibold text-gray-900" > {" "} Date{" "} </th> <th scope="col" className="px-3 py-3 text-left text-sm font-semibold text-gray-900" > {" "} User Name{" "} </th> <th scope="col" className="px-3 py-3 text-left text-sm font-semibold text-gray-900" > {" "} Product Name{" "} </th> <th scope="col" className="px-3 py-3 text-left text-sm font-semibold text-gray-900" > {" "} Price {" "} </th> <th scope="col" className="px-3 py-3 text-left text-sm font-semibold text-gray-900" > {" "} Sold Quantity{" "} </th> <th scope="col" className="px-3 py-3 text-left text-sm font-semibold text-gray-900" > {" "} Total Price{" "} </th> </tr>
                            </thead>
                            <tbody className="divide-y text-left divide-gray-200 bg-white">
                                {tableData.map((row) => (
                                    <tr key={row.id}> <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-900 sm:pl-6"> {" "} {row.id || ""}{" "} </td> <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500"> {" "} {row.branchname || ""}{" "} </td> <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500"> {" "} {moment(row.createdAt).format("YYYY-MM-DD HH:mm:ss") || ""}{" "} </td> <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500"> {" "} {row.userName || ""}{" "} </td> <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500"> {" "} {row.productname || ""}{" "} </td> <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500"> {" "} {row.price || ""}{" "} </td> <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500"> {" "} {row.quantity || ""}{" "} </td> <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500"> {" "} {row.total_price || ""}{" "} </td> </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProductSalesReport() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [limit, setLimit] = useState(Number(searchParams.get("limit")) || 5);
    const [totalPages, setTotalPages] = useState(0);
    const [branchId, setBranchId] = useState(searchParams.get("branchId") || "All");
    const [storeData, setStoreData] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState(searchParams.get("startDate") || "");
    const [selectedEndDate, setSelectedEndDate] = useState(searchParams.get("endDate") || "");
    const [orderBy, setOrderBy] = useState(searchParams.get("orderBy") || "createdAt");
    const [sortDirection, setSortDirection] = useState(searchParams.get("sortDirection") || "ASC");
    const [tableData, setTableData] = useState([]);
    const isFirstRender = useRef(true);
    const [productName, setProductName] = useState(searchParams.get("productName") || "");
    const [userName, setUserName] = useState(searchParams.get("userName") || "");
    const [transactionId, setTransactionId] = useState(searchParams.get("transactionId") || "");

    const getListOfSalesReport = async (id_branch) => {
        try {
            const response = await axios.get(`/api/admins/sales-report`, { params: { endDate: selectedEndDate === "" ? null : moment(selectedEndDate).endOf("day").format("YYYY-MM-DD HH:mm:ss"), startDate: selectedStartDate === "" ? null : moment(selectedStartDate).startOf("day").format("YYYY-MM-DD HH:mm:ss"), page: page, limit: limit, branchId: id_branch === "All" ? null : id_branch, orderBy: orderBy, orderByMethod: sortDirection, productName: productName === "" ? null : productName, userName: userName === "" ? null : userName, transactionId: transactionId === "" ? null : transactionId }, });
            setTableData(response.data.data.items);
            setTotalPages(response.data.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    const renderSearchByBranch = () => {
        <div className="flex items-center space-x-4">
            <p className="w-24 text-right">Branch Store:</p>
            <select id="storeId" name="storeId" className="w-52" onChange={(e) => setBranchId(e.target.value)} value={branchId || ""} >
                <option value="All">All Branch</option>
                {storeData.map((data, index) => (
                    <option key={index} value={data.id}>
                        {data.branchName}
                    </option>
                ))}
            </select>
        </div>
    };
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };
    const handleChangeRowPerPage = (newLimit) => {
        setLimit(newLimit);
    };
    useEffect(() => {
        setSearchParams({ ...searchParams, page: page.toString(), limit: limit.toString(), orderBy: orderBy, sortDirection: sortDirection, branchId: branchId, productName: productName, userName: userName, transactionId: transactionId, startDate: selectedStartDate, endDate: selectedEndDate });
    }, [page, limit, setSearchParams, orderBy, sortDirection, branchId, productName, userName, transactionId, selectedStartDate, selectedEndDate]);
    const getListOfStoreData = async () => {
        try {
            const response = await axios.get('/api/storeBranch/admin/storeBranches');
            setStoreData(response.data.data);
        } catch (error) {
            console.error(error.response.data.message);
        }
    };
    useEffect(() => {
        getListOfStoreData();
        // if (role === ROLE.SUPER_ADMIN) {
        getListOfSalesReport(null);
        // } else {
        //     setBranchId(id_branch);
        //     getListOfSalesReport(id_branch);
        // }
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        // if (role === ROLE.SUPER_ADMIN) {
        getListOfSalesReport(null);
        // } else {
        //     getListOfSalesReport(id_branch);
        // }
    }, [page, limit]);
    console.log(tableData);

    return (
        <div>
            <DefaultLayout>
                <MetaData title="Sales Report" />
                <Breadcrumb pageName="Sales Report" />
                <div className="flex justify-end my-8">
                    <PopoverFilter>
                        <div className="flex flex-wrap space-y-2">
                            <div className="flex items-center space-x-4">
                                <p className="w-24 text-right">Start Date:</p>
                                <ReactDatePicker
                                    placeholderText="Start Date" selected={selectedStartDate === "" ? "" : new Date(selectedStartDate)} className="w-52 rounded-md border px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 text-sm leading-6" id="start_date"
                                    onChange={(date) => {
                                        if (date === null) {
                                            setSelectedStartDate("")
                                            return
                                        }
                                        setSelectedStartDate(date)
                                    }}
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="w-24 text-right">End Date:</p>
                                <ReactDatePicker
                                    placeholderText="End Date" selected={selectedEndDate === "" ? "" : new Date(selectedEndDate)} className="w-52 rounded-md border px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 text-sm leading-6" id="end_date"
                                    onChange={(date) => {
                                        if (date === null) {
                                            setSelectedEndDate("")
                                            return
                                        }
                                        setSelectedEndDate(date)
                                    }}
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="w-24 text-right">Product Name:</p>
                                <input type="text" name="name" className="w-52 rounded-md text-sm px-4 py-2 focus:outline-none focus:border-green-400 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset" placeholder="Search by product name" required value={productName} onChange={(e) => setProductName(e.target.value)} />
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="w-24 text-right">User Name:</p>
                                <input type="text" name="name" className="w-52 rounded-md text-sm px-4 py-2 focus:outline-none focus:border-green-400 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset" placeholder="Search by user name" required value={userName} onChange={(e) => setUserName(e.target.value)} />
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="w-24 text-right">Order ID:</p>
                                <input type="text" name="name" className="w-52 rounded-md text-sm px-4 py-2 focus:outline-none focus:border-green-400 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset" placeholder="Search by Transaction ID" required value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
                            </div>
                            {renderSearchByBranch()}
                            <div className="flex items-center space-x-4">
                                <p className="w-24 text-right">Sort By:</p>
                                <select id="orderBy" name="orderBy" className="w-52" onChange={(e) => setOrderBy(e.target.value)} value={orderBy || "createdAt"} >
                                    <option value="createdAt">Date</option>
                                    <option value="productQuantity">Product Quantity</option>
                                </select>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="w-24 text-right">Sort Order:</p>
                                <select id="orderByMethod" name="orderByMethod" className="w-52" onChange={(e) => setSortDirection(e.target.value)} value={sortDirection || "ASC"} >
                                    <option value="ASC">ASC</option>
                                    <option value="DESC">DESC</option>
                                </select>
                            </div>
                            <div className="flex items-center space-x-4 w-full">
                                <div className="flex items-end">
                                    <button type="button" onClick={() => getListOfSalesReport(branchId)} className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto" > Search </button>
                                </div>
                            </div>
                        </div>
                    </PopoverFilter>
                </div>
                <Table tableData={tableData} />
                <Pagination rowsOption={[5, 10, 20, 30]} handleChangeRow={handleChangeRowPerPage} rowPerPage={limit} page={page} handleChangePage={handleChangePage} totalPages={totalPages} />
            </DefaultLayout>
        </div>
    );
}

export default ProductSalesReport;