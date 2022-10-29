import React from "react";
import { searchCodeResponse } from '../Services/apiService'
import SearchedResult from "./SearchedResult"


interface Props {
    searchCodeResponse: searchCodeResponse;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setModalData: React.Dispatch<React.SetStateAction<{
        avatarUrl: string;
    } | undefined>>
}

export const SearchedResultsList: React.FC<Props> = ({ searchCodeResponse, setIsModalOpen, setModalData }) => {
    return (
        <table id="results">
            <tbody>
                <tr>
                    <th>File</th>
                    <th>Description</th>
                    <th>User</th>
                </tr>
                {searchCodeResponse.data.items.map((item, index) => {
                    return (<SearchedResult
                        key={index}
                        title={item.name}
                        description={item.repository.description}
                        url={item.html_url}
                        user={item.repository.owner.login}
                        avatarUrl={item.repository.owner.avatar_url}
                        setIsModalOpen={setIsModalOpen}
                        setModalData={setModalData} />)
                })}
            </tbody>
        </table>
    )

}

export default SearchedResultsList;