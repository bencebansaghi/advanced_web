import {Request, Response, Router} from "express"
import { compile } from "morgan"
import {Offer, IOffer} from "../models/Offer"
import upload from "../middleware/multer-config"
import {Image, IImage} from "../models/Image"

const router: Router = Router()

router.post("/upload", upload.single('image'), async (req: Request, res: Response) => {
    try {        
        const offer: IOffer = new Offer({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        })
        if (req.file) {
            const image: IImage = new Image({
                filename: req.file.filename,
                path: req.file.path
            });
            await image.save();
            offer.imageId=image._id
        }
        await offer.save();

        console.log("File uploaded and saved to database");
        res.status(201).json({message: "File uploaded and saved to database"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

router.get("/offers", async (req: Request, res: Response) => {
    const offers: IOffer[] | null = await Offer.find()

    if (!offers) {
        res.status(404).json("No offers found")
        return
    }

    let offersWithImagePath: { title: string, description: string, price: number, imagePath: string | null }[] = []
    for (const offer of offers) {
        const image: IImage | null = await Image.findById(offer.imageId)
        let fullOffer = {
            title: offer.title,
            description: offer.description,
            price: offer.price,
            imagePath: image ? `/images/${image.filename}` : null
        }

        offersWithImagePath.push(fullOffer)
    }
    res.json(offersWithImagePath)
})

export default router