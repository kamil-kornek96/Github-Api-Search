import React from "react";

interface Props {
    modalData: { avatarUrl: string } | undefined;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setModalData: React.Dispatch<React.SetStateAction<{
        avatarUrl: string;
    } | undefined>>
}

export const SearchedResult: React.FC<Props> = ({ modalData, setIsModalOpen, setModalData }) => {

    function handleModalClose() {
        setIsModalOpen(false);
        setModalData(undefined);
    }


    return (
        <div className='overlay' onClick={handleModalClose}>
            <div className="modal">
                <button className="modal-close" onClick={handleModalClose}>Close</button>
                {modalData && <div><img src={modalData.avatarUrl} alt="avatar" /></div>}
            </div>
        </div>
    )

}

export default SearchedResult;