import Material from "./Material";

type btnActionType = () => void;

export default interface MaterialFormProps {
    exitAction: btnActionType;
    create: boolean;
    materialInfo: Material;
}
