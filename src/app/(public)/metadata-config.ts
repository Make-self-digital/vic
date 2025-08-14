// app/metadata-config.ts
export const metadataConfig: Record<
  string,
  { title: string; description: string }
> = {
  "/": {
    title: "Vaishnavi Imaging Center - Home",
    description:
      "Trusted ultrasound diagnostic center in Daudnagar, Aurangabad, Bihar.",
  },
  "/about": {
    title: "About - Vaishnavi Imaging Center",
    description: "Learn more about our services and expert radiologists.",
  },
  "/services": {
    title: "Services - Vaishnavi Imaging Center",
    description:
      "Pregnancy, abdominal, and general ultrasound scans with advanced technology.",
  },
  "/contact": {
    title: "Contact - Vaishnavi Imaging Center",
    description: "Get in touch with vic for more details.",
  },
  "/appointments": {
    title: "Appointment - Vaishnavi Imaging Center",
    description:
      "Book your appointments and track your reports, and patient records.",
  },
};
