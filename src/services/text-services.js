import {ai} from "../config/ai.js"

export const textService = async({content})=>{
    
    const response = await ai.models.generateContent({
        model:process.env.GEMINI_MODEL,
        contents:[content],
        
    })
    
    return response
}

