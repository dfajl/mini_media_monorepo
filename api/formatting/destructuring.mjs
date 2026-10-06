import { doc } from 'prettier';
import { printers } from 'prettier/plugins/estree';
import { createDestructuringPlugin } from '../../formatting/destructuring.mjs';

export default createDestructuringPlugin(printers.estree, doc);
