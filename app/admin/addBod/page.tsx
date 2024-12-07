"use client";

import React, { useState, useEffect } from "react";
import { addBod, getBods, updateBod } from "@/app/_lib/data-service";

const BodsPage = () => {
  const [bods, setBods] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formType, setFormType] = useState<"add" | "edit">("add");
  const [selectedBod, setSelectedBod] = useState(null);
  const [bodData, setBodData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNo: "",
    branch: "",
    USN: "",
    clubId: 0,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBods();
  }, []);

  const fetchBods = async () => {
    try {
      const data = await getBods();
      setBods(data);
    } catch (error) {
      console.error("Error fetching BODs:", error);
    }
  };

  const handleOpenForm = (type: "add" | "edit", bod = null) => {
    setFormType(type);
    setSelectedBod(bod);
    setFormVisible(true);
    if (bod) {
      setBodData({ ...bod });
    } else {
      setBodData({
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNo: "",
        branch: "",
        USN: "",
        clubId: 0,
      });
    }
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setMessage("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBodData({ ...bodData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (formType === "add") {
        await addBod(bodData);
        setMessage("BOD added successfully!");
      } else if (formType === "edit") {
        await updateBod(bodData.id, bodData);
        setMessage("BOD updated successfully!");
      }
      await fetchBods();
      handleCloseForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Failed to process the request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
   
      <div className="max-w-7xl mx-auto pt-8 px-4 pb-6">
        <h1 className="text-3xl text-center font-bold mb-4 text-black">BOD Management</h1>

        <button
          className="mb-4 px-4 py-2 bg-gradient-to-t from-blue-700 to-cyan-500 text-white rounded-lg"
          onClick={() => handleOpenForm("add")}
        >
          Add New BOD
        </button>

        {message && <p className="text-center my-4">{message}</p>}

        <table className="text-black w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Password</th>
              <th className="border border-gray-300 px-4 py-2">Phone No</th>
              <th className="border border-gray-300 px-4 py-2">Branch</th>
              <th className="border border-gray-300 px-4 py-2">USN</th>
              <th className="border border-gray-300 px-4 py-2">Club ID</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bods.map((bod) => (
              <tr key={bod.id}>
                <td className="border border-gray-300 px-4 py-2">{bod.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {bod.firstName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {bod.lastName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {bod.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {bod.password}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {bod.phoneNo}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {bod.branch}
                </td>
                <td className="border border-gray-300 px-4 py-2">{bod.USN}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {bod.clubId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="mr-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    onClick={() => handleOpenForm("edit", bod)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {formVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-120">
              <h2 className="text-xl font-bold mb-4">
                {formType === "add" ? "Add New BOD" : "Edit BOD"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="id"
                    value={bodData.id}
                    onChange={handleChange}
                    placeholder="BOD ID"
                    required
                    disabled={formType === "edit"}
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    name="firstName"
                    value={bodData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={bodData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="email"
                    name="email"
                    value={bodData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="password"
                    name="password"
                    value={bodData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    name="phoneNo"
                    value={bodData.phoneNo}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    name="branch"
                    value={bodData.branch}
                    onChange={handleChange}
                    placeholder="Branch"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    name="USN"
                    value={bodData.USN}
                    onChange={handleChange}
                    placeholder="USN"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="number"
                    name="clubId"
                    value={bodData.clubId}
                    onChange={handleChange}
                    placeholder="Club ID"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded"
                  disabled={loading}
                >
                  {loading
                    ? "Submitting..."
                    : formType === "add"
                    ? "Add BOD"
                    : "Update BOD"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="mt-2 w-full px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    
  );
};

export default BodsPage;

// "use client";

// import React, { useState, useEffect } from "react";
// import { addBod, getBods, updateBod } from "@/app/_lib/data-service";
// import { z } from "zod";

// // Define the schema for validation using Zod
// const bodSchema = z.object({
//   id: z.number().optional(), // ID is optional for "add" operations
//   firstName: z.string().min(1, "First Name is required"),
//   lastName: z.string().min(1, "Last Name is required"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   phoneNo: z
//     .string()
//     .regex(/^\d{10}$/, "Phone Number must be a 10-digit number"),
//   branch: z.string().min(1, "Branch is required"),
//   USN: z
//     .string()
//     .regex(/^[A-Z0-9]{10}$/, "USN must be 10 alphanumeric characters"),
//   clubId: z.number().min(1, "Club ID must be a positive number"),
// });

// const BodsPage: React.FC = () => {
//   const [bods, setBods] = useState<any[]>([]);
//   const [formVisible, setFormVisible] = useState(false);
//   const [formType, setFormType] = useState<"add" | "edit">("add");
//   const [selectedBod, setSelectedBod] = useState<any | null>(null);
//   const [bodData, setBodData] = useState({
//     id: undefined,
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     phoneNo: "",
//     branch: "",
//     USN: "",
//     clubId: 0,
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetchBods();
//   }, []);

//   const fetchBods = async () => {
//     try {
//       const data = await getBods();
//       setBods(data);
//     } catch (error) {
//       console.error("Error fetching BODs:", error);
//       setMessage("Failed to fetch BODs.");
//     }
//   };

//   const handleOpenForm = (type: "add" | "edit", bod: any = null) => {
//     setFormType(type);
//     setSelectedBod(bod);
//     setFormVisible(true);

//     if (bod) {
//       setBodData({ ...bod });
//     } else {
//       setBodData({
//         id: undefined,
//         firstName: "",
//         lastName: "",
//         email: "",
//         password: "",
//         phoneNo: "",
//         branch: "",
//         USN: "",
//         clubId: 0,
//       });
//     }
//   };

//   const handleCloseForm = () => {
//     setFormVisible(false);
//     setMessage("");
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setBodData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       bodSchema.parse(bodData);

//       if (formType === "add") {
//         await addBod(bodData);
//         setMessage("BOD added successfully!");
//       } else if (formType === "edit" && bodData.id) {
//         await updateBod(bodData.id, bodData);
//         setMessage("BOD updated successfully!");
//       }

//       await fetchBods();
//       handleCloseForm();
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         setMessage(error.errors.map((err) => err.message).join(", "));
//       } else {
//         console.error("Error submitting form:", error);
//         setMessage("Failed to process the request. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto pt-8 px-4 pb-6">
//       <h1 className="text-3xl text-center font-bold mb-4 text-black">
//         BOD Management
//       </h1>

//       <button
//         className="mb-4 px-4 py-2 bg-gradient-to-t from-blue-700 to-cyan-500 text-white rounded-lg"
//         onClick={() => handleOpenForm("add")}
//       >
//         Add New BOD
//       </button>

//       {message && <p className="text-center my-4 text-red-600">{message}</p>}

//       <table className="text-black w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-300 px-4 py-2">ID</th>
//             <th className="border border-gray-300 px-4 py-2">First Name</th>
//             <th className="border border-gray-300 px-4 py-2">Last Name</th>
//             <th className="border border-gray-300 px-4 py-2">Email</th>
//             <th className="border border-gray-300 px-4 py-2">Password</th>
//             <th className="border border-gray-300 px-4 py-2">Phone No</th>
//             <th className="border border-gray-300 px-4 py-2">Branch</th>
//             <th className="border border-gray-300 px-4 py-2">USN</th>
//             <th className="border border-gray-300 px-4 py-2">Club ID</th>
//             <th className="border border-gray-300 px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bods.map((bod) => (
//             <tr key={bod.id}>
//               <td className="border border-gray-300 px-4 py-2">{bod.id}</td>
//               <td className="border border-gray-300 px-4 py-2">{bod.firstName}</td>
//               <td className="border border-gray-300 px-4 py-2">{bod.lastName}</td>
//               <td className="border border-gray-300 px-4 py-2">{bod.email}</td>
//               <td className="border border-gray-300 px-4 py-2">{bod.password}</td>
//               <td className="border border-gray-300 px-4 py-2">{bod.phoneNo}</td>
//               <td className="border border-gray-300 px-4 py-2">{bod.branch}</td>
//               <td className="border border-gray-300 px-4 py-2">{bod.USN}</td>
//               <td className="border border-gray-300 px-4 py-2">{bod.clubId}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <button
//                   className="mr-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                   onClick={() => handleOpenForm("edit", bod)}
//                 >
//                   Edit
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {formVisible && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-120">
//             <h2 className="text-xl font-bold mb-4">
//               {formType === "add" ? "Add New BOD" : "Edit BOD"}
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <input
//                   type="number"
//                   name="id"
//                   value={bodData.id}
//                   onChange={handleChange}
//                   placeholder="BOD ID"
//                   required
//                   disabled={formType === "edit"}
//                   className="w-full px-3 py-2 border rounded"
//                 />
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={bodData.firstName}
//                   onChange={handleChange}
//                   placeholder="First Name"
//                   required
//                   className="w-full px-3 py-2 border rounded"
//                 />
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={bodData.lastName}
//                   onChange={handleChange}
//                   placeholder="Last Name"
//                   required
//                   className="w-full px-3 py-2 border rounded"
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   value={bodData.email}
//                   onChange={handleChange}
//                   placeholder="Email"
//                   required
//                   className="w-full px-3 py-2 border rounded"
//                 />
//                 <input
//                   type="password"
//                   name="password"
//                   value={bodData.password}
//                   onChange={handleChange}
//                   placeholder="Password"
//                   required
//                   className="w-full px-3 py-2 border rounded"
//                 />
//                 <input
//                   type="text"
//                   name="phoneNo"
//                   value={bodData.phoneNo}
//                   onChange={handleChange}
//                   placeholder="Phone No"
//                   required
//                   className="w-full px-3 py-2 border rounded"
//                 />
//                 <input
//                   type="text"
//                   name="branch"
//                   value={bodData.branch}
//                   onChange={handleChange}
//                   placeholder="Branch"
//                   required
//                   className="w-full px-3 py-2 border rounded"
//                 />
//                 <input
//                   type="text"
//                   name="USN"
//                   value={bodData.USN}
//                   onChange={handleChange}
//                   placeholder="USN"
//                   required
//                   className="w-full px-3 py-2 border rounded"
//                 />
//                 <input
//                   type="number"
//                   name="clubId"
//                   value={bodData.clubId}
//                   onChange={handleChange}
//                   placeholder="Club ID"
//                   required
//                   className="w-full px-3 py-2 border rounded"
//                 />
//               </div>
//               <div className="flex justify-between mt-4">
//                 <button
//                   type="button"
//                   onClick={handleCloseForm}
//                   className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className={`px-4 py-2 rounded-lg ${
//                     loading ? "bg-gray-600" : "bg-blue-600"
//                   } text-white hover:bg-blue-700 transition ${
//                     loading ? "cursor-not-allowed" : ""
//                   }`}
//                   disabled={loading}
//                 >
//                   {loading ? "Loading..." : "Submit"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BodsPage;
