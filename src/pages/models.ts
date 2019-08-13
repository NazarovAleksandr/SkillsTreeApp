import * as stores from "../stores";

export interface IUserSkillsPageProps {
    magicSchoolsStore: stores.magicSchools.MagicSchoolsStore;
    skillTreesStore: stores.skillTrees.SkillTreesStore;
    uiStateStore: stores.magicSchools.MagicSchoolsUIStateStore;
    runesStore: stores.runes.RunesStore;
}