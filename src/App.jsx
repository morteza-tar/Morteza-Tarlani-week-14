import { useState, useRef } from "react";
import "./App.css";

import Header from "./components/Header";
import BootcampHeader from "./components/BootcampHeader";
import BootcampFooter from "./components/BootcampFooter";
import Search from "./components/SearchBar";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const messageTimer = useRef(null);

  const showMessage = (text) => {
    setMessage(text);
    clearTimeout(messageTimer.current);
    messageTimer.current = setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const saveContact = (contactData) => {
    if (editingContact) {
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === editingContact.id
            ? { ...contact, ...contactData }
            : contact,
        ),
      );

      showMessage("مخاطب با موفقیت ویرایش شد");
    } else {
      const newContact = {
        ...contactData,
        id: Date.now(),
      };

      setContacts((prev) => [...prev, newContact]);
      showMessage("مخاطب با موفقیت اضافه شد");
    }

    setShowForm(false);
    setEditingContact(null);
  };

  const editContact = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));

    setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));

    showMessage("مخاطب با موفقیت حذف شد");
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const filteredContacts = contacts.filter((contact) => {
    const searchText = search.toLowerCase();
    return (
      contact.firstName?.toLowerCase().includes(searchText) ||
      contact.lastName?.toLowerCase().includes(searchText) ||
      contact.email?.toLowerCase().includes(searchText) ||
      contact.phone?.includes(searchText)
    );
  });

  const toggleSelectAll = () => {
    const visibleIds = filteredContacts.map((contact) => contact.id);

    const allSelected = visibleIds.every((id) => selectedIds.includes(id));

    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...visibleIds])]);
    }
  };

  const confirmBulkDelete = () => {
    setContacts((prev) =>
      prev.filter((contact) => !selectedIds.includes(contact.id)),
    );

    setSelectedIds([]);
    setShowBulkConfirm(false);

    showMessage("مخاطبین با موفقیت حذف شدند");
  };
  return (
    <div className="app">
      <BootcampHeader />
      {message && (
        <div className="success-message">
          <span>✓</span>
          {message}

          <button
            type="button"
            onClick={() => {
              clearTimeout(messageTimer.current);
              setMessage("");
            }}
          >
            ×
          </button>
        </div>
      )}

      <Header count={contacts.length} />

      <Search search={search} setSearch={setSearch} />

      {selectedIds.length > 0 && (
        <div className="bulk-toolbar">
          <span>{selectedIds.length} مخاطب انتخاب شده</span>

          <button className="select-all" onClick={toggleSelectAll}>
            انتخاب همه
          </button>

          <button
            className="bulk-delete-btn"
            onClick={() => setShowBulkConfirm(true)}
          >
            حذف انتخاب‌شده‌ها
          </button>
        </div>
      )}

      <ContactList
        contacts={filteredContacts}
        onEdit={editContact}
        onDelete={deleteContact}
        selectedIds={selectedIds}
        onSelect={toggleSelect}
      />

      <button
        className="add-btn"
        onClick={() => {
          setEditingContact(null);
          setShowForm(true);
        }}
      >
        + افزودن مخاطب
      </button>

      {showForm && (
        <ContactForm
          onClose={() => {
            setShowForm(false);
            setEditingContact(null);
          }}
          saveContact={saveContact}
          editingContact={editingContact}
        />
      )}

      {showBulkConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <div className="confirm-icon">!</div>

            <h3>حذف مخاطبین</h3>

            <p>
              آیا مطمئن هستید که می‌خواهید {selectedIds.length} مخاطب انتخاب‌شده
              را حذف کنید؟
            </p>

            <div className="confirm-buttons">
              <button className="confirm-delete" onClick={confirmBulkDelete}>
                بله، حذف کن
              </button>
              <button
                className="confirm-cancel"
                onClick={() => setShowBulkConfirm(false)}
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
      <BootcampFooter />
    </div>
  );
}

export default App;
