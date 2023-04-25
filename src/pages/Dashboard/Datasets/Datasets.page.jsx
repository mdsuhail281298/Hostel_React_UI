import React, { useState, useEffect } from "react";
import { DashboardLayout } from "layout";
import Text from "components/Text/Text.component";
import Input from "components/Input/Input.component";
import Button from "components/Button/Button.component";
import Section from "components/Section/Section.component";
import Icon from "components/Icon/Icon.component";
import Banner from "components/Banner/Banner.component";
import Table from "components/Table/Table.component";
import Tag from "components/Tag/Tag.component";
import Dropdown from "components/Dropdown/Dropdown.component";
import MyModal from "components/MyModal/MyModal.component";
import { toast } from "react-toastify";
import { API } from "lib/api";
import ModelDropdown from "components/ModelDropdown/ModelDropdown.component";
import { Select } from "antd";

const InputSelect = ({ options, placeholder }) => {
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log("search:", value);
    };

    // <Select
    //   showSearch
    //   className="w-full my-3 text-sm input text-white-P600 active focus-visible:ring-1 focus-visible:border-black-P600 focus-visible:outline-none focus-visible:bg-primary-P600 focus:ring-0"
    //   style={{ backgroundColor: "#000" }}
    //   placeholder={placeholder}
    //   optionFilterProp="children"
    //   onChange={onChange}
    //   onSearch={onSearch}
    //   filterOption={(input, option) =>
    //     (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
    //   }
    //   options={[
    //     {
    //       value: "Pallavaram",
    //       label: "Pallavaram",
    //     },
    //     {
    //       value: "Random dataset",
    //       label: "Random dataset",
    //     },
    //     {
    //       value: "10 days",
    //       label: "10 days",
    //     },
    //   ]}
    // />
    return (
        <select
            name="filter"
            className="w-full py-3 pl-5 pr-12 my-3 text-sm input text-white-P600 active focus-visible:ring-1 focus-visible:border-black-P600 focus-visible:outline-none focus-visible:bg-primary-P600 focus:ring-0"
            style={{ border: "1px solid #16191F" }}
            disabled
        >
            <option value="1" disabled selected>
                {placeholder}
            </option>
        </select>
    );
};

