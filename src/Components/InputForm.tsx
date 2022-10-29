import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { InputFormData } from "../Interfaces/Interfaces"

interface Props {
    inputData: InputFormData;
    setInputData: React.Dispatch<React.SetStateAction<InputFormData>>;
}

export const InputForm: React.FC<Props> = ({ inputData, setInputData }) => {
    const phraseLabel = useRef<any>();
    const userLabel = useRef<any>();
    const { register, formState: { errors }, handleSubmit } = useForm<InputFormData>();
    const onSubmit = handleSubmit(data => {
        data.page = 1;
        data.perPage = inputData.perPage;
        setInputData(data);
    });
    function forceAutoFocusWhenDefaultData() {
        if (inputData.phrase !== "" && inputData.user !== "") {
            phraseLabel.current && phraseLabel.current.children[1].focus()
            userLabel.current && userLabel.current.children[1].focus()
        }
    }
    forceAutoFocusWhenDefaultData();
    if (errors.phrase || errors.user) {
        localStorage.removeItem("inputData")
        localStorage.removeItem("responseData")
    }

    return (
        <div className="form-container">
            <form onSubmit={onSubmit}>
                <label ref={phraseLabel}>
                    <p>Searched Phrase</p>
                    <input {...register("phrase", { required: true })} defaultValue={inputData.phrase} autoFocus />
                    {errors.phrase && <p className="alert">Searched Phrase is required</p>}
                </label>
                <label ref={userLabel}>
                    <p>User Name</p>
                    <input {...register("user", { required: true })} defaultValue={inputData.user} />
                    {errors.user && <p className="alert">User Name is required</p>}
                </label>
                <label>
                    <p>Language</p>
                    <select
                        {...register("language")}>
                        <option selected={inputData.language === ""} value="">--All languages--</option>
                        <option selected={inputData.language === "go"} value="go">Go</option>
                        <option selected={inputData.language === "javascript"} value="javascript">JavaScript</option>
                        <option selected={inputData.language === "java"} value="java">Java</option>
                    </select>
                </label>
                <br />
                <button>Search</button>
            </form>
        </div>
    )

}

export default InputForm;