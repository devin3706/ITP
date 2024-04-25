import PdfSchema from '../../models/study material/PdfModel.js';
import PastPaperDetailsSchema from '../../models/study material/PastPaperModel.js';
import multer from 'multer';


// multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    }
  });
  
  export const upload = multer({ storage: storage });


//Study materials
export async function getFiles(req, res){
    try {
        const data = await PdfSchema.find({});
        res.json({ status: "ok", data });
      } catch(error) {
        console.error("Error fetching files:", error);
        res.status(500).json({ status: "error", message: "Error fetching files" });
      }
}

 
export async function deletePdfById(req, res){
    const { id } = req.params;
    
    try {
      const pdf = await PdfSchema.findByIdAndDelete(id);
      if (!pdf) {
        return res.status(404).json({ status: "error", message: "PDF not found" });
      }
      res.json({ status: "ok", message: "PDF deleted successfully" });
    } catch (error) {
      console.error("Error deleting PDF:", error);
      res.status(500).json({ status: "error", message: "Error deleting PDF" });
    }
}

 
export async function updateById(req, res) {
  const { id } = req.params;
  const { title, description, grade, subject } = req.body;
  let updateData = { title, description, grade, subject };

  if (req.file) {
    updateData.pdf = req.file.filename;
  }

  try {
    const pdf = await PdfSchema.findByIdAndUpdate(id, updateData, { new: true });
    if (!pdf) {
      return res.status(404).json({ status: "error", message: "Study materials not found" });
    }
    res.json({ status: "ok", message: "Study materials updated successfully", data: pdf });
  } catch (error) {
    console.error("Error updating Study materials:", error);
    res.status(500).json({ status: "error", message: "Error updating Study materials" });
  }
}


export async function uploadFile(req, res){
    console.log(req.file);
    const title = req.body.title;
    const description = req.body.description;
    const grade = req.body.grade; 
    const subject = req.body.subject; 
    const fileName = req.file.filename;
    
    try {
      await PdfSchema.create({ title, description, grade,subject, pdf: fileName });
      res.send({ status: "ok" });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ status: "error", message: "Error uploading file" });
    }
}

export async function likeCount(req, res){
    const { id } = req.params;
    try {
        const pdf = await PdfSchema.findById(id);
        console.log("pdf");
        pdf.likes += 1; // Increment likes
        await pdf.save(); // Save the updated document
        res.status(200).json({ message: 'Like added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


export async function dislikeCount(req, res){
    try {
        const pdf = await PdfSchema.findById(req.params.id);
        pdf.dislikes += 1; // Increment dislikes
        await pdf.save(); // Save the updated document
        res.status(200).json({ message: 'Dislike added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}







//pastpapers 
export async function getPastPaperFiles(req, res){
  try {
      const data = await PastPaperDetailsSchema.find({});
      res.json({ status: "ok", data });
    } catch(error) {
      console.error("Error fetching past papers:", error);
      res.status(500).json({ status: "error", message: "Error fetching past papers" });
    }
}

export async function deletePastPaperById(req, res){
  const { id } = req.params;
  
  try {
    const pastPaper = await PastPaperDetailsSchema.findByIdAndDelete(id);
    if (!pastPaper) {
      return res.status(404).json({ status: "error", message: "Past paper not found" });
    }
    res.json({ status: "ok", message: "Past paper deleted successfully" });
  } catch (error) {
    console.error("Error deleting past paper:", error);
    res.status(500).json({ status: "error", message: "Error deleting past paper" });
  }
}

export async function updatePastPaperById(req, res) {
  const { id } = req.params;
  const { year, description, grade, subject } = req.body;
  let updateData = { year, description, grade, subject };

  if (req.file) {
    updateData.pdf = req.file.filename;
  }

  try {
    const updatedPaper = await PastPaperDetailsSchema.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedPaper) {
      return res.status(404).json({ status: "error", message: "Past paper not found" });
    }
    res.json({ status: "ok", message: "Past paper updated successfully", data: updatedPaper });
  } catch (error) {
    console.error("Error updating past paper:", error);
    res.status(500).json({ status: "error", message: "Error updating past paper" });
  }
}

export async function uploadPastPaperFile(req, res){
  console.log(req.file);
  const year = req.body.year;
  const description = req.body.description;
  const grade = req.body.grade; 
  const subject = req.body.subject; 
  const fileName = req.file.filename;
  
  try {
    await PastPaperDetailsSchema.create({ year, description, grade, subject, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    console.error("Error uploading past paper:", error);
    res.status(500).json({ status: "error", message: "Error uploading past paper" });
  }
}


export async function pastPaperLikeCount(req, res){
  const { id } = req.params;
  try {
      const pastPaper = await PastPaperDetailsSchema.findById(id);
      console.log("pastPaper");
      pastPaper.likes += 1; // Increment likes
      await pastPaper.save(); // Save the updated document
      res.status(200).json({ message: 'Like added successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
}

export async function pastPaperDislikeCount(req, res){
  try {
      const pastPaper = await PastPaperDetailsSchema.findById(req.params.id);
      pastPaper.dislikes += 1; // Increment dislikes
      await pastPaper.save(); // Save the updated document
      res.status(200).json({ message: 'Dislike added successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
}

   

  export async function Success(req, res){
    res.send("Success!!");
}