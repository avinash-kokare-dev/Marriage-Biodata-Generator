'use client';

import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../styles/formwithpreview.module.css';

interface Field {
  label: string;
  value: string;
  error?: string;
  type?: string;
}

const initialPersonalFields: Field[] = [
  { label: 'Name', value: 'Name' },
  { label: 'Gender', value: 'Gender' },
  // We'll remove original 'Date of Birth' and add separate date and time fields
  { label: 'Date of Birth', value: '', type: 'date' },
  { label: 'Time of Birth', value: '', type: 'time' },
  { label: 'Place of Birth', value: 'Place of Birth' },
  { label: 'Complexion', value: 'Complexion' },
  { label: 'Height', value: 'Height' },
  { label: 'Gotra/Caste', value: 'Gotra/Caste' },
  { label: 'Occupation', value: 'Occupation' },
  { label: 'Income', value: 'Income', type: 'number' },
  { label: 'Education', value: 'Education' },
];

const initialFamilyFields: Field[] = [
  { label: "Father's Name", value: "Father's Name" },
  { label: "Father's Occupation", value: "Father's Occupation" },
  { label: "Mother's Name", value: "Mother's Name" },
  { label: "Mother's Occupation", value: "Mother's Occupation" },
  { label: 'Brother(s)', value: 'Brother(s)', type: 'number' },
  { label: 'Sister(s)', value: 'Sister(s)', type: 'number' },
];

const initialContactFields: Field[] = [
  { label: 'Contact Person', value: 'Contact Person' },
  { label: 'Contact Number', value: 'Contact Number', type: 'tel' },
  { label: 'Residential Address', value: 'Residential Address' },
];

