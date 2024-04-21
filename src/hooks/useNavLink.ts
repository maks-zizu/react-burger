import { useLocation, useMatch } from "react-router-dom";

function useNavLink() {
  const location = useLocation();
  const isProfileActive = useMatch("/profile/*") ? "primary" : "secondary";
  const getIconType = (path: string) => {
    return location.pathname === path ? "primary" : "secondary";
  };

  return { getIconType, isProfileActive };
}

export default useNavLink;
