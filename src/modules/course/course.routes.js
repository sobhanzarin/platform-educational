const router = require("express").Router();
const validation = require("../../common/middlewares/validator.middleware");
const createCourseValidator = require("../../common/validation/course.validation");
const validation = require("../../common/validation/course.validation");
const { createCourseController } = require("./course.controller");

router.post("/", createCourseValidator, validation, createCourseController);

module.exports = {
  courseRotes: router,
};
