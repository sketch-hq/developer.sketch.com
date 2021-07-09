import {
  ContainerReflection,
  DeclarationReflection,
  ProjectReflection,
  Reflection,
  ReflectionKind,
  ReferenceReflection
} from 'typedoc';

import {
  ReflectionGroup
} from 'typedoc/dist/lib/models';

export { inspect } from 'util';

export function getGroupsChildren(groups: ReflectionGroup[]) {
  return groups.reduce((dst: Reflection[], group) => {
    group.children.forEach((child) => dst.push(child));
    return dst;
  }, []);
}

export function hasChild(a: Reflection[] | undefined, b: Reflection): Boolean {
  return (a ? a.findIndex(child => child.id == b.id) != -1 : false);
}

export function importIntoGroup(group: ReflectionGroup, source, project: ProjectReflection, logger) {
  if (source.kindOf(ReflectionKind.SomeModule)) {
    source.traverse((child) => {
      importIntoGroup(group, child, project, logger);
    })
    source.children = [];
  } else {
    if (source.kindOf(ReflectionKind.Reference)) {
      source = source.getTargetReflectionDeep();
    }

    if (!hasChild(project.children, source)) {
      source.parent = project;
      project.children?.push(source);
      group.children.push(source);
    }

  }
}

export function importReflections(source: DeclarationReflection, target: ProjectReflection) {
  if (source.kindOf(ReflectionKind.SomeModule)) {
    source.traverse((child: DeclarationReflection) => {
      importReflections(child, target);
    })
    source.children = [];
  } else {

    importReflection(source, target);
  }
}

export function importReflection(source, target: ProjectReflection) {
  source.parent = target;
  target.children?.push(source);
}

export function pruneGroupReferences(group: ReflectionGroup) {
  const nonReferenceReflections = group
    .children
    .filter(child => !child.kindOf(ReflectionKind.Reference));


  group
    .children
    .filter(child => child.kindOf(ReflectionKind.Reference))
    .forEach((ref: ReferenceReflection) => {
      if (nonReferenceReflections.find(ref => ref.name == ref.name)) {
        const idx = group.children.findIndex(child => child.id == ref.id);
        if (idx != undefined && idx >= 0) {
          group.children?.splice(idx, 1);
        }
      }
    })

}

export function pruneReferences(parent: ContainerReflection) {
  const nonReferenceReflections = parent
    .getChildrenByKind(ReflectionKind.All ^ ReflectionKind.Reference);


  parent
    .getChildrenByKind(ReflectionKind.Reference)
    .forEach((ref: ReferenceReflection) => {
      if (nonReferenceReflections.find(ref => ref.name == ref.name)) {
        const idx = parent.children?.findIndex(child => child.id == ref.id);
        if (idx != undefined && idx >= 0) {
          parent.children?.splice(idx, 1);
        }
      }
    })

}

export function sortReferenceByName(a: Reflection, b: Reflection): number {
  return a.name.localeCompare(b.name)
}