const FormWithPreview = () => {
  const [personalFields, setPersonalFields] = useState<Field[]>(initialPersonalFields);
  const [familyFields, setFamilyFields] = useState<Field[]>(initialFamilyFields);
  const [contactFields, setContactFields] = useState<Field[]>(initialContactFields);

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Helper to update field label & value
  const handleLabelChange = (
    section: 'personal' | 'family' | 'contact',
    index: number,
    newLabel: string
  ) => {
    const updater = (fields: Field[], setFields: React.Dispatch<React.SetStateAction<Field[]>>) => {
      const updated = [...fields];
      updated[index].label = newLabel;
      // If value was default label, update value also
      if (!updated[index].value || updated[index].value === fields[index].label) {
        updated[index].value = newLabel;
      }
      setFields(updated);
    };
    if (section === 'personal') updater(personalFields, setPersonalFields);
    else if (section === 'family') updater(familyFields, setFamilyFields);
    else updater(contactFields, setContactFields);
  };

  // Helper to update value
  const handleValueChange = (
    section: 'personal' | 'family' | 'contact',
    index: number,
    newValue: string
  ) => {
    const updater = (fields: Field[], setFields: React.Dispatch<React.SetStateAction<Field[]>>) => {
      const updated = [...fields];
      updated[index].value = newValue;
      setFields(updated);
    };
    if (section === 'personal') updater(personalFields, setPersonalFields);
    else if (section === 'family') updater(familyFields, setFamilyFields);
    else updater(contactFields, setContactFields);
  };

  // Photo handlers remain unchanged
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handlePhotoRemove = () => {
    setPhoto(null);
    setPhotoPreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      PersonalDetails: personalFields.reduce((acc, f) => ({ ...acc, [f.label]: f.value }), {}),
      FamilyDetails: familyFields.reduce((acc, f) => ({ ...acc, [f.label]: f.value }), {}),
      ContactDetails: contactFields.reduce((acc, f) => ({ ...acc, [f.label]: f.value }), {}),
      PhotoFilename: photo?.name || '',
    };
    alert(JSON.stringify(data, null, 2));
  };

  // Render fields function with custom logic for date and time types
  const renderFields = (fields: Field[], section: 'personal' | 'family' | 'contact') =>
    fields.map((field, i) => {
      if (field.type === 'date') {
        // Date picker with year dropdown, no time
        return (
          <div className={styles.fieldRow} key={`${section}-${i}`}>
            <input
              type="text"
              className={styles.labelInput}
              value={field.label}
              onChange={e => handleLabelChange(section, i, e.target.value)}
              aria-label={`Edit label for ${field.label}`}
            />
            <input
              type="date"
              className={styles.valueInput}
              value={field.value}
              onChange={e => handleValueChange(section, i, e.target.value)}
              aria-label={`Edit label for ${field.label}`}
            />
            
          </div>
        );
      } else if (field.type === 'time') {
        // Time picker with seconds only (hours, minutes, seconds)
        // We'll store value as "HH:mm:ss"
        return (
          <div className={styles.fieldRow} key={`${section}-${i}`}>
            <input
              type="text"
              className={styles.labelInput}
              value={field.label}
              onChange={e => handleLabelChange(section, i, e.target.value)}
              aria-label={`Edit label for ${field.label}`}
            />
            <DatePicker
              selected={
                field.value
                  ? new Date(`1970-01-01T${field.value}`) // Dummy date, only time matters
                  : null
              }
              onChange={date => {
                if (date) {
                  const hours = date.getHours().toString().padStart(2, '0');
                  const minutes = date.getMinutes().toString().padStart(2, '0');
                  const seconds = date.getSeconds().toString().padStart(2, '0');
                  const timeStr = `${hours}:${minutes}:${seconds}`;
                  handleValueChange(section, i, timeStr);
                } else {
                  handleValueChange(section, i, '');
                }
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={1} // 1 min intervals, seconds selectable with keyboard
              timeCaption="Time"
              dateFormat="HH:mm:ss"
              placeholderText={`Select ${field.label}`}
              className={styles.valueInput}
              wrapperClassName={styles.datePickerWrapper}
              isClearable
            />
          </div>
        );
      }
      // Default text/number input
      return (
        <div className={styles.fieldRow} key={`${section}-${i}`}>
          <input
            type="text"
            className={styles.labelInput}
            value={field.label}
            onChange={e => handleLabelChange(section, i, e.target.value)}
            aria-label={`Edit label for ${field.label}`}
          />
          <input
            type={field.type || 'text'}
            className={styles.valueInput}
            value={field.value}
            onChange={e => handleValueChange(section, i, e.target.value)}
            placeholder={`Enter ${field.label}`}
            aria-label={`Input value for ${field.label}`}
          />
        </div>
      );
    });

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Photo Upload</h2>
          <div
            className={styles.photoUpload}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault();
              const droppedFile = e.dataTransfer.files[0];
              if (droppedFile) {
                setPhoto(droppedFile);
                setPhotoPreview(URL.createObjectURL(droppedFile));
              }
            }}
          >
            {photoPreview ? (
              <>
                <img src={photoPreview} alt="Uploaded preview" className={styles.photoPreview} />
                <button type="button" onClick={handlePhotoRemove} className={styles.removePhotoBtn}>
                  Remove
                </button>
              </>
            ) : (
              <p>Click or Drag & Drop to upload your photo</p>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              hidden
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Personal Details</h2>
          {renderFields(personalFields, 'personal')}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Family Details</h2>
          {renderFields(familyFields, 'family')}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Details</h2>
          {renderFields(contactFields, 'contact')}
        </section>

        <button type="submit" className={styles.submitBtn}>Submit</button>
      </form>

      <aside className={styles.preview}>
        <h3 className={styles.previewTitle}>Preview</h3>
        <div className={styles.previewContent}>
          {photoPreview && (
            <div className={styles.photoPreviewContainer}>
              <h4>Uploaded Photo</h4>
              <img src={photoPreview} alt="Preview" className={styles.previewPhoto} />
            </div>
          )}

          <h4>Personal Details</h4>
          <ul>
            {personalFields.map((f, i) => (
              <li key={i} className={styles.previewItem}>
                <span className={styles.previewLabel}>{f.label}&nbsp;:</span>
                <span className={styles.previewValue}>{f.value || '-'}</span>
              </li>
            ))}
          </ul>

          <h4>Family Details</h4>
          <ul>
            {familyFields.map((f, i) => (
              <li key={i} className={styles.previewItem}>
                <span className={styles.previewLabel}>{f.label}&nbsp;:</span>
                <span className={styles.previewValue}>{f.value || '-'}</span>
              </li>
            ))}
          </ul>

          <h4>Contact Details</h4>
          <ul>
            {contactFields.map((f, i) => (
              <li key={i} className={styles.previewItem}>
                <span className={styles.previewLabel}>{f.label}&nbsp;:</span>
                <span className={styles.previewValue}>{f.value || '-'}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default FormWithPreview;
