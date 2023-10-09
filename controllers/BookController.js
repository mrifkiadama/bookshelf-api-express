const { nanoid } = require("nanoid");
const db = require("../models");
const Book = db.books;
const { Op } = require("sequelize");

const index = async (req, res) => {
  let { name, reading, finished   } = req.query;

  if (!name) {
    name = "";
  }
  if (!reading) {
    reading = "";
  }

  if (!finished) {
    finished = "";
  }
  
  const result = await Book.findAll({
    attributes: ["id", "name", "publisher"],
    where: {
      [Op.and]: [
        {
          name: {
            [Op.like]: "%" + name + "%",
          },
        },
        {
          reading: {
            [Op.like]: "%" + reading + "%",
          },
        },
        {
          finished: {
            [Op.like]: "%" + finished + "%",
          },
        },
      ],
    }
  });

  if (result) {
    res.status(200).json({
      status: "success",
      data: {
        books: result,
      },
    });
  } else {
    return res.send({
      status: "success",
      data: {
        books: [],
      },
    });
  }
};

const show = async (req, res) => {
  let id = req.params.id;
  const result = await Book.findByPk(id);

  if (result) {
    res.status(200).send({
      status: "success",
      data: {
        book: result,
      },
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Buku tidak ditemukan",
    });
  }
};

const create = async (req, res) => {
  const bookId = nanoid(16);
  const result = {
    id: bookId,
    name: req.body.name,
    year: req.body.year,
    author: req.body.author,
    summary: req.body.summary,
    publisher: req.body.publisher,
    pageCount: req.body.pageCount,
    readPage: req.body.readPage,
    finished: req.body.pageCount === req.body.readPage ? true : false,
    reading: req.body.reading,
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // validate request
  if (!req.body.name) {
    return res.status(400).send({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
  }

  if (req.body.readPage > req.body.pageCount) {
    return res.status(400).send({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
  }

  Book.create(result)
    .then((data) => {
      res.status(201).send({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: data.id,
        },
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Server Error",
        serverMessage: error,
      });
    });
};

const update = async (req, res) => {
  let id = req.params.id;

  // validate request
  const book = await Book.findByPk(id);
  if (!book) {
    return res.status(404).send({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
  }

  if (!req.body.name) {
    return res.status(400).send({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
  }

  if (req.body.readPage > req.body.pageCount) {
    return res.status(400).send({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
  }

  const data = {
    name: req.body.name,
    year: req.body.year,
    author: req.body.author,
    summary: req.body.summary,
    publisher: req.body.publisher,
    pageCount: req.body.pageCount,
    readPage: req.body.readPage,
    finished: req.body.pageCount === req.body.readPage ? true : false,
    reading: req.body.reading,
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const result = await Book.update(data, {
    where: {
      id: id,
    },
  });

  if (result) {
    res.status(200).send({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
  }
};

const destroy = async (req, res) => {
  let id = req.params.id;
 
  const result = await Book.destroy({ where: { id: id } }); 

  if (result) {
    res.status(200).send({
      status: "success",
      message: "Buku berhasil dihapus"
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan"
    });
  }
}
module.exports = {
  index,
  create,
  show,
  update,
  destroy
};
