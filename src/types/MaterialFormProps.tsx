import Material from "./Material";

type btnActionType = () => void;
type setStringActionType = (str: string) => void;

export default interface MaterialFormProps {
    exitAction: btnActionType;
    create: boolean;
    materialInfo: Material;
    setError: setStringActionType;
}
