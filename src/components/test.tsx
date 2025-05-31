'use client'
import React, { useState, useRef } from 'react';
import styles from '../styles/test.module.css';

export default function MarriageBiodataForm() {
  const [biodata, setBiodata] = useState({
    photo: null as File | null,
    personal: {
      name: '',
      gender: '',
      dob: '',
      tob: '',
      pob: '',
      complexion: '',
      height: '',
      gotra: '',
      occupation: '',
      income: '',
      education: '',
    },
    family: {
      fatherName: '',
      fatherOccupation: '',
      motherName: '',
      motherOccupation: '',
      brothers: '',
      sisters: '',
    },
    contact: {
      contactPerson: '',
      contactNumber: '',
      address: '',
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const onPhotoSelect = (file: File | null) => {
    setBiodata(prev => ({ ...prev, photo: file }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onPhotoSelect(e.target.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onPhotoSelect(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (
    section: 'personal' | 'family' | 'contact',
    field: string,
    value: string
  ) => {
    setBiodata(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleRemoveField = (section: 'personal' | 'family' | 'contact', field: string) => {
    handleInputChange(section, field, '');
  };

  return (
    <div className={styles.container}>
      <h2>Marriage Biodata Form</h2>

      {/* Photo upload */}
      <div
        className={`${styles.photoContainer} ${dragOver ? styles.dragOver : ''}`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        title="Click or Drag & Drop to upload photo"
      >
        {biodata.photo ? (
          <img
            src={URL.createObjectURL(biodata.photo)}
            alt="Uploaded"
            className={styles.photo}
          />
        ) : (
          <div className={styles.photoPlaceholder}>
            <p>Click or Drag & Drop</p>
            <p>to upload photo</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className={styles.fileInput}
        />
      </div>

      {/* Personal Details */}
      <section>
        <h3>Personal Details</h3>
        {Object.entries(biodata.personal).map(([field, value]) => (
          <div className={styles.row} key={field}>
            <label
              contentEditable
              suppressContentEditableWarning
              className={styles.label}
              onBlur={e => handleInputChange('personal', field, e.currentTarget.textContent || '')}
            >
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type="text"
              className={styles.input}
              value={value}
              onChange={e => handleInputChange('personal', field, e.target.value)}
            />
            <button
              className={styles.removeBtn}
              onClick={() => handleRemoveField('personal', field)}
              title="Remove field value"
              type="button"
            >
              &times;
            </button>
          </div>
        ))}
      </section>

      {/* Family Details */}
      <section>
        <h3>Family Details</h3>
        {Object.entries(biodata.family).map(([field, value]) => (
          <div className={styles.row} key={field}>
            <label
              contentEditable
              suppressContentEditableWarning
              className={styles.label}
              onBlur={e => handleInputChange('family', field, e.currentTarget.textContent || '')}
            >
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type="text"
              className={styles.input}
              value={value}
              onChange={e => handleInputChange('family', field, e.target.value)}
            />
            <button
              className={styles.removeBtn}
              onClick={() => handleRemoveField('family', field)}
              title="Remove field value"
              type="button"
            >
              &times;
            </button>
          </div>
        ))}
      </section>

      {/* Contact Details */}
      <section>
        <h3>Contact Details</h3>
        {Object.entries(biodata.contact).map(([field, value]) => (
          <div className={styles.row} key={field}>
            <label
              contentEditable
              suppressContentEditableWarning
              className={styles.label}
              onBlur={e => handleInputChange('contact', field, e.currentTarget.textContent || '')}
            >
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            {field === 'address' ? (
              <textarea
                className={styles.textarea}
                value={value}
                onChange={e => handleInputChange('contact', field, e.target.value)}
              />
            ) : (
              <input
                type="text"
                className={styles.input}
                value={value}
                onChange={e => handleInputChange('contact', field, e.target.value)}
              />
            )}
            <button
              className={styles.removeBtn}
              onClick={() => handleRemoveField('contact', field)}
              title="Remove field value"
              type="button"
            >
              &times;
            </button>
          </div>
        ))}
      </section>

      <button className={styles.submitButton} type="submit">
        Submit Biodata
      </button>

      {/* Live Preview Section */}
      <section style={{ marginTop: '50px' }}>
        <h3>Live Preview</h3>
        <div>
          {biodata.photo && (
            <img
              src={URL.createObjectURL(biodata.photo)}
              alt="Preview"
              style={{ width: '150px', borderRadius: '50%', marginBottom: '20px' }}
            />
          )}
          <div>
            <h4>Personal Details</h4>
            <ul>
              {Object.entries(biodata.personal).map(([key, val]) => (
                <li key={key}><strong>{key}:</strong> {val || '-'}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Family Details</h4>
            <ul>
              {Object.entries(biodata.family).map(([key, val]) => (
                <li key={key}><strong>{key}:</strong> {val || '-'}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact Details</h4>
            <ul>
              {Object.entries(biodata.contact).map(([key, val]) => (
                <li key={key}><strong>{key}:</strong> {val || '-'}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
