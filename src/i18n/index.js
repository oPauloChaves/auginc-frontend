import { englishMessages } from 'admin-on-rest';

import ptBRMessages from './pt_BR';
import enMessages from './en';

export default {
  pt_BR: { ...ptBRMessages },
  en: { ...englishMessages, ...enMessages },
};
