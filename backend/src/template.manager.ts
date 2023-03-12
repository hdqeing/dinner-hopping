import { Provide } from '@midwayjs/core';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { EmailType } from './interface';
import mjml2html from 'mjml';
import { join } from 'path';
import htmlnano, { HtmlnanoOptions } from 'htmlnano';

@Provide()
export class TemplateManager {
  compliedTemplate: Map<EmailType, HandlebarsTemplateDelegate<any>>;
  htmlnanoOptions: HtmlnanoOptions;
  constructor() {
    this.compliedTemplate = new Map();
    this.htmlnanoOptions = {
      collapseWhitespace: 'aggressive',
      removeComments: true,
      minifyJs: {
        quote_style: 1,
      },
      minifyCss: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true,
            },
          },
        ],
      },
      minifySvg: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                builtinPluginName: {
                  optionName: 'optionValue',
                },
              },
            },
          },
        ],
      },
    };
  }

  getTemplate(type: EmailType) {
    let result = this.compliedTemplate[type];
    if (!result) {
      const path = this.getTemplatePath(type);
      result = compile(readFileSync(path, 'utf-8'));
      this.compliedTemplate[type] = result;
    }
    return result;
  }

  getTemplatePath(type: EmailType) {
    if (type === EmailType.TEST) {
      return join(__dirname, './template/test.mjml');
    }
    return '';
  }

  async getHtml(type: EmailType, vars: any) {
    const template = this.getTemplate(type)(vars);
    const html = mjml2html(template).html;
    const compressedHtml = await htmlnano.process(html, this.htmlnanoOptions);
    return compressedHtml.html;
  }
}
