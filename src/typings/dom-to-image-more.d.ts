declare module 'dom-to-image-more' {
  interface Options {
    bgcolor?: string;
    width?: number;
    height?: number;
    style?: object;
    filter?: (node: HTMLElement) => boolean;
    imagePlaceholder?: string;
    cacheBust?: boolean;
    // 其餘 options...
  }
  interface DomToImage {
    toPng(node: HTMLElement, options?: Options): Promise<string>;
    toJpeg(node: HTMLElement, options?: Options): Promise<string>;
    // 其餘 API...
  }
  const domtoimage: DomToImage;
  export default domtoimage;
}