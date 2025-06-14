'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/form.module.css';

const STORAGE_KEY = 'biodataForm';

const initialFields = {
  personal: [
    { id: 'fullName', label: 'Full Name', type: 'text', value: '', isEditing: false },
    { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], value: '', isEditing: false },
    { id: 'dob', label: 'Date of Birth', type: 'date', value: '', isEditing: false },
    { id: 'height', label: 'Height (cm)', type: 'text', value: '', isEditing: false },
    { id: 'religion', label: 'Religion', type: 'text', value: '', isEditing: false },
  ],
  professional: [
    { id: 'education', label: 'Education', type: 'text', value: '', isEditing: false },
    { id: 'occupation', label: 'Occupation', type: 'text', value: '', isEditing: false },
    { id: 'income', label: 'Income', type: 'text', value: '', isEditing: false },
  ],
  contact: [
    { id: 'phone', label: 'Phone', type: 'text', value: '', isEditing: false },
    { id: 'email', label: 'Email', type: 'email', value: '', isEditing: false },
    { id: 'address', label: 'Address', type: 'textarea', value: '', isEditing: false },
  ],
};

const BiodataForm = () => {
  const [fields, setFields] = useState(initialFields);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setFields(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
  }, [fields]);

  const handleFieldChange = (group, id, value) => {
    setFields(prev => ({
      ...prev,
      [group]: prev[group].map(field =>
        field.id === id ? { ...field, value } : field
      ),
    }));
  };

  const handleLabelChange = (group, id, value) => {
    setFields(prev => ({
      ...prev,
      [group]: prev[group].map(field =>
        field.id === id ? { ...field, label: value } : field
      ),
    }));
  };

  const handleDelete = (group, id) => {
    setFields(prev => ({
      ...prev,
      [group]: prev[group].filter(field => field.id !== id),
    }));
  };

  const handleAddField = (group) => {
    const newId = `custom_${Date.now()}`;
    const newField = {
      id: newId,
      label: 'New Field',
      type: 'text',
      value: '',
      isEditing: true,
    };
    setFields(prev => ({
      ...prev,
      [group]: [...prev[group], newField],
    }));
  };

  const handleReset = () => {
    setFields(initialFields);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const output = {};
    Object.keys(fields).forEach(group => {
      fields[group].forEach(field => {
        output[field.label] = field.value;
      });
    });
    console.log('Submitted Data:', output);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const renderField = (group, field) => (
    <div key={field.id} className={styles.inlineWrapper}>
      <div className={styles.labelWrapper}>
        {field.isEditing ? (
          <input
            className={styles.editLabelInput}
            value={field.label}
            onChange={(e) => handleLabelChange(group, field.id, e.target.value)}
            onBlur={() =>
              setFields(prev => ({
                ...prev,
                [group]: prev[group].map(f =>
                  f.id === field.id ? { ...f, isEditing: false } : f
                )
              }))
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.target.blur();
            }}
          />
        ) : (
          <label
            className={styles.fixedLabel}
            onClick={() =>
              setFields(prev => ({
                ...prev,
                [group]: prev[group].map(f =>
                  f.id === field.id ? { ...f, isEditing: true } : f
                )
              }))
            }
          >
            {field.label}
          </label>
        )}
      </div>

      {field.type === 'textarea' ? (
        <textarea
          className={styles.inputField}
          value={field.value}
          onChange={(e) => handleFieldChange(group, field.id, e.target.value)}
        />
      ) : field.type === 'select' ? (
        <select
          className={styles.inputField}
          value={field.value}
          onChange={(e) => handleFieldChange(group, field.id, e.target.value)}
        >
          <option value="">Select</option>
          {field.options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          className={styles.inputField}
          type={field.type}
          value={field.value}
          onChange={(e) => handleFieldChange(group, field.id, e.target.value)}
        />
      )}

      <button
        type="button"
        className={styles.deleteIcon}
        onClick={() => handleDelete(group, field.id)}
      >
        🗑️
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.photoContainer}>
        <label htmlFor="photoUpload" className={styles.photoLabel}>
          <div className={styles.avatar}>
            {photo ? (
              <img src={photo} alt="Profile" className={styles.avatarImg} />
            ) : (
              <div className={styles.avatarPlaceholder}>📸</div>
            )}
          </div>
          <input
            type="file"
            id="photoUpload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />
        </label>

        {photo && (
          <button
            type="button"
            onClick={() => setPhoto(null)}
            className={styles.removePhotoButton}
            aria-label="Remove uploaded photo"
            title="Remove photo"
          >
            🗑️
          </button>
        )}
      </div>


      <h2 className={styles.sectionTitle}>Marriage Biodata Generator</h2>

      {Object.entries(fields).map(([group, groupFields]) => (
        <div key={group} className={styles.groupSection}>
          <h3 className={styles.groupTitle}>
            {group.charAt(0).toUpperCase() + group.slice(1)} Details
          </h3>

          {groupFields.map(field => renderField(group, field))}

          <button
            type="button"
            className={styles.addFieldButton}
            onClick={() => handleAddField(group)}
          >
            ➕ Add Field
          </button>
        </div>
      ))}

      <div className={styles.buttonRow}>
        <button type="submit" className={styles.myButton}>Generate Biodata</button>
        <button type="button" onClick={handleReset} className={styles.downloadButton}>Reset</button>
      </div>
    </form>
  );
};

export default BiodataForm;
