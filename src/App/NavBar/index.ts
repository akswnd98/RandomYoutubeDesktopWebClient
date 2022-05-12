import { html, render } from 'lit-html';
import OwlElement, { ConstructorParam as ParentConstructorParam } from '@/src/owl-element/Element';
import Style from '@/src/owl-element/Attribute/Style';
import styles from './index.scss';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import youtubeSharingLogo from '@/assets/images/YoutubeSharingLogo.svg';

export type PayloadParam = {
} & ParentConstructorParam;

@injectable()
export default class NavBar extends OwlElement {
  constructor (
  ) {
    super({
      attributes: [
        new Style({ styles: styles.toString() }),
      ],
    } as PayloadParam);
    console.log(youtubeSharingLogo);
  }

  initialRender (payload: PayloadParam) {
    super.initialRender(payload);
    render(
      html`
        <img src=${youtubeSharingLogo} />
      `,
      this.rootElement,
    );
  }
}

customElements.define('nav-bar', NavBar);
