import { docService } from "../services/doc-services.js"

export const docController = async(req,res)=>{
    try {
        const {content} = req.body
        const doc = req.file.buffer.toString("base64")
        if (!content || typeof content != "string" || !doc){
            res.status(400).json({status:"failed",message:"Data tidak valid, isi prompt dan dokumen"})
        }
        const mimeType = req.file.mimetype
        const response = await docService({content,doc,mimeType})
        res.status(200).json({
            result:response.text,
            status:"success",
            message:"Gemini berhasil merespon"
        })
    } catch (e) {
       console.log(e)
       res.status(500).json({
        message:(e.message,"Server bermasalah silahkan coba lagi beberapa saat lagi"), 
        status:"failed",
    }) 
    }
}