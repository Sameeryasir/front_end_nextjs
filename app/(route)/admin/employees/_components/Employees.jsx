import { useEffect, useState } from "react";
import { z } from "zod";
import { deleteEmployeesById } from "@/app/service/deleteEmployeeById";
import { UpdateByIdemployee } from "@/app/service/updateShopbyid";
import Image from "next/image";

const employeeSchema = z.object({
  Name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters")
    .regex(
      /^[a-zA-Z\s]+$/,
      "Name must contain only alphabetic characters and spaces"
    ),

  Email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email cannot exceed 100 characters"),

  PhoneNo: z
    .string()
    .length(11, "Phone number must be exactly 11 digits")
    .regex(/^\d+$/, "Phone number must be numeric"),

  Status: z.boolean(),

  HiredDate: z.string().nonempty("Hired Date is required"),
});

const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year].join("/");
};

const parseISODate = (dateString) => {
  return new Date(dateString).toISOString().split("T")[0]; // Format date to YYYY-MM-DD
};

export default function Employees({ employees }) {
  const [employeeList, setEmployeeList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [updatedEmployee, setUpdatedEmployee] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const initializedEmployees = employees.map((employee) => ({
      ...employee,
      Status:
        typeof employee.isPresent === "undefined" ? true : employee.isPresent,
      HiredDate: formatDate(employee.HiredDate),
    }));
    setEmployeeList(initializedEmployees);
  }, [employees]);

  const handleDelete = async (id) => {
    try {
      await deleteEmployeesById(id);
      setEmployeeList((prev) => prev.filter((emp) => emp.EmployeeId !== id));
    } catch (error) {
      console.error(`Failed to delete employee with id ${id}:`, error);
    }
  };

  const handleEdit = (employee) => {
    setEditingId(employee.EmployeeId);
    setUpdatedEmployee({
      ...employee,
      HiredDate: parseISODate(employee.HiredDate), // Ensure correct format for editing
    });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setUpdatedEmployee({});
    setErrors({});
  };

  const validateEmployee = (employeeData) => {
    try {
      employeeSchema.parse(employeeData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce((acc, e) => {
          acc[e.path[0]] = e.message;
          return acc;
        }, {});
        setErrors(fieldErrors);
      }
    }
  };

  const handleSave = async (id) => {
    console.log(`Saving updates for employee with id ${id}`, updatedEmployee);

    try {
      // Convert the HiredDate back to ISO format and rename Status to isPresent
      const employeeData = {
        ...updatedEmployee,
        HiredDate: new Date(updatedEmployee.HiredDate).toISOString(),
        isPresent: updatedEmployee.Status,
      };

      // Validate the updated employee object
      validateEmployee(employeeData);

      if (Object.keys(errors).length === 0) {
        // Call the update service with the full employee data
        const response = await UpdateByIdemployee(id, employeeData);
        console.log("Update response:", response);

        // Update the local state with the updated data
        setEmployeeList((prev) =>
          prev.map((emp) =>
            emp.EmployeeId === id
              ? { ...emp, ...response, isPresent: response.isPresent }
              : emp
          )
        );

        // Reset the editing state
        setEditingId(null);
        setUpdatedEmployee({});
      }
    } catch (error) {
      console.error(`Failed to update employee with id ${id}:`, error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue =
      type === "radio"
        ? value === "true"
        : type === "checkbox"
        ? checked
        : value;

    setUpdatedEmployee((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Validate the updated value for the specific field
    validateEmployee({
      ...updatedEmployee,
      [name]: newValue,
    });
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Employee Image
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Email
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Phone
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Hired Date
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {employeeList.map((employee) => (
            <tr key={employee?.EmployeeId} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap flex items-center border-r border-gray-200">
                {employee?.publicURL && (
                  <Image
                    src={employee?.publicURL}
                    alt={employee?.Name}
                    className="rounded-full object-cover"
                    width={60}
                    height={60}
                  />
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                {editingId === employee.EmployeeId ? (
                  <>
                    <input
                      type="text"
                      name="Name"
                      value={updatedEmployee.Name}
                      onChange={handleChange}
                      className={`border p-2 rounded ${
                        errors.Name ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.Name && (
                      <p className="text-red-500 text-xs">{errors.Name}</p>
                    )}
                  </>
                ) : (
                  employee?.Name
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">
                {editingId === employee.EmployeeId ? (
                  <>
                    <input
                      type="email"
                      name="Email"
                      value={updatedEmployee.Email}
                      onChange={handleChange}
                      className={`border p-2 rounded ${
                        errors.Email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.Email && (
                      <p className="text-red-500 text-xs">{errors.Email}</p>
                    )}
                  </>
                ) : (
                  <a
                    href={`mailto:${employee?.Email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {employee?.Email}
                  </a>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">
                {editingId === employee.EmployeeId ? (
                  <>
                    <input
                      type="text"
                      name="PhoneNo"
                      value={updatedEmployee.PhoneNo}
                      onChange={handleChange}
                      className={`border p-2 rounded ${
                        errors.PhoneNo ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.PhoneNo && (
                      <p className="text-red-500 text-xs">{errors.PhoneNo}</p>
                    )}
                  </>
                ) : (
                  <a
                    href={`tel:${employee?.PhoneNo}`}
                    className="text-blue-500 hover:underline"
                  >
                    {employee?.PhoneNo}
                  </a>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">
                {editingId === employee.EmployeeId ? (
                  <>
                    <div className="flex items-center">
                      <label className="mr-2">
                        <input
                          type="radio"
                          name="Status"
                          value="true"
                          checked={updatedEmployee.Status === true}
                          onChange={handleChange}
                          className="mr-1"
                        />
                        Present
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="Status"
                          value="false"
                          checked={updatedEmployee.Status === false}
                          onChange={handleChange}
                          className="mr-1"
                        />
                        Absent
                      </label>
                    </div>
                    {errors.Status && (
                      <p className="text-red-500 text-xs">{errors.Status}</p>
                    )}
                  </>
                ) : employee?.isPresent ? (
                  "Present"
                ) : (
                  "Absent"
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">
                {editingId === employee.EmployeeId ? (
                  <>
                    <input
                      type="date"
                      name="HiredDate"
                      value={updatedEmployee.HiredDate}
                      onChange={handleChange}
                      placeholder="YYYY-MM-DD"
                      className={`border p-2 rounded ${
                        errors.HiredDate ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.HiredDate && (
                      <p className="text-red-500 text-xs">{errors.HiredDate}</p>
                    )}
                  </>
                ) : (
                  formatDate(employee?.HiredDate) // Display in MM/DD/YYYY
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {editingId === employee.EmployeeId ? (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleSave(employee.EmployeeId)}
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-xs sm:text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 text-xs sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-xs sm:text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(employee?.EmployeeId)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
