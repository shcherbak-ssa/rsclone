import { EditorInlineStyleType } from '../../constants/ui.constants';

export const inlineEditorStyles = {
  [EditorInlineStyleType.CODE]: {
    margin: '0 1px',
    display: 'inline-block',
    padding: '3px 6px',
    fontSize: '85%',
    maxWidth: '100%',
    fontFamily: '"Source Code Pro", Consolas, Menlo, monospace',
    borderRadius: '3px',
    backgroundColor: 'rgb(245, 247, 249)',
  },
};
