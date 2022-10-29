import React from "react";
import { useForm } from "react-hook-form";
import { InputFormData } from "../Interfaces/Interfaces"

interface Props {
    inputData: InputFormData;
    setInputData: React.Dispatch<React.SetStateAction<InputFormData>>;
}

export const InputForm: React.FC<Props> = ({ inputData, setInputData }) => {
    const { register, formState: { errors }, handleSubmit } = useForm<InputFormData>();
    const onSubmit = handleSubmit(data => {
        data.page = 1;
        data.perPage = inputData.perPage;
        setInputData(data);
    });

    return (
        <form onSubmit={onSubmit}>
            <label>
                <p>Phrase</p>
                <input {...register("phrase", { required: true })} />
                {errors.phrase?.type === 'required' && <p className="alert">Phrase is required</p>}
            </label>
            <label>
                <p>User name</p>
                <input {...register("user", { required: true })} />
                {errors.user?.type === 'required' && <p className="alert">User name is required</p>}
            </label>
            <label>
                <p>Language</p>
                <select
                    {...register("language")}>
                    <option value="">--Choose Language--</option>
                    <option value="go">Go</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                </select>
            </label>
            <br />
            <button>Search</button>
        </form>
    )

}

export default InputForm;