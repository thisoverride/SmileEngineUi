class d {
  private handleTileClick(event: Event): void {
    const element = event.currentTarget as HTMLElement;
    if (element) {
      element.style.pointerEvents = "none";
      const parentElement = element.parentNode as HTMLElement;
      parentElement.classList.remove(parentElement.classList[0]);
      const icon = parentElement.querySelector("#icon-app") as HTMLElement;
      icon.style.zIndex = "1500";
      icon.style.width = "30%";
      icon.style.height = "30%";
      if (!element.classList.contains("tile--expanded")) {
        const tileRect = element.getBoundingClientRect();
        const width = tileRect.right - tileRect.left;
        const height = tileRect.bottom - tileRect.top;
        const iWidth = window.innerWidth;
        const iHeight = window.innerHeight;

        element.style.backgroundColor = "#050f1c";
        element.classList.add("tile--expanded");
        element.style.transform = `
      translateX(${(iWidth - width) / 2 - tileRect.left}px)
      translateY(${(iHeight - height) / 2 - tileRect.top}px)
      scaleX(${iWidth / width})
      scaleY(${iHeight / height})`;
      }
    }
  }
}
