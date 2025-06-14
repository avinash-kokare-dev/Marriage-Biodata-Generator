import React from "react";
import styles from "../styles/preview.module.css";

export interface Field {
  id: string;
  label: string;
  type?: string;
  value: string;
  options?: string[];
}

export interface Section {
  id: string;
  title: string;
  fields: Field[];
}

interface PreviewProps {
  sections: Section[];
  photo: string | null;
}

const Preview = React.memo(({ sections, photo }: PreviewProps) => {
  return (
    <div className={styles.preview}>
      <h2 className={styles.previewTitle}>Live Biodata Preview</h2>
      {photo && (
        <div className={styles.photoPreviewWrapper}>
          <img src={photo} alt="Profile" className={styles.photoPreview} />
        </div>
      )}
      {sections.map((section) => (
        <div key={section.id} className={styles.sectionPreview}>
          <h3 className={styles.sectionTitle}>{section.title}</h3>
          <dl>
            {section.fields.map((field) => (
              <div key={field.id} className={styles.fieldPreview}>
                <dt className={styles.fieldLabel}>{field.label}:</dt>
                <dd className={styles.fieldValue}>{field.value || "-"}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
});

export default Preview;
