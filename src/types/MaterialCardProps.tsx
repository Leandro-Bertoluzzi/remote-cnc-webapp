import Material from "./Material";

type setStringActionType = (str: string) => void;

export default interface MaterialCardProps {
    material: Material;
    setError: setStringActionType;
    setNotification: setStringActionType;
}
