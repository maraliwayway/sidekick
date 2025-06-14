"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { View, Text, TouchableOpacity, Animated, StatusBar } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../types/navigation"
import { colors, globalStyles } from "../styles/styles"
import Icon from "react-native-vector-icons/MaterialIcons"

type VitaminScanScreenNavigationProp = StackNavigationProp<RootStackParamList, "VitaminScan">

interface Props {
  navigation: VitaminScanScreenNavigationProp
}

const VitaminScanScreen: React.FC<Props> = ({ navigation }) => {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<"correct" | "incorrect" | null>(null)
  const scanLineAnim = useRef(new Animated.Value(0)).current
  const pulseAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (isScanning) {
      // Scanning line animation
      Animated.loop(
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ).start()

      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start()
    } else {
      scanLineAnim.setValue(0)
      pulseAnim.setValue(1)
    }
  }, [isScanning])

  const startScanning = () => {
    setIsScanning(true)
    setScanResult(null)

    setTimeout(() => {
      setIsScanning(false)
      setScanResult(Math.random() > 0.3 ? "correct" : "incorrect")
    }, 3000)
  }

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 300],
  })

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.sidekickTeal} />

      <LinearGradient colors={[colors.sidekickTeal, colors.sidekickNavy]} style={globalStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={globalStyles.headerTitle}>AI Scanner</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <LinearGradient colors={[colors.sidekickMint + "10", colors.white, "#F0FDF4"]} style={{ flex: 1 }}>
        <View style={globalStyles.screenContainer}>
          <View style={{ alignItems: "center", marginBottom: 40 }}>
            <Text style={[globalStyles.title, { color: colors.sidekickTeal }]}>AI Vitamin Scanner</Text>
            <Text style={globalStyles.subtitle}>Point, scan, discover</Text>
          </View>

          {/* Scanner Interface */}
          <View style={{ flex: 1, justifyContent: "center" }}>
            <LinearGradient
              colors={[colors.gray900, colors.gray800, colors.black]}
              style={[
                globalStyles.card,
                {
                  height: 300,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  overflow: "hidden",
                },
              ]}
            >
              <LinearGradient
                colors={[colors.sidekickMint + "20", "transparent", colors.sidekickCoral + "20"]}
                style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
              />

              {/* Scanner Frame */}
              <View
                style={{
                  width: 250,
                  height: 250,
                  borderWidth: 2,
                  borderColor: colors.sidekickMint + "50",
                  borderRadius: 20,
                  position: "relative",
                  backgroundColor: colors.gray800 + "50",
                }}
              >
                {/* Corner Brackets */}
                {[
                  { top: 10, left: 10, borderTopWidth: 3, borderLeftWidth: 3 },
                  { top: 10, right: 10, borderTopWidth: 3, borderRightWidth: 3 },
                  { bottom: 10, left: 10, borderBottomWidth: 3, borderLeftWidth: 3 },
                  { bottom: 10, right: 10, borderBottomWidth: 3, borderRightWidth: 3 },
                ].map((style, index) => (
                  <View
                    key={index}
                    style={[
                      {
                        position: "absolute",
                        width: 20,
                        height: 20,
                        borderColor: colors.sidekickMint,
                      },
                      style,
                    ]}
                  />
                ))}

                {/* Scanning Line */}
                {isScanning && (
                  <Animated.View
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      backgroundColor: colors.sidekickMint,
                      shadowColor: colors.sidekickMint,
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 1,
                      shadowRadius: 10,
                      transform: [{ translateY: scanLineTranslateY }],
                    }}
                  />
                )}

                {/* Camera Icon */}
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                    <Icon name="camera-alt" size={60} color={colors.sidekickMint + "60"} />
                  </Animated.View>
                </View>
              </View>

              {/* Scan Button */}
              <TouchableOpacity onPress={startScanning} disabled={isScanning} style={{ marginTop: 30 }}>
                <LinearGradient
                  colors={[colors.sidekickMint, "#10B981"]}
                  style={[
                    globalStyles.button,
                    {
                      paddingHorizontal: 40,
                      shadowColor: colors.sidekickMint,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.5,
                      shadowRadius: 8,
                      elevation: 8,
                    },
                  ]}
                >
                  <Icon
                    name={isScanning ? "autorenew" : "qr-code-scanner"}
                    size={20}
                    color={colors.white}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={globalStyles.buttonText}>{isScanning ? "Scanning..." : "Start AI Scan"}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Results */}
          {scanResult === "incorrect" && (
            <LinearGradient
              colors={[colors.sidekickRed, "#EC4899"]}
              style={[globalStyles.gradientCard, { alignItems: "center" }]}
            >
              <Icon name="error" size={48} color={colors.white} />
              <Text style={[globalStyles.title, { color: colors.white, fontSize: 20 }]}>Scan Failed</Text>
              <Text style={[globalStyles.subtitle, { color: "rgba(255,255,255,0.9)" }]}>Let's try that again!</Text>
              <TouchableOpacity
                onPress={() => setScanResult(null)}
                style={[
                  globalStyles.button,
                  {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderWidth: 2,
                    borderColor: colors.white,
                    marginTop: 10,
                  },
                ]}
              >
                <Text style={globalStyles.buttonText}>Retry Scan</Text>
              </TouchableOpacity>
            </LinearGradient>
          )}

          {scanResult === "correct" && (
            <LinearGradient
              colors={["#10B981", colors.sidekickMint]}
              style={[globalStyles.gradientCard, { alignItems: "center" }]}
            >
              <Icon name="check-circle" size={48} color={colors.white} />
              <Text style={[globalStyles.title, { color: colors.white, fontSize: 20 }]}>Vitamin D3 Detected!</Text>
              <Text style={[globalStyles.subtitle, { color: "rgba(255,255,255,0.9)" }]}>AI confidence: 98.7%</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("VitaminInfo", { vitaminName: "Vitamin D3" })}
                style={[
                  globalStyles.button,
                  {
                    backgroundColor: colors.white,
                    marginTop: 10,
                  },
                ]}
              >
                <Text style={[globalStyles.buttonText, { color: colors.sidekickMint }]}>View Details</Text>
              </TouchableOpacity>
            </LinearGradient>
          )}

          {/* Alternative Option */}
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={globalStyles.subtitle}>Or explore our vitamin library</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("VitaminList")}
              style={[
                globalStyles.button,
                {
                  backgroundColor: "transparent",
                  borderWidth: 2,
                  borderColor: colors.sidekickTeal,
                },
              ]}
            >
              <Icon name="list" size={20} color={colors.sidekickTeal} style={{ marginRight: 10 }} />
              <Text style={[globalStyles.buttonText, { color: colors.sidekickTeal }]}>Browse Library</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

export default VitaminScanScreen
