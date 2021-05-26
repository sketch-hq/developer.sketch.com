/**
 * This is a full copy of TypeDoc/Converter/GroupPlugin
 * 
 * Did not define a new class to extend GroupPlugin due to the
 * private methods that needed changed.
 */
import {
  Reflection,
  ReflectionKind,
  ContainerReflection,
  DeclarationReflection,
  ReflectionGroup,
  // ProjectReflection,
  SourceDirectory
} from "typedoc/dist/lib/models";
import { Component, ConverterComponent } from "typedoc/dist/lib/converter/components";
import { Converter, Context } from "typedoc/dist/lib/converter";

import * as GroupUtils from '../util/groups';


/**
* A handler that sorts and groups the found reflections in the resolving phase.
*
* The handler sets the ´groups´ property of all reflections.
*/
@Component({ name: "jekyll-sketch-group" })
export class GroupPlugin extends ConverterComponent {
  /**
   * Define the sort order of reflections.
   */
  static WEIGHTS = [
    ReflectionKind.Project,
    ReflectionKind.Module,
    ReflectionKind.Namespace,
    ReflectionKind.Enum,
    ReflectionKind.EnumMember,
    ReflectionKind.Class,
    ReflectionKind.Interface,
    ReflectionKind.TypeAlias,

    ReflectionKind.Constructor,
    ReflectionKind.Event,
    ReflectionKind.Property,
    ReflectionKind.Variable,
    ReflectionKind.Function,
    ReflectionKind.Accessor,
    ReflectionKind.Method,
    ReflectionKind.ObjectLiteral,

    ReflectionKind.Parameter,
    ReflectionKind.TypeParameter,
    ReflectionKind.TypeLiteral,
    ReflectionKind.CallSignature,
    ReflectionKind.ConstructorSignature,
    ReflectionKind.IndexSignature,
    ReflectionKind.GetSignature,
    ReflectionKind.SetSignature,
  ];

  /**
   * Define the singular name of individual reflection kinds.
   */
  static SINGULARS = {
    [ReflectionKind.Enum]: "Enumeration",
    [ReflectionKind.EnumMember]: "Enumeration member",
  };

  /**
   * Define the plural name of individual reflection kinds.
   */
  static PLURALS = {
    [ReflectionKind.Class]: "Classes",
    [ReflectionKind.Property]: "Properties",
    [ReflectionKind.Enum]: "Enumerations",
    [ReflectionKind.EnumMember]: "Enumeration members",
    [ReflectionKind.TypeAlias]: "Type aliases",
  };

