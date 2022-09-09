import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import jszip from 'jszip';
import Filesaver from 'file-saver';
import styles from './styles.module.sass';
import Editor from '../Editor';
import { toggleEditorView } from '../../redux/slice/app';
import { RootState } from '../../types';
import { EditorView } from '../../types';
import { formatScript, formatStyle } from '../../helper';
import { Z_PARTIAL_FLUSH } from 'zlib';

const CodeView = () => {
  const dispatch = useDispatch();
  const app = useSelector((state: RootState) => state);
  const scriptFileName =
    app.config.scriptFileName +
    '.' +
    app.config.scriptType +
    'x';
  const styleFileName =
    app.config.styleFileName + '.' + app.config.styleType;
  const { scriptType, componentName, usingTestFile } =
    app.config;

  const downloadFiles = async () => {
    const zip = new jszip();

    zip.file(
      scriptFileName,
      formatScript(app.output.script)
    );
    zip.file(
      styleFileName,
      formatStyle(app.output.style, app.config.styleType)
    );
    if (usingTestFile)
      zip.file(`index.test.${scriptType}`, '');

    if (app.assets.length) {
      // TODO : Convert files to images and put them into assets folder
      zip.folder('assets');

      for (
        let counter = 0;
        counter < app.assets.length;
        counter++
      ) {
        const fetchPromise = await fetch(
          // @ts-ignore
          app.assets[counter].src
        );
        const blobPormise = fetchPromise.blob();
        const blob = await blobPormise;
        const file = new File([blob], `file`);
        zip.file(
          // @ts-ignore
          `assets/${app.assets[counter].name}`,
          file
        );
        // @ts-ignore
        // URL.revokeObjectURL(app.assets[counter].src)
      }

      zip
        .generateAsync({ type: 'blob' })
        .then(function (content) {
          Filesaver.saveAs(content, `${componentName}.zip`);
        });
    }
  };

  const showScript = () => {
    dispatch(
      toggleEditorView({ value: EditorView.Script })
    );
  };

  const showStyle = () => {
    dispatch(toggleEditorView({ value: EditorView.Style }));
  };

  return (
    <div style={{}}>
      <div className={styles.container}>
        <div className={styles.switchers}>
          <button
            className={
              app.editorView === EditorView.Script
                ? styles.active
                : ''
            }
            onClick={showScript}
          >
            {scriptFileName}
          </button>
          <button
            className={
              app.editorView === EditorView.Style
                ? styles.active
                : ''
            }
            onClick={showStyle}
          >
            {styleFileName}
          </button>
        </div>
        <button
          className={styles.downloadZip}
          onClick={downloadFiles}
        >
          Download zip
        </button>
      </div>
      <Editor />
    </div>
  );
};

export default CodeView;
