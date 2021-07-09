import {
  ProjectReflection,
  ReflectionKind
} from 'typedoc';
import { RendererComponent } from 'typedoc/dist/lib/output/components';
import { ReflectionGroup } from 'typedoc/dist/lib/models';
import { PageEvent } from 'typedoc/dist/lib/output/events';
import { stripMdExt } from '../util/urls';
import { toTitleCase } from '../util/strings';


/**
 * A plugin that wraps the generated output with a layout template.
 *
 * Currently only a default layout is supported. The layout must be stored
 * as ´layouts/default.hbs´ in the theme directory.
 */
export class TemplatePlugin extends RendererComponent {
  /**
   * Create a new TemplatePlugin instance.
   */
  initialize() {
    this.listenTo(this.owner, PageEvent.BEGIN, this.onRendererPageBegin, 1);
    this.listenTo(this.owner, PageEvent.END, this.onRendererPageEnd, 1000);
  }


  /**
   * Triggered after a document has been rendered, just before it is written to disc.
   *
   * @param page  An event object describing the current render operation.
   */
  private onRendererPageEnd(pageEvent) {
    const title = pageEvent.model.name;
    const chapter = this.getChapter(pageEvent.model, 'Reference');
    const permalink = pageEvent.permalink;
    const excerpt = this.getExcerpt(pageEvent.model);
    const definitions = pageEvent.definitions;

    pageEvent.contents = `---
title: ${title}
section: assistants
permalink: /assistants/reference/${permalink}
chapter: ${chapter}
excerpt: ${excerpt}
order: 505
definitions: ${definitions}
---

` + pageEvent.contents
  }

  private onRendererPageBegin(pageEvent) {
    // This is where we should compute the permalink
    // for the Jekyll header.
    pageEvent.permalink = this.getPermalink(pageEvent.url, pageEvent.model);
    pageEvent.definitions = this.getProjectLinks(pageEvent.model);
    return pageEvent;
  }

  private getExcerpt(reflection) {
    if (reflection.comment) {
      return reflection.comment.shortText;
    } else {
      return reflection.name;
    }
  }

  private getPermalink(url, reflection) {
    const project = this.getProject(reflection);
    const projectSlug = (project && project !== reflection ? project.getAlias() + '/' : '')
    return projectSlug + stripMdExt(url);
  }

  private getKindChapter(reflection) {
    if (!reflection) {
      return null;
    }

    if (reflection.isProject()) {
      return toTitleCase(reflection.name);
    }

    switch (reflection.kind) {
      case ReflectionKind.Enum:
        return 'Enums';
      case ReflectionKind.Module:
      case ReflectionKind.Namespace:
        return 'Modules';
      default:
        return null;
    }
  }

  private getProject(model) {
    if (!model) {
      return null;
    }

    if (model.isProject()) {
      return model;
    } else {
      return this.getProject(model.parent);
    }
  }

  private getChaptersArray(reflection) {
    if (reflection) {

      let chapters: string[] = [];

      if (!reflection.isProject()) {
        const chapter = this.getKindChapter(reflection);

        chapters = this.getChaptersArray(reflection.parent);

        if (chapter) {
          chapters.push(chapter);
        }

        chapters = chapters.filter((v: any) => !!v);
      }

      return chapters;
    }

    return [];
  }

  private getChapter(reflection, rootChapter = '') {
    if (reflection) {
      let rootChapters: string[] = [rootChapter];
      const project = (reflection.isProject() ? null : this.getProject(reflection));
      if (project) {
        const projectChapter = this.getKindChapter(project);
        if (projectChapter) {
          rootChapters.push(projectChapter);
        }
      }

      let chapters = rootChapters.concat(this.getChaptersArray(reflection));

      return chapters.join('/');
    }

    return rootChapter;
  }

  private getProjectLinks(project: ProjectReflection) {
    const groups = project.groups || [];

    return groups
      .map(group => this.getGroupLinks(group))
      .join('|||')
  }

  private getGroupLinks(group) {
    return [group.title, this.getGroupChildren(group)].join('||');
  }

  private getGroupChildren(group: ReflectionGroup) {
    return group
      .children
      .map(child => [child.name, stripMdExt(child.url)].join(';'))
      .join('|');
  }
}