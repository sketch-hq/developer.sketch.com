import * as path from 'path';

import { BindOption, Converter, Renderer } from 'typedoc';
import { Component, ConverterComponent } from 'typedoc/dist/lib/converter/components';
import { Context } from 'typedoc/dist/lib/converter';

@Component({ name: 'jekyll-sketch-converter' })
export class ConverterPlugin extends ConverterComponent {
  @BindOption('theme')
  theme!: string;

  initialize() {
    // This has to be -1 priority to run first and set the `getDefaultTheme` static function.
    this.listenTo(this.owner, Converter.EVENT_BEGIN, this.onConverterBegin, -1);
    this.listenTo(this.owner, Converter.EVENT_RESOLVE_BEGIN, this.onResolveBegin);
  }

  /**
   * Overide default assets
   */
  onConverterBegin(context: Context) {
    const getDefaultTheme = () => path.join(__dirname, '../theme/resources');

    Renderer.getDefaultTheme = getDefaultTheme;
    this.application.renderer.getDefaultTheme = getDefaultTheme;
  }

  onResolveBegin(context: Context) {
    const themeDir = path.join(__dirname, '../theme');

    // Set the default markdown theme
    this.application.options.setValue('theme', themeDir);
  }
}
