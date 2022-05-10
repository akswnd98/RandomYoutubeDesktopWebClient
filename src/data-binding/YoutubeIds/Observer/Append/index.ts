import AppendNotifier from '../../Notifier/Append';
import IObserver from '@/src/owl-data-binding/IObserver';
import { EventType } from '../../Notifier/Append';
import InversifyStatic from '@/src/inversify.config';
import AppBody from '@/src/App/Body';
import { SYMBOLS } from '@/src/symbols';
import Card from '@/src/App/Body/Card';
import axios from 'axios';
import { injectable } from 'inversify';

@injectable()
export default class Append implements IObserver {
  async update (subject: AppendNotifier, event: EventType) {
    const body = InversifyStatic.instance.get<AppBody>(SYMBOLS.AppBody);
    const cards = await Promise.all(event.newIds.map(async (v) => new Card({
      ...await this.getVideoMetadata(v),
      ytId: v,
    })));
    cards.forEach((v) => {
      body.rootElement.appendChild(v);
    });
  }

  async getVideoMetadata (id: string) {
    const metadata = (await axios.get(`http://noembed.com/embed?url=${encodeURIComponent(`http://www.youtube.com/watch?v=${id}`)}`)).data;
    return {
      title: metadata.title,
    };
  }
}
