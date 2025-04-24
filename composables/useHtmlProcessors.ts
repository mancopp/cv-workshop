export const useHtmlProcessors = () => {
  const configuratorStore = useConfiguratorStore();

  const processHtml = (rootElement: HTMLElement) => {
    const newHtmlEl = rootElement.cloneNode(true) as HTMLElement;
    const taggedElements = Array.from(
      newHtmlEl.querySelectorAll("[data-tags]")
    ) as HTMLElement[];

    console.log(taggedElements);

    taggedElements.forEach((el) => {
      let hide = true;
      const tags = el.dataset.tags?.split(",");
      if (!tags) return;

      tags.forEach((c) => {
        if (configuratorStore.selectedTags.includes(c)) {
          hide = false;
        }
      });

      if (hide) {
        el.dataset.hidden = "true";
      }
    });

    return newHtmlEl;
  };

  const drawPreviewOverlayHtml = (rootElement: HTMLElement) => {
    const newHtmlEl = rootElement.cloneNode(true) as HTMLElement;
    const taggedElements = Array.from(
      newHtmlEl.querySelectorAll("[data-tags]")
    ) as HTMLElement[];

    console.log(taggedElements);

    taggedElements.reverse().forEach((el) => {
      const tagsString = el.dataset.tags;

      if (tagsString) {
        const tags = el.dataset.tags?.split(",");

        if (tags && tags.length > 0) {
          tags.map((t: string) => configuratorStore.documentTags.add(t));
          const wrapperDiv = document.createElement("div");
          const taglistEl = document.createElement("ul");

          wrapperDiv.className = "overlay highlighted-part";
          taglistEl.className = "taglist flex items-center gap-1";

          tags.map((t: string) => {
            const li = document.createElement("li");
            li.innerHTML = `#${t}`;
            li.dataset.tag = t;
            if (configuratorStore.selectedTags.includes(t))
              li.style.textDecoration = "underline";
            taglistEl.appendChild(li);
          });

          wrapperDiv.appendChild(taglistEl);
          wrapperDiv.appendChild(el.cloneNode(true));

          if (el.dataset.hidden === "true") {
            if (configuratorStore.previewMode === "show") {
              wrapperDiv.style.borderColor = "red";
              taglistEl.style.backgroundColor = "red";
            } else {
              return;
            }
          }

          el.parentNode?.replaceChild(wrapperDiv, el);
        }
      }
    });

    return newHtmlEl;
  };

  const prepareHtmlForExport = (rootElement: HTMLElement, width: number) => {
    const newHtmlEl = rootElement.cloneNode(true) as HTMLElement;
    const taggedElements = Array.from(
      newHtmlEl.querySelectorAll("[data-tags]")
    ) as HTMLElement[];

    taggedElements.forEach((el) => {
      if (el.dataset.hidden === "true") {
        el.style.display = "none";
      }
    });

    newHtmlEl.style.width = `${width}px`;

    return newHtmlEl;
  };

  return { processHtml, drawPreviewOverlayHtml, prepareHtmlForExport };
};
