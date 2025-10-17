import { textService } from "../services/text-services.js"

export const textController = async(req,res)=>{
    try {
        const {content} = req.body
        
        if(!content || typeof content != "string"){
            res.status(400).json({
                status:"failed",
                message:"Data tidak valid, isi prompt"
            })
        }
        const response = await textService({content})
        res.status(200).json({
            result:response.text,
            status:"success",
            message:"Gemini berhasil merespon"
        })
    } catch (e) {
       
       res.status(500).json({
        message:(e.message,"Server bermasalah silahkan coba lagi beberapa saat lagi"), 
        status:"failed",
    }) 
    }
}

