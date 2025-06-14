"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { View, Text, TouchableOpacity, Animated, Dimensions, StatusBar } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../types/navigation"
import { colors, globalStyles } from "../styles/styles"
import Icon from "react-native-vector-icons/MaterialIcons"

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">

interface Props {
  navigation: HomeScreenNavigationProp
}

const { width } = Dimensions.get("window")

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const FloatingParticles = () => {
    const animValues = useRef(Array.from({ length: 8 }, () => new Animated.Value(0))).current

    useEffect(() => {
      animValues.forEach((animValue, i) => {
        const animate = () => {
          Animated.loop(
            Animated.sequence([
              Animated.timing(animValue, {
                toValue: 1,
                duration: 3000 + i * 500,
                useNativeDriver: true,
              }),
              Animated.timing(animValue, {
                toValue: 0,
                duration: 3000 + i * 500,
                useNativeDriver: true,
              }),
            ]),
          ).start()
        }
        animate()
      })
    }, [])

    const particles = animValues.map((animValue, i) => {
      const translateY = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20],
      })

      return (
        <Animated.View
          key={i}
          style={{
            position: "absolute",
            left: Math.random() * width,
            top: Math.random() * 400,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.sidekickMint,
            opacity: 0.3,
            transform: [{ translateY }],
          }}
        />
      )
    })

    return <>{particles}</>
  }

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.sidekickTeal} />

      <LinearGradient
        colors={[colors.sidekickTeal, colors.sidekickNavy, colors.sidekickTeal]}
        style={globalStyles.header}
      >
        <FloatingParticles />
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={globalStyles.headerTitle}>Sidekick</Text>
        </View>
      </LinearGradient>

      <LinearGradient colors={[colors.gray50, colors.white, colors.sidekickMint + "10"]} style={{ flex: 1 }}>
        <FloatingParticles />

        <Animated.View
          style={[
            globalStyles.screenContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          {/* Hero Section */}
          <View style={{ alignItems: "center", marginVertical: 40 }}>
            <LinearGradient
              colors={[colors.sidekickMint, colors.sidekickCoral]}
              style={[globalStyles.iconContainer, { width: 100, height: 100, borderRadius: 50 }]}
            >
              <Icon name="auto-awesome" size={50} color={colors.white} />
            </LinearGradient>

            <Text style={[globalStyles.title, { color: colors.sidekickNavy }]}>Welcome to Sidekick</Text>
            <Text style={globalStyles.subtitle}>Your AI-powered health companion</Text>
          </View>

          {/* Main Options */}
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TouchableOpacity onPress={() => navigation.navigate("VitaminScan")} activeOpacity={0.8}>
              <LinearGradient
                colors={[colors.sidekickMint, "#4ADE80", "#10B981"]}
                style={[globalStyles.gradientCard, { marginBottom: 20 }]}
              >
                <View style={{ alignItems: "center" }}>
                  <View style={[globalStyles.iconContainer, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
                    <Icon name="medication" size={40} color={colors.white} />
                  </View>
                  <Text style={[globalStyles.title, { color: colors.white, fontSize: 24 }]}>Vitamin Scanner</Text>
                  <Text style={[globalStyles.subtitle, { color: "rgba(255,255,255,0.9)" }]}>
                    AI-powered bottle recognition
                  </Text>
                  <View style={globalStyles.row}>
                    {[0, 1, 2].map((i) => (
                      <View
                        key={i}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: "rgba(255,255,255,0.6)",
                          marginHorizontal: 4,
                        }}
                      />
                    ))}
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("DrugCategories")} activeOpacity={0.8}>
              <LinearGradient colors={[colors.sidekickCoral, "#EC4899", "#DC2626"]} style={globalStyles.gradientCard}>
                <View style={{ alignItems: "center" }}>
                  <View style={[globalStyles.iconContainer, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
                    <Icon name="search" size={40} color={colors.white} />
                  </View>
                  <Text style={[globalStyles.title, { color: colors.white, fontSize: 24 }]}>Drug Database</Text>
                  <Text style={[globalStyles.subtitle, { color: "rgba(255,255,255,0.9)" }]}>
                    Smart interaction checker
                  </Text>
                  <View style={globalStyles.row}>
                    {[0, 1, 2].map((i) => (
                      <View
                        key={i}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: "rgba(255,255,255,0.6)",
                          marginHorizontal: 4,
                        }}
                      />
                    ))}
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Stats Section */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
            {[
              { number: "1000+", label: "Vitamins", color: colors.sidekickTeal },
              { number: "5000+", label: "Drugs", color: colors.sidekickCoral },
              { number: "99%", label: "Accuracy", color: colors.sidekickNavy },
            ].map((stat, index) => (
              <View
                key={index}
                style={[
                  globalStyles.card,
                  {
                    flex: 1,
                    marginHorizontal: 5,
                    alignItems: "center",
                    backgroundColor: "rgba(255,255,255,0.8)",
                  },
                ]}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold", color: stat.color }}>{stat.number}</Text>
                <Text style={{ fontSize: 12, color: colors.gray600 }}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  )
}

export default HomeScreen
