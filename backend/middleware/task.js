const { body, param,validationResult } = require("express-validator");
const Task = require("../model/task");

const taskValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
    body("completed").optional().isBoolean().withMessage("Completed must be a boolean"),
    body("dueDate").optional().isDate().withMessage("Due date must be a date"),
    body("assignedTo").isMongoId().withMessage("assignedTo must be a valid id"),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
];

// exports.validateGetOneTaskData = [
//   param('id').optional().isMongoId().withMessage("Valid task ID required"),
//   (req, res, next) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//           return res.status(400).json({ errors: errors.array() });
//       }
//       next();
//     }
// ];

const taskUpdateValidation = [
  body("title").optional().withMessage("Title is required"),
  body("description").optional().withMessage("Description is required"),
    body("completed").optional().isBoolean().withMessage("Completed must be a boolean"),
    body("dueDate").optional().isDate().withMessage("Due date must be a date"),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
];

module.exports = { taskValidation, taskUpdateValidation };