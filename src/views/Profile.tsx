import { ChangeEvent, useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { motion } from "framer-motion";
import { User } from "../types/types";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../components";
import profileSVG from "../assets/icons/profile.svg";
import saveSVG from "../assets/icons/save.svg";
import useAxiosInstance from "../hooks/useAxiosInstance";
import toast from "react-hot-toast";

function Profile() {
  const [isProfileOpen, setIsProfileOpen] = useState(true);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const profileBtn = document.getElementById("profile-btn");
    const coverLettersBtn = document.getElementById("cover-letters-btn");

    profileBtn?.classList.toggle("tab--active");
    coverLettersBtn?.classList.toggle("tab--active");
  }, [isProfileOpen]);

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 300, opacity: 0 }}
      className="container">
      <h1 className="text-3xl mb-2">Profile</h1>
      <p>
        Tokens: <b>{user?.tokenCount}</b>
      </p>
      <p>
        Cover letters created: <b>{user?.totalCoverLetters}</b>
      </p>

      <div className="flex gap-5 mt-10 border-b border-gray-200 text-sm md:text-base">
        <button
          onClick={() => setIsProfileOpen(true)}
          id="profile-btn"
          className="flex items-center gap-1 p-2 tab--active">
          <img src={profileSVG} />
          Profile
        </button>

        <button
          onClick={() => setIsProfileOpen(false)}
          id="cover-letters-btn"
          className="flex items-center gap-1 p-2">
          <img src={saveSVG} />
          Cover Letters
        </button>
      </div>

      {isProfileOpen ? (
        <ProfileTab user={user} setUser={setUser} />
      ) : (
        <CoverLettersTab />
      )}
    </motion.div>
  );
}

interface ProfileTabProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface updatedInfoProps {
  fieldToUpdate?: string;
  currentEmail?: string;
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

function ProfileTab({ user, setUser }: ProfileTabProps) {
  const axiosInstance = useAxiosInstance();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState<updatedInfoProps>({
    currentEmail: user?.email as string,
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setUpdatedInfo((prev) => ({
      ...prev,
      fieldToUpdate:
        name === "currentPassword" || name === "newPassword"
          ? "password"
          : name,
      [name]: value,
    }));
  }

  function validateField() {
    const { fieldToUpdate, name, email, currentPassword, newPassword } =
      updatedInfo;

    if (fieldToUpdate === "name") {
      if (!name) {
        toast.error("Name is required");
        return false;
      }

      if (name.length < 1 || name.length > 15) {
        toast.error("Name must be between 1 and 15 characters");
        return false;
      }
    }

    if (fieldToUpdate === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        toast.error("Email is required");
        return false;
      }

      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
        return false;
      }
    }

    if (fieldToUpdate === "password") {
      if (!currentPassword || !newPassword) {
        toast.error("All password fields are required");
        return false;
      }
    }

    return true;
  }

  const profile = useMutation({
    mutationFn: async (updatedInfo: updatedInfoProps) =>
      await axiosInstance.post("/profile", updatedInfo),
    onMutate: () => {
      toast.loading(`Updating ${updatedInfo.fieldToUpdate}...`);
    },
    onSuccess: (response) => {
      const { data } = response.data;

      if (data) {
        toast.dismiss();
        toast.success(`${updatedInfo.fieldToUpdate} updated successfully!`);

        setUser((prev) => {
          return {
            ...prev,
            ...data,
          };
        });
      }
    },
  });

  return (
    <motion.div
      transition={{ duration: 1 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="mt-10">
      <div className="flex flex-col gap-2">
        <p>
          Welcome <b>{user?.name}!</b>
        </p>
        <p>View and edit your profile information below:</p>
      </div>

      <label htmlFor="name">Name:</label>
      <div className="flex justify-between border border-secondary rounded">
        <input
          onChange={handleChange}
          type="text"
          name="name"
          minLength={1}
          maxLength={15}
          placeholder={user?.name}
          className="max-w-full border-none"
        />

        {updatedInfo.fieldToUpdate === "name" && updatedInfo.name && (
          <Button
            isBlue
            text="Update"
            onClick={() => {
              if (validateField()) {
                profile.mutate(updatedInfo);
              }
            }}
          />
        )}
      </div>

      <label htmlFor="email">Email:</label>
      <div className="flex justify-between border border-secondary rounded">
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder={user?.email}
          className="max-w-full border-none"
        />

        {updatedInfo.fieldToUpdate === "email" && updatedInfo.email && (
          <Button
            isBlue
            text="Update"
            onClick={() => {
              if (validateField()) {
                profile.mutate(updatedInfo);
              }
            }}
          />
        )}
      </div>

      <label htmlFor="currentPassword">Current Password:</label>
      <div className="flex justify-between border border-secondary rounded">
        <input
          onChange={handleChange}
          onFocus={() => setShowNewPassword(true)}
          type="password"
          name="currentPassword"
          placeholder="*************"
          className="max-w-full border-none"
        />

        {updatedInfo.fieldToUpdate === "password" &&
          updatedInfo.currentPassword && (
            <Button
              isBlue
              text="Update"
              onClick={() => {
                if (validateField()) {
                  profile.mutate(updatedInfo);
                }
              }}
            />
          )}
      </div>

      {showNewPassword && (
        <>
          <label htmlFor="newPassword">New Password:</label>
          <input
            onChange={handleChange}
            type="password"
            name="newPassword"
            placeholder="*************"
            className="max-w-full"
          />
        </>
      )}
    </motion.div>
  );
}
    </motion.div>
  );
}

export default Profile;
