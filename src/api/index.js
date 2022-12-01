// const URL = "http://127.0.0.1:3300";
const URL = 'http://14.48.162.122:3300';
// const URL = 'https://10.0.2.2:3300';  

const getModels = async () => {
  return await fetch(`${URL}/model`, {
    method: "GET",
  });
};

export { URL, getModels };
