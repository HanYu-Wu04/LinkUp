import styles from "../styles/profile.module.css";

const userData = {
  email: "dummy.email@example.com",
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "(123) 456-7890",
  zipcode: "12345",
  receiveNewsletter: true,
};

export default function UserProfile() {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.formContainer}>
        {/* Account Details */}
        <div className={`${styles.formGroup} ${styles.accountDetails}`}>
          <div className={`${styles.highlight} ${styles.accountHeader}`}>
            <h2 className={styles.containerTitle}>Account</h2>
          </div>
          <div className={styles.formFields}>
            <div>
              <div className={styles.fieldTitle}>Email Address</div>
              {userData ? userData.email : <div>Loading...</div>}
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className={`${styles.formGroup} ${styles.personalDetails}`}>
          <div className={`${styles.highlight} ${styles.personalHeader}`}>
            <h2 className={styles.containerTitle}>Personal</h2>
          </div>
          <div className={styles.formFields}>
            <div>
              <div className={styles.fieldTitle}>First Name</div>
              {userData ? userData.firstName : <div>Loading...</div>}

              <div className={styles.fieldTitle}>Last Name</div>
              {userData ? userData.lastName : <div>Loading...</div>}
            </div>
            <div>
              <div className={styles.fieldTitle}>Phone Number</div>
              {userData ? userData.phoneNumber : <div>Loading...</div>}

              <div className={styles.fieldTitle}>Zipcode</div>
              {userData ? userData.zipcode : <div>Loading...</div>}
            </div>
            <div>
              <div className={styles.fieldTitle}>Receive Newsletter</div>
              <span className={userData?.receiveNewsletter ? "yes" : "no"}>
                {userData ? userData.receiveNewsletter ? "Yes" : "No" : <div>Loading...</div>}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
