import { ContainerReflection, DeclarationReflection, ProjectReflection, Reflection, ReflectionGroup } from 'typedoc/dist/lib/models';
export { inspect } from 'util';
export declare function getGroupsChildren(groups: ReflectionGroup[]): Reflection[];
export declare function hasChild(a: Reflection[] | undefined, b: Reflection): Boolean;
export declare function importIntoGroup(group: ReflectionGroup, source: any, project: ProjectReflection, logger: any): void;
export declare function importReflections(source: DeclarationReflection, target: ProjectReflection): void;
export declare function importReflection(source: any, target: ProjectReflection): void;
export declare function pruneGroupReferences(group: ReflectionGroup): void;
export declare function pruneReferences(parent: ContainerReflection): void;