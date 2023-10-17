import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form"

export interface IFormValues {
    "First Name": string
    Age: number
}

export type InputProps = {
    label: Path<IFormValues>
    register: UseFormRegister<IFormValues>
    required: boolean
    keyRequired: string[]
    typeInput:string
}