const IncomeOverview = () => {
    const dummy = [
        {
            ID: "1391e37e-bcfc",
            Category: "Single Sharing",
            status: "Pending",
            Location: "Pallavaram",
            Roomtype:"Single Sharing"
        },
        {
            ID: "1391e37e-bcfc",
            Category: "Single Sharing",
            status: "Completed",
            Location: "Pallavaram",
            Roomtype:"Single Sharing"
        },
        {
            ID: "1391e37e-bcfc",
            Category: "Single Sharing",
            status: "In-Progress",
            Location: "Pallavaram",
            Roomtype:"Single Sharing"
        },
        {
            ID: "1391e37e-bcfc",
            Category: "Single Sharing",
            status: "Failed",
            Location: "Egmore",
            Roomtype:"Single Sharing"
        },
        {
            ID: "1391e37e-bcfc",
            Category: "Single Sharing",
            status: "In-Progress",
            Location: "Pallavaram",
            Roomtype:"Single Sharing"
        },
        {
            ID: "1391e37e-bcfc",
            Category: "Single Sharing",
            status: "Failed",
            Location: "Adayar",
            Roomtype:"Single Sharing"
        },
        {
            ID: "1391e37e-bcfc",
            Category: "Single Sharing",
            status: "In-Progress",
            Location: "Tambaram",
            Roomtype:"Single Sharing"
        },
        {
            ID: "1391e37e-bcfc",
            // Category: "Single Sharing",
            status: "Failed",
            Location: "Pallavaram",
            Roomtype:"Single Sharing"
           
        },
    ];
    const branch = [
        { id: "Pallavaram", name: "Pallavaram" },
        { id: "Tambaram", name: "Tambaram" },
        { id: "Egmore", name: "Egmore" },
        { id: "Adayar", name: "Adayar" },
    ];

    const roomType = [
        { id: "SingleSharing", name: "SingleSharing" },
        { id: "Twin Sharing", name: "Twin Sharing" },
        { id: "Three Sharing", name: "Three Sharing" },
        { id: "AC Rooms", name: "AC Rooms" },
    ];


    const [websites, setWebsites] = useState(dummy);
    const [checkAll, setCheckAll] = useState(false);
    const [search, setSearch] = useState("");
    // const [page, setPage] = useState(0);
    const [selectedWebsite, setSelectedWebsite] = useState({});
    const [newWebsite, setNewWebsite] = useState({ name: "", url: "" });
    const [showAddModelModal, setShowAddModelModal] = useState(false);
    const [showWebsiteAPIKeyModal, setShowWebsiteAPIKeyModal] = useState(false);
    const [showWebsiteDetailsModal, setShowWebsiteDetailsModal] = useState(false);
    const [showDeleteWebsiteModal, setShowDeleteWebsiteModal] = useState(false);

    const showDetails = (w) => {
        setSelectedWebsite(w);
        setShowWebsiteDetailsModal(true);
    };

    const confirmDelete = (w) => {
        setSelectedWebsite(w);
        setShowDeleteWebsiteModal(true);
    };

    const copyAPIKey = async () => {
        try {
            await navigator.clipboard.writeText(selectedWebsite.api_key);
            // alert('Copied to clipboard')
            toast("API key copied to clipboard succesfully");
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    const saveAWebsite = async () => {
        const data = {
            name: newWebsite.name,
            url: newWebsite.url,
            user_id: 35,
            expires: "2025-04-01T20:25:19.338Z",
            updated: "2023-04-01T20:25:19.338Z",
            created: "2023-04-01T20:25:19.338Z",
        };
        // console.log({data});
        // return false;
        try {
            await API.saveAConnectedWebsite(data);
            setShowAddModelModal(false);
            // readData();
            toast("Website created succesfully. Reading websites now...");
        } catch (e) {
            alert("Error saving because");
        }
    };

    return (
        <DashboardLayout>
            <div className="bg-[#08090A] gap-5 p-10 text-white h-full">
                <Section.PageHeading>
                    <Text.PageHeading text="Rooms" />
                    <div className="grid grid-flow-col justify-items-end">
                        <div className="">
                            <Button
                                className="ml-2"
                                type={"primary"}
                                label={"+ Add Rooms"}
                                onClick={() => setShowAddModelModal(true)}
                            />
                        </div>
                    </div>
                </Section.PageHeading>

                {/* Sub heading */}
              

                {/* Search bar & sorting */}
                <div className="flex items-center justify-center gap-6 md:justify-between md:flex-nowrap">
                    <div className="relative w-full">
                        <input
                            type="text"
                            className="min-w-full px-4 py-3 text-xs bg-[#08090A] border-[#16191F] rounded-md focus:outline-none placeholder-[#6C757D]"
                            style={{ border: "1px solid #16191F" }}
                            placeholder="Search by name or ID..."
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <div className="cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4 text-[#6C757D]"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/4 filter">
                        <select
                            name="filter"
                            className="min-w-full bg-[#08090A] px-1 py-3 pl-5 pr-12 bg-P600 text-xs border-[#16191F] rounded-md text-white-P600 active focus-visible:ring-1 focus-visible:border-black-P600 focus-visible:outline-none focus:ring-0"
                            style={{ border: "1px solid #16191F" }}
                        >
                            <option value="1" disabled selected>
                                Filter by...
                            </option>
                            <option value="2">Status</option>
                            <option value="3">Size</option>
                        </select>
                    </div>
                </div>
                {/* Table */}
                <div className="">
                    <Table.T>
                        <thead>
                            <Table.Tr>
                                <Table.Th>ID</Table.Th>
                                <Table.Th> Location</Table.Th>
                                <Table.Th>Room Type</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Actions</Table.Th>
                            </Table.Tr>
                        </thead>
                        <tbody>
                            {websites
                                .filter((website) => {
                                    if (!search) {
                                        return true;
                                    }

                                    if (
                                        website.name.includes(search) ||
                                        website.url.includes(search) ||
                                        website.status.includes(search) ||
                                        website.created_at.includes(search) ||
                                        website.last_edited.includes(search)
                                    ) {
                                        return true;
                                    }

                                    return false;
                                })
                                .map((model) => {
                                    return (
                                        <Table.Tr>
                                            <Table.Td>{model.ID}</Table.Td>
                                            <Table.Td>{model.Location}</Table.Td>
                                            <Table.Td>{model.Roomtype}</Table.Td>
                                            <Table.Td>
                                                <Tag text={model.status} status={model.status} />
                                            </Table.Td>
                                            
                                            {/* <Table.Td><a className='link'>View actions</a></Table.Td> */}
                                            <Table.Td>
                                                <ModelDropdown
                                                    onView={() => showDetails(model)}
                                                    onDelete={() => confirmDelete(model)}
                                                    btnText="View Actions"
                                                />
                                            </Table.Td>
                                        </Table.Tr>
                                    );
                                })}
                        </tbody>
                    </Table.T>
                </div>
                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-4">
                    <button
                        className="px-2.5 py-2.5 rounded-md "
                        style={{ border: "1px solid #16191F" }}
                    >
                        <Icon.ArrowLeft />
                    </button>
                    <button
                        className="px-3 py-2.5 rounded-md bg-[#f900b9]"
                        style={{ border: "1px solid #16191F" }}
                    >
                        1
                    </button>
                    <button
                        className="px-3 py-2.5 rounded-md"
                        style={{ border: "1px solid #16191F" }}
                    >
                        2
                    </button>
                    <button
                        className="px-3 py-2.5 rounded-md "
                        style={{ border: "1px solid #16191F" }}
                    >
                        3
                    </button>
                    <button
                        className="px-2.5 py-2.5 rounded-md "
                        style={{ border: "1px solid #16191F" }}
                    >
                        <Icon.ArrowRight />
                    </button>
                </div>
            </div>

            <MyModal
                show={showAddModelModal}
                panelClassName={"w-1/3"}
                onClose={() => setShowAddModelModal(false)}
                title="Add Rooms"
                footer={
                    <Button
                        label={"Add Rooms"}
                        type={"primary"}
                        className={"w-full"}
                        onClick={saveAWebsite}
                    />
                }
            >
                <div className="text-sm text-gray-500">
                    <Input.Free
                        label="ID"
                        placeholder="id"
                        onChange={(e) =>
                            setNewWebsite({ ...newWebsite, name: e.target.value })
                        }
                    />

                    <Input.Select
                        label="Room Type"
                        placeholder="Select Type"
                        name={"base_model"}
                        options={roomType}
                    />

                    <Input.Select
                        label="Location"
                        placeholder="Select Location"
                        name={"base_model"}
                        options={branch}
                    />
                </div>
            </MyModal>

            <MyModal
                panelClassName={"w-1/3"}
                show={showWebsiteAPIKeyModal}
                onClose={() => setShowWebsiteAPIKeyModal(false)}
                title="API Key"
                footer={
                    <Button
                        label={"Close Window"}
                        type={"secondary"}
                        onClick={() => setShowWebsiteAPIKeyModal(false)}
                        className={"w-full"}
                    />
                }
            >
                <p className="flex items-center justify-between px-3 py-3 mb-3 text-sm text-gray-500 border-2 border-dotted rounded border-black-P700">
                    <p>{selectedWebsite ? selectedWebsite.api_key : "---"}</p>
                    <button className="link" onClick={copyAPIKey}>
                        copy
                    </button>
                </p>
                <p className="text-sm leading-6 text-center text-white-P600">
                    Copy and paste your API key in the WordPress plugin in order to
                    connect. If you don’t have the plugin,{" "}
                    <a className="link">download</a> now.
                </p>
            </MyModal>

            <MyModal
                panelClassName={"w-1/3"}
                show={showWebsiteDetailsModal}
                onClose={() => setShowWebsiteDetailsModal(false)}
                title="Website Details"
                footer={
                    <Button
                        label={"Close Window"}
                        type={"secondary"}
                        onClick={() => setShowWebsiteDetailsModal(false)}
                        className={"w-full"}
                    />
                }
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex">
                            <div className="items-center justify-center p-3 my-2 rounded-full bg-primary-P50 wd-10">
                                <Icon.Globe width={28} height={28} color="white" />
                            </div>
                        </div>
                        <h4 className="ml-3 text-xl text-white-P50">
                            {selectedWebsite.name}
                        </h4>
                    </div>
                    <Tag text={selectedWebsite.status} status={selectedWebsite.status} />
                </div>

                <div className="p-4 mt-4 rounded bg-black-P900">
                    <p className="text-xs text-white-P600">URL</p>
                    <p className="text-base link">{selectedWebsite.url}</p>
                </div>

                <div className="grid grid-cols-2">
                    <div className="p-4 mt-4 mr-2 rounded bg-black-P900">
                        <p className="text-xs text-white-P600">Date Created</p>
                        <p className="pt-2 text-base text-white-P50">
                            {selectedWebsite.created_at}
                        </p>
                    </div>
                    <div className="p-4 mt-4 ml-2 rounded bg-black-P900">
                        <p className="text-xs text-white-P600">Date Updated</p>
                        <p className="pt-2 text-base text-white-P50">
                            {selectedWebsite.last_edited}
                        </p>
                    </div>
                </div>

                <div className="mt-3 rounded">
                    <p className="flex items-center justify-between px-3 py-3 mb-3 text-sm text-gray-500 border-2 border-dotted rounded border-black-P700">
                        <p>{selectedWebsite ? selectedWebsite.api_key : "---"}</p>
                        <button className="link">copy</button>
                    </p>
                    <p className="text-sm leading-6 text-center text-white-P600">
                        Copy and paste your API key in the WordPress plugin in order to
                        connect. If you don’t have the plugin,{" "}
                        <a className="link">download</a> now.
                    </p>
                </div>
            </MyModal>

            <MyModal
                // panelClassName={"w-1/3"}
                show={showDeleteWebsiteModal}
                onClose={() => setShowDeleteWebsiteModal(false)}
                footerClassName={"border-none bg-black-P900"}
                panelClassName={"w-100  max-w-md bg-black-P900"}
                title="Delete Website"
                noHeader
                footer={
                    <div className="flex">
                        <Button
                            label={"Cancel"}
                            type={"secondary"}
                            onClick={() => setShowDeleteWebsiteModal(false)}
                            className={"w-full mr-2"}
                        />
                        <Button
                            label={"Delete Website"}
                            type={"primary"}
                            onClick={() => setShowDeleteWebsiteModal(false)}
                            className={"w-full ml-2"}
                        />
                    </div>
                }
            >
                <div className="flex justify-center center">
                    <div className="items-center justify-center p-4 my-2 rounded-full bg-red-P50 wd-10">
                        <Icon.Trash width={32} height={32} color="white" />
                    </div>
                </div>

                <p className="px-3 py-3 mb-3 text-xl text-center text-white-P50">
                    <p>Delete Website</p>
                </p>
                <p className="text-base leading-7 text-center text-white-P600">
                    Are you sure you wish to proceed? This action is permanent can not be
                    undone.
                </p>
            </MyModal>
        </DashboardLayout>
    );
};
export default IncomeOverview;