export const getAgeGroup = age => {
  if (age < 13) return "children"
  if (age < 20) return "teenagers"
  if (age < 36) return "youngAdults"
  return "adults"
}

export const getAgeGroupLabel = ageGroup => {
  switch (ageGroup) {
    case "children":
      return "Children (< 13)"
    case "teenagers":
      return "Teenagers (13-19)"
    case "youngAdults":
      return "Young Adults (20-35)"
    case "adults":
      return "Adults (36+)"
    default:
      return "Unknown Age Group"
  }
}
