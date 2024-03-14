import { useState } from "react"

const useForm = (initialValues = {}) => {
    const [values, setValues] = useState(initialValues)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const setFieldValue = (name, value) => {
        setValues({ ...values, [name]: value })
    }

    const reset = () => {
        setValues(initialValues)
    }

    const getInputProps = (name, type) => {
        switch (type) {
            case "checkbox":
                return {
                    name,
                    checked: values[name] || false,
                    onClick: handleInputChange,
                }
            case "radio":
                return {
                    name,
                    checked: values[name] === type,
                    value: values[name] || "",
                    onChange: handleInputChange,
                }
            default:
                return {
                    name,
                    value: values[name] || "",
                    onChange: handleInputChange,
                }
        }
    }
    return { values, reset, setFieldValue, getInputProps }
}

export default useForm
