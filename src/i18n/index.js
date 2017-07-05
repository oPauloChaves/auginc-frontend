import { englishMessages } from 'admin-on-rest';
import portuguesMessages from 'aor-language-portugues';

import ptCustomMessages from './pt';
import enCustomMessages from './en';

export default {
  pt: { ...portuguesMessages, ...ptCustomMessages },
  en: { ...englishMessages, ...enCustomMessages },
};
