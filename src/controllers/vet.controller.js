import VetModel from "../models/vet.model.js";

export const index = async (req, res) => {
  const { vet } = req;
  res.json({
    message: "Vet information",
    data: vet,
  });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const vet = await VetModel.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      name,
      email,
      phone,
    },
    {
      new: true,
    }
  ).then((vet) => {
    const { _id, name, email, phone } = vet;
    return { _id, name, email, phone };
  });

  if (!vet) {
    return res.status(404).json({
      message: "Vet not found",
      data: null,
    });
  }

  res.json({
    message: "Vet updated successfully",
    data: vet,
  });
};
