"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Login } from "./pages/login"
import { Register } from "./pages/register"
import image1 from "./images/image3.jpg"
import Image from "next/image"

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Card className="w-full max-w-4xl overflow-hidden shadow-2xl">
        <motion.div
          className="flex"
          initial={false}
          animate={{ backgroundColor: isLogin ? "#ffffff" : "#f0f0f0" }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence initial={false} mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                className="flex-1 p-8"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Login onToggle={() => setIsLogin(false)} />
              </motion.div>
            ) : (
              <motion.div
                key="register"
                className="flex-1 p-8"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Register onToggle={() => setIsLogin(true)} />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            className="flex-1 relative overflow-hidden"
            initial={false}
            animate={{
              scale: isLogin ? 1 : 1.1,
              rotateY: isLogin ? 0 : 180,
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <Image
              src={image1}
              alt="Auth illustration"
              layout="fill"
              objectFit="cover"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30"
              initial={false}
              animate={{
                opacity: isLogin ? 0.6 : 0.8,
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </motion.div>
      </Card>
    </div>
  )
}

