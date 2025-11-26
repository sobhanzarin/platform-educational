const { default: autoBind } = require("auto-bind");
const CourseService = require("./course.routes");

class CourseController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = CourseService;
    s;
  }
  async createCourseController(req, res, next) {
    const { title, summary, image, duration, support, content, chspters } =
      req.body;
    const data = {
      title,
      summary,
      image,
      duration,
      support,
      content,
      chspters,
    };
    const result = await this.#service.createCourse(data);
    return res.jaon({
      error: null,
      data: result,
    });
  }
  async updateCourseController(req, res, next) {}
  async findAllCourseController(req, res, next) {}
  async findOneByIdCourseController(req, res, next) {}
  async deleteCourseController(req, res, next) {}
}
