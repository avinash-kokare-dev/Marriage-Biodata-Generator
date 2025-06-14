'use client'
import React, { useState, useCallback } from "react";
import styles from "../styles/biodataForm.module.css";
import Preview from "../components/Preview";

const initialSections = [
  {
    id: "personal",
    title: "Personal Details",
    fields: [
      { id: "fullName", label: "Full Name", type: "text", value: "" },
      { id: "dob", label: "Date of Birth", type: "date", value: "" },
      { id: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"], value: "" },
      { id: "height", label: "Height (cm)", type: "text", value: "" },
      { id: "religion", label: "Religion", type: "text", value: "" },
      { id: "caste", label: "Caste", type: "text", value: "" },
    ],
  },
  {
    id: "contact",
    title: "Contact Details",
    fields: [
      { id: "phone", label: "Phone", type: "text", value: "" },
      { id: "email", label: "Email", type: "email", value: "" },
      { id: "address", label: "Address", type: "textarea", value: "" },
    ],
  },
  {
    id: "professional",
    title: "Professional Details",
    fields: [
      { id: "education", label: "Education", type: "text", value: "" },
      { id: "occupation", label: "Occupation", type: "text", value: "" },
      { id: "income", label: "Income", type: "text", value: "" },
      { id: "about", label: "About Me", type: "textarea", value: "" },
    ],
  },
];

const BiodataForm = () => {
  const [sections, setSections] = useState(initialSections);
  const [photo, setPhoto] = useState(null);

  // Handle field value or label change
  const handleFieldChange = useCallback((sectionId, fieldId, key, newValue) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;
        return {
          ...section,
          fields: section.fields.map((field) =>
            field.id === fieldId ? { ...field, [key]: newValue } : field
          ),
        };
      })
    );
  }, []);

  // Delete a field from a section
  const handleDeleteField = useCallback((sectionId, fieldId) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;
        return {
          ...section,
          fields: section.fields.filter((field) => field.id !== fieldId),
        };
      })
    );
  }, []);

  // Add new field in a section
  const handleAddField = useCallback((sectionId) => {
    const newFieldId = `new_${Date.now()}`;
    const newField = { id: newFieldId, label: "New Field", type: "text", value: "", isEditing: false };

    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;
        return { ...section, fields: [...section.fields, newField] };
      })
    );
  }, []);

  // Photo upload handler
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Remove photo
  const handleRemovePhoto = () => setPhoto(null);

  // Generate JSON preview of biodata
  const previewData = sections.reduce((acc, section) => {
    acc[section.title] = {};
    section.fields.forEach((f) => {
      acc[section.title][f.label] = f.value;
    });
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <h1 className={styles.title}>Marriage Biodata Generator</h1>

        {/* Profile photo upload */}
        <div className={styles.photoWrapper}>
          <input
            type="file"
            accept="image/*"
            id="photoUpload"
            onChange={handlePhotoChange}
            style={{ display: "none" }}
          />
          <label htmlFor="photoUpload" className={styles.photoLabel} title="Click to upload photo">
            {photo ? (
              <>
                <img src={photo} alt="Profile" className={styles.photo} />
                <button type="button" onClick={handleRemovePhoto} className={styles.removePhotoBtn}>
                  &times;
                </button>
              </>
            ) : (
              <div className={styles.photoPlaceholder}>+</div>
            )}
          </label>
        </div>

        {/* Sections and fields */}
        {sections.map((section) => (
          <div key={section.id} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>

            {section.fields.map((field) => (
              <div key={field.id} className={styles.fieldRow}>
                {/* Editable Label */}
                <div className={styles.labelWrapper}>
                  <input
                    className={styles.labelInput}
                    value={field.label}
                    onChange={(e) => handleFieldChange(section.id, field.id, "label", e.target.value)}
                    spellCheck={false}
                  />
                </div>

                {/* Input based on type */}
                {field.type === "select" ? (
                  <select
                    className={styles.inputField}
                    value={field.value}
                    onChange={(e) => handleFieldChange(section.id, field.id, "value", e.target.value)}
                  >
                    <option value="">Select</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    className={styles.textareaField}
                    value={field.value}
                    onChange={(e) => handleFieldChange(section.id, field.id, "value", e.target.value)}
                  />
                ) : (
                  <input
                    className={styles.inputField}
                    type={field.type}
                    value={field.value}
                    onChange={(e) => handleFieldChange(section.id, field.id, "value", e.target.value)}
                  />
                )}

                {/* Delete button */}
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteField(section.id, field.id)}
                  title="Remove Field"
                >
                  🗑️
                </button>
              </div>
            ))}

            {/* Add field button */}
            <button
              type="button"
              className={styles.addFieldBtn}
              onClick={() => handleAddField(section.id)}
            >
              + Add Field
            </button>
          </div>
        ))}
      </form>

      {/* Live Preview */}
      <Preview sections={sections} photo={photo} />
    </div>
  );
};

export default BiodataForm;
