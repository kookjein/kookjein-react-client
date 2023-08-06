import Handsontable from "handsontable";
import { useCallback, useEffect, useRef } from "react";
import { customImageRenderer, customStatusRenderer } from "./hotRenderer";
import "../utils/handsontable.css";

const SheetWindow = (props) => {
  const containerRef = useRef(null);
  const afterRenderPromise = useCallback(() => {
    return new Promise((resolve) => {
      const timeOut = setTimeout(() => {
        props.hotRef.current.removeHook("afterRender", afterRenderCallback);
        resolve();
      }, 100);
      const afterRenderCallback = (isForced) => {
        clearTimeout(timeOut);
        if (!isForced) {
          props.hotRef.current.removeHook("afterRender", afterRenderCallback);
          resolve();
        }
      };
      props.hotRef.current?.addHookOnce("afterRender", afterRenderCallback);
    });
  }, [props.hotRef]);

  useEffect(() => {
    props.hotRef.current?.destroy();

    const customStatusEditor = Handsontable.editors.DropdownEditor.prototype.extend();
    customStatusEditor.prototype.prepare = function (row, col, prop, td, originalValue, cellProperties) {
      Handsontable.editors.DropdownEditor.prototype.prepare.apply(this, arguments);
      this.TEXTAREA.readOnly = true;
    };

    const customImageEditor = Handsontable.editors.TextEditor.prototype.extend();
    customImageEditor.prototype.init = function () {
      Handsontable.editors.TextEditor.prototype.init.apply(this, arguments);
      this.TEXTAREA_PARENT.addEventListener(
        "paste",
        (event) => {
          const items = event.clipboardData.items;
          for (let i = 0; i < items.length; i++) {
            if (items[i].kind === "file" && items[i].type.indexOf("image/") !== -1) {
              const blob = items[i].getAsFile();
              const url = URL.createObjectURL(blob);
              if (this.isOpened()) this.setValue(url);
              else {
                this.beginEditing();
                this.setValue(url);
              }
            }
          }
        },
        true
      );
    };
    customImageEditor.prototype.finishEditing = function () {
      Handsontable.editors.TextEditor.prototype.finishEditing.apply(this, arguments);
      afterRenderPromise().then(() => {
        props.hotRef.current.render();
      });
    };

    function statusRenderer(instance, td) {
      Handsontable.renderers.DropdownRenderer.apply(this, arguments);
      customStatusRenderer(arguments[2], arguments[3], arguments[5], td);
    }

    function imageRenderer(instance, td) {
      Handsontable.renderers.HtmlRenderer.apply(this, arguments);
      customImageRenderer(arguments[2], arguments[3], arguments[5], td);
    }

    props.hotRef.current = new Handsontable(containerRef.current, {
      data: props.hotDataRef.current,
      columns: [
        {
          data: "status",
          type: "dropdown",
          editor: customStatusEditor,
          source: ["진행전", "진행중", "재요청", "승인대기중", "승인완료"],
          renderer: statusRenderer,
        },
        { data: "image", type: "text", editor: customImageEditor, renderer: imageRenderer },
        { data: "description", type: "text" },
      ],
      colWidths: [1, 3, 6],
      rowHeights: 100,
      stretchH: "all",
      manualColumnResize: true,
      manualRowResize: true,
      colHeaders: ["상태", "캡쳐화면", "설명"],
      rowHeaders: true,
      width: props.hotRefSize.width,
      height: props.hotRefSize.height,
      minSpareRows: 2,
      contextMenu: ["row_above", "row_below", "remove_row"],
    });

    props.hotRef.current.addHook("afterChange", (changes) => {
      if (!props.hotRef.current.getDataAtRowProp(changes[0][0], "status"))
        props.hotRef.current.setDataAtRowProp(changes[0][0], "status", "진행전");
    });

    props.hotRef.current.addHook("afterColumnResize", () => {
      props.hotRef.current.render();
    });
  }, [props.hotRef, props.hotRefSize, props.hotDataRef, afterRenderPromise]);

  return <div ref={containerRef} />;
};

export default SheetWindow;
