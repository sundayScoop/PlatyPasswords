"use client";

import { useState, useEffect } from "react";

type Password = {
	id: number;
	name: string;
	value: string;
};

export default function PasswordDashboard() {
	const [passwords, setPasswords] = useState<Password[]>([]);
	const [showIds, setShowIds] = useState<number[]>([]);
	const [newName, setNewName] = useState("");
	const [newValue, setNewValue] = useState("");

	useEffect(() => {
		fetch("/api/passwords")
			.then((res) => res.json())
			.then(setPasswords);
	}, []);

	const toggleShow = (id: number) => {
		setShowIds((ids) =>
			ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]
		);
	};

	const addPassword = async () => {
		if (newName && newValue) {
			const res = await fetch("/api/passwords", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: newName, value: newValue }),
			});
			if (res.ok) {
				const newPw = await res.json();
				setPasswords((pwds) => [...pwds, newPw]);
				setNewName("");
				setNewValue("");
			}
		}
	};

	const removePassword = async (id: number) => {
		const res = await fetch(`/api/passwords/${id}`, { method: "DELETE" });
		if (res.status === 204) {
			setPasswords((pwds) => pwds.filter((p) => p.id !== id));
			setShowIds((ids) => ids.filter((i) => i !== id));
		}
	};

	return (
		<div
			className="font-sans min-h-screen bg-gray-950 text-white p-8 sm:p-20 flex flex-col items-center gap-12"
			style={{ fontFamily: "'Courier New', monospace" }}
		>
			<h1 className="text-center" style={
        { 
          fontSize: "60px",
          fontFamily: "'Courier New', monospace",
        }}>
				Your Passwords
			</h1>
			<div className="w-[70vw] max-w-4xl flex flex-row gap-16 items-start justify-between">
				<div className="flex-1 min-w-[60%] flex flex-col gap-6">
					{passwords.length === 0 ? (
						<div className="text-center text-2xl text-gray-400">
							No passwords saved.
						</div>
					) : (
						<ul className="flex flex-col gap-6">
							{passwords.map((p) => (
								<li
									key={p.id}
									className="bg-gray-900 border border-gray-700 rounded-2xl shadow-lg flex items-center gap-6 px-8 py-6"
								>
									<span className="text-2xl font-bold tracking-wide">
										{p.name}
									</span>
									<span className="flex items-center gap-2 flex-1 min-w-0">
										<span
	className="text-xl bg-gray-800 px-4 py-2 rounded-lg select-none w-full block overflow-hidden whitespace-nowrap text-ellipsis text-left min-w-0"
	style={{ fontFamily: "'Courier New', monospace" }}
>
	{showIds.includes(p.id)
		? p.value
		: '•'.repeat(20)}
</span>
										<button
											className="focus:outline-none"
											aria-label={
												showIds.includes(p.id)
													? "Hide password"
													: "Show password"
											}
											onClick={() => toggleShow(p.id)}
										>
											{/* Eye icon SVG */}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={2}
												stroke="currentColor"
												className="w-8 h-8 text-blue-500 hover:text-blue-400 transition-colors duration-200"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12s-3.75 7.5-9.75 7.5S2.25 12 2.25 12z"
												/>
												<circle cx="12" cy="12" r="3" fill="currentColor" />
											</svg>
										</button>
										<button
											className="ml-1 text-red-500 hover:text-red-400 text-2xl font-bold px-2 py-1 rounded-lg border border-red-700 bg-gray-950 transition-colors duration-200 shrink-0"
											aria-label="Remove password"
											onClick={() => removePassword(p.id)}
										>
											×
										</button>
									</span>
								</li>
							))}
						</ul>
					)}
				</div>
				<div className="min-w-[408px] max-w-[384px] flex-shrink-0">
					<div className="flex flex-col gap-4 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-8 sticky top-24">
						<h2 className="text-2xl font-bold mb-2">Add Password</h2>
						<input
							className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
							style={{ fontFamily: "'Courier New', monospace" }}
							type="text"
							placeholder="Name (e.g. Email, Bank)"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
						/>
						<input
							className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
							style={{ fontFamily: "'Courier New', monospace" }}
							type="text"
							placeholder="Password"
							value={newValue}
							onChange={(e) => setNewValue(e.target.value)}
						/>
						<button
							className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-10 rounded-2xl shadow-lg text-2xl transition-colors duration-200 mt-2"
							style={{
								fontFamily: "'Courier New', monospace",
								letterSpacing: "2px",
							}}
							onClick={addPassword}
						>
							Add Password
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
