import axios from 'axios';
import App from './App';
import AppendYoutubeIdsNotifier from './data-binding/YoutubeIds/Notifier/Append';
import styles from './index.scss';
import ContainerStatic from './inversify.config';
import { SYMBOLS } from './symbols';
import { GetRandomYoutubeIdsResponse } from '@/src/common';

(async () => {
  const container = await ContainerStatic.getInstance();

  const stylesElement = document.createElement('style');
  stylesElement.textContent = styles.toString();
  document.head.appendChild(stylesElement);

  const root = document.getElementById('root')!;
  root.appendChild(container.get<App>(SYMBOLS.App));

  container.get<AppendYoutubeIdsNotifier>(SYMBOLS.AppendYoutubeIdsNotifier).notify({ newIds: (await axios.get<GetRandomYoutubeIdsResponse>('/api/randomYoutubeIds')).data.ids });
})();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/desktop/sw.js');
  });
}
