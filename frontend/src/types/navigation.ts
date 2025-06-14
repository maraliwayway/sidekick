export type RootStackParamList = {
  Home: undefined
  VitaminScan: undefined
  VitaminList: undefined
  VitaminInfo: { vitaminName: string }
  DrugCategories: undefined
  DrugSearch: { category: string }
  DrugInfo: { drugName: string }
  Recommendations: { drugName: string }
}

export type Screen = keyof RootStackParamList
