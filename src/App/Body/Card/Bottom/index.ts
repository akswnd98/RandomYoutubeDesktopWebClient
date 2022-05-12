import OwlElement, { ConstructorParam as ParentConstructorParam } from '@/src/owl-element/Element';
import 'reflect-metadata';
import { injectable } from 'inversify';
import Style from '@/src/owl-element/Attribute/Style';
import styles from './index.scss';
import { html, render } from 'lit-html';
import ClickAuthor from './Handler/ClickAuthor';

export type ConstructorParam = {
  ytId: string;
  title: string;
  authorName: string;
  authorUrl: string;
};

export type PayloadParam =
  ConstructorParam
  & ParentConstructorParam;

@injectable()
export default class Bottom extends OwlElement {
  constructor (payload: ConstructorParam) {
    super({
      attributes: [
        new Style({ styles: styles.toString() }),
        new ClickAuthor({ authorUrl: payload.authorUrl }),
      ],
      ...payload,
    });
  }

  initialRender (payload: PayloadParam) {
    super.initialRender(payload);
    render(
      html`
        <div id='title-div'>
          <p id='title'>${payload.title}</p>
        </div>
        <div id='author-div'>
          <p id='author'>${payload.authorName}</p>
        </div>
      `,
      this.rootElement,
    );
  }
}

customElements.define('app-body-card-bottom', Bottom);
