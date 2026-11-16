
import ContactItem from "./ContactItem";
function ContactList({
  contacts,
  onEdit,
  onDelete,
  selectedIds,
  onSelect,
}) {
  if (contacts.length === 0) {
    return (
      <p className="empty-message">
        مخاطبی برای نمایش وجود ندارد.
      </p>
    );
  }
  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
          selected={selectedIds.includes(contact.id)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
export default ContactList;
