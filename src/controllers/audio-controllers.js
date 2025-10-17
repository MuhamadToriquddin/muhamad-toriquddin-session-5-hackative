import { audioService } from "../services/audio-services.js"

export const audioController = async(req,res)=>{
    try {
        const {content} = req.body
        const audio = req.file.buffer.toString("base64")
        if (!content || typeof content != "string" || !audio){
            res.status(400).json({status:"failed",message:"Data tidak valid, isi prompt dan audio"})
        }
        const mimeType = req.file.mimetype
        const response = await audioService({content,audio,mimeType})
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