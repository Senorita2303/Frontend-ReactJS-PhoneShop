import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PopoverFilter({ positionClass = "right-0", children }) {
    return (
        <div>
            <Popover>
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={`
                ${open ? "" : "text-opacity-90"}
               group inline-flex items-center rounded-md bg-indigo-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <span>Filter</span>
                            <ChevronDownIcon
                                className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-white transition duration-150 ease-in-out group-hover:text-opacity-80`}
                                aria-hidden="true"
                            />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className={classNames("absolute z-10 mt-3 w-screen max-w-sm transform px-4 sm:px-0 origin-top-right", positionClass)}>
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid gap-8 bg-white p-7">
                                        {children}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
}
