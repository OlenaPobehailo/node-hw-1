const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const stringId = String(contactId);
  const allContacts = await listContacts();
  const oneContact = allContacts.find((item) => item.id === stringId);
  return oneContact || null;
}

async function removeContact(contactId) {
  const stringId = String(contactId);
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === stringId);

  if (index === -1) {
    return null;
  }

  const [deletedContact] = allContacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return deletedContact;
}

async function addContact({ name, email, phone }) {
  const allContacts = await listContacts();

  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };

  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
