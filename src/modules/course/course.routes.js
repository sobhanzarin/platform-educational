const router = require("express").Router();
const validation = require("../../common/middlewares/validator.middleware");
const createCourseValidator = require("../../common/validation/course.validation");
const CourseController = require("./course.controller");

router.post(
  "/",
  createCourseValidator,
  validation,
  CourseController.createCourseHandel
);
router.get("/", CourseController.findAllCourseHandel);
router.get("/:id", CourseController.findOneByIdCourseHandel);
router.delete("/:id", CourseController.deleteCourseHandel);

module.exports = {
  courseRotes: router,
};
