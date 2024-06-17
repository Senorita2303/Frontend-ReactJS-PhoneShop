import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import axios from "../../common";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Iconify from '../../component/iconify';
import MetaData from "../../component/layouts/MetaData/MetaData";
import Breadcrumb from '../../component/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../component/layouts/DefaultLayout';
import { Box, Tooltip, IconButton } from '@mui/material';
import { paths } from "../../routes/paths";


const ManageStock = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [activePage, setActivePage] = useState(searchParams.get("page") || 1);
    const [totalPage, setTotalPage] = useState(1);
    const [order, setOrder] = useState(searchParams.get("order") || "")
    const [sort, setSort] = useState(searchParams.get("sort") || 'ASC');
    const [search, setSearch] = useState("")
    const [colors, setColors] = useState([]);
    const [memories, setMemories] = useState([]);
    const [inventories, setInventories] = useState([]);
    const [searchedProduct, setSearchedProduct] = useState(searchParams.get("name") || "");
    const [selectedColor, setSelectedColor] = useState(searchParams.get("color") || "");
    const [selectedMemory, setSelectedMemory] = useState(searchParams.get("memory") || "");
    const [selectedBranchId, setSelectedBranchId] = useState(searchParams.get("branchId") || 1);
    const [storeBranches, setStoreBranches] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const branchId = selectedBranchId;

    useEffect(() => {
        setSearchParams({
            page: activePage,
            sort: sort,
            order: order,
            color: selectedColor,
            memory: selectedMemory,
            name: searchedProduct,
            branchId
        });
    }, [activePage, sort, order, selectedColor, selectedMemory, searchedProduct, selectedBranchId]);

    async function fetchInventories() {
        try {
            const productData = await axios.get('/api/inventory', {
                params: {
                    branchId,
                    order: order,
                    sort: sort,
                    name: searchedProduct,
                    color: selectedColor,
                    memory: selectedMemory,
                    page: activePage,
                    adm: 1
                },
            });
            setInventories(productData.data.data);
            setTotalPage(Math.ceil(productData.data.count / 12));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function getStoreBranches() {
            try {
                const { data } = await axios.get('/api/storeBranch/admin/storeBranches')
                setStoreBranches(data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getStoreBranches()

        async function fetchColors() {
            try {
                const { data } = await axios.get("/api/color/admin/colors");
                setColors(data.colors);
            } catch (error) {
                console.log(error);
            }
        }
        fetchColors();

        async function fetchMemories() {
            try {
                const { data } = await axios.get("/api/memory/admin/memories");
                setMemories(data.memories);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMemories();
        fetchInventories();
    }, [order, sort, activePage, selectedBranchId, selectedColor, selectedMemory, searchedProduct]);

    const handleEdit = (id) => {
        navigate(paths.dashboard.edit.inventory(`${id}`));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'productVariant',
            headerName: 'Product variant',
            width: 400,
            renderCell: (params) => (params.row.productVariant.name),
        },
        {
            field: 'discounts',
            headerName: 'Discount',
            width: 160,
            renderCell: (params) => (
                params.row.discounts?.discountType === "buy one get one"
                    ? params.row.discounts?.discountType
                    : params.row.discounts?.discountType === "percentage"
                        ? `${params.row.discounts?.discountValue}%`
                        : params.row.discounts?.discountType === "amount"
                            ? (params.row.discounts?.discountValue).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                            : null),
        },
        { field: 'stock', headerName: 'Stock', width: 150 },
        {
            field: 'action',
            headerName: 'Actions',
            type: 'actions',
            width: 150,
            renderCell: (params) => {
                const inventoryID = params.row.id
                return (
                    <Fragment>
                        <Box>
                            <Tooltip title="Update Stock">
                                <IconButton
                                    onClick={() => handleEdit(inventoryID)}
                                    color="success"
                                >
                                    <Iconify icon="ic:round-edit" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Fragment>
                )
            },
        },
    ];

    const handleSortChange = (e) => {
        const values = JSON.parse(e.target.value);
        setSort(values.sort);
        setOrder(values.order);
        setActivePage(1);
    };
    const handleFilterColor = (e) => {
        setSelectedColor(e.target.value)
        setActivePage(1);
    };
    const handleFilterMemory = (e) => {
        setSelectedMemory(e.target.value)
        setActivePage(1);
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setActivePage(1);
            setSearchedProduct(search)
        }
    };
    return (
        <DefaultLayout>
            <MetaData title="Manage Stock" />
            <Breadcrumb pageName="Manage Stock" />
            <div className="flex">
                <div className="flex mx-auto rounded-md w-full max-w-xl max-h-5xl px-2 bg-white md:max-w-4xl md:w-full md:px-6 lg:w-full lg:max-w-7xl lg:h-7xl lg:px-4">
                    <div className="w-full lg:w-full p-4 lg:p-8 justify-start ">
                        <div className="flex mb-6">

                            <div className="flex items-center">
                                <label className="block text-md font-medium leading-6 text-black mr-4">
                                    Select Branch:
                                </label>
                                <select
                                    className="text-black rounded-md border border-blue-700 focus:ring-green-600 active:border-green-500 hover:border-green-500 target:border-green-500"
                                    id="filter" value={selectedBranchId}
                                    onChange={(e) => setSelectedBranchId(e.target.value)}
                                >
                                    {storeBranches?.map((branch) => (
                                        <option key={branch.id} value={branch.id}>
                                            {branch.district} - {branch.province}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row lg:flex-row mb-6">
                            <div className="relative w-full">
                                <input
                                    id="search" type="search"
                                    placeholder="Search product name"
                                    onChange={e => setSearch(e.target.value)}
                                    onKeyDown={handleKeyDown} defaultValue={searchedProduct}
                                    className="text-black w-full rounded-md border-0 border-blue-600 pl-10 pr-40 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset "
                                />
                                <select className="text-black right-0 rounded-r-md border border-blue-600 focus:ring-2 focus:ring-inset focus:ring-green-600 active:border-green-500 hover:border-green-500 target:border-green-500 mr-10" onChange={handleFilterColor} value={selectedColor}>
                                    <option key="" value="">All Colors</option>
                                    {colors.map((color) => (
                                        <option key={color.id} value={color.id}>
                                            {color.name}
                                        </option>
                                    ))}
                                </select>
                                <select className="text-black right-0 rounded-r-md border border-blue-600 focus:ring-2 focus:ring-inset focus:ring-green-600 active:border-green-500 hover:border-green-500 target:border-green-500 ml-4" onChange={handleFilterMemory} value={selectedMemory}>
                                    <option key="" value="">All Memories</option>
                                    {memories.map((memory) => (
                                        <option key={memory.id} value={memory.id}>
                                            {memory.ram} - {memory.rom} - {memory.chipset}
                                        </option>
                                    ))}
                                </select>
                            </div>



                            <div className="flex mt-4 md:ml-8 md:mt-0 items-center">
                                <label className="text-black block w-16 font-medium leading-6 mr-[190px] ">Sort by:</label>
                                <select
                                    className="text-black w-56 lg:w-60 rounded-md border border-gray-300 " id="filter" value={JSON.stringify({ order, sort })} onChange={handleSortChange}
                                >
                                    <option value='{"order":"name","sort":"ASC"}'>Product Name A-Z</option>
                                    <option value='{"order":"name","sort":"DESC"}'>Product Name Z-A</option>
                                    <option value='{"order":"price","sort":"ASC"}'>Price Lowest-Highest</option>
                                    <option value='{"order":"price","sort":"DESC"}'>Price Highest-Lowest</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Box
                sx={{
                    height: 400,
                    width: '100%',
                    mt: '20px',
                    bgcolor: 'primary.bright',
                }}
            >
                <DataGrid
                    columns={columns}
                    rows={inventories}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    getRowId={(row) => row.id}
                    autoPageSize
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                />
            </Box>
        </DefaultLayout>
    );
};
export default ManageStock;