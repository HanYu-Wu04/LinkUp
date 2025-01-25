"use client";

import { useState } from "react";
import styles from "../styles/profile.module.css";
import { Camera, User, Home, MessageSquare, Moon } from "lucide-react";
import { useSession } from "next-auth/react";

const userData = {
  email: "dummy.email@example.com",
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "(123) 456-7890",
  profileImage:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

export default function UserProfile() {
  const { status, data, update } = useSession();
  const [profileImage, setProfileImage] = useState(userData.profileImage);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.formContainer}>
        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Profile Image */}
          <div className={styles.profileImageContainer}>
            <img src={profileImage || "/placeholder.svg"} alt="Profile" className={styles.profileImage} />
            <label htmlFor="imageUpload" className={styles.uploadButton}>
              <Camera size={16} />
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
          <div className={styles.highlight}>
            <h2 className={styles.containerTitle}>Profile Details</h2>
          </div>
          <div className={styles.formFields}>
            <div>
              <div className={styles.fieldTitle}>First Name</div>
              <div className={styles.fieldValue}>{localStorage.getItem("firstName")}</div>
            </div>
            <div>
              <div className={styles.fieldTitle}>Last Name</div>
              <div className={styles.fieldValue}>{localStorage.getItem("lastName")}</div>
            </div>
            <div>
              <div className={styles.fieldTitle}>Phone Number</div>
              <div className={styles.fieldValue}>{data?.phoneNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
