import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';
import axios from 'axios';

const API_URL = 'http://localhost:5000/contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', jobTitle: '' });
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(1);

  // Fetch Contacts
  const fetchContacts = async () => {
    const res = await axios.get(API_URL);
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ firstName: '', lastName: '', email: '', phone: '', company: '', jobTitle: '' });
      fetchContacts();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Handle Edit
  const handleEdit = (contact) => {
    setForm(contact);
    setEditingId(contact._id);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchContacts();
  };

  // Pagination Logic
  const itemsPerPage = 5;
  const paginatedContacts = contacts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container>
      <h1>Contact Management</h1>
      <form onSubmit={handleSubmit}>
        <TextField name="firstName" label="First Name" value={form.firstName} onChange={handleChange} required fullWidth margin="normal" />
        <TextField name="lastName" label="Last Name" value={form.lastName} onChange={handleChange} required fullWidth margin="normal" />
        <TextField name="email" label="Email" value={form.email} onChange={handleChange} required fullWidth margin="normal" />
        <TextField name="phone" label="Phone Number" value={form.phone} onChange={handleChange} required fullWidth margin="normal" />
        <TextField name="company" label="Company" value={form.company} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="jobTitle" label="Job Title" value={form.jobTitle} onChange={handleChange} fullWidth margin="normal" />
        <Button variant="contained" color="primary" type="submit">{editingId ? 'Update' : 'Add'} Contact</Button>
      </form>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedContacts.map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.jobTitle}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(contact)}>Edit</Button>
                  <Button onClick={() => handleDelete(contact._id)} color="error">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination count={Math.ceil(contacts.length / itemsPerPage)} page={page} onChange={(e, value) => setPage(value)} />
    </Container>
  );
}

export default App;
