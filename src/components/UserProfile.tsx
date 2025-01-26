"use client";

import { useState, useEffect } from "react";
import styles from "../styles/profile.module.css";
import { Camera } from "lucide-react";
import { useSession } from "next-auth/react";

export default function UserProfile() {
  const { data: sessionData, status } = useSession();
  const [profileImage, setProfileImage] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data by phone number
  useEffect(() => {
    if (status === "loading") return;
    const fetchUserData = async () => {
      const phoneNumber = sessionData?.phoneNumber || localStorage.getItem("phoneNumber");

      if (!phoneNumber) {
        setError("Phone number is not available.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user/${phoneNumber}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const data = await response.json();
        setUserData(data);
        setProfileImage(localStorage.getItem("profilePic") || data.profileImage || "");
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Unable to fetch user details.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [sessionData]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setProfileImage(imageDataUrl);
        // Save the uploaded image to local storage
        localStorage.setItem("profilePic", imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.profileContainer}>
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Profile Image */}
        <div className={styles.profileImageContainer}>
          <img
            src={
              profileImage ||
              "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt="Profile"
            className={styles.profileImage}
          />
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
          <div className={styles.leftColumn}>
            <div>
              <div className={styles.fieldTitle}>First Name</div>
              <div className={styles.fieldValue}>{userData?.firstName || "N/A"}</div>
            </div>
            <div>
              <div className={styles.fieldTitle}>Last Name</div>
              <div className={styles.fieldValue}>{userData?.lastName || "N/A"}</div>
            </div>
            <div>
              <div className={styles.fieldTitle}>Phone Number</div>
              <div className={styles.fieldValue}>{userData?.phoneNumber || "N/A"}</div>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div>
              <div className={styles.fieldTitle}>Hobbies</div>
              <div className={styles.fieldValue}>
                {userData?.hobbies?.length > 0 ? userData.hobbies.join(", ") : "No hobbies yet"}
              </div>
            </div>
            <div>
              <div className={styles.fieldTitle}>Events</div>
              <div className={styles.fieldValue}>
                {userData?.events?.length > 0 ? userData.events.join(", ") : "No events yet"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
