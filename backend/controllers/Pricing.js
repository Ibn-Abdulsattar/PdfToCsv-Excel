import Pricing from "../models/Pricing.js";
import ExpressError from "../utils/ExpressError.js";

export const newPackage = async (req, res) => {
  const { title, price, category, pages } = req.body;

  const newPlan = await Pricing.create({ title, price, category, pages });

  return res.status(201).json({
    message: "New package created successfully",
    data: newPlan,
  });
};

export const allPackages = async (req, res) => {
  const monthlyPackages = await Pricing.find({ category: "monthly" });
  const yearlyPackages = await Pricing.find({ category: "yearly" });

  return res.status(200).json({ monthlyPackages, yearlyPackages });
};

export const updatePackage = async (req, res) => {
  const { id } = req.params;
  const { title, price, category, pages } = req.body;

  const updatedPackage = await Pricing.findByIdAndUpdate(
    id,
    { $set: { title, price, category, pages } },
    { new: true, runValidators: true }
  );

  if (!updatedPackage) {
    throw new ExpressError("Package not Found", 404);
  }

  return res.status(200).json({
    message: "Your package was updated successfully",
    data: updatedPackage,
  });
};

export const deletePackage = async (req, res) => {
  const { id } = req.params;

  const deletedPackage = await Pricing.findByIdAndDelete(id);

  if (!deletedPackage) {
    throw new ExpressError("Package not found", 404);
  }

  return res.status(200).json({
    message: "Your package was deleted successfully",
    data: deletedPackage,
  });
};


export const indivPackage = async(req, res)=>{
  const {id} = req.params;

  const indivPackage = await Pricing.findById(id);

  if(!indivPackage){
    throw new ExpressError(404, 'Package not found');
  }

  return res.status(200).json({message: "Submit your payment",indivPackage})
}