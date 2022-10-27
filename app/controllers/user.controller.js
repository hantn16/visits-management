const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
const create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: 'Name can not be empty!',
    });
    return;
  }

  // Create a User
  const user = {
    email: req.body.email,
    name: req.body.name,
    description: req.body.description,
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};

// Retrieve all Users from the database.
const findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      });
    });
};

// Find a single User with an id
const findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving User with id=' + id,
      });
    });
};

// Update a User by the id in the request
const update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'User was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating User with id=' + id,
      });
    });
};

// Delete a User with the specified id in the request
const deleteOne = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'User was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete User with id=' + id,
      });
    });
};

// Delete all Users from the database.
const deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all users.',
      });
    });
};

// find all published User
const findAllPublished = (req, res) => {
  User.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      });
    });
};
const getTestUsers = (req, res) => {
  res.send('TEst');
};
module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
  deleteAll,
  findAllPublished,
  getTestUsers,
};
