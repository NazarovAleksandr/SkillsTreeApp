import { MagicSchoolsStore, MagicSchoolsUIStateStore } from '../../stores/magicSchool';

export interface IMagicSchoolProps {
    school: IMagicSchool;
    inEdition?: boolean;
    isActive?: boolean;
    onEditionEnd?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onSelect?: () => void;
}

export interface IMagicSchoolListProps {
    schoolsStore: MagicSchoolsStore;
    uiStateStore: MagicSchoolsUIStateStore;
}

export interface IMagicSchool {
    name: string;
    id: string;
}
