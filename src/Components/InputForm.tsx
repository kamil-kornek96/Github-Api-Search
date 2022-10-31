import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputFormData } from "../Interfaces/Interfaces"

interface Props {
    inputData: InputFormData;
    setInputData: React.Dispatch<React.SetStateAction<InputFormData>>;
}

export const InputForm: React.FC<Props> = ({ inputData, setInputData }) => {
    const { register, watch, reset, formState: { errors }, handleSubmit } = useForm<InputFormData>();
    const onSubmit = handleSubmit(data => {
        data.page = 1;
        data.perPage = inputData.perPage;
        setInputData(data);
    });

    useEffect(() => {
        reset({ language: inputData.language });
    }, [inputData.language, reset])

    return (
        <div className="form-container">
            <form onSubmit={onSubmit}>
                <label className="search-label" >
                    <input className="search-input" {...register("phrase", { required: true })} defaultValue={inputData.phrase} placeholder="Phrase" />
                    {errors.phrase && <span className="search-bar-alert red-fade">Searched Phrase is required</span>}
                    {!errors.user && watch("phrase") !== undefined && watch("phrase") !== "" && <span className="search-bar-alert black-fade">Phrase</span>}
                </label>
                <label className="search-label">
                    <input className="search-input" {...register("user", { required: true })} defaultValue={inputData.user} placeholder="Owner" />
                    {errors.user && <span className="search-bar-alert red-fade">User Name is required</span>}
                    {!errors.user && watch("user") !== undefined && watch("user") !== "" && <span className="search-bar-alert black-fade">Owner</span>}
                </label>
                <label className="search-label">
                    <select className="search-dropdown"
                        {...register("language")}
                        defaultValue={inputData.language}>
                        <option value="">Language (optional)</option>
                        <option value="go">Go</option>
                        <option value="javascript">JavaScript</option>
                        <option value="java">Java</option>
                    </select>
                    {watch("user") !== undefined && watch("language") !== "" && <span className="search-bar-alert black-fade">Language</span>}
                </label>
                <button className="search-button"><i className="bi bi-search"></i></button>
            </form>
        </div>
    )

}

export default InputForm;