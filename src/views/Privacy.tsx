import { motion } from "framer-motion";

function Privacy() {
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 300, opacity: 0 }}
      className="container">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy for Covercraft</h1>
      <p className="mb-6">Last updated: 20/12/24</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          1. Information We Collect
        </h2>
        <p className="mb-2">
          We collect the following types of information when you use Covercraft:
        </p>
        <ul className="list-disc pl-6">
          <li className="mb-2">
            <strong>Personal Information:</strong> When you create an account or
            interact with our services, we may collect personal information such
            as:
            <ul className="list-disc pl-6">
              <li className="mb-2">Name</li>
              <li className="mb-2">Email address</li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Usage Data:</strong> We collect information about how you
            interact with Covercraft, including:
            <ul className="list-disc pl-6">
              <li className="mb-2">
                Device information (e.g., device type, operating system, browser
                type)
              </li>
              <li className="mb-2">IP address</li>
              <li className="mb-2">
                Location data (if location services are enabled)
              </li>
              <li className="mb-2">
                Pages visited and actions taken within the platform
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          2. How We Use Your Information
        </h2>
        <p className="mb-2">
          We use the information we collect for the following purposes:
        </p>
        <ul className="list-disc pl-6">
          <li className="mb-2">
            <strong>To provide and improve our services:</strong> We use your
            data to deliver the features and functionality of Covercraft and to
            improve our platform over time.
          </li>
          <li className="mb-2">
            <strong>To process payments:</strong> We use your billing
            information to process any related transactions.
          </li>
          <li className="mb-2">
            <strong>To personalise your experience:</strong> We may use your
            information to tailor the platform experience to your preferences.
          </li>
          <li className="mb-2">
            <strong>To ensure compliance:</strong> We use your data to comply
            with legal obligations, enforce our terms of service, and resolve
            disputes.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          3. How We Share Your Information
        </h2>
        <p className="mb-2">
          We respect your privacy and will never share your personal information
          with third parties except in the following cases:
        </p>
        <ul className="list-disc pl-6">
          <li className="mb-2">
            <strong>Service Providers:</strong> We may share your data with
            third-party vendors who assist us in providing Covercraft services
            (e.g., payment processors, cloud storage providers). These providers
            are obligated to protect your data and use it only for the purpose
            of delivering the services we have contracted them for.
          </li>
          <li className="mb-2">
            <strong>Legal Requirements:</strong> We may disclose your
            information if required by law, in response to a subpoena, or to
            protect our legal rights.
          </li>
          <li className="mb-2">
            <strong>Business Transfers:</strong> In the event of a merger,
            acquisition, or sale of assets, your information may be transferred
            as part of the transaction.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
        <p className="mb-2">
          We implement industry-standard security measures to protect your
          personal information from unauthorized access, alteration, or
          destruction. These measures include encryption, firewalls, and secure
          data storage. However, no method of transmission over the internet or
          electronic storage is 100% secure, and we cannot guarantee the
          absolute security of your data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          5. Your Rights and Choices
        </h2>
        <p className="mb-2">
          You have the following rights regarding your personal information:
        </p>
        <ul className="list-disc pl-6">
          <li className="mb-2">
            <strong>Access:</strong> You may request access to the personal
            information we hold about you.
          </li>
          <li className="mb-2">
            <strong>Correction:</strong> If your personal information is
            inaccurate or incomplete, you can request that we correct it.
          </li>
          <li className="mb-2">
            <strong>Deletion:</strong> You can request that we delete your
            personal information, subject to certain conditions.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Data Retention</h2>
        <p className="mb-2">
          We will retain your personal information for as long as necessary to
          fulfill the purposes outlined in this Privacy Policy or as required by
          law. If you wish to delete your account, please contact us, and we
          will delete your personal data within the time required by applicable
          laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          8. Changes to This Privacy Policy
        </h2>
        <p className="mb-2">
          Covercraft reserves the right to update this Privacy Policy at any
          time. When we make changes, we will post the updated policy on this
          page and update the "Last updated" date at the top. We encourage you
          to review this Privacy Policy periodically to stay informed about how
          we protect your information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
        <p className="mb-2">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
        </p>
        <ul className="list-disc pl-6">
          <li className="mb-2">
            <strong>Email:</strong> maxxjonesyy@gmail.com
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">11. Children's Privacy</h2>
        <p className="mb-2">
          Covercraft is not intended for individuals under the age of 18. We do
          not knowingly collect personal information from children under 18. If
          you are a parent or guardian and believe that we have collected
          personal information from a child under 18, please contact us, and we
          will take steps to delete such information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">12. Third-Party Links</h2>
        <p className="mb-2">
          Covercraft may contain links to third-party websites or services. We
          are not responsible for the privacy practices of these third parties.
          We encourage you to read their privacy policies before sharing any
          personal information with them.
        </p>
      </section>

      <footer className="mt-8">
        <p className="font-semibold">
          <strong>Conclusion:</strong> At Covercraft, we are committed to
          safeguarding your privacy. We will continue to prioritize the security
          of your personal information while delivering the best possible
          experience on our platform.
        </p>
      </footer>
    </motion.div>
  );
}

export default Privacy;