  /**
   * Create a new GroupPlugin instance.
   */
  initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_RESOLVE]: this.onResolve,
      [Converter.EVENT_RESOLVE_END]: this.onEndResolve,
    });
  }

  /**
   * Triggered when the converter resolves a reflection.
   *
   * @param context  The context object describing the current state the converter is in.
   * @param reflection  The reflection that is currently resolved.
   */
  private onResolve(_context: Context, reflection: Reflection) {
    reflection.kindString = GroupPlugin.getKindSingular(reflection.kind);

    if (reflection instanceof ContainerReflection) {
      this.group(reflection);
    }
  }

  /**
   * Triggered when the converter has finished resolving a project.
   *
   * @param context  The context object describing the current state the converter is in.
   */
  private onEndResolve(context: Context) {
    function walkDirectory(directory: SourceDirectory) {
      directory.groups = GroupPlugin.getReflectionGroups(
        directory.getAllReflections()
      );

      for (const dir of Object.values(directory.directories)) {
        walkDirectory(dir);
      }
    }

    const project = context.project;
    this.group(project);

    walkDirectory(project.directory);
    project.files.forEach((file) => {
      file.groups = GroupPlugin.getReflectionGroups(file.reflections);
    });
  }

  private group(reflection: ContainerReflection) {
    const groups: ReflectionGroup[] = [];

    if (reflection.isProject()) {
      const children = reflection.children || [];
      reflection.children = [];
      children
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach((child: DeclarationReflection) => {
          if (child.kindOf(ReflectionKind.SomeModule)) {
            if (child.name == 'index') {
              // Exclude index direct submodule of project.
              return;
            }

            const group = new ReflectionGroup(child.name, ReflectionKind.All);

            GroupUtils.importIntoGroup(group, child, reflection, this.application.logger);

            if (group.children.length > 0) {
              groups.push(group);
            }
          } else {
            reflection.children?.push(child);
          }
        });

      GroupUtils.pruneReferences(reflection);
    }

    if (
      reflection.children &&
      reflection.children.length > 0 &&
      !reflection.groups
    ) {
      const groupedChildren: Reflection[] = GroupUtils.getGroupsChildren(groups);

      reflection.children.sort(GroupPlugin.sortCallback);

      // Filter out children that have been grouped under modules.
      const childrenForGrouping = reflection
        .children
        .filter(child => !GroupUtils.hasChild(groupedChildren, child));

      reflection.groups = GroupPlugin.getReflectionGroups(
        childrenForGrouping
      );
    }

    reflection.groups = reflection.groups?.concat(groups);
  }

  /**
   * Create a grouped representation of the given list of reflections.
   *
   * Reflections are grouped by kind and sorted by weight and name.
   *
   * @param reflections  The reflections that should be grouped.
   * @returns An array containing all children of the given reflection grouped by their kind.
   */
  static getReflectionGroups(reflections: Reflection[]): ReflectionGroup[] {
    const groups: ReflectionGroup[] = [];
    reflections.forEach((child) => {
      for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        if (group.kind !== child.kind) {
          continue;
        }

        group.children.push(child);
        return;
      }

      const group = new ReflectionGroup(
        GroupPlugin.getKindPlural(child.kind),
        child.kind
      );
      group.children.push(child);
      groups.push(group);
    });

    groups.forEach((group) => {
      let allInherited = true;
      let allPrivate = true;
      let allProtected = true;
      let allExternal = true;

      group.children.forEach((child) => {
        allPrivate = child.flags.isPrivate && allPrivate;
        allProtected =
          (child.flags.isPrivate || child.flags.isProtected) &&
          allProtected;
        allExternal = child.flags.isExternal && allExternal;

        if (child instanceof DeclarationReflection) {
          allInherited = !!child.inheritedFrom && allInherited;
        } else {
          allInherited = false;
        }
      });

      group.allChildrenAreInherited = allInherited;
      group.allChildrenArePrivate = allPrivate;
      group.allChildrenAreProtectedOrPrivate = allProtected;
      group.allChildrenAreExternal = allExternal;
    });

    return groups;
  }

  /**
   * Transform the internal typescript kind identifier into a human readable version.
   *
   * @param kind  The original typescript kind identifier.
   * @returns A human readable version of the given typescript kind identifier.
   */
  private static getKindString(kind: ReflectionKind): string {
    let str = ReflectionKind[kind];
    str = str.replace(
      /(.)([A-Z])/g,
      (_m, a, b) => a + " " + b.toLowerCase()
    );
    return str;
  }

  /**
   * Return the singular name of a internal typescript kind identifier.
   *
   * @param kind The original internal typescript kind identifier.
   * @returns The singular name of the given internal typescript kind identifier
   */
  static getKindSingular(kind: ReflectionKind): string {
    if (kind in GroupPlugin.SINGULARS) {
      return GroupPlugin.SINGULARS[
        kind as keyof typeof GroupPlugin.SINGULARS
      ];
    } else {
      return GroupPlugin.getKindString(kind);
    }
  }

  /**
   * Return the plural name of a internal typescript kind identifier.
   *
   * @param kind The original internal typescript kind identifier.
   * @returns The plural name of the given internal typescript kind identifier
   */
  static getKindPlural(kind: ReflectionKind): string {
    if (kind in GroupPlugin.PLURALS) {
      return GroupPlugin.PLURALS[
        kind as keyof typeof GroupPlugin.PLURALS
      ];
    } else {
      return this.getKindString(kind) + "s";
    }
  }

  /**
   * Callback used to sort reflections by weight defined by ´GroupPlugin.WEIGHTS´ and name.
   *
   * @param a The left reflection to sort.
   * @param b The right reflection to sort.
   * @returns The sorting weight.
   */
  static sortCallback(a: Reflection, b: Reflection): number {
    const aWeight = GroupPlugin.WEIGHTS.indexOf(a.kind);
    const bWeight = GroupPlugin.WEIGHTS.indexOf(b.kind);
    if (aWeight === bWeight) {
      if (a.flags.isStatic && !b.flags.isStatic) {
        return 1;
      }
      if (!a.flags.isStatic && b.flags.isStatic) {
        return -1;
      }
      if (a.name === b.name) {
        return 0;
      }
      return a.name > b.name ? 1 : -1;
    } else {
      return aWeight - bWeight;
    }
  }
}
