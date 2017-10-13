const getElementFromTemplate = (template) => {
  let elementWrapper = document.createElement(`div`);
  elementWrapper.innerHTML = template;
  return elementWrapper;
};

export default getElementFromTemplate;
