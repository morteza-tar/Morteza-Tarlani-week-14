import { useState } from "react";

function ContactItem({ contact, onEdit, onDelete, selected, onSelect }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <>
      <div className="contact-item">
        <input
          type="checkbox"
          className="contact-checkbox"
          checked={selected}
          onChange={() => onSelect(contact.id)}
        />
        <div className="contact-info">
          <div className="avatar">{contact.name?.charAt(0)}</div>

          <div className="contact-details">
            <h3>
              {contact.name} {contact.lastName}
            </h3>
            <p>{contact.job}</p>
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
          </div>
        </div>
        <div className="menu-container">
          {!showMenu ? (
            <button
              type="button"
              className="menu-btn"
              onClick={() => setShowMenu(true)}
            >
              ⋮
            </button>
          ) : (
            <div className="dropdown-menu">
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  onEdit(contact);
                }}
              >
                ✏️ ویرایش
              </button>

              <button
                type="button"
                className="delete-option"
                onClick={() => {
                  setShowMenu(false);
                  setShowConfirm(true);
                }}
              >
                🗑 حذف
              </button>
            </div>
          )}
        </div>
      </div>
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <div className="confirm-icon">!</div>
            <h3>حذف مخاطب</h3>
            <p>
              آیا مطمئنی می‌خوای {contact.name} {contact.lastName} رو حذف کنی؟
            </p>
            <div className="confirm-buttons">
              <button
                type="button"
                className="confirm-delete"
                onClick={() => {
                  onDelete(contact.id);
                  setShowConfirm(false);
                }}
              >
                بله، حذف کن
              </button>
              <button
                type="button"
                className="confirm-cancel"
                onClick={() => setShowConfirm(false)}
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default ContactItem;
