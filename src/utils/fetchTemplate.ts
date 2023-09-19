const PATH = "./components";
const templateDictionary: Record<string, string> = {};

export async function loadTemplate(url: string): Promise<string> {
  if(url in templateDictionary) return templateDictionary[url]

  const response = await fetch(`${PATH}${url}`);
  const html = await response.text();

  templateDictionary[url] = html
  
  return html;
}
