import React from "react";

interface Props {
    title: string;
    description: string | null;
    url: string;
    user: string;
    avatarUrl: string;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setModalData: React.Dispatch<React.SetStateAction<{
        avatarUrl: string;
    } | undefined>>
}

export const SearchedResult: React.FC<Props> = ({ title, description, url, user, avatarUrl, setIsModalOpen, setModalData }) => {

    function handleModalOpen() {
        setIsModalOpen(true)
        setModalData({ avatarUrl: avatarUrl })
    }


    return (
        <>
            <tr>
                <td>{title}<a href={url} target="_blank" rel="noreferrer"><button className="button-in-cell"><i className="bi bi-file-earmark-code"></i></button></a></td>
                <td>{description}</td>
                <td>{user}<button className="button-in-cell" onClick={handleModalOpen}><i className="bi bi-person-circle"></i></button></td>
            </tr>

        </>
    )

}

export default SearchedResult;