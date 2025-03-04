"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const inputVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.1, duration: 0.5, ease: "easeOut" },
  }),
}

const AnimatedInput = ({
  label,
  type,
  value,
  onChange,
  id,
}: {
  label: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id: string
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <motion.div className="relative" variants={inputVariants}>
      <motion.label
        htmlFor={id}
        className="absolute left-2 text-gray-500 pointer-events-none"
        initial={{ y: 0 }}
        animate={{
          y: isFocused || value ? -25 : 0,
          scale: isFocused || value ? 0.8 : 1,
          color: isFocused ? "#9333ea" : "#6b7280",
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent pt-6"
      />
      <AnimatePresence>
        {!isFocused && !value && (
          <motion.span
            className="absolute left-2 top-2 text-gray-400 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Login({ onToggle }: { onToggle: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login:", { email, password })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <motion.h2
        className="text-3xl font-bold text-center mb-6 text-gray-800"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Welcome Back
      </motion.h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatedInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" />
        <AnimatedInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
        <motion.div
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          custom={3}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Login
          </Button>
        </motion.div>
      </form>
      <motion.p
        className="text-center text-sm mt-4 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Don't have an account?{" "}
        <button onClick={onToggle} className="text-purple-600 hover:underline font-medium">
          Register
        </button>
      </motion.p>
    </motion.div>
  )
}

