const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/contactsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error("Failed to connect to MongoDB:", error));
db.once("open", () => console.log("Successfully connected to MongoDB"));

// Contact Schema and Model
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  company: { type: String, default: "" },
  jobTitle: { type: String, default: "" },
});

const Contact = mongoose.model("Contact", contactSchema);

// API Endpoints

// POST request to create a new contact
app.post("/contacts", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET request to fetch all contacts
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT request to update a contact by ID
app.put("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ message: "Contact updated successfully", updatedContact });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE request to remove a contact by ID
app.delete("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully", id });
  } catch (err) {
    res.status(500).json({ error: "Error deleting contact" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
