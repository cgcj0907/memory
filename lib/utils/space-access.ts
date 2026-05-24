export function canReadSpaceContent(gate: "preview" | "login" | "onboarding" | "home") {
  return gate === "home" || gate === "preview";
}
