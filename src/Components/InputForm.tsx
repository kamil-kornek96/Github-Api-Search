import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { InputFormData } from "../Interfaces/Interfaces"

interface Props {
    inputData: InputFormData;
    setInputData: React.Dispatch<React.SetStateAction<InputFormData>>;
}

export const InputForm: React.FC<Props> = ({ inputData, setInputData }) => {
    const { register, watch, formState: { errors }, handleSubmit } = useForm<InputFormData>();
    const onSubmit = handleSubmit(data => {
        data.page = 1;
        data.perPage = inputData.perPage;
        setInputData(data);
    });

    return (
        <div className="form-container">
            <form onSubmit={onSubmit}>
                <label className="search-label" >
                    <input className="search-input" {...register("phrase", { required: true })} defaultValue={inputData.phrase} autoFocus placeholder="Phrase" />
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
                        {...register("language")}>
                        <option selected={inputData.language === ""} value="">Language (optional)</option>
                        <option selected={inputData.language === "go"} value="go">Go</option>
                        <option selected={inputData.language === "javascript"} value="javascript">JavaScript</option>
                        <option selected={inputData.language === "java"} value="java">Java</option>
                    </select>
                    {watch("user") !== undefined && watch("language") !== "" && <span className="search-bar-alert black-fade">Language</span>}
                </label>
                <button className="search-button"><i className="bi bi-search"></i></button>
            </form>
        </div>
    )

}

export default InputForm;