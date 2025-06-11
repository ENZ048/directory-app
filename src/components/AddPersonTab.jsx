import { useState } from "react";
import { toast } from "react-toastify";

export default function AddPersonTab() {
  const [rows, setRows] = useState([]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        name: "",
        dob: "",
        aadhar: "",
        mobile: "",
        age: "",
        saved: false,
      },
    ]);
  };

  const handleChange = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id === id) {
          const updated = { ...row, [field]: value };
          if (field === "dob") {
            const birthDate = new Date(value);
            const ageDifMs = Date.now() - birthDate.getTime();
            const ageDate = new Date(ageDifMs);
            const age = Math.abs(ageDate.getUTCFullYear() - 1970);
            updated.age = isNaN(age) ? "" : age;
          }
          return updated;
        }
        return row;
      })
    );
  };

  const saveRow = (id) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id === id) {
          const { name, dob, aadhar, mobile, age } = row;
          if (!name || !dob || !aadhar || !mobile || !age) {
            toast.error("All fields are required.");
            return row;
          }
          if (!/^\d{12}$/.test(aadhar)) {
            toast.error("Aadhar must be 12 digits.");
            return row;
          }
          if (!/^\d{10}$/.test(mobile)) {
            toast.error("Mobile number must be 10 digits.");
            return row;
          }
          const savedList = JSON.parse(
            localStorage.getItem("personData") || "[]"
          );
          savedList.push({
            Name: name,
            "Date of Birth": dob,
            "Aadhar Number": aadhar,
            "Mobile Number": mobile,
            Age: age,
          });
          localStorage.setItem("personData", JSON.stringify(savedList));
          toast.success("Data saved successfully!");
          return { ...row, saved: true };
        }
        return row;
      })
    );
  };

  const deleteRow = (id) => {
    const row = rows.find((r) => r.id === id);
    if (row.saved) {
      const savedList = JSON.parse(localStorage.getItem("personData") || "[]");
      const updatedList = savedList.filter(
        (item) => item["Aadhar Number"] !== row.aadhar
      );
      localStorage.setItem("personData", JSON.stringify(updatedList));
    }
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div>
      <button
        onClick={addRow}
        className="mb-4 px-5 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-emerald-600 transition cursor-pointer"
      >
        Add New Row
      </button>
      <div className="overflow-auto rounded-xl shadow-sm">
        <table className="min-w-full table-auto text-sm">
          <thead>
            <tr className="bg-slate-200 text-slate-800">
              <th className="p-2">Name</th>
              <th className="p-2">DOB</th>
              <th className="p-2">Aadhar</th>
              <th className="p-2">Mobile</th>
              <th className="p-2">Age</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t hover:bg-blue-50">
                <td className="p-2">
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) =>
                      handleChange(row.id, "name", e.target.value)
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="date"
                    value={row.dob}
                    onChange={(e) =>
                      handleChange(row.id, "dob", e.target.value)
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={row.aadhar}
                    onChange={(e) =>
                      handleChange(row.id, "aadhar", e.target.value)
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={row.mobile}
                    onChange={(e) =>
                      handleChange(row.id, "mobile", e.target.value)
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="p-2">{row.age}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => saveRow(row.id)}
                    className="bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-700 transition cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => deleteRow(row.id)}
                    className="bg-rose-500 text-white px-3 py-1 rounded hover:bg-rose-700 transition cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
