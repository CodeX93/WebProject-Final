const router = require("express").Router();
const upload = require("../Middleware/upload");

const {
  signup,
  login,
  uploadProject,
  updateProjectProduct,
  deleteProjectProduct,
  getProjects,
  getSpecificProjects,
} = require("../Controller/ProjectManagement");

router.post("/signup", signup);
router.post("/login", login);
router.get("/get-project", getProjects);
router.post("/get-specificproject", getSpecificProjects);
router.post("/upload", upload, uploadProject);
router.put("/update/:Title", updateProjectProduct);
router.delete("/delete/:Title", deleteProjectProduct);

module.exports = router;
