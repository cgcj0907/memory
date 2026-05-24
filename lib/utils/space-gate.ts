type SpaceGateInput = {
  hasSupabase: boolean;
  hasUser: boolean;
  hasMembership: boolean;
};

export function getSpaceGateState({ hasSupabase, hasUser, hasMembership }: SpaceGateInput) {
  if (!hasSupabase) return "preview";
  if (!hasUser) return "login";
  if (!hasMembership) return "onboarding";
  return "home";
}
