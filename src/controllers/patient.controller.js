import PatientModel from "../models/patient.model.js";

export const index = async (req, res) => {
  const { _id: veterinary } = req.vet;
  const patient = await PatientModel.find({
    veterinary,
  }).lean();
  return res.status(200).json({
    message: "",
    resources: null,
    data: patient,
  });
};

export const show = async (req, res) => {
  const { id } = req.params;
  const { _id: veterinary } = req.vet;

  const patient = await PatientModel.findOne({
    _id: id,
    veterinary,
  }).lean();

  if (!patient) {
    return res.status(404).json({
      message: "Patient not found",
      data: null,
    });
  }

  return res.status(200).json({
    message: "",
    resources: null,
    data: patient,
  });
};

export const store = async (req, res) => {
  const { name, owner, email, dateOut, symptoms } = req.body;
  const { _id: veterinary } = req.vet;
  const patient = await PatientModel.create({
    name,
    owner,
    email,
    dateOut,
    symptoms,
    veterinary,
  });
  return res.status(200).json({
    message: "Patient created successfully",
    resources: null,
    data: patient,
  });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { name, owner, email, symptoms } = req.body;
  const { _id: veterinary } = req.vet;

  const patient = await PatientModel.findOneAndUpdate(
    {
      _id: id,
      veterinary,
    },
    {
      name,
      owner,
      email,
      symptoms,
    },
    {
      new: true,
    }
  ).lean();

  return res.status(200).json({
    message: "Patient updated successfully",
    resources: null,
    data: patient,
  });
};

export const destroy = async (req, res) => {
  const { id } = req.params;
  const { _id: veterinary } = req.vet;

  const patient = await PatientModel.findOneAndDelete({
    _id: id,
    veterinary,
  });

  if (!patient) {
    return res.status(404).json({
      message: "Patient not found or will be deleted",
      data: null,
    });
  }

  return res.status(200).json({
    message: "Patient deleted successfully",
    resources: null,
    data: patient,
  });
};
