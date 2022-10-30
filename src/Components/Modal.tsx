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
        <div>
            {modalData && <img className="modal-photo" src={modalData.avatarUrl} alt="avatar" />}
            <div className='overlay' onClick={handleModalClose}></div>
        </div>
    )

}

export default SearchedResult;