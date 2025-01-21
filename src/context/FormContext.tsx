'use client'

import { createContext, ReactNode, useContext, useState } from "react"

interface FormNewOrder {
    order: number,
    material: string,
    prodAmount: number,
    throughputTotal: number,
    weightTotal: number,
    thicknessTotal:number,
    width: number
}

interface FormMainComponent{
    ptCoex: number,
    mainType: string,
    mainPortion: number,
    mainDensity: number
}
interface FormSecComponent{
    secType: string,
    secPortion: number,
    secDensity: number
}

interface FormComplete {
    formNewOrder: FormNewOrder,
    formMainComponent: FormMainComponent[],
    formSecComponent: FormSecComponent[]
}

interface FormContextProps {
    formData: FormComplete,
    setFormData: React.Dispatch<React.SetStateAction<FormComplete>>
}


const FormContext = createContext<FormContextProps | undefined>(undefined);


const initialFormData: FormComplete = {
    formNewOrder: {
        order: 0,
        material: '',
        prodAmount: 0,
        throughputTotal: 0,
        weightTotal: 0,
        thicknessTotal: 0,
        width: 0
    },
    formMainComponent: [],
    formSecComponent: []
}

export function FormProvider({ children }: {children: ReactNode}) {
    const [formData, setFormData] = useState(initialFormData);

    return (
        <FormContext.Provider value={{ formData, setFormData }} >
            {children}
        </FormContext.Provider>
    )
}

export function useFormContext() {
    const context = useContext(FormContext);
    if (! context) {
        throw new Error('useFormContext must be used within a FormProvider')
    }
    return context;
}