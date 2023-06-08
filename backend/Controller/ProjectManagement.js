const ProjectUser = require("../Models/ProjectUser");
const ProjectProduct = require("../Models/ProjectProduct");
const jwt = require("jsonwebtoken");

let signup = (req, res) => {
  const { Name, Email, Password, AccountNumber } = req.body;
  const ActiveStatus = true;
  console.log(Name, Email, Password, AccountNumber, ActiveStatus);
  let newProjectUser = new ProjectUser({
    Name,
    Email,
    Password,
    AccountNumber,
    ActiveStatus,
  });

  newProjectUser
    .save()
    .then((user) => {
      res
        .status(200)
        .json({ success: true, message: "User added successfully" });
      console.log("added");
    })
    .catch((err) => {
      res.status(400).send({
        success: false,
        message: "Adding new user failed",
        error: err,
      });
    });
};

let login = async (req, res) => {
  let email = req.body.Email;
  let password = req.body.Password;
  let activeStatus = req.body.ActiveStatus;

  ProjectUser.findOne({ Email: email })
    .then((user) => {
      if (user && user.Password === password) {
        if (user.ActiveStatus) {
          let token = jwt.sign(
            {
              Email: user.email,
              _id: user._id,
            },
            process.env.json_secret_token,
            { expiresIn: "1h" }
          );

          res.status(200).json({
            Success: true,
            user,
            token,
            Message: "user logged in successfully",
          });
        }
      } else {
        res.status(400).json({ Success: false, Message: "user login failed" });
      }
    })
    .catch((err) => {
      res.status(400).json({ Success: false, Message: "user login failed" });
    });
};

let uploadProject = async (req, res) => {
  let Title = req.body.ProjectTitle;
  let Description = req.body.ProjectDescription;
  let Email = req.body.Email;
  let Price = req.body.Price;
  let City = req.body.ProjectCity;
  let State = req.body.ProjectState;
  let Country = req.body.ProjectCountry;
  let file = req.file.path;
  console.log(file);
  console.log(Email);
  let ProjectProductData = {
    Title,
    Description,
    Price,
    Email,
    City,
    State,
    Country,
    file,
  };
  //console.log(ProjectProductData);
  let Product = new ProjectProduct({
    ...ProjectProductData,
  });
  Product.save()
    .then((product) => {
      res.status(201).send({ message: "Project  Saved", product });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error", err });
    });
};

const getProjects = async (req, res) => {
  try {
    const projects = await ProjectProduct.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

const getSpecificProjects = async (req, res) => {
  const email = req.body.email;

  try {
    const projects = await ProjectProduct.find({ Email: email });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

let updateProjectProduct = (req, res) => {
  let { Title, Description, Email, Price, City, State, Country } = req.body;

  let filter = { Title: Title };
  let update = {
    Description: Description,
    Email: Email,
    Price: Price,
    City: City,
    State: State,
    Country: Country,
  };

  ProjectProduct.updateOne(filter, update)
    .then((product) => {
      if (product.modifiedCount > 0) {
        res.status(200).json({
          Success: true,
          Message: "Succefully updated project product",
          product: product,
        });
      } else {
        res
          .status(400)
          .json({ Success: false, Message: "No such product exist in db" });
      }
    })
    .catch((err) => {
      res.status(400).json({
        Success: false,
        Message: "Could not update project product",
        err: err,
      });
    });
};

let deleteProjectProduct = (req, res) => {
  let Title = req.params.Title;
  console.log(Title);

  let filter = { Title: Title };

  ProjectProduct.deleteOne(filter)
    .then((result) => {
      console.log(result);
      if (result.deletedCount > 0) {
        res.status(200).json({
          Success: true,
          Message: "Successfully deleted project product",
        });
      } else {
        res.status(400).json({
          Success: false,
          Message: "No such housing scheme exists in the database",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        Success: false,
        Message: "Could not delete project product",
        error: err,
      });
    });
};

module.exports = {
  signup,
  login,
  uploadProject,
  updateProjectProduct,
  deleteProjectProduct,
  getProjects,
  getSpecificProjects,
};
