import ContactUs from '../models/contactModel.js'

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ status: "error", message: "All fields are required." });
    }

    const contact = await ContactUs.create({ name, email, subject, message });

    res.status(201).json({
      status: "success",
      message: "Message submitted successfully.",
      data: contact,
    });
  } catch (error) {
    console.error("ContactUs Error:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await ContactUs.findAll({ order: [["createdAt", "DESC"]] });
    res.status(200).json({
      status: "success",
      message: "Contacts fetched successfully.",
      data: contacts,
    });
  } catch (error) {
    console.error("Fetch Contacts Error:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
