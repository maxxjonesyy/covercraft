import { ChangeEvent, useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { motion } from "framer-motion";
import { User } from "../types/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "../components";
import { Loader } from "../components";
import profileSVG from "../assets/icons/profile.svg";
import saveSVG from "../assets/icons/save.svg";
import useAxiosInstance from "../hooks/useAxiosInstance";
import toast from "react-hot-toast";
import createReadableDate from "../utils/createReadableDate";

function Profile() {
  const axiosInstance = useAxiosInstance();
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
        <ProfileTab
          user={user}
          setUser={setUser}
          axiosInstance={axiosInstance}
        />
      ) : (
        <CoverLettersTab user={user} axiosInstance={axiosInstance} />
      )}
    </motion.div>
  );
}

interface ProfileTabProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  axiosInstance: ReturnType<typeof useAxiosInstance>;
}

interface updatedInfoProps {
  fieldToUpdate?: string;
  currentEmail?: string;
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

function ProfileTab({ user, setUser, axiosInstance }: ProfileTabProps) {
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

interface CoverLettersTabProps {
  user: User | null;
  axiosInstance: ReturnType<typeof useAxiosInstance>;
}

function CoverLettersTab({ user, axiosInstance }: CoverLettersTabProps) {
  const getCoverLetters = useQuery({
    queryKey: ["coverLetters"],
    queryFn: async () => {
      const response = await axiosInstance.get("/savedCoverLetters", {
        params: { email: user?.email },
      });

      return response.data;
    },
  });

  const deleteCoverLetter = useMutation({
    mutationFn: async (id: string) =>
      await axiosInstance.delete(`/savedCoverLetters/${id}`, {
        params: { email: user?.email },
      }),

    onSuccess: () => {
      toast.success("Cover letter removed");
      getCoverLetters.refetch();
    },
  });

  return (
    <motion.div
      transition={{ duration: 1 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="mt-10">
      {getCoverLetters.isLoading && (
        <div className="flex justify-center mt-20">
          <Loader size={28} colour="black" />
        </div>
      )}

      {!getCoverLetters.isLoading && getCoverLetters.data?.length === 0 && (
        <h1>No saved cover letters</h1>
      )}

      <section className="w-full">
        {getCoverLetters.data &&
          getCoverLetters?.data.map((item: any) => {
            const convertedDate = createReadableDate(item.createdAt);
            const convertedText = item.coverLetter.split("\n").join("<br/>");

            return (
              <div
                key={item._id}
                className="mt-3 p-3 border border-accentBlue/20 rounded shadow-sm transition-colors duration-300 hover:bg-accentBlue/10">
                <div className="flex justify-between">
                  <p className="text-xs mb-3">{convertedDate}</p>

                  <button
                    onClick={() => deleteCoverLetter.mutate(item._id)}
                    className="p-1.5 bg-red-100 border border-red-300 text-xs rounded">
                    Delete
                  </button>
                </div>

                <div className="inline-flex flex-wrap items-center gap-2">
                  <p className="font-bold text-accentBlue">{item.company},</p>
                  <p className="text-sm">{item.title}</p>
                </div>

                {/* <span dangerouslySetInnerHTML={{ __html: convertedText }} /> */}
              </div>
            );
          })}
      </section>
    </motion.div>
  );
}

export default Profile;
