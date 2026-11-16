import { useState } from "react";

function ContactForm({ onClose, saveContact, editingContact }) {
  const [name, setName] = useState(editingContact?.name || "");
  const [lastName, setLastName] = useState(editingContact?.lastName || "");
  const [job, setJob] = useState(editingContact?.job || "");
  const [phone, setPhone] = useState(editingContact?.phone || "");
  const [email, setEmail] = useState(editingContact?.email || "");

  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const contactData = {
    name: name.trim(),
    lastName: lastName.trim(),
    job: job.trim(),
    phone: phone.trim(),
    email: email.trim(),
  };

  const validateForm = () => {
    if (!contactData.name || !contactData.lastName) {
      setError("نام و نام خانوادگی الزامی هستند");
      return false;
    }

    if (
      contactData.phone.length !== 11 ||
      !contactData.phone.startsWith("09")
    ) {
      setError("شماره موبایل باید مثل 09123456789 باشد");
      return false;
    }
    if (
      contactData.email &&
      (!contactData.email.includes("@") || !contactData.email.includes("."))
    ) {
      setError("ایمیل باید شامل @ و نقطه باشد");
      return false;
    }
    setError("");
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editingContact) {
      setShowConfirm(true);
    } else {
      saveContact(contactData);
    }
  };
  const handleConfirm = () => {
    saveContact(contactData);
    setShowConfirm(false);
  };
  return (
    <>
      <div className="form-overlay">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>{editingContact ? "ویرایش مخاطب" : "افزودن مخاطب جدید"}</h2>
          <input
            type="text"
            placeholder="نام"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="نام خانوادگی"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="شغل"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
          <input
            type="tel"
            placeholder="شماره موبایل"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="form-error">{error}</p>}
          <div className="form-buttons">
            <button type="submit" className="save-btn">
              {editingContact ? "ثبت تغییرات" : "افزودن مخاطب"}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              انصراف
            </button>
          </div>
        </form>
      </div>
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <div className="confirm-icon">?</div>
            <h3>تأیید ویرایش</h3>
            <p>می‌خوای این تغییرات اعمال بشه؟</p>
            <div className="confirm-buttons">
              <button
                type="button"
                className="confirm-delete"
                onClick={handleConfirm}
              >
                بله، اعمال کن
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
export default ContactForm;
