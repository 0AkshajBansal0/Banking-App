import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function EditAccount() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get(`/accounts/${id}`)
            .then((res) => {
                setAccount(res.data);
                setLoading(false);
            })
            .catch(() => {
                alert("Failed to load account");
                navigate("/accounts");
            });
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccount((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api
            .put(`/accounts/${id}`, {
                ...account,
                accountHolderName: account.accountHolderName,
                accountType: account.accountType,
                balance: account.balance,
                ifsc: account.ifsc,
                status: account.status,
                dateOfCreation: account.dateOfCreation,
            })
            .then(() => {
                alert("Updated successfully!");
                navigate(`/accounts/${id}`);
            })
            .catch(() => alert("Update failed"));
    };

    if (loading || !account) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Edit Account</h2>

            <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded space-y-4">
                {/* Non-editable fields */}
                <input
                    value={account.accountHolderName}
                    disabled
                    className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                    placeholder="Account Holder Name"
                />
                <input
                    value={account.accountType}
                    disabled
                    className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                    placeholder="Account Type"
                />
                <input
                    value={`₹${account.balance.toFixed(2)}`}
                    disabled
                    className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                    placeholder="Balance"
                />
                <input
                    value={account.ifsc}
                    disabled
                    className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                    placeholder="IFSC"
                />
                <input
                    value={account.status}
                    disabled
                    className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                    placeholder="Status"
                />

                {/* Editable fields */}
                <input
                    name="email"
                    type="email"
                    value={account.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="Email"
                />
                <input
                    name="phoneNumber"
                    type="text"
                    value={account.phoneNumber}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full p-2 border rounded"
                    placeholder="Phone Number"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded cursor-pointer"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}