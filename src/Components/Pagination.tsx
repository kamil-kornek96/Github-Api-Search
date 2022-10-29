import React from "react";
import { InputFormData } from "../Interfaces/Interfaces"
import ReactPaginate from 'react-paginate';

interface Props {
    inputData: InputFormData;
    setInputData: React.Dispatch<React.SetStateAction<InputFormData>>;
    lastPage: number;
}

export const Pagination: React.FC<Props> = ({ inputData, setInputData, lastPage }) => {
    const handlePageClick = (event: { selected: number; }) => {
        setInputData({ ...inputData, page: (event.selected + 1) })
    };

    function handleChange(event: { target: { name: string, value: string } }) {
        const { name, value } = event.target
        if (value !== "") {
            setInputData(prevFormData => {
                return {
                    ...prevFormData,
                    [name]: value,
                    page: 1,
                }
            })
        }
    }

    return (
        <div className="pagination-container">
            <div className="pagination-items-per-page-container">Items per page:<br />
                <select
                    value={inputData.perPage}
                    onChange={handleChange}
                    name="perPage"
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </div>
            <br />
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={inputData.perPage}
                pageCount={lastPage}
                previousLabel="<"
                forcePage={inputData.page - 1}
            />
        </div>
    )
}

export default Pagination;