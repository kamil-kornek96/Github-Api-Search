import React, { useState, useEffect } from 'react';
import './App.css';
import { searchCodeParameters, searchCodeResponse, CreateParamaters, GetSearchCodeData } from './Services/apiService';
import InputForm from "./Components/InputForm";
import { InputFormData } from "./Interfaces/Interfaces"
import SearchedResultsList from './Components/SearchedResultsList';
import Pagination from './Components/Pagination';
import Modal from './Components/Modal';



const App: React.FC = () => {
  const [inputData, setInputData] = useState<InputFormData>(
    {
      phrase: "",
      user: "",
      language: "",
      page: 1,
      perPage: 5,
    }
  )
  const [lastPage, setLastPage] = useState<number>(0);
  const [searchCodeResponse, setSearchCodeResponse] = useState<searchCodeResponse | undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState<{ avatarUrl: string } | undefined>(undefined)
  const [responseError, setResponseError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function ApiCall() {
      if (inputData.phrase !== "" && inputData.user !== "") {
        setIsLoading(true);
        const params: searchCodeParameters = CreateParamaters(inputData)
        const response = await GetSearchCodeData(params, setResponseError)
        if (response)
          setLastPage(Math.ceil(response.data.total_count / inputData.perPage))
        setSearchCodeResponse(response);
        setIsLoading(false);
      }
    }
    ApiCall();
  }, [inputData])

  return (
    <div className="App">
      <InputForm inputData={inputData} setInputData={setInputData} />
      {!isLoading && searchCodeResponse !== undefined && searchCodeResponse.data.items.length > 0
        ? <div><SearchedResultsList searchCodeResponse={searchCodeResponse} setIsModalOpen={setIsModalOpen} setModalData={setModalData} />
          <Pagination inputData={inputData} setInputData={setInputData} lastPage={lastPage} /></div>
        : !isLoading ? <p>No results</p> : <span className="loader"></span>}
      {isModalOpen && <Modal modalData={modalData} setIsModalOpen={setIsModalOpen} setModalData={setModalData} />}
      {responseError !== "" && <p className="alert">{responseError}</p>}
    </div>
  );
}

export default App;
