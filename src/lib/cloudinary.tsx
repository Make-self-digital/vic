import { toast } from "sonner";

export const uploadToCloudinary = async (
  file: File
): Promise<string | null> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME; // ✅ frontend-safe
  const uploadPreset = "Vaishnavi_Imaging_center"; // ? make sure ye unsigned ho Cloudinary dashboard me

  if (!cloudName) {
    console.error("Cloudinary cloud name is missing in env file.");
    toast.error("Cloudinary cloud name is missing in env file.", {
      description: "Please check and try again.",
      style: {
        background: "#ff4d4f",
        color: "#ffffff",
      },
    });
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "vic_patient_reports"); // optional
  // formData.append("folder", `vaishnavi/patients/${patientId}`);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      console.error("Upload failed:", data);
      toast.error("Upload failed", {
        description: "Please check and try again.",
        style: {
          background: "#ff4d4f",
          color: "#ffffff",
        },
      });
      return null;
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    toast.error("Cloudinary upload error", {
      description: "Please check and try again.",
      style: {
        background: "#ff4d4f",
        color: "#ffffff",
      },
    });
    return null;
  }
};
