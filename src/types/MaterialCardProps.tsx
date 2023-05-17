import Material from './Material';

type btnActionType = (material: Material) => void;

export default interface MaterialCardProps {
    material: Material;
    updateAction: btnActionType;
}
