import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const Pagination = ({ rowsOption, handleChangeRow, rowPerPage, page, handleChangePage, totalPages }) => {
    return (
        <div className="flex justify-between text-right mt-5">
            <Menu as="div" className="relative inline-flex justify-center items-center text-left">
                <div>
                    Rows per page:
                </div>
                <div className="relative inline-flex">
                    <Menu.Button className="inline-flex ml-3 w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium  text-black-700 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        {rowPerPage}
                        <ChevronDownIcon
                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            {rowsOption.map((data, index) => (
                                <Menu.Item key={`option-pagination-${index}`}>
                                    {({ active }) => (
                                        <button
                                            onClick={() => {
                                                handleChangeRow(data);
                                                handleChangePage(1);
                                            }}
                                            className={`${active ? "bg-indigo-500 text-white" : "text-gray-900"
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            {data}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            <div className="flex justify-center text-center items-center">
                <button
                    disabled={page === 1}
                    onClick={() => handleChangePage(page - 1)}
                    type="button"
                    className="relative inline-flex items-center border border-gray-300 bg-white disabled:bg-gray-500 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <span className="mx-3 items-center justify-center">
                    {`Page ${page} of ${totalPages}`}
                </span>
                <button
                    disabled={page >= totalPages}
                    type="button"
                    onClick={() => handleChangePage(page + 1)}
                    className="relative inline-flex items-center border border-gray-300 bg-white disabled:bg-gray-500 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                    <ChevronRightIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

export default Pagination