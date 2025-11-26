const { body } = require("express-validator");

const createCourseValidator = [
  body("titel").notEmpty().withMessage("عنوان اجباری می باشد."),
  body("summary").notEmpty().withMessage("خلاصه دوره اجباری می باشد."),
  body("image").isURL().withMessage("آدرس تصویر باید معتبر باشد."),
  body("duration").notEmpty().withMessage("مدت دوره اجباری می باشد."),
  body("support")
    .isNumeric()
    .withMessage("پشتیبانی باید به صورت عدد وارد شود."),
  body("content").notEmpty().withMessage("توضیحات اجباری می باشد."),

  //Chapter array
  body("chapters")
    .optional()
    .isArray()
    .withMessage("chapter باید یک ارایه باشد"),

  body("chapters.*.title").notEmpty().withMessage("عنوان اجباری می باشد."),
  body("chapters.*.description")
    .notEmpty()
    .withMessage("توضیحات اجباری می باشد."),

  // episode array in chapter

  body("chapters.*.episodes.*.title")
    .notEmpty()
    .withMessage("عنوان اجباری می باشد."),

  body("chapters.*.episodes.*.type")
    .notEmpty()
    .isIn(["free", "cach"])
    .withMessage("episodes باید رایگان یا پولی باشد"),
  body("chapters.*.episodes.*.videoUrl")
    .optional()
    .isURL()
    .withMessage("ویدئو باید یک url باشد."),
];

module.exports = createCourseValidator;
