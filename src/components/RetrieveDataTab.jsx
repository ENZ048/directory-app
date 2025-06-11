import { useState } from 'react'

export default function RetrieveDataTab() {
  const [aadhar, setAadhar] = useState('')
  const [result, setResult] = useState(null)

  const handleSearch = () => {
    const list = JSON.parse(localStorage.getItem('personData') || '[]')
    const match = list.find(item => item['Aadhar Number'] === aadhar)
    setResult(match || 'not-found')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          placeholder="Enter Aadhar Number"
          className="border border-gray-400 rounded px-3 py-2 w-full sm:w-64"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition cursor-pointer"
        >
          Search
        </button>
      </div>

      {result === 'not-found' ? (
        <p className="text-red-600 text-lg font-semibold">No match found.</p>
      ) : result ? (
        <table className="min-w-full table-auto text-sm mt-4">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">DOB</th>
              <th className="p-2">Aadhar</th>
              <th className="p-2">Mobile</th>
              <th className="p-2">Age</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">{result.Name}</td>
              <td className="p-2">{result['Date of Birth']}</td>
              <td className="p-2">{result['Aadhar Number']}</td>
              <td className="p-2">{result['Mobile Number']}</td>
              <td className="p-2">{result.Age}</td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </div>
  )
}
