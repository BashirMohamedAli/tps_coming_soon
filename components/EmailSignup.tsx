"use client"

import { useState } from "react"

export default function EmailSignup() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the email to your backend or email service
    console.log("Email submitted:", email)
    setEmail("")
    alert("Thank you for signing up!")
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-grow px-4 py-2 rounded-md text-black"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-blue-900 font-bold py-2 px-4 rounded-md hover:bg-yellow-300 transition-colors"
        >
          Notify Me
        </button>
      </div>
    </form>
  )
}

