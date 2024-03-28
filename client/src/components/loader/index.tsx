import ClipLoader from "react-spinners/ClipLoader";
import { theme } from "../../theme";

const AppLoader = () => {
  return (
    <ClipLoader color={theme.palette.colors.lights.backgrounds.purple} loading={true} size={20} aria-label="Loading Spinner" data-testid="loader" />
  );
};

export default AppLoader;
