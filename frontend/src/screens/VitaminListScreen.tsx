"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { View, Text, TouchableOpacity, FlatList, StatusBar, Animated } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../types/navigation"
import { colors, globalStyles } from "../styles/styles"
import Icon from "react-native-vector-icons/MaterialIcons"

type VitaminListScreenNavigationProp = StackNavigationProp<RootStackParamList, "VitaminList">

interface Props {
  navigation: VitaminListScreenNavigationProp
}

interface Vitamin {
  name: string
  colors: string[]
  icon: string
  emoji: string
}

const vitamins: Vitamin[] = [
  { name: "Vitamin A", colors: ["#FB923C", "#DC2626"], icon: "visibility", emoji: "🥕" },
  { name: "Vitamin B1", colors: ["#FBBF24", "#F59E0B"], icon: "grain", emoji: "🌾" },
  { name: "Vitamin B2", colors: ["#84CC16", "#65A30D"], icon: "eco", emoji: "🥬" },
  { name: "Vitamin B3", colors: ["#06B6D4", "#0891B2"], icon: "nature", emoji: "🥜" },
  { name: "Vitamin B6", colors: ["#8B5CF6", "#7C3AED"], icon: "set-meal", emoji: "🐟" },
  { name: "Vitamin B12", colors: ["#EC4899", "#BE185D"], icon: "restaurant", emoji: "🥩" },
  { name: "Vitamin C", colors: ["#F97316", "#EA580C"], icon: "local-drink", emoji: "🍊" },
  { name: "Vitamin D", colors: ["#EAB308", "#CA8A04"], icon: "wb-sunny", emoji: "☀️" },
  { name: "Vitamin E", colors: ["#10B981", "#059669"], icon: "spa", emoji: "🥑" },
  { name: "Vitamin K", colors: ["#16A34A", "#15803D"], icon: "local-florist", emoji: "🥬" },
  { name: "Folate", colors: ["#84CC16", "#65A30D"], icon: "grass", emoji: "🥗" },
  { name: "Biotin", colors: ["#A855F7", "#9333EA"], icon: "egg", emoji: "🥚" },
  { name: "Calcium", colors: ["#6B7280", "#4B5563"], icon: "local-drink", emoji: "🥛" },
  { name: "Iron", colors: ["#DC2626", "#B91C1C"], icon: "fitness-center", emoji: "🥩" },
  { name: "Magnesium", colors: ["#059669", "#047857"], icon: "park", emoji: "🌿" },
  { name: "Zinc", colors: ["#3B82F6", "#2563EB"], icon: "water-drop", emoji: "🦪" },
  { name: "Omega-3", colors: ["#0EA5E9", "#0284C7"], icon: "waves", emoji: "🐟" },
  { name: "Probiotics", colors: ["#F472B6", "#EC4899"], icon: "bubble-chart", emoji: "🦠" },
  { name: "Multivitamin", colors: ["#8B5CF6", "#7C3AED"], icon: "medication", emoji: "💊" },
  { name: "CoQ10", colors: ["#F97316", "#EA580C"], icon: "flash-on", emoji: "⚡" },
]

const VitaminListScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const animValues = useRef(vitamins.map(() => new Animated.Value(0))).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }, [])

  useEffect(() => {
    animValues.forEach((animValue, index) => {
      Animated.timing(animValue, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }).start()
    })
  }, [])

  const renderVitamin = ({ item, index }: { item: Vitamin; index: number }) => {
    const translateY = animValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0],
    })

    return (
      <Animated.View
        style={{
          opacity: animValues[index],
          transform: [{ translateY }],
          flex: 1,
          margin: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("VitaminInfo", { vitaminName: item.name })}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={item.colors}
            style={[
              globalStyles.gradientCard,
              {
                height: 120,
                justifyContent: "center",
                alignItems: "center",
                margin: 0,
              },
            ]}
          >
            <Text style={{ fontSize: 30, marginBottom: 8 }}>{item.emoji}</Text>
            <Text style={[globalStyles.buttonText, { fontSize: 14, fontWeight: "bold", textAlign: "center" }]}>
              {item.name}
            </Text>
            <View
              style={{
                width: "80%",
                height: 2,
                backgroundColor: "rgba(255,255,255,0.3)",
                borderRadius: 1,
                marginTop: 8,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255,255,255,0.6)",
                  borderRadius: 1,
                }}
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    )
  }

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.sidekickTeal} />

      <LinearGradient colors={[colors.sidekickTeal, colors.sidekickNavy]} style={globalStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={globalStyles.headerTitle}>Vitamin Universe</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <LinearGradient colors={["#F3E8FF", colors.white, "#FDF2F8"]} style={{ flex: 1 }}>
        <Animated.View style={[{ flex: 1 }, { opacity: fadeAnim }]}>
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={[globalStyles.title, { color: colors.sidekickNavy }]}>Vitamin Universe</Text>
            <Text style={globalStyles.subtitle}>Choose your health companion</Text>
          </View>

          <FlatList
            data={vitamins}
            renderItem={renderVitamin}
            keyExtractor={(item) => item.name}
            numColumns={2}
            contentContainerStyle={{ padding: 12 }}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
      </LinearGradient>
    </View>
  )
}

export default VitaminListScreen
