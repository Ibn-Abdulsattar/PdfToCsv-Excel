import Support from "../models/Support.js";

export const newTicket = async (req, res) => {
  const { name, email, subject, message } = req.body;

  await Support.create({ name, email, subject, message });

  return res.status(200).json({ mesage: "New ticket is created" });
};

export const allTickets = async (req, res) => {
  const allTicket = await Support.find();
  res.status(200).json({ allTicket });
};

export const totalTickets = async (req, res) => {
  const totalTickets = await Support.countDocuments();

  if (!totalTickets) {
    throw new ExpressError("Files not found", 404);
  }

  return res.status(200).json({ totalTickets });
};
