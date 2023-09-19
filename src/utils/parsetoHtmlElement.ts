export function parseToHtmlElement(htmlString: string) {
  const tempElement = document.createElement("div");
  
  tempElement.innerHTML = htmlString;

  return tempElement;
}
