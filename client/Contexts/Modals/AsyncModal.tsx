import loadable from '@loadable/component';

import { Modal } from './typings';

export interface Props {
  className?: string;
  modal: Modal;
}

export default loadable((props: Props) => import(`@Modals/${props.modal.id}Modal`));
