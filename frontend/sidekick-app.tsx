"use client"

import { useState, useEffect } from "react"
import {
  Camera,
  Pill,
  Search,
  Heart,
  Brain,
  Dumbbell,
  ArrowLeft,
  Scan,
  List,
  Info,
  Star,
  AlertCircle,
  Sparkles,
  Zap,
  Shield,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

type Screen =
  | "home"
  | "vitamin-scan"
  | "vitamin-list"
  | "vitamin-info"
  | "drug-categories"
  | "drug-search"
  | "drug-info"
  | "recommendations"

export default function SidekickApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [scanResult, setScanResult] = useState<"correct" | "incorrect" | null>(null)
  const [selectedVitamin, setSelectedVitamin] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [drugName, setDrugName] = useState<string>("")
  const [isScanning, setIsScanning] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setParticles(newParticles)
  }, [])

  const healthCategories = [
    {
      id: "mental",
      name: "Mental Health",
      subtitle: "& Cognitive",
      icon: Brain,
      gradient: "from-purple-400 via-pink-500 to-red-500",
      glow: "shadow-purple-500/50",
    },
    {
      id: "physical",
      name: "Physical Wellness",
      subtitle: "& Common Issues",
      icon: Dumbbell,
      gradient: "from-sidekick-mint via-green-400 to-emerald-500",
      glow: "shadow-green-500/50",
    },
    {
      id: "reproductive",
      name: "Sexual Health",
      subtitle: "& Reproductive",
      icon: Heart,
      gradient: "from-pink-400 via-sidekick-coral to-red-500",
      glow: "shadow-pink-500/50",
    },
    {
      id: "student",
      name: "Student Issues",
      subtitle: "& Lifestyle",
      icon: Star,
      gradient: "from-blue-400 via-sidekick-teal to-cyan-500",
      glow: "shadow-blue-500/50",
    },
  ]

  const vitamins = [
    { name: "Vitamin A", color: "from-orange-400 to-red-500", icon: "🥕" },
    { name: "Vitamin B1", color: "from-yellow-400 to-orange-500", icon: "🌾" },
    { name: "Vitamin B2", color: "from-green-400 to-yellow-500", icon: "🥬" },
    { name: "Vitamin B3", color: "from-blue-400 to-green-500", icon: "🥜" },
    { name: "Vitamin B6", color: "from-purple-400 to-blue-500", icon: "🐟" },
    { name: "Vitamin B12", color: "from-pink-400 to-purple-500", icon: "🥩" },
    { name: "Vitamin C", color: "from-orange-400 to-yellow-500", icon: "🍊" },
    { name: "Vitamin D", color: "from-yellow-400 to-orange-500", icon: "☀️" },
    { name: "Vitamin E", color: "from-green-400 to-teal-500", icon: "🥑" },
    { name: "Vitamin K", color: "from-green-500 to-emerald-600", icon: "🥬" },
    { name: "Folate", color: "from-green-400 to-lime-500", icon: "🥗" },
    { name: "Biotin", color: "from-purple-400 to-pink-500", icon: "🥚" },
    { name: "Calcium", color: "from-gray-300 to-gray-500", icon: "🥛" },
    { name: "Iron", color: "from-red-500 to-red-700", icon: "🥩" },
    { name: "Magnesium", color: "from-green-500 to-teal-600", icon: "🌿" },
    { name: "Zinc", color: "from-blue-400 to-indigo-500", icon: "🦪" },
    { name: "Omega-3", color: "from-blue-500 to-cyan-600", icon: "🐟" },
    { name: "Probiotics", color: "from-pink-400 to-rose-500", icon: "🦠" },
    { name: "Multivitamin", color: "from-rainbow-400 to-rainbow-600", icon: "💊" },
    { name: "CoQ10", color: "from-orange-500 to-red-600", icon: "⚡" },
  ]

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-sidekick-mint/30 rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.id * 0.5}s`,
          }}
        />
      ))}
    </div>
  )

  const renderHeader = () => (
    <div className="relative bg-gradient-to-r from-sidekick-teal via-sidekick-navy to-sidekick-teal text-white p-4 overflow-hidden">
      <div className="absolute inset-0 bg-mesh-gradient opacity-20"></div>
      <FloatingParticles />
      <div className="relative flex items-center justify-between z-10">
        {currentScreen !== "home" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen("home")}
            className="text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        )}
        <div className="flex items-center gap-2">
          <div className="animate-pulse-slow">
            <Image src="/images/sidekick-logo.png" alt="Sidekick" width={120} height={40} className="h-8 w-auto" />
          </div>
        </div>
        <div className="w-8" />
      </div>
    </div>
  )

  const renderHome = () => (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-sidekick-mint/10 overflow-hidden">
      <FloatingParticles />

      {/* Hero Section */}
      <div className="relative p-6 text-center space-y-4">
        <div className="animate-float">
          <div className="w-24 h-24 bg-gradient-to-r from-sidekick-mint to-sidekick-coral rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-sidekick-mint/50">
            <Sparkles className="w-12 h-12 text-white animate-pulse" />
          </div>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-sidekick-navy via-sidekick-teal to-sidekick-coral bg-clip-text text-transparent">
          Welcome to Sidekick
        </h1>
        <p className="text-gray-600 text-lg">Your AI-powered health companion</p>
      </div>

      {/* Main Options */}
      <div className="p-6 space-y-6">
        <div
          className="group relative overflow-hidden rounded-3xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:rotate-1"
          onClick={() => setCurrentScreen("vitamin-scan")}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-sidekick-mint via-green-400 to-emerald-500 opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
          <div className="relative p-8 text-center space-y-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto animate-bounce-slow">
              <Pill className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Vitamin Scanner</h2>
            <p className="text-white/90">AI-powered bottle recognition</p>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        </div>

        <div
          className="group relative overflow-hidden rounded-3xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1"
          onClick={() => setCurrentScreen("drug-categories")}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-sidekick-coral via-pink-500 to-red-500 opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          <div className="relative p-8 text-center space-y-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto animate-wiggle">
              <Search className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Drug Database</h2>
            <p className="text-white/90">Smart interaction checker</p>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="text-2xl font-bold text-sidekick-teal">1000+</div>
            <div className="text-xs text-gray-600">Vitamins</div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="text-2xl font-bold text-sidekick-coral">5000+</div>
            <div className="text-xs text-gray-600">Drugs</div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="text-2xl font-bold text-sidekick-navy">99%</div>
            <div className="text-xs text-gray-600">Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderVitaminScan = () => (
    <div className="relative min-h-screen bg-gradient-to-br from-sidekick-mint/10 via-white to-green-50 overflow-hidden">
      <FloatingParticles />

      <div className="p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sidekick-teal to-sidekick-mint bg-clip-text text-transparent">
            AI Vitamin Scanner
          </h1>
          <p className="text-gray-600">Point, scan, discover</p>
        </div>

        {/* Futuristic Scanner Interface */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-sidekick-mint/20 via-transparent to-sidekick-coral/20"></div>

            {/* Scanner Frame */}
            <div className="relative aspect-square bg-gray-800/50 rounded-2xl border-2 border-sidekick-mint/50 overflow-hidden">
              <div className="absolute inset-4 border border-dashed border-sidekick-mint/30 rounded-xl"></div>

              {/* Scanning Animation */}
              {isScanning && (
                <div className="absolute inset-0">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-sidekick-mint to-transparent animate-scan"></div>
                </div>
              )}

              {/* Camera Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-16 h-16 text-sidekick-mint/60 animate-pulse" />
              </div>

              {/* Corner Brackets */}
              <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-sidekick-mint"></div>
              <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-sidekick-mint"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-sidekick-mint"></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-sidekick-mint"></div>
            </div>

            <div className="mt-6 text-center">
              <Button
                className="bg-gradient-to-r from-sidekick-mint to-green-500 hover:from-green-500 hover:to-sidekick-mint text-white px-8 py-3 rounded-full shadow-lg shadow-sidekick-mint/50 transform transition-all duration-300 hover:scale-105"
                onClick={() => {
                  setIsScanning(true)
                  setTimeout(() => {
                    setIsScanning(false)
                    setScanResult(Math.random() > 0.3 ? "correct" : "incorrect")
                  }, 2000)
                }}
                disabled={isScanning}
              >
                {isScanning ? (
                  <>
                    <Zap className="w-5 h-5 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Scan className="w-5 h-5 mr-2" />
                    Start AI Scan
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        {scanResult === "incorrect" && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white shadow-2xl shadow-red-500/50 animate-wiggle">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full animate-pulse"></div>
            <div className="relative text-center space-y-3">
              <AlertCircle className="w-12 h-12 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold">Scan Failed</h3>
              <p className="text-white/90">Let's try that again!</p>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-500 mt-4"
                onClick={() => setScanResult(null)}
              >
                Retry Scan
              </Button>
            </div>
          </div>
        )}

        {scanResult === "correct" && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 to-sidekick-mint p-6 text-white shadow-2xl shadow-green-500/50 animate-bounce-slow">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 -translate-x-full animate-pulse"></div>
            <div className="relative text-center space-y-3">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 animate-spin-slow" />
              </div>
              <h3 className="text-xl font-bold">Vitamin D3 Detected!</h3>
              <p className="text-white/90">AI confidence: 98.7%</p>
              <Button
                className="bg-white text-green-600 hover:bg-gray-100 mt-4 px-6 py-2 rounded-full font-semibold"
                onClick={() => {
                  setSelectedVitamin("Vitamin D3")
                  setCurrentScreen("vitamin-info")
                }}
              >
                View Details
              </Button>
            </div>
          </div>
        )}

        {/* Alternative Option */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Or explore our vitamin library</p>
          <Button
            variant="outline"
            onClick={() => setCurrentScreen("vitamin-list")}
            className="border-2 border-sidekick-teal text-sidekick-teal hover:bg-sidekick-teal hover:text-white rounded-full px-6 py-3 font-semibold transform transition-all duration-300 hover:scale-105"
          >
            <List className="w-4 h-4 mr-2" />
            Browse Library
          </Button>
        </div>
      </div>
    </div>
  )

  const renderVitaminList = () => (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 overflow-hidden">
      <FloatingParticles />

      <div className="p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Vitamin Universe
          </h1>
          <p className="text-gray-600">Choose your health companion</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {vitamins.map((vitamin, index) => (
            <div
              key={vitamin.name}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-105"
              onClick={() => {
                setSelectedVitamin(vitamin.name)
                setCurrentScreen("vitamin-info")
              }}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${vitamin.color} opacity-90`}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700"></div>
              <div className="relative p-6 text-center space-y-3 text-white">
                <div className="text-3xl animate-bounce-slow">{vitamin.icon}</div>
                <div className="text-sm font-bold">{vitamin.name}</div>
                <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white/60 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderVitaminInfo = () => (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      <FloatingParticles />

      <div className="p-6 space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-r from-sidekick-mint to-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/50 animate-float">
            <Pill className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sidekick-navy to-sidekick-mint bg-clip-text text-transparent">
            {selectedVitamin}
          </h1>
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>

        {/* Info Cards */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sidekick-mint to-green-500"></div>
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-bold text-sidekick-navy">Benefits</h3>
              </div>
              <div className="space-y-3">
                {[
                  "Supports immune system function",
                  "Promotes bone health and calcium absorption",
                  "May help regulate mood and reduce depression",
                  "Supports muscle function and strength",
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sidekick-coral to-red-500"></div>
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-sidekick-coral" />
                <h3 className="text-xl font-bold text-sidekick-navy">Dosage</h3>
              </div>
              <div className="p-4 bg-gradient-to-r from-sidekick-coral/10 to-red-50 rounded-xl">
                <p className="text-lg font-semibold text-gray-800">Adults: 600-800 IU daily</p>
                <p className="text-sm text-gray-600 mt-2">
                  Consult healthcare provider for personalized recommendations
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-6 h-6 text-purple-500" />
                <h3 className="text-xl font-bold text-sidekick-navy">Food Sources</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {["Fatty Fish 🐟", "Egg Yolks 🥚", "Fortified Milk 🥛", "Mushrooms 🍄"].map((source, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200 text-purple-700 font-medium"
                  >
                    {source}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDrugCategories = () => (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-sidekick-mint/10 via-transparent to-sidekick-coral/10"></div>
      <FloatingParticles />

      <div className="relative p-6 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-sidekick-mint to-sidekick-coral bg-clip-text text-transparent">
            Health Categories
          </h1>
          <p className="text-gray-300">Choose your focus area</p>
        </div>

        <div className="space-y-6">
          {healthCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-3xl cursor-pointer transform transition-all duration-700 hover:scale-105"
                onClick={() => {
                  setSelectedCategory(category.id)
                  setCurrentScreen("drug-search")
                }}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-90`}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                <div
                  className={`absolute inset-0 shadow-2xl ${category.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                <div className="relative p-8 flex items-center space-x-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse-slow">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    <p className="text-white/80">{category.subtitle}</p>
                  </div>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <ArrowLeft className="w-4 h-4 text-white rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderDrugSearch = () => (
    <div className="relative min-h-screen bg-gradient-to-br from-sidekick-coral/10 via-white to-pink-50 overflow-hidden">
      <FloatingParticles />

      <div className="p-6 space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-r from-sidekick-coral to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-pink-500/50 animate-pulse-slow">
            <Search className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sidekick-coral to-pink-600 bg-clip-text text-transparent">
            Drug Intelligence
          </h1>
          <p className="text-gray-600">AI-powered drug analysis</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Input
              placeholder="Enter drug name..."
              value={drugName}
              onChange={(e) => setDrugName(e.target.value)}
              className="h-14 text-lg border-2 border-sidekick-coral/30 focus:border-sidekick-coral rounded-2xl pl-6 pr-14 bg-white/80 backdrop-blur-sm"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-sidekick-coral" />
          </div>

          <Button
            className="w-full h-14 bg-gradient-to-r from-sidekick-coral to-pink-500 hover:from-pink-500 hover:to-sidekick-coral text-white text-lg font-semibold rounded-2xl shadow-2xl shadow-pink-500/50 transform transition-all duration-300 hover:scale-105"
            onClick={() => setCurrentScreen("drug-info")}
            disabled={!drugName.trim()}
          >
            <Zap className="w-5 h-5 mr-2" />
            Analyze Drug
          </Button>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 -translate-x-full animate-pulse"></div>
            <div className="relative text-center space-y-3">
              <Info className="w-12 h-12 mx-auto animate-bounce-slow" />
              <h3 className="text-lg font-bold">AI Analysis Includes</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Side Effects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Interactions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Dosage Info</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Recommendations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDrugInfo = () => (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      <FloatingParticles />

      <div className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/50 animate-float">
            <Pill className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {drugName}
          </h1>
          <p className="text-gray-600">AI Analysis Complete</p>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <AlertCircle className="w-6 h-6 mr-2 text-red-500" />
              Side Effects (AI Ranked)
            </h3>
            <div className="space-y-3">
              {[
                { effect: "Nausea", severity: "High", color: "from-red-500 to-red-600", width: "90%" },
                { effect: "Dizziness", severity: "Medium", color: "from-yellow-500 to-orange-500", width: "60%" },
                { effect: "Headache", severity: "Low", color: "from-green-500 to-green-600", width: "30%" },
              ].map((item, i) => (
                <div key={i} className="relative overflow-hidden rounded-xl bg-gray-50 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{item.effect}</span>
                    <Badge className={`bg-gradient-to-r ${item.color} text-white border-0`}>{item.severity}</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: item.width }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full h-12 border-2 border-sidekick-coral text-sidekick-coral hover:bg-sidekick-coral hover:text-white rounded-xl font-semibold transform transition-all duration-300 hover:scale-105"
          >
            <Target className="w-4 h-4 mr-2" />
            Get Better Ranking
          </Button>

          <Button
            className="w-full h-12 bg-gradient-to-r from-sidekick-teal to-blue-500 hover:from-blue-500 hover:to-sidekick-teal text-white rounded-xl font-semibold shadow-xl shadow-blue-500/50 transform transition-all duration-300 hover:scale-105"
            onClick={() => setCurrentScreen("recommendations")}
          >
            <Zap className="w-4 h-4 mr-2" />
            Check Interactions
          </Button>
        </div>
      </div>
    </div>
  )

  const renderRecommendations = () => (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden">
      <FloatingParticles />

      <div className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/50 animate-pulse-slow">
            <Star className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            AI Recommendations
          </h1>
          <p className="text-gray-600">Personalized health insights</p>
        </div>

        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white shadow-2xl shadow-green-500/50">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full animate-pulse"></div>
            <div className="relative">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Sparkles className="w-6 h-6 mr-2" />
                Take More Of
              </h3>
              <div className="space-y-3">
                {[
                  { vitamin: "Vitamin B6", reason: "Helps reduce nausea", icon: "🌿" },
                  { vitamin: "Magnesium", reason: "Supports muscle function", icon: "💪" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4 p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <p className="font-semibold">{item.vitamin}</p>
                      <p className="text-white/80 text-sm">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 p-6 text-white shadow-2xl shadow-red-500/50">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 -translate-x-full animate-pulse"></div>
            <div className="relative">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2" />
                Avoid
              </h3>
              <div className="space-y-3">
                {[
                  { vitamin: "Iron supplements", reason: "May increase nausea", icon: "⚠️" },
                  { vitamin: "High-dose Vitamin C", reason: "Potential interaction", icon: "🚫" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4 p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <p className="font-semibold">{item.vitamin}</p>
                      <p className="text-white/80 text-sm">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white shadow-2xl shadow-blue-500/50">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full animate-pulse"></div>
            <div className="relative">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Zap className="w-6 h-6 mr-2" />
                Drug Interactions
              </h3>
              <div className="space-y-2">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <p className="font-medium">Moderate: Blood thinners</p>
                </div>
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <p className="font-medium">High: MAO inhibitors</p>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full h-12 border-2 border-sidekick-teal text-sidekick-teal hover:bg-sidekick-teal hover:text-white rounded-xl font-semibold transform transition-all duration-300 hover:scale-105"
          >
            <Search className="w-4 h-4 mr-2" />
            Search More Interactions
          </Button>
        </div>
      </div>
    </div>
  )

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return renderHome()
      case "vitamin-scan":
        return renderVitaminScan()
      case "vitamin-list":
        return renderVitaminList()
      case "vitamin-info":
        return renderVitaminInfo()
      case "drug-categories":
        return renderDrugCategories()
      case "drug-search":
        return renderDrugSearch()
      case "drug-info":
        return renderDrugInfo()
      case "recommendations":
        return renderRecommendations()
      default:
        return renderHome()
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen shadow-2xl overflow-hidden">
      {renderHeader()}
      {renderScreen()}
    </div>
  )
}
