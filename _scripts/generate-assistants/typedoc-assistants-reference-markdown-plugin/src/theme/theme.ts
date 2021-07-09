import {
  BindOption,
  DeclarationReflection,
  Reflection,
  ReflectionKind,
  Renderer,
  UrlMapping
} from 'typedoc';
import { TemplateMapping } from 'typedoc/dist/lib/output/themes/DefaultTheme';

import MarkdownTheme from 'typedoc-plugin-markdown/dist/theme';
import { ContextAwareHelpers } from 'typedoc-plugin-markdown/dist/components/options';

import { stripMdExt } from '../util/urls';

export default class SketchCustomTheme extends MarkdownTheme {
  renderer: Renderer;
  @BindOption('entryPoints')
  entryPoints!: string[];
  @BindOption('readme')
  readme!: string;

  static HANDLEBARS = MarkdownTheme.HANDLEBARS;

  static URL_PREFIX = MarkdownTheme.URL_PREFIX;

  constructor(renderer: Renderer, basePath: string) {
    super(renderer, basePath);
    this.renderer = renderer;
    this.renderer.application.options.setValue('hideBreadcrumbs', true);
    this.renderer.application.options.setValue('hidePageTitle', true);

    // utility helper
    const mdOptions: ContextAwareHelpers = <ContextAwareHelpers>this.renderer.getComponent('options');

    SketchCustomTheme.HANDLEBARS.unregisterHelper('relativeURL');
    SketchCustomTheme.HANDLEBARS.registerHelper('relativeURL', (url: string) => {
      let relative_url = url
        ? mdOptions.publicPath
          ? mdOptions.publicPath + url
          : mdOptions.getRelativeUrl(url)
        : url;

      return stripMdExt(relative_url);
    });
  }

  /**
   * Test if directory is output directory
   * @param outputDirectory
   */
  isOutputDirectory(outputDirectory: string): boolean {
    return true;
  }

  /**
   * Similar to DefaultTheme.applyAnchorUrl method with added but the anchors are computed from the reflection structure
   * Generate an anchor url for the given reflection and all of its children.
   *
   * @param reflection  The reflection an anchor url should be created for.
   * @param container   The nearest reflection having an own document.
   */
  applyAnchorUrl(reflection: Reflection, container: Reflection) {
    if (!reflection.url || !MarkdownTheme.URL_PREFIX.test(reflection.url)) {
      const reflectionId = reflection.name.toLowerCase();
      const anchor = this.toAnchorRef(reflectionId);
      if (reflection.kindOf(ReflectionKind.EnumMember)) {
        reflection.url = container.url + '-' + anchor;
      } else {
        reflection.url = '#' + anchor;
      }
      reflection.anchor = anchor;
      reflection.hasOwnDocument = false;
    }
    reflection.traverse((child) => {
      if (child instanceof DeclarationReflection) {
        this.applyAnchorUrl(child, container);
      }
    });
  }

  /**
   * This is mostly a copy of the TypeDoc DefaultTheme.buildUrls method with .html ext switched to .md
   * Builds the url for the the given reflection and all of its children.
   *
   * @param reflection  The reflection the url should be created for.
   * @param urls The array the url should be appended to.
   * @returns The altered urls array.
   */

  buildUrls(
    reflection: DeclarationReflection,
    urls: UrlMapping[],
  ): UrlMapping[] {
    const mapping = this.mappings.find((mapping) =>
      reflection.kindOf(mapping.kind),
    );

    if (mapping) {
      if (!reflection.url || !MarkdownTheme.URL_PREFIX.test(reflection.url)) {
        const url = this.toUrl(mapping, reflection);
        urls.push(new UrlMapping(url, reflection, mapping.template));
        reflection.url = url;
        reflection.hasOwnDocument = true;
      }
      for (const child of reflection.children || []) {
        if (mapping.isLeaf) {
          this.applyAnchorUrl(child, reflection);
        } else {
          this.buildUrls(child, urls);
        }
      }
    } else if (reflection.parent) {
      this.applyAnchorUrl(reflection, reflection.parent);
    }

    return urls;
  }

  get mappings(): TemplateMapping[] {
    return [];
  }
}