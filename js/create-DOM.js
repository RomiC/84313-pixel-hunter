const getElementFromTemplate = (template) => {
  const elementWrapper = document.createElement(`div`);
  elementWrapper.innerHTML = template;
  return elementWrapper;
};
export default getElementFromTemplate;
