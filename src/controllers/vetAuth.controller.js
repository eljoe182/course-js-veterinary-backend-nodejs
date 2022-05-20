import { generateJWT, generateTokenActivation } from "../helpers/security.js";
import { mailForgotPassword, mailSignUp } from "../helpers/sendMail.js";
import VetModel from "../models/vet.model.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const token = generateTokenActivation();
    const vet = await VetModel.create({
      name,
      email,
      password,
      token,
    })
      .then((vet) => {
        const { name, email, token } = vet;
        return { name, email, token };
      })
      .catch((error) => {
        throw error;
      });

    await mailSignUp(vet);

    return res.json({
      message: "Vet created successfully",
      data: vet,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const confirm = async (req, res) => {
  try {
    const { token } = req.params;

    const vet = await VetModel.findOne({ token, confirmed: false })
      .then(async (vet) => {
        if (!vet) {
          throw new Error("Token not valid");
        }

        vet.token = null;
        vet.confirmed = true;
        await vet.save();

        const { name, email, phone, confirmed } = vet;
        return { name, email, phone, confirmed };
      })
      .catch((error) => {
        throw error;
      });

    return res.json({
      message: "Vet confirmed successfully",
      data: vet,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vet = await VetModel.findOne({ email, confirmed: true });
    if (!vet) {
      const error = new Error("Email dont exist or not confirmed");
      return res.status(400).json({
        message: error.message,
      });
    }

    const isValid = await vet.comparePassword(password);
    if (!isValid) {
      const error = new Error("Password is not valid");
      return res.status(401).json({
        message: error.message,
      });
    }

    const token = generateJWT(vet);

    return res.json({
      message: "Vet logged in",
      data: {
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const vet = await VetModel.findOne({ email });
    if (!vet) {
      const error = new Error("Email dont exist");
      return res.status(400).json({
        message: error.message,
      });
    }

    const token = generateTokenActivation();
    vet.token = token;
    await vet.save();

    await mailForgotPassword(vet);

    return res.json({
      message: "Vet forgot password",
      data: {
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const validateToken = async (req, res) => {
  try {
    const { token } = req.params;

    const vet = await VetModel.findOne({ token });
    if (!vet) {
      const error = new Error("Token not valid");
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.json({
      message: "Token valid",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const vet = await VetModel.findOne({ token });
    if (!vet) {
      const error = new Error("Token not valid");
      return res.status(400).json({
        message: error.message,
      });
    }

    vet.password = password;
    vet.token = null;
    await vet.save();

    return res.json({
      message: "Vet reset password success",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { vet } = req;
    const { password, newPassword } = req.body;

    const vetModel = await VetModel.findById(vet._id);

    const isValid = await vetModel.comparePassword(password);

    if (!isValid) {
      const error = new Error("Password is not valid");
      return res.status(401).json({
        message: error.message,
      });
    }

    vetModel.password = newPassword;
    await vetModel.save();

    return res.json({
      message: "Vet change password success",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